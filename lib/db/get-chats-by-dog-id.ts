import { TChat } from '../models/chat-model';
import prisma from './db';
import { getUserByClerkID } from './get-user-by-clerk-id';

export const getChatsByDogId = async (id: string): Promise<TChat[]> => {
  try {
    const user = await getUserByClerkID();
    const chats = await prisma.chat.findMany({
      where: {
        dogId: id,
        userId: user?.id,
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    return chats;
  } catch (error) {
    console.error('getChatsByDogId:', error);
    throw error;
  }
};
