import { BaseStringFilter } from './BaseStringFilter';

export type NestedStringFilter = { not: NestedStringFilter } | BaseStringFilter;
