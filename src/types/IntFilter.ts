import { BaseIntFilter } from '.';

export type IntFilter = { not: IntFilter } | BaseIntFilter;
