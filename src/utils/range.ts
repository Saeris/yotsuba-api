type Range = (size: number, startAt?: number, skip?: number) => number[];

export const range: Range = (size, startAt = 0, skip = 1) =>
  [...Array(size).keys()].map(i => i * skip + startAt);
