import { OneKey, Nullable, Enumerable } from '@refetched/core';

export type BaseIntNullableFilter = OneKey<{
  equals: Nullable<number>;
  gt: number;
  gte: number;
  in: Nullable<Enumerable<number>>;
  lt: number;
  lte: number;
  not: Nullable<number>;
  notIn: Nullable<Enumerable<number>>;
}>;
