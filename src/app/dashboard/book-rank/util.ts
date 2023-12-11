import { Config, Level, LevelConfig, OriginRow } from '@/app/dashboard/book-rank/types';

export function toNumber(v: string) {
  const num = v.includes('%') ? Number(v.replaceAll('%', '')) / 100 : Number(v);
  if (Number.isNaN(num)) {
    return 0;
  } else {
    return num;
  }
}

export function matchConfig(row: OriginRow, config: Config): boolean {
  return Object.entries(config).every(([k, v]) => toNumber(row[k]) >= v);
}

export function getLevel(row: OriginRow, config: LevelConfig): Level | null {
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