import { FC, useState } from 'react';
import { Data } from '@/app/dashboard/book-rank/types';
import { RankCard } from '@/app/dashboard/book-rank/RankCard';
import { MultiSelect } from '@mantine/core';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Histogram } from '@/components/plot/Histogram';
import { toNumber } from '@/app/dashboard/book-rank/util';

type Props = {
  data: Data
}

export const Board: FC<Props> = (
  {
    data,
  },
) => {
  const [kpis, setKpis] = useState<string[]>([]);

  return (
    <div>
      <MultiSelect
        label={'选择KPI'}
        data={data.meta.fields}
        value={kpis}
        onChange={setKpis}
      />
      <div className={'my-2'}>
        <RankCard data={data} kpis={kpis}/>
      </div>
      <div className={'grid grid-cols-3 grid-rows-2 pt-2 gap-2'}>
        {kpis.map(kpi => (
          <Card key={kpi}>
            <CardHeader>
              <CardTitle>{kpi}</CardTitle>
            </CardHeader>
            <CardContent>
              <Histogram
                values={data.data}
                selector={e => toNumber(e[kpi])}
                xLabel={kpi}
                yLabel={'数量'}
                binSize={100}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};