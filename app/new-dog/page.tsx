import { NewDogForm } from '@/components/new-dog-form/new-dog-form';
import { getUserByClerkID } from '@/lib/getUserByClerkID';

export default async function NewDogPage() {
  const user = await getUserByClerkID();
  console.log('NewDogPage user:', user);
  return (
    <div className='p-3 flex justify-center w-full'>
      <NewDogForm userId={user?.id} />
    </div>
  );
}
