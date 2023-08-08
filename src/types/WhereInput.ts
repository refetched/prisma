import { Enumerable, Keys } from '@refetched/core';

export type WhereInput<T extends object> =
  | {
      [K in Keys<T>]?: unknown;
    }
  | {
      AND?: Enumerable<WhereInput<T>>;
    }
  | {
      OR?: Enumerable<WhereInput<T>>;
    }
  | {
      NOT?: Enumerable<WhereInput<T>>;
    };
