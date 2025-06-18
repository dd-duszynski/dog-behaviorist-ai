'use server';

import prisma from '@/lib/db/db';
import { revalidatePath } from 'next/cache';

export async function removeChatAction(chatId: string, dogId: string) {
  try {
    const result = await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });
    revalidatePath('/');
    revalidatePath('/dogs/' + dogId);
    return result;
  } catch (error) {
    console.error('removeChatAction:', error);
    throw error;
  }
}
