export type Entity = { AND?: never } & { OR?: never } & { NOT?: never } & { [key: string | number | symbol]: unknown };
