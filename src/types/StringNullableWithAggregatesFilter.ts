import { NestedStringNullableWithAggregatesFilter } from './NestedStringNullableWithAggregatesFilter';
import { QueryMode } from './QueryMode';

export type StringNullableWithAggregatesFilter = {
  mode?: QueryMode;
} & NestedStringNullableWithAggregatesFilter;
