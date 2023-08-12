import RefetchedCore, {
  encodeBuffer,
  encodeObject,
  getEntriesFromObject,
  getKeysFromObject,
  getObjectFromEntries,
} from '@refetched/core';
import { Maybe } from '@refetched/core-types';
import RefetchedCryptography, { createCipher, encryptObject, randomCipherKey, randomIV } from '@refetched/cryptography';
import { CreateCursorInput, OrderByInput } from '@refetched/prisma-types';
import { CipherKey } from 'crypto';
import { createCursor } from '..';

type Example = { id: Maybe<string>; name: Maybe<string>; age: Maybe<number> };

describe('GIVEN the function', () => {
  let mockArgs: { orderBy: OrderByInput<Example>[] };
  let mockCipherKey: CipherKey;
  let mockEntity: Example;
  let mockInput: CreateCursorInput<Example>;
  let mockOrderBy: OrderByInput<Example>[];

  let createCipherSpy: jest.SpiedFunction<typeof createCipher>;
  let encodeBufferSpy: jest.SpiedFunction<typeof encodeBuffer>;
  let encodeObjectSpy: jest.SpiedFunction<typeof encodeObject>;
  let encryptObjectSpy: jest.SpiedFunction<typeof encryptObject>;
  let getEntriesFromObjectSpy: jest.SpiedFunction<typeof getEntriesFromObject>;
  let getKeysFromObjectSpy: jest.SpiedFunction<typeof getKeysFromObject>;
  let getObjectFromEntriesSpy: jest.SpiedFunction<typeof getObjectFromEntries>;
  let randomIVSpy: jest.SpiedFunction<typeof randomIV>;

  beforeEach(() => {
    mockOrderBy = [{ id: 'asc' }, { name: 'desc' }, { age: 'asc' }];
    mockArgs = { orderBy: mockOrderBy };
    mockEntity = { id: 'mockId', name: 'mockName', age: 25 };
    mockCipherKey = randomCipherKey();
    mockInput = { args: mockArgs, entity: mockEntity, cipherKey: mockCipherKey };
    getKeysFromObjectSpy = jest.spyOn(RefetchedCore, 'getKeysFromObject');
    getEntriesFromObjectSpy = jest.spyOn(RefetchedCore, 'getEntriesFromObject');
    getObjectFromEntriesSpy = jest.spyOn(RefetchedCore, 'getObjectFromEntries');
    randomIVSpy = jest.spyOn(RefetchedCryptography, 'randomIV');
    createCipherSpy = jest.spyOn(RefetchedCryptography, 'createCipher');
    encodeBufferSpy = jest.spyOn(RefetchedCore, 'encodeBuffer');
    encryptObjectSpy = jest.spyOn(RefetchedCryptography, 'encryptObject');
    encodeObjectSpy = jest.spyOn(RefetchedCore, 'encodeObject');
  });

  test('THEN it should return the cursor', () => {
    const response = createCursor(mockInput);

    expect(getKeysFromObjectSpy).toHaveBeenCalledTimes(3);
    expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(1);
    expect(getObjectFromEntriesSpy).toHaveBeenCalledTimes(1);
    expect(randomIVSpy).toHaveBeenCalledTimes(1);
    expect(createCipherSpy).toHaveBeenCalledTimes(1);
    expect(encodeBufferSpy).toHaveBeenCalledTimes(1);
    expect(encryptObjectSpy).toHaveBeenCalledTimes(1);
    expect(encodeObjectSpy).toHaveBeenCalledTimes(1);

    expect(response).toEqual(expect.any(String));
  });
});
