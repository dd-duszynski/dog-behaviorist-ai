'use server';

import { TChat } from '../models/chat-model';
import prisma from './db';
import { getUserByClerkID } from './get-user-by-clerk-id';

export const getChatByID = async (id: string): Promise<TChat> => {
  try {
    const user = await getUserByClerkID();
    const chat = await prisma.chat.findUnique({
      where: {
        id: id,
        userId: user?.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!chat) {
      throw new Error(`Chat with ID ${id} not found for user ${user?.id}`);
    }
    return chat;
  } catch (error) {
    console.error('getChatByID:', error);
    throw error;
  }
};
