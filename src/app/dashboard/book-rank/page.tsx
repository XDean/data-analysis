'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useAsync } from '@/lib/hook/use-async';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import * as papa from 'papaparse';
import chardet from 'chardet';
import { Board } from '@/app/dashboard/book-rank/Board';
import { toNumber } from '@/app/dashboard/book-rank/util';
import { Data, OriginRow, requiredColumn, Row } from '@/app/dashboard/book-rank/types';

export default function Page() {
  const [file, setFile] = useState<File>();

  const data = useAsync<Data>(async () => {
    if (file) {
      const buffer = await file.arrayBuffer();
      const charset = chardet.detect(new Uint8Array(buffer));
      const content = new TextDecoder(charset ?? 'utf-8').decode(buffer);
      const parseResult = papa.parse<OriginRow>(content, {header: true, skipEmptyLines: true});
      if (parseResult.errors.length > 0) {
        throw new Error(`CSV解析失败：\n${parseResult.errors.map(e => `- ${JSON.stringify(e)}`).join('\n')}`);
      }
      if (!requiredColumn.every(e => parseResult.meta.fields?.includes(e))) {
        throw new Error(`必须包含以下列： ${requiredColumn.join(', ')}`);
      }
      let rows = parseResult.data.map((e, i): Row => {
        try {
          return {
            id: toNumber(e['书id']),
            k0: toNumber(e['阅读人数']),
            k1: toNumber(e['深度阅读率']),
            k2: toNumber(e['转订率']),
            k3: toNumber(e['完读率']),
          };
        } catch (e) {
          throw new Error(`Row ${i + 2}: ${(e as Error).message}`);
        }
      });
      return {
        rows,
        originRows: parseResult.data,
      };
    }
  }, [file]);

  return (
    <div className={'p-4'}>
      <div className={'flex gap-2 items-center'}>
        <Label htmlFor="file">
          书籍数据文件 (.csv)
        </Label>
        <Input
          id="file"
          type="file"
          className={'min-w-64 w-[50%]'}
          accept={'.csv'}
          onChange={e => setFile(e.currentTarget.files?.[0])}
        />
      </div>
      {file && data.type === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4"/>
          <AlertTitle>错误</AlertTitle>
          <AlertDescription className={'whitespace-pre'}>
            {data.error.message}
          </AlertDescription>
        </Alert>
      )}
      {file && data.type === 'ready' && (
        <Board data={data.value}/>
      )}
    </div>
  );
}