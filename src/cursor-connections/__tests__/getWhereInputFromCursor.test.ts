import RefetchedCoreModule, { Cursor, decodeObject, getEntriesFromObject } from '@refetched/core';
import RefetchedCryptographyModule, { createDecipher, decryptObject } from '@refetched/cryptography';
import { CipherKey, Decipher, randomBytes } from 'crypto';
import { OrderByInput, getWhereInputFromCursor } from '../..';
import SpiedFunction = jest.SpiedFunction;

describe('GIVEN the method', () => {
  let mockCursor: Cursor;
  let mockCipherKey: CipherKey;

  let mockIV: Buffer;
  let mockData: string;
  let mockDecipher: Decipher;
  let mockEntity: { id: string; name: string };
  let mockArgs: { orderBy: OrderByInput<typeof mockEntity>[] };
  let decodedCursor: { iv: Buffer; data: string };
  let decryptedData: { args: typeof mockArgs; entity: typeof mockEntity };

  let decodeObjectSpy: SpiedFunction<typeof decodeObject>;
  let createDecipherSpy: SpiedFunction<typeof createDecipher>;
  let decryptObjectSpy: SpiedFunction<typeof decryptObject>;
  let getEntriesFromObjectSpy: SpiedFunction<typeof getEntriesFromObject>;

  beforeEach(() => {
    mockCursor = 'mockCursor';
    mockCipherKey = 'mockCipherKey';
    mockIV = randomBytes(16);
    mockData = 'mockData';
    mockDecipher = {} as Decipher;
    mockArgs = { orderBy: [{ id: 'asc' }] };
    mockEntity = { id: 'mockId', name: 'mockName' };
    decodedCursor = { iv: mockIV, data: mockData };
    decryptedData = { args: mockArgs, entity: mockEntity };
    decodeObjectSpy = jest.spyOn(RefetchedCoreModule, 'decodeObject').mockReturnValue(decodedCursor);
    createDecipherSpy = jest.spyOn(RefetchedCryptographyModule, 'createDecipher').mockReturnValue(mockDecipher);
    decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
    getEntriesFromObjectSpy = jest.spyOn(RefetchedCoreModule, 'getEntriesFromObject').mockReturnValue([['id', 'asc']]);
  });

  test('THEN it should return the WhereInput', () => {
    const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

    expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
    expect(createDecipherSpy).toHaveBeenCalledTimes(1);
    expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
    expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(1);

    expect(response).toEqual({ id: { gt: 'mockId' } });
  });
});
