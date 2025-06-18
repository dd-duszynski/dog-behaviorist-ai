import { DogEditableCard } from '@/components/dog-editable-card/dog-editable-card';
import { DogPageTable } from '@/components/dog-history-table/dog-page-table';
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
  if (!user) return <div>{strings.general.unauthorized}</div>;
  const id = (await params).id;
  const dog = await getDogById(id);
  if (!dog) return <div>{strings.dogs.there_is_no_dog}</div>;
  const chats = await getChatsByDogId(dog.id);

  return (
    <div className='p-4'>
      <div className='flex gap-4'>
        <DogEditableCard dog={dog} withImage />
      </div>
      <div className='pt-4'>
        <DogPageTable dogId={dog.id} chats={chats} />
      </div>
    </div>
  );
}
