export function getNthProperty(
  obj: Record<string, string | undefined>,
  n: number,
) {
  const keys = Object.keys(obj);
  if (keys.length > n) {
    return obj[keys[n]];
  }
  return undefined;
}
