'use server';

import prisma from '@/lib/db/db';
import { revalidatePath } from 'next/cache';

export async function createChatAction(userId: string, dogId: string) {
  try {
    const result = await prisma.chat.create({
      data: {
        userId,
        dogId,
      },
    });
    revalidatePath('/');
    return result;
  } catch (error) {
    console.error('createChatAction:', error);
    throw error;
  }
}
