import RefetchedCoreModule, { Cursor, Entry, decodeObject, getEntriesFromObject } from '@refetched/core';
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
  let mockEntity: { id?: string | null; name?: string | null; age?: number | null };
  let mockOrderBy: OrderByInput<typeof mockEntity>[];
  let mockArgs: { orderBy: typeof mockOrderBy };
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
    decodedCursor = { iv: mockIV, data: mockData };
    decodeObjectSpy = jest.spyOn(RefetchedCoreModule, 'decodeObject').mockReturnValue(decodedCursor);
    createDecipherSpy = jest.spyOn(RefetchedCryptographyModule, 'createDecipher').mockReturnValue(mockDecipher);
    getEntriesFromObjectSpy = jest.spyOn(RefetchedCoreModule, 'getEntriesFromObject');
  });

  describe('WHEN there is < 1 order by arguments', () => {
    beforeEach(() => {
      mockOrderBy = [];
      mockArgs = { orderBy: mockOrderBy };
      mockEntity = {};
      decryptedData = { args: mockArgs, entity: mockEntity };
      decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
    });

    test('THEN it should return null', () => {
      const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

      expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
      expect(createDecipherSpy).toHaveBeenCalledTimes(1);
      expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
      expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(0);

      expect(response).toEqual(null);
    });
  });

  describe('WHEN there is = 1 order by arguments', () => {
    describe('WHEN the order by argument value = asc', () => {
      beforeEach(() => {
        mockOrderBy = [{ id: 'asc' }];
        mockArgs = { orderBy: mockOrderBy };
      });

      describe('WHEN the entity value = null', () => {
        beforeEach(() => {
          mockEntity = { id: null };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(1);

          expect(response).toEqual({
            id: { not: null },
          });
        });
      });

      describe('WHEN the entity value != null', () => {
        beforeEach(() => {
          mockEntity = { id: 'mockId' };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(1);

          expect(response).toEqual({
            id: { gt: 'mockId' },
          });
        });
      });
    });

    describe('WHEN the order by argument value = desc', () => {
      beforeEach(() => {
        mockOrderBy = [{ id: 'desc' }];
        mockArgs = { orderBy: mockOrderBy };
      });

      describe('WHEN the entity value = null', () => {
        beforeEach(() => {
          mockEntity = { id: null };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(1);

          expect(response).toEqual({
            id: { not: null },
          });
        });
      });

      describe('WHEN the entity value != null', () => {
        beforeEach(() => {
          mockEntity = { id: 'mockId' };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(1);

          expect(response).toEqual({
            id: { lt: 'mockId' },
          });
        });
      });
    });
  });

  describe('WHEN there is > 1 order by arguments', () => {
    describe('WHEN the order by argument values = asc', () => {
      beforeEach(() => {
        mockOrderBy = [{ age: 'asc' }, { name: 'asc' }, { id: 'asc' }];
        mockArgs = { orderBy: mockOrderBy };
      });

      describe('WHEN the entity values = null', () => {
        beforeEach(() => {
          mockEntity = { id: null, name: null, age: null };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(3);

          expect(response).toEqual({
            OR: [
              { age: { not: null } },
              {
                AND: [
                  { age: { equals: null } },
                  {
                    OR: [{ name: { not: null } }, { AND: [{ name: { equals: null } }, { id: { not: null } }] }],
                  },
                ],
              },
            ],
          });
        });
      });

      describe('WHEN the entity values != null', () => {
        beforeEach(() => {
          mockEntity = { id: 'mockId', name: 'mockName', age: 25 };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(3);

          expect(response).toEqual({
            OR: [
              { age: { gt: 25 } },
              {
                AND: [
                  { age: { equals: 25 } },
                  {
                    OR: [
                      { name: { gt: 'mockName' } },
                      { AND: [{ name: { equals: 'mockName' } }, { id: { gt: 'mockId' } }] },
                    ],
                  },
                ],
              },
            ],
          });
        });
      });
    });

    describe('WHEN the order by argument values = desc', () => {
      beforeEach(() => {
        mockOrderBy = [{ age: 'desc' }, { name: 'desc' }, { id: 'desc' }];
        mockArgs = { orderBy: mockOrderBy };
      });

      describe('WHEN the entity values = null', () => {
        beforeEach(() => {
          mockEntity = { id: null, name: null, age: null };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(3);

          expect(response).toEqual({
            OR: [
              { age: { not: null } },
              {
                AND: [
                  { age: { equals: null } },
                  {
                    OR: [{ name: { not: null } }, { AND: [{ name: { equals: null } }, { id: { not: null } }] }],
                  },
                ],
              },
            ],
          });
        });
      });

      describe('WHEN the entity values != null', () => {
        beforeEach(() => {
          mockEntity = { id: 'mockId', name: 'mockName', age: 25 };
          decryptedData = { args: mockArgs, entity: mockEntity };
          decryptObjectSpy = jest.spyOn(RefetchedCryptographyModule, 'decryptObject').mockReturnValue(decryptedData);
        });

        test('THEN it should return the where input', () => {
          const response = getWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(createDecipherSpy).toHaveBeenCalledTimes(1);
          expect(decryptObjectSpy).toHaveBeenCalledTimes(1);
          expect(getEntriesFromObjectSpy).toHaveBeenCalledTimes(3);

          expect(response).toEqual({
            OR: [
              { age: { lt: 25 } },
              {
                AND: [
                  { age: { equals: 25 } },
                  {
                    OR: [
                      { name: { lt: 'mockName' } },
                      { AND: [{ name: { equals: 'mockName' } }, { id: { lt: 'mockId' } }] },
                    ],
                  },
                ],
              },
            ],
          });
        });
      });
    });
  });
});
