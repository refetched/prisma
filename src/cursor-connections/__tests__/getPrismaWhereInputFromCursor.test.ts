import RefetchedCore, {
  decodeBuffer,
  decodeObject,
  encodeBuffer,
  encodeObject,
  getEntriesFromObject,
} from '@refetched/core';
import { Cursor, Maybe } from '@refetched/core-types';
import RefetchedCryptography, {
  createCipher,
  createDecipher,
  decryptObject,
  encryptObject,
  randomCipherKey,
  randomIV,
} from '@refetched/cryptography';
import { OrderByInput } from '@refetched/prisma-types';
import { Cipher, CipherKey } from 'crypto';
import { getPrismaWhereInputFromCursor } from '..';

type Example = { id?: Maybe<string>; name?: Maybe<string>; age?: Maybe<number> };

describe('GIVEN the function', () => {
  let mockArgs: { orderBy: OrderByInput<Example>[] };
  let mockCipher: Cipher;
  let mockCipherKey: CipherKey;
  let mockCursor: Cursor;
  let mockData: string;
  let mockEntity: Example;
  let mockIV: Buffer;
  let mockOrderBy: OrderByInput<Example>[];

  let createDecipherSpy: jest.SpiedFunction<typeof createDecipher>;
  let decodeBufferSpy: jest.SpiedFunction<typeof decodeBuffer>;
  let decodeObjectSpy: jest.SpiedFunction<typeof decodeObject>;
  let decryptObjectSpy: jest.SpiedFunction<typeof decryptObject>;
  let getEntriesFromObjectSpy: jest.SpiedFunction<typeof getEntriesFromObject>;

  beforeEach(() => {
    mockCipherKey = randomCipherKey();
    mockIV = randomIV();
    decodeObjectSpy = jest.spyOn(RefetchedCore, 'decodeObject');
    decodeBufferSpy = jest.spyOn(RefetchedCore, 'decodeBuffer');
    createDecipherSpy = jest.spyOn(RefetchedCryptography, 'createDecipher');
    getEntriesFromObjectSpy = jest.spyOn(RefetchedCore, 'getEntriesFromObject');
    decryptObjectSpy = jest.spyOn(RefetchedCryptography, 'decryptObject');
  });

  describe('WHEN there is < 1 order by arguments', () => {
    beforeEach(() => {
      mockOrderBy = [];
      mockArgs = { orderBy: mockOrderBy };
      mockEntity = {};
      mockCipher = createCipher(mockCipherKey, mockIV);
      mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
      mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
    });

    test('THEN it should return null', () => {
      const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

      expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
      expect(decodeBufferSpy).toHaveBeenCalledTimes(1);
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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(decodeBufferSpy).toHaveBeenCalledTimes(1);
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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(decodeBufferSpy).toHaveBeenCalledTimes(1);
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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(decodeBufferSpy).toHaveBeenCalledTimes(1);
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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

          expect(decodeObjectSpy).toHaveBeenCalledTimes(1);
          expect(decodeBufferSpy).toHaveBeenCalledTimes(1);
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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

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
          mockCipher = createCipher(mockCipherKey, mockIV);
          mockData = encryptObject({ args: mockArgs, entity: mockEntity }, mockCipher);
          mockCursor = encodeObject({ iv: encodeBuffer(mockIV), data: mockData });
        });

        test('THEN it should return the where input', () => {
          const response = getPrismaWhereInputFromCursor(mockCursor, mockCipherKey);

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
