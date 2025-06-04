'use server';
import prisma from '@/lib/db';

export async function createMessageAction(
  conversationId: string,
  content: string
) {
  try {
    const result = await prisma.message.create({
      data: {
        content,
        conversationId,
        isAIanswer: false,
      },
    });
    console.log('createMessageAction result:', result);
    return result;
  } catch (error) {
    console.error('Error in createMessageAction:', error);
    throw error;
  }
}
