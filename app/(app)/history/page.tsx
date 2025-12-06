import { FirstDogPageComponent } from '@/components/first-dog-page/first-dog-page';
import { HistoryPageComponent } from '@/components/history-page/history-page';
import { Typography } from '@/components/ui/typography';
import { getAllChatsByUserId } from '@/lib/db/get-all-chats-by-user-id';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function HistoryPage() {
  const user = await getUserByClerkID();
  if (!user)
    return <Typography variant='h2'>{strings.general.unauthorized}</Typography>;
  const dogs = await getDogsByUserId();
  const chats = await getAllChatsByUserId();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPageComponent />;
  }
  return <HistoryPageComponent dogs={dogs} chats={chats} />;
}
