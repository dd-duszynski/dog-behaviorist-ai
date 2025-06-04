import { getConversationByID } from '@/lib/getConversationByID';
import { ChatBottom } from './chat-bottom';
import { ChatMessages } from './chat-messages';

interface ChatProps {
  userId: string;
  id: string;
}

export async function Chat({ userId, id }: ChatProps) {
  const conversation = await getConversationByID(id);
  console.log('conversation:', conversation);
  const initialMessages = [
    {
      text: 'Hello, how can I help you today?',
      isAi: true,
    },
  ];
  if (conversation?.messages) {
    initialMessages.push(...conversation.messages);
  }
  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatMessages userId={userId} id={id} messages={initialMessages} />
      <ChatBottom userId={userId} id={id} />
    </div>
  );
}
