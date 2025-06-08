import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import prisma from '@/lib/db/db';
import { TDog } from '../models/dog-model';

export const getDogsByUserId = async (): Promise<TDog[]> => {
  try {
    const user = await getUserByClerkID();
    const dogs = await prisma.dog.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        chats: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!dogs || dogs.length === 0) {
      throw new Error(`No dogs found for user ${user?.id}`);
    }
    return dogs;
  } catch (error) {
    console.error('getDogsByUserId:', error);
    throw error;
  }
};
