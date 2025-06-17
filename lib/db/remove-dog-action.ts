'use server';

import prisma from '@/lib/db/db';

export async function removeDogAction(dogId: string) {
  try {
    const result = await prisma.dog.delete({
      where: {
        id: dogId,
      },
    });
    return result;
  } catch (error) {
    console.error('removeDogAction:', error);
    throw error;
  }
}
