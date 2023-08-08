import { BaseIntNullableFilter } from '.';

export type IntNullableFilter = { not: IntNullableFilter } | BaseIntNullableFilter;
