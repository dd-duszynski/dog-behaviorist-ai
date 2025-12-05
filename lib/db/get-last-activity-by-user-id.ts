'use server';

import { TChat } from '../models/chat-model';
import prisma from './db';
import { getUserByClerkID } from './get-user-by-clerk-id';

export const getLastActivityByUserId = async (
  take: number
): Promise<TChat[]> => {
  try {
    const user = await getUserByClerkID();
    const chats = await prisma.chat.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: { createdAt: 'desc' },
      take: take,
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    return chats;
  } catch (error) {
    console.error('getLastActivityByUserId:', error);
    throw error;
  }
};
