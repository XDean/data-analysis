import { FC } from 'react';

export type Row = {
  id: number
  k0: number
  k1: number
  k2: number
  k3: number
}

type Props = {
  data: Row[]
}

export const Board: FC<Props> = () => {
  return (
    <div>
      123
    </div>
  );
};