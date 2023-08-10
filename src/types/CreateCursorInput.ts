import { CipherKey } from 'crypto';
import { OrderByInput } from './OrderByInput';

export type CreateCursorInput<T extends object> = {
  args: { orderBy: OrderByInput<T>[] };
  entity: T;
  cipherKey: CipherKey;
};
