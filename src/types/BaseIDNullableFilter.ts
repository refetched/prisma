import { OneKey, Nullable, Enumerable } from '@refetched/core';

export type BaseIDNullableFilter = OneKey<{
  equals: Nullable<string>;
  in: Nullable<Enumerable<string>>;
  not: Nullable<string>;
  notIn: Nullable<Enumerable<string>>;
}>;
