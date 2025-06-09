import { Chat } from '@/components/chat/chat';
import { NewChat } from '@/components/chat/new-chat';
import { getUserByClerkID } from '@/lib/db/get-user-by-clerk-id';
import { strings } from '@/lib/strings/pl';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user) return <div>{strings.general.unauthorized}</div>;
  const id = (await params).id;
  const isNewChat = id.includes('new');
  const dogId = isNewChat ? extractIdFromPath(id) : '';
  return (
    <div className='p-3 flex justify-center w-full'>
      {isNewChat ? (
        <NewChat userId={user.id} id={id} dogId={dogId} />
      ) : (
        <Chat userId={user.id} id={id} />
      )}
    </div>
  );
}

function extractIdFromPath(path: string): string {
  const prefix = 'new-';
  if (path.startsWith(prefix)) {
    return path.slice(prefix.length);
  }
  return '';
}
