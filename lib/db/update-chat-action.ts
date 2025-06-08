'use server';
import prisma from '@/lib/db/db';

export async function updateChatAction(
  topic: string,
  summary: string,
  id: string
) {
  try {
    const result = await prisma.chat.update({
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
    console.error('updateChatAction:', error);
    throw error;
  }
}
