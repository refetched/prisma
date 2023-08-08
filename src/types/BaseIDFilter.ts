import { OneKey, Enumerable } from '@refetched/core';

export type BaseIDFilter = OneKey<{
  equals: string;
  in: Enumerable<string>;
  not: string;
  notIn: Enumerable<string>;
}>;
