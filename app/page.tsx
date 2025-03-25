import prisma from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth();
  // Protect the route by checking if the user is signed in
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }
  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  if (!user) redirect('/sign-up');

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  // Use `user` to render user details or create UI elements
  return <div>Welcome, {user && user.firstName}!</div>;
}
