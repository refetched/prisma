import { OneKey } from '@refetched/core';

export type BooleanFilter = OneKey<{
  equals: boolean;
  not: boolean;
}>;
