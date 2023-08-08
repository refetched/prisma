import { Nullable, OneKey } from '@refetched/core';

export type BooleanNullableFilter = OneKey<{
  equals: Nullable<boolean>;
  not: Nullable<boolean>;
}>;
