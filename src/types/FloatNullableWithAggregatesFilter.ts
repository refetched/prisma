import { OneKey } from '@refetched/core';
import { BaseFloatNullableFilter, FloatNullableFilter } from '.';

export type FloatNullableWithAggregatesFilter =
  | { not: FloatNullableWithAggregatesFilter }
  | BaseFloatNullableFilter
  | OneKey<{
      _avg: FloatNullableFilter;
      _count: FloatNullableFilter;
      _max: FloatNullableFilter;
      _min: FloatNullableFilter;
      _sum: FloatNullableFilter;
    }>;
