import { getUserByClerkID } from '@/lib/getUserByClerkID';
import prisma from '@/lib/db';

export const getDogs = async () => {
  const user = await getUserByClerkID();
  const dogs = await prisma.dog.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return dogs;
};
