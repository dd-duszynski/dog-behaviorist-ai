import { Chat, Message } from '@prisma/client';

export type TChat = Chat & { messages: Message[] };
