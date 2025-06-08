'use server';
import prisma from '@/lib/db/db';

export async function createMessageAction(
  chatId: string,
  content: string,
  isAi: boolean = false
) {
  try {
    const result = await prisma.message.create({
      data: {
        content,
        chatId,
        isAi,
      },
    });
    return result;
  } catch (error) {
    console.error('createMessageAction:', error);
    throw error;
  }
}
