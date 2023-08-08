import { OneKey } from '@refetched/core';
import { BaseStringFilter } from './BaseStringFilter';
import { IntFilter } from './IntFilter';
import { NestedStringFilter } from './NestedStringFilter';

export type NestedStringWithAggregatesFilter =
  | { not: NestedStringWithAggregatesFilter }
  | BaseStringFilter
  | OneKey<{
      _count: IntFilter;
      _max: NestedStringFilter;
      _min: NestedStringFilter;
    }>;
