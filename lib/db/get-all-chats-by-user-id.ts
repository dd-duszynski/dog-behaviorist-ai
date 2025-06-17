'use server';

import { TChat } from '../models/chat-model';
import prisma from './db';
import { getUserByClerkID } from './get-user-by-clerk-id';

export const getAllChatsByUserId = async (): Promise<TChat[]> => {
  try {
    const user = await getUserByClerkID();
    const chats = await prisma.chat.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return chats;
  } catch (error) {
    console.error('getAllChatsByUserId:', error);
    throw error;
  }
};
