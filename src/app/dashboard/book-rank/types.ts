import { ParseResult } from 'papaparse';

export type OriginRow = Record<string, string>

export type Data = ParseResult<OriginRow>

export const Levels = ['S', 'A', 'B', 'C'] as const;
export type Level = typeof Levels[number]
export type Config = Record<string, number>

export type LevelConfig = Record<Level, Config>

export function defaultLevelConfig(): LevelConfig {
  return {
    S: {},
    A: {},
    B: {},
    C: {},
  };
}