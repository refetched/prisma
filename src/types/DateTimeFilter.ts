import { BaseDateTimeFilter } from './BaseDateTimeFilter';

export type DateTimeFilter = { not: DateTimeFilter } | BaseDateTimeFilter;
