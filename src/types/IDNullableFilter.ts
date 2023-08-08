import { BaseIDNullableFilter } from '.';

export type IDNullableFilter = { not: IDNullableFilter } | BaseIDNullableFilter;
