import { NewDogForm } from '@/components/new-dog-form/new-dog-form';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function EditDogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user) return <div>{strings.general.unauthorized}</div>;
  const id = (await params).id;
  const dog = await getDogById(id);
  if (!dog) return <div>{strings.dogs.there_is_no_dog_to_edit}</div>;
  return (
    <div className='p-3 flex justify-center w-full'>
      <NewDogForm userId={user.id} mode='update' dog={dog} />
    </div>
  );
}
