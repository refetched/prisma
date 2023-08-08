import { OneKey } from '@refetched/core';
import { BaseStringNullableFilter, IntNullableFilter, NestedStringNullableFilter } from '.';

export type NestedStringNullableWithAggregatesFilter =
  | { not: NestedStringNullableWithAggregatesFilter }
  | BaseStringNullableFilter
  | OneKey<{
      _count: IntNullableFilter;
      _max: NestedStringNullableFilter;
      _min: NestedStringNullableFilter;
    }>;
