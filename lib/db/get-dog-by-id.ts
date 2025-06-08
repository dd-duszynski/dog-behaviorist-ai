import prisma from '@/lib/db/db';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { TDog } from '../models/dog-model';

export const getDogById = async (id: string): Promise<TDog> => {
  try {
    const user = await getUserByClerkID();
    const dog = await prisma.dog.findUnique({
      where: {
        id: id,
        userId: user?.id,
      },
      include: {
        chats: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!dog) {
      throw new Error(`Dog with ID ${id} not found for user ${user?.id}`);
    }
    return dog;
  } catch (error) {
    console.error('getDogById:', error);
    throw error;
  }
};
