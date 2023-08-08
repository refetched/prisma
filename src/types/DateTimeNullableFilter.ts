import { BaseDateTimeNullableFilter } from '.';

export type DateTimeNullableFilter = { not: DateTimeNullableFilter } | BaseDateTimeNullableFilter;
