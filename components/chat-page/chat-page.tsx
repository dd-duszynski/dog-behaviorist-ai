import { TUserBasic } from '@/lib/models/user-model';
import { Chat } from '@/components/chat/chat';
import { NewChat } from '@/components/chat/new-chat';

type ChatPageComponentProps = {
  dogId: string;
  id: string;
  isNewChat: boolean;
  user: TUserBasic;
};

export function ChatPageComponent({
  dogId,
  id,
  isNewChat,
  user,
}: ChatPageComponentProps) {
  return (
    <div className='flex justify-center w-full'>
      {isNewChat ? (
        <NewChat userId={user.id} id={id} dogId={dogId} />
      ) : (
        <Chat userId={user.id} id={id} />
      )}
    </div>
  );
}
