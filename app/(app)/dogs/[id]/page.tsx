import { DogEditableCard } from '@/components/dog-editable-card/dog-editable-card';
import { DogPageTable } from '@/components/dog-history-table/dog-page-table';
import { getChatsByDogId } from '@/lib/db/get-chats-by-dog-id';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';
import { Camera } from 'lucide-react';
import Image from 'next/image';

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
  const defaultDogImage = dog?.photo || '/dog-default.jpg';
  const chats = await getChatsByDogId(dog.id);
  return (
    <div className='p-4'>
      <div className='flex gap-4'>
        <div className='relative'>
          <Image
            alt={dog.name}
            className='rounded-2xl'
            height={300}
            src={defaultDogImage}
            width={300}
          />
          <div className='absolute top-2 right-2 bg-white rounded-full p-3 shadow-md cursor-pointer'>
            <Camera />
          </div>
        </div>
        <DogEditableCard dog={dog} />
      </div>
      <div className='pt-4'>
        <DogPageTable userId={user.id} dogId={dog.id} chats={chats} />
      </div>
    </div>
  );
}
