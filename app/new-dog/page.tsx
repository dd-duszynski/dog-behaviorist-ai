import { NewDogForm } from '@/components/new-dog-form/new-dog-form';
import { getUserByClerkID } from '@/lib/getUserByClerkID';
import { strings } from '@/lib/strings/pl';

export default async function NewDogPage() {
  const user = await getUserByClerkID();
  if (!user) return <div>{strings.general.unauthorized}</div>;
  return (
    <div className='p-3 flex justify-center w-full'>
      <NewDogForm userId={user.id} mode='create' />
    </div>
  );
}
