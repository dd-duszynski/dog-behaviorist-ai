import { getDogById } from '@/lib/db/get-dog-by-id';
import { mapDogInfoIntoString } from '@/lib/mappers/map-dog-info-into-string';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';

interface NewChatProps {
  dogId: string;
  id: string;
  userId: string;
}

export async function NewChat({ userId, id, dogId }: NewChatProps) {
  const dogInfo = await getDogById(dogId);
  const mappedDogInfo = dogInfo ? mapDogInfoIntoString(dogInfo) : '';
  const initialMessages = [
    {
      text: 'Witam, jak mogę Ci pomóc?',
      isAi: true,
    },
  ];

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatMessages id={id} messages={[...initialMessages]} userId={userId} />
      <ChatInput
        chat={null}
        dogId={dogId}
        isNewChat
        mappedDogInfo={mappedDogInfo}
        userId={userId}
      />
    </div>
  );
}
