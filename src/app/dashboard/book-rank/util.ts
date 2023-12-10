import { Config, Level, LevelConfig, Row } from '@/app/dashboard/book-rank/types';

export function toNumber(v: string) {
  const num = v.includes('%') ? Number(v.replaceAll('%', '')) / 100 : Number(v);
  if (Number.isNaN(num)) {
    throw new Error(`${v} 不是合法的数字`);
  } else {
    return num;
  }
}

export function matchConfig(row: Row, config: Config): boolean {
  return row.k0 >= config.k0 &&
    row.k1 >= config.k1 &&
    row.k2 >= config.k2 &&
    row.k3 >= config.k3;
}

export function getLevel(row: Row, config: LevelConfig): Level | null {
  if (matchConfig(row, config.S)) {
    return 'S';
  } else if (matchConfig(row, config.A)) {
    return 'A';
  } else if (matchConfig(row, config.B)) {
    return 'B';
  } else if (matchConfig(row, config.C)) {
    return 'C';
  } else {
    return null;
  }
}