import {
  encodeBuffer,
  encodeObject,
  getEntriesFromObject,
  getKeysFromObject,
  getObjectFromEntries,
} from '@refetched/core';
import { createCipher, encryptObject, randomIV } from '@refetched/cryptography';
import { CreateCursorInput } from '../types/CreateCursorInput';

export const createCursor = <T extends object>(input: CreateCursorInput<T>): string => {
  const orderByKeys = input.args.orderBy.map((orderByInput) => getKeysFromObject(orderByInput)[0]);
  const dataEntries = getEntriesFromObject(input.data).filter(([key]) => orderByKeys.includes(key));
  const data = { args: { orderBy: input.args.orderBy }, entity: getObjectFromEntries(dataEntries) };
  const iv = randomIV();
  const cipher = createCipher(input.cipherKey, iv);
  return encodeObject({ iv: encodeBuffer(iv), data: encryptObject(data, cipher) });
};
