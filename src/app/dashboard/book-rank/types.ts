export const requiredColumn = ['书id', '阅读人数', '深度阅读率', '转订率', '完读率'] as const;
export type RequiredColumn = typeof requiredColumn[number]

export type OriginRow = Record<RequiredColumn, string> & Record<string, string>
export type Row = {
  id: number
  k0: number
  k1: number
  k2: number
  k3: number
}

export type Data = {
  originRows: OriginRow[]
  rows: Row[]
}

export const Levels = ['S', 'A', 'B', 'C'] as const;
export type Level = typeof Levels[number]
export type Config = {
  k0: number
  k1: number
  k2: number
  k3: number
}

export type LevelConfig = Record<Level, Config>

export function defaultLevelConfig(): LevelConfig {
  return {
    S: {k0: 200, k1: .55, k2: .15, k3: .10},
    A: {k0: 200, k1: .50, k2: .13, k3: .09},
    B: {k0: 200, k1: .45, k2: .11, k3: .08},
    C: {k0: 200, k1: .40, k2: .09, k3: .07},
  };
}