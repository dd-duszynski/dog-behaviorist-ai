import { getConversationByID } from '@/lib/getConversationByID';
import { getDogById } from '@/lib/getDogById';
import { mapDogInfoIntoString } from '@/lib/mappers/mapDogInfoIntoString';
import { ChatBottom } from './chat-bottom';
import { ChatMessages } from './chat-messages';

interface ChatProps {
  userId: string;
  id: string;
}

export async function Chat({ userId, id }: ChatProps) {
  const conversation = await getConversationByID(id);
  const dogInfo = !!conversation && (await getDogById(conversation.dogId));
  const mappedDogInfo = dogInfo ? mapDogInfoIntoString(dogInfo) : '';
  const initialMessages = [
    {
      text: 'Hello, how can I help you today?',
      isAi: true,
    },
  ];
  const messages = [...initialMessages];
  if (conversation?.messages) {
    conversation.messages.forEach((message) => {
      messages.push({
        text: message.content,
        isAi: message.isAIanswer,
      });
    });
  }

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatMessages userId={userId} id={id} messages={messages} />
      <ChatBottom
        userId={userId}
        id={id}
        conversation={conversation}
        mappedDogInfo={mappedDogInfo}
      />
    </div>
  );
}
