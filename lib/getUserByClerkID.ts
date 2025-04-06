import { auth } from '@clerk/nextjs/server';
import prisma from './db';
/* TODO_DD:  */
// select, include - https://frontendmasters.com/courses/fullstack-app-next-v3/selecting-journal-entries/
export const getUserByClerkID = async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });
  return user;
};
