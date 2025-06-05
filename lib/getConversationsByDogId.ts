import prisma from './db';
import { getUserByClerkID } from './getUserByClerkID';

export const getConversationsByDogId = async (id: string) => {
  const user = await getUserByClerkID();
  const conversations = await prisma.conversation.findMany({
    where: {
      dogId: id,
      userId: user?.id,
    },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });
  return conversations;
};
