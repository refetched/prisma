import { decodeBuffer, decodeObject, getEntriesFromObject } from '@refetched/core';
import { Cursor, Maybe } from '@refetched/core-types';
import { createDecipher, decryptObject } from '@refetched/cryptography';
import { DecodedCursor, DecryptedCursorData, WhereInput } from '@refetched/prisma-types';
import { CipherKey } from 'crypto';

/**
 * Returns the Prisma where input from the cursor.
 * @param cursor The cursor to get the where input from.
 * @param cipherKey The cipher key to decrypt the cursor with.
 * @returns The Prisma where input.
 */
export const getPrismaWhereInputFromCursor = <T extends object>(
  cursor: Cursor,
  cipherKey: CipherKey,
): Maybe<WhereInput<T>> => {
  const { iv, data } = decodeObject<DecodedCursor>(cursor);
  const decipher = createDecipher(cipherKey, decodeBuffer(iv));
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
