import { mutate } from "swr";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const clearCache = () =>
  mutate(() => true, undefined, { revalidate: false });
