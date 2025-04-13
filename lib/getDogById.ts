import prisma from '@/lib/db';
import { getUserByClerkID } from '@/lib/getUserByClerkID';

export const getDogById = async (id: string) => {
  const user = await getUserByClerkID();
  const dog = await prisma.dog.findUnique({
    where: {
      id: id,
      userId: user?.id,
    },
  });
  return dog;
};
