import { getChatByID } from '@/lib/db/get-chat-by-id';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { mapDogInfoIntoString } from '@/lib/mappers/map-dog-info-into-string';
import { prepareChatSummary } from '@/lib/utils/prepareChatSummary';
import { ChatInput } from './chat-input';
import { ChatMessages, MessageProps } from './chat-messages';

interface ChatProps {
  id: string;
  userId: string;
}

export async function Chat({ userId, id }: ChatProps) {
  const chat = await getChatByID(id);
  await prepareChatSummary(chat);
  const dogInfo = !!chat && (await getDogById(chat.dogId));
  const mappedDogInfo = dogInfo ? mapDogInfoIntoString(dogInfo) : '';
  const messages: MessageProps[] = [];
  if (chat?.messages) {
    chat.messages.forEach((message) => {
      messages.push({
        text: message.content,
        isAi: message.isAi,
      });
    });
  }

  return (
    <div className='w-full max-h-full max-w-[120ch] grid grid-cols-1 grid-rows-[1fr_120px] h-[calc(100vh-120px)]'>
      <ChatMessages id={id} messages={messages} userId={userId} />
      <ChatInput
        chat={chat}
        dogId={chat.dogId}
        mappedDogInfo={mappedDogInfo}
        userId={userId}
      />
    </div>
  );
}
