import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { Histogram } from '@/components/plot/Histogram';
import { Data, Row } from '@/app/dashboard/book-rank/types';
import { RankCard } from '@/app/dashboard/book-rank/RankCard';

type Props = {
  data: Data
}

export const Board: FC<Props> = (
  {
    data,
  },
) => {
  const {rows} = data;
  return (
    <div className={'grid grid-cols-3 grid-rows-2 pt-2 gap-2'}>
      <Card>
        <CardHeader>
          <CardTitle>阅读量</CardTitle>
        </CardHeader>
        <CardContent>
          <Histogram
            values={rows}
            selector={e => e.k0}
            xLabel={'阅读量'}
            yLabel={'数量'}
            binSize={100}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>深度阅读率</CardTitle>
        </CardHeader>
        <CardContent>
          <Histogram
            values={rows}
            selector={e => e.k1}
            xLabel={'深度阅读率'}
            yLabel={'数量'}
            binSize={100}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>转订率</CardTitle>
        </CardHeader>
        <CardContent>
          <Histogram
            values={rows}
            selector={e => e.k2}
            xLabel={'转订率'}
            yLabel={'数量'}
            binSize={100}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>完读率</CardTitle>
        </CardHeader>
        <CardContent>
          <Histogram
            values={rows}
            selector={e => e.k3}
            xLabel={'完读率'}
            yLabel={'数量'}
            binSize={100}
          />
        </CardContent>
      </Card>
      <div className={'col-span-2'}>
        <RankCard data={data}/>
      </div>
    </div>
  );
};