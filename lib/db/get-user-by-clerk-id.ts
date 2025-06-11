'use server';

import { auth } from '@clerk/nextjs/server';
import prisma from './db';
import { TUserBasic } from '../models/user-model';

export const getUserByClerkID = async (): Promise<TUserBasic | null> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error('UNAUTHORIZED');
      return null;
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    });
    return user;
  } catch (error) {
    console.error('getUserByClerkID:', error);
    throw error;
  }
};
