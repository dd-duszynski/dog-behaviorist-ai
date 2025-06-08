import { User, Chat, Dog } from '@prisma/client';

export type TUser = User & { chats: Chat[]; dogs: Dog[] };
export type TUserBasic = User;
