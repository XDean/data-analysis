import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC, useEffect, useMemo } from 'react';
import { Data, defaultLevelConfig, Level, LevelConfig, Levels } from '@/app/dashboard/book-rank/types';
import { useImmer } from 'use-immer';
import { downloadString } from '@/lib/util/download-string';
import { getLevel } from '@/app/dashboard/book-rank/util';
import * as papa from 'papaparse';

type Props = {
  data: Data
  kpis: string[]
}

export const RankCard: FC<Props> = (
  {
    data,
    kpis,
  },
) => {
  const [value, updateValue] = useImmer<LevelConfig>(() => defaultLevelConfig());
  const levelCount = useMemo(() => {
    const count: Record<Level | '', number> = {S: 0, A: 0, B: 0, C: 0, '': 0};
    data.data.forEach(row => {
      const level = getLevel(row, value);
      count[level ?? ''] += 1;
    });
    return count;
  }, [value, data]);

  useEffect(() => {
    updateValue(v => {
      Object.values(v).forEach(e => {
        Object.keys(e).forEach(k => {
          if (!kpis.includes(k)) {
            delete e[k];
          }
        });
        kpis.forEach(kpi => {
          e[kpi] = e[kpi] ?? 0;
        });
      });
    });
  }, [kpis, updateValue]);
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
            {kpis.map(e => (
              <th key={e}>
                {e}
              </th>
            ))}
            <th className={'w-24'}>数量</th>
          </tr>
          </thead>
          <thead>
          {Levels.map(level => (
            <tr key={level}>
              <td>
                {level}
              </td>
              {kpis.map(kpi => (
                <td key={kpi}>
                  <input
                    type={'number'}
                    value={value[level][kpi]}
                    onChange={e => updateValue(v => {
                      v[level][kpi] = Number(e.target.value);
                    })}
                    step={0.01}
                  />
                </td>
              ))}
              <td className={'text-right'}>
                {levelCount[level]}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={kpis.length + 1}/>
            <td className={'text-right'}>
              {levelCount['']}
            </td>
          </tr>
          </thead>
        </table>
        <button
          className={'border rounded bg-blue-500 px-2 py-1 mt-2 text-white'}
          onClick={() => {
            const newRows = data.data.map((e, i) => ({
              ...e,
              '评级': getLevel(e, value) ?? '',
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