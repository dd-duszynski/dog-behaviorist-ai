import { ChatBottom } from './chat-bottom';
import { ChatMessages } from './chat-messages';

interface ChatProps {
  userId: string;
  id: string;
}

export function Chat({ userId, id }: ChatProps) {
  const messages = [
    {
      text: 'Hello, how can I help you today?',
      isAi: true,
    },
    {
      text: 'I have a question about my order.',
      isAi: false,
    },
    {
      text: 'Sure, what would you like to know?',
      isAi: true,
    },
    {
      text: 'When will it be delivered?',
      isAi: false,
    },
    {
      text: 'Your order is scheduled for delivery tomorrow.',
      isAi: true,
    },
  ];
  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatMessages userId={userId} id={id} messages={messages} />
      <ChatBottom userId={userId} id={id} />
    </div>
  );
}
