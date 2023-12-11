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
import { Data, OriginRow } from '@/app/dashboard/book-rank/types';

export default function Page() {
  const [file, setFile] = useState<File>();

  const data = useAsync<Data>(async () => {
    if (file) {
      const buffer = await file.arrayBuffer();
      const charset = chardet.detect(new Uint8Array(buffer));
      const content = new TextDecoder(charset ?? 'utf-8').decode(buffer);
      const parseResult = papa.parse<OriginRow>(content, {header: true, skipEmptyLines: true});
      if (parseResult.errors.length > 0) {
        throw new Error(`CSV解析失败：\n${parseResult.errors.map(e => `- ${e}`).join('\n')}`);
      }
      return parseResult;
    }
  }, [file]);

  return (
    <div className={'space-y-2 p-4'}>
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