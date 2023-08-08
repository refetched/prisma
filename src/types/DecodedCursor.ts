import { Encrypted } from '@refetched/cryptography';

export type DecodedCursor = {
  iv: Buffer;
  data: Encrypted;
};
