import { OneKey } from '@refetched/core';
import { FloatNullableFilter, IntNullableFilter } from '.';
import { BaseIntNullableFilter } from './BaseIntNullableFilter';

export type IntNullableWithAggregatesFilter =
  | { not: IntNullableWithAggregatesFilter }
  | BaseIntNullableFilter
  | OneKey<{
      _avg: FloatNullableFilter;
      _count: IntNullableFilter;
      _max: IntNullableFilter;
      _min: IntNullableFilter;
      _sum: IntNullableFilter;
    }>;
