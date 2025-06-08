import prisma from './db';
import { getUserByClerkID } from './getUserByClerkID';

export const getAllUserConversations = async () => {
  try {
    const user = await getUserByClerkID();
    const conversations = await prisma.conversation.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return conversations;
  } catch (error) {
    console.error('getAllUserConversations:', error);
  }
};
