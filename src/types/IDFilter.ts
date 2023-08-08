import { BaseIDFilter } from '.';

export type IDFilter = { not: IDFilter } | BaseIDFilter;
