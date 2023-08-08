import { CipherKey } from 'crypto';
import { OrderByInput } from './OrderByInput';

export type CreateCursorInput<T extends object> = {
  args: { orderBy: OrderByInput<T>[] };
  data: T;
  cipherKey: CipherKey;
};
