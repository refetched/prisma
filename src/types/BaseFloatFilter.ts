import { OneKey, Enumerable } from '@refetched/core';

export type BaseFloatFilter = OneKey<{
  equals: number;
  gt: number;
  gte: number;
  in: Enumerable<number>;
  lt: number;
  lte: number;
  not: number;
  notIn: Enumerable<number>;
}>;
