'use server';
import prisma from '@/lib/db';

export async function updateConversationAction(
  topic: string,
  summary: string,
  id: string
) {
  try {
    const result = await prisma.conversation.update({
      where: {
        id: id,
      },
      data: {
        topic,
        summary,
      },
    });
    return result;
  } catch (error) {
    console.error('updateConversationAction:', error);
    throw error;
  }
}
