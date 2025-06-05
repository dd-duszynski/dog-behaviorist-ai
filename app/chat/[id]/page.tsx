import { Chat } from '@/components/chat/chat';
import { getUserByClerkID } from '@/lib/getUserByClerkID';
import { strings } from '@/lib/strings/pl';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUserByClerkID();
  if (!user) return <div>{strings.general.unauthorized}</div>;
  const id = (await params).id;
  return (
    <div className='p-3 flex justify-center w-full'>
      <Chat userId={user.id} id={id} />
    </div>
  );
}
