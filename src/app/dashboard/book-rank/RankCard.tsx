import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC, useState } from 'react';
import { Config, defaultLevelConfig, Level, LevelConfig, Levels, Row } from '@/app/dashboard/book-rank/types';
import { Input } from '@/components/ui/input';
import { useImmer } from 'use-immer';

type Props = {
  data: Row[]
}

export const RankCard: FC<Props> = (
  {
    data,
  },
) => {
  const [value, updateValue] = useImmer<LevelConfig>(() => defaultLevelConfig());
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
                {data.filter(e =>
                  e.k0 >= value[level].k0 &&
                  e.k1 >= value[level].k1 &&
                  e.k2 >= value[level].k2 &&
                  e.k3 >= value[level].k3,
                ).length}
              </td>
            </tr>
          ))}
          </thead>
        </table>
      </CardContent>
    </Card>
  );
};