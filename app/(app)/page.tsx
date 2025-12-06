import { FirstDogPageComponent } from '@/components/first-dog-page/first-dog-page';
import { HomePageComponent } from '@/components/home-page/home-page';
import prisma from '@/lib/db/db';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function AppPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });
  if (user && !match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }
  const dogs = await getDogsByUserId();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPageComponent />;
  }
  return <HomePageComponent dogs={dogs} />;
}
