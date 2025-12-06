import { ChatPageComponent } from '@/components/chat-page/chat-page';
import { Typography } from '@/components/ui/typography';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user)
    return <Typography variant='h2'>{strings.general.unauthorized}</Typography>;
  const id = (await params).id;
  const isNewChat = id.includes('new');
  const dogId = isNewChat ? extractIdFromPath(id) : '';
  return (
    <ChatPageComponent
      dogId={dogId}
      id={id}
      isNewChat={isNewChat}
      user={user}
    />
  );
}

function extractIdFromPath(path: string): string {
  const prefix = 'new-';
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length);
  }
  return '';
}
