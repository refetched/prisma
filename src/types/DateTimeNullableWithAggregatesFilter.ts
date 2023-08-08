import { OneKey } from '@refetched/core';
import { BaseDateTimeNullableFilter, DateTimeNullableFilter, IntNullableFilter } from '.';

export type DateTimeNullableWithAggregatesFilter =
  | { not: DateTimeNullableWithAggregatesFilter }
  | BaseDateTimeNullableFilter
  | OneKey<{
      _count: IntNullableFilter;
      _max: DateTimeNullableFilter;
      _min: DateTimeNullableFilter;
    }>;
