import { OneKey } from '@refetched/core';
import { BaseDateTimeFilter, DateTimeFilter, IntFilter } from '.';

export type DateTimeWithAggregatesFilter =
  | { not: DateTimeWithAggregatesFilter }
  | BaseDateTimeFilter
  | OneKey<{
      _count: IntFilter;
      _max: DateTimeFilter;
      _min: DateTimeFilter;
    }>;
