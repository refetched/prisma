import { NestedStringFilter } from './NestedStringFilter';
import { QueryMode } from './QueryMode';

export type StringFilter = {
  mode?: QueryMode;
} & NestedStringFilter;
