import { NestedStringWithAggregatesFilter } from './NestedStringWithAggregatesFilter';
import { QueryMode } from './QueryMode';

export type StringWithAggregatesFilter = {
  mode?: QueryMode;
} & NestedStringWithAggregatesFilter;
