import { ReadOnlyDict } from "@nmann/codeowners";

export function getNthProperty(obj: ReadOnlyDict<string>, n: number) {
  const keys = Object.keys(obj);
  if (keys.length > n) {
    return obj[keys[n]];
  }
  return undefined;
}
