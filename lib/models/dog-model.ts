import { Chat, Dog } from '@prisma/client';

export type TDog = Dog & { chats: Chat[] };
