import { Nullable, Enumerable, OneKey } from '@refetched/core';

export type BaseStringNullableFilter = OneKey<{
  contains: string;
  endsWith: string;
  equals: Nullable<string>;
  gt: string;
  gte: string;
  in: Nullable<Enumerable<string>>;
  lt: string;
  lte: string;
  not: Nullable<string>;
  notIn: Nullable<Enumerable<string>>;
  startsWith: string;
}>;
