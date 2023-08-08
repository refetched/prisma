import { BaseFloatFilter } from '.';

export type FloatFilter = { not: FloatFilter } | BaseFloatFilter;
