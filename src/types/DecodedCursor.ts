import { Encoded } from '@refetched/core';
import { Encrypted } from '@refetched/cryptography';

export type DecodedCursor = {
  iv: Encoded;
  data: Encrypted;
};
