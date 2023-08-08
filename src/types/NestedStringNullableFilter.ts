import { BaseStringNullableFilter } from './BaseStringNullableFilter';

export type NestedStringNullableFilter = { not: NestedStringNullableFilter } | BaseStringNullableFilter;
