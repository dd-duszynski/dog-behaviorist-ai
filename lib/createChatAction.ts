'use server';
import prisma from '@/lib/db';

export async function createChatAction(userId: string, dogId: string) {
  try {
    const result = await prisma.conversation.create({
      data: {
        userId,
        dogId,
      },
    });
    return result;
  } catch (error) {
    console.error('Error in createChatAction:', error);
    throw error;
  }
}
