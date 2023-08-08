import { OneKey, Nullable, Enumerable } from '@refetched/core';

export type BaseDateTimeNullableFilter = OneKey<{
  equals: Nullable<Date | string>;
  gt: Date | string;
  gte: Date | string;
  in: Nullable<Enumerable<Date> | Enumerable<string>>;
  lt: Date | string;
  lte: Date | string;
  not: Nullable<Date | string>;
  notIn: Nullable<Enumerable<Date> | Enumerable<string>>;
}>;
