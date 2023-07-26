import { Cursor, Maybe, decodeObject, getEntriesFromObject } from '@refetched/core';
import { createDecipher, decryptObject } from '@refetched/cryptography';
import { CipherKey } from 'crypto';
import { DecodedCursor, DecryptedCursorData, WhereInput } from '..';

export const getWhereInputFromCursor = <T extends object>(
  cursor: Cursor,
  cipherKey: CipherKey,
): Maybe<WhereInput<T>> => {
  const { iv, data } = decodeObject<DecodedCursor>(cursor);
  const decipher = createDecipher(cipherKey, iv);
  const { args, entity } = decryptObject(data, decipher) as DecryptedCursorData<T>;

  return args.orderBy.reduceRight<Maybe<WhereInput<T>>>((acc, input) => {
    const [key, direction] = getEntriesFromObject(input)[0];
    const isAsc = direction === 'asc';
    const value = entity[key];
    const isNull = value === null;
    const whereInput = isNull ? { [key]: { not: null } } : { [key]: isAsc ? { gt: value } : { lt: value } };
    return acc ? { OR: [whereInput, { AND: [{ [key]: { equals: value } }, acc] }] } : whereInput;
  }, null);
};
