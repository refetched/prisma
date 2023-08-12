import {
  encodeBuffer,
  encodeObject,
  getEntriesFromObject,
  getKeysFromObject,
  getObjectFromEntries,
} from '@refetched/core';
import { Cursor } from '@refetched/core-types';
import { createCipher, encryptObject, randomIV } from '@refetched/cryptography';
import { CreateCursorInput } from '@refetched/prisma-types';

/**
 * Creates a cursor from the connection arguments and the entity.
 * @param input The input to create the cursor from.
 * @returns The cursor.
 */
export const createCursor = <T extends object>(input: CreateCursorInput<T>): Cursor => {
  const orderByKeys = input.args.orderBy.map((orderByInput) => getKeysFromObject(orderByInput)[0]);
  const dataEntries = getEntriesFromObject(input.entity).filter(([key]) => orderByKeys.includes(key));
  const data = { args: { orderBy: input.args.orderBy }, entity: getObjectFromEntries(dataEntries) };
  const iv = randomIV();
  const cipher = createCipher(input.cipherKey, iv);
  return encodeObject({ iv: encodeBuffer(iv), data: encryptObject(data, cipher) });
};
