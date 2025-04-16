'use server';
import prisma from '@/lib/db';

export async function removeDogAction(dogId: string) {
  try {
    const result = await prisma.dog.delete({
      where: {
        id: dogId,
      },
    });
    return result;
  } catch (error) {
    console.error('Error in removeDogAction:', error);
    throw error;
  }
}
