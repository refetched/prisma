import { OneKey } from '@refetched/core';
import { BaseFloatFilter, FloatFilter } from '.';

export type FloatWithAggregatesFilter =
  | { not: FloatWithAggregatesFilter }
  | BaseFloatFilter
  | OneKey<{
      _avg: FloatFilter;
      _count: FloatFilter;
      _max: FloatFilter;
      _min: FloatFilter;
      _sum: FloatFilter;
    }>;
