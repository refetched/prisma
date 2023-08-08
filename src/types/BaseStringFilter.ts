import { Enumerable, OneKey } from '@refetched/core';

export type BaseStringFilter = OneKey<{
  contains: string;
  endsWith: string;
  equals: string;
  gt: string;
  gte: string;
  in: Enumerable<string>;
  lt: string;
  lte: string;
  not: string;
  notIn: Enumerable<string>;
  startsWith: string;
}>;
