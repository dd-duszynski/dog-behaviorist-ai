import FirstDogPage from '@/components/first-dog-page/first-dog.page';
import { getDogs } from '@/lib/getDogs';
import { strings } from '@/lib/strings/pl';

export default async function HistoryPage() {
  const dogs = await getDogs();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPage />;
  }
  return <div>{strings.app_sidebar.settings}</div>;
}
