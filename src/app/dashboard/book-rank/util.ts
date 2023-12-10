export function toNumber(v: string) {
  const num = v.includes('%') ? Number(v.replaceAll('%', '')) / 100 : Number(v);
  if (Number.isNaN(num)) {
    throw new Error(`${v} 不是合法的数字`);
  } else {
    return num;
  }
}