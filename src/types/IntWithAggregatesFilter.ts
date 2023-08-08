import { OneKey } from '@refetched/core';
import { FloatFilter, IntFilter, BaseIntFilter } from '.';

export type IntWithAggregatesFilter =
  | { not: IntWithAggregatesFilter }
  | BaseIntFilter
  | OneKey<{
      _avg: FloatFilter;
      _count: IntFilter;
      _max: IntFilter;
      _min: IntFilter;
      _sum: IntFilter;
    }>;
