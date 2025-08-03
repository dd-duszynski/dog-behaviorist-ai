import { DogHistoryTable } from '@/components/dog-history-table/dog-history-table';
import FirstDogPage from '@/components/first-dog-page/first-dog-page';
import { getAllChatsByUserId } from '@/lib/db/get-all-chats-by-user-id';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function HistoryPage() {
  const user = await getUserByClerkID();
  if (!user) return <div>{strings.general.unauthorized}</div>;
  const dogs = await getDogsByUserId();
  const chats = await getAllChatsByUserId();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPage />;
  }
  return (
    <div className='p-4'>
      <div className='pt-4'>
        <DogHistoryTable dogs={dogs} chats={chats} />
      </div>
    </div>
  );
}
