import FirstDogPage from '@/components/first-dog-page/first-dog.page';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { strings } from '@/lib/strings/pl';

export default async function HistoryPage() {
  const dogs = await getDogsByUserId();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPage />;
  }
  return <div>{strings.app_sidebar.history}</div>;
}
