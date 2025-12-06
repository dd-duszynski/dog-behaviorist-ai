import { DogPageComponent } from '@/components/dog-page/dog-page';
import { Typography } from '@/components/ui/typography';
import { getChatsByDogId } from '@/lib/db/get-chats-by-dog-id';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function DogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user) {
    return <Typography variant='h2'>{strings.general.unauthorized}</Typography>;
  }
  const id = (await params).id;
  const dog = await getDogById(id);
  if (!dog) {
    return <Typography variant='h2'>{strings.dogs.there_is_no_dog}</Typography>;
  }
  const chats = await getChatsByDogId(dog.id);

  return <DogPageComponent chats={chats} dog={dog} />;
}
