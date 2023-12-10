import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC, useMemo, useState } from 'react';
import { Config, Data, defaultLevelConfig, Level, LevelConfig, Levels, Row } from '@/app/dashboard/book-rank/types';
import { Input } from '@/components/ui/input';
import { useImmer } from 'use-immer';
import { downloadString } from '@/lib/util/download-string';
import { getLevel, matchConfig } from '@/app/dashboard/book-rank/util';
import * as papa from 'papaparse';

type Props = {
  data: Data
}

export const RankCard: FC<Props> = (
  {
    data,
  },
) => {
  const {rows} = data;
  const [value, updateValue] = useImmer<LevelConfig>(() => defaultLevelConfig());
  const levelCount = useMemo(() => {
    const count: Record<Level, number> = {S: 0, A: 0, B: 0, C: 0};
    rows.forEach(row => {
      const level = getLevel(row, value);
      if (level !== null) {
        count[level] += 1;
      }
    });
    return count;
  }, [value, rows]);
  return (
    <Card className={'w-full h-full'}>
      <CardHeader>
        <CardTitle>评级</CardTitle>
      </CardHeader>
      <CardContent>
        <table className={'border-collapse [&_td]:border [&_td]:p-1 [&_input]:w-32'}>
          <thead className={'bg-gray-100'}>
          <tr>
            <th/>
            <th>阅读人数</th>
            <th>深度阅读率</th>
            <th>转订率</th>
            <th>完读率</th>
            <th className={'w-24'}>数量</th>
          </tr>
          </thead>
          <thead>
          {Levels.map(level => (
            <tr key={level}>
              <td>
                {level}
              </td>
              <td>
                <input
                  type={'number'}
                  value={value[level].k0}
                  onChange={e => updateValue(v => {
                    v[level].k0 = Number(e.target.value);
                  })}
                  step={100}
                />
              </td>
              <td>
                <input
                  type={'number'}
                  value={value[level].k1}
                  onChange={e => updateValue(v => {
                    v[level].k1 = Number(e.target.value);
                  })}
                  step={0.01}
                />
              </td>
              <td>
                <input
                  type={'number'}
                  value={value[level].k2}
                  onChange={e => updateValue(v => {
                    v[level].k2 = Number(e.target.value);
                  })}
                  step={0.01}
                />
              </td>
              <td>
                <input
                  type={'number'}
                  value={value[level].k3}
                  onChange={e => updateValue(v => {
                    v[level].k3 = Number(e.target.value);
                  })}
                  step={0.01}
                />
              </td>
              <td className={'text-right'}>
                {levelCount[level]}
              </td>
            </tr>
          ))}
          </thead>
        </table>
        <button
          className={'border rounded bg-blue-500 px-2 py-1 mt-2 text-white'}
          onClick={() => {
            const newRows = data.originRows.map((e, i) => ({
              ...e,
              '评级': getLevel(rows[i], value) ?? '',
            }));
            const content = papa.unparse(newRows, {header: true});
            downloadString('\ufeff' + content, {filename: 'result.csv', type: 'text/csv;charset=utf-8-sig'});
          }}
        >
          导出包含评级列的新CSV
        </button>
      </CardContent>
    </Card>
  );
};