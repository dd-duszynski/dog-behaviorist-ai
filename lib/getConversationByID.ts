import prisma from './db';
import { getUserByClerkID } from './getUserByClerkID';
/* TODO_DD:  */
// select, include - https://frontendmasters.com/courses/fullstack-app-next-v3/selecting-journal-entries/
export const getConversationByID = async (id: string) => {
  const user = await getUserByClerkID();
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: id,
      userId: user?.id,
    },
  });
  return conversation;
};
