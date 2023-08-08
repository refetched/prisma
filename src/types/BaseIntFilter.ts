import { Enumerable, OneKey } from '@refetched/core';

export type BaseIntFilter = OneKey<{
  equals: number;
  gt: number;
  gte: number;
  in: Enumerable<number>;
  lt: number;
  lte: number;
  not: number;
  notIn: Enumerable<number>;
}>;
