import { NewDogForm } from '@/components/new-dog-form/new-dog-form';
import { getDogById } from '@/lib/getDogById';
import { getUserByClerkID } from '@/lib/getUserByClerkID';

export default async function EditDogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user) return <div>Unauthorized</div>;
  const id = (await params).id;
  const dog = await getDogById(id);
  if (!dog) return <div>There is no dog to edit!</div>;
  return (
    <div className='p-3 flex justify-center w-full'>
      <NewDogForm userId={user.id} mode='update' dog={dog} />
    </div>
  );
}
