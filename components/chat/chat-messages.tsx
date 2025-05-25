'use client';

type MessageProps = {
  text: string;
  isAi: boolean;
};

const Message = ({ text, isAi }: MessageProps) => {
  return (
    <div
      className={`flex flex-row items-start ${
        isAi ? 'justify-start' : 'justify-end'
      }`}
    >
      <div className='p-4 bg-secondary text-secondary-foreground rounded-r-lg rounded-tl-lg break-words max-w-full whitespace-pre-wrap'>
        {text}
      </div>
    </div>
  );
};

interface ChatBottomProps {
  userId: string;
  id: string;
  messages: MessageProps[];
}

export const ChatMessages = ({ messages }: ChatBottomProps) => {
  return (
    <div className='flex flex-col justify-between w-full h-full'>
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isAi={message.isAi} />
      ))}
    </div>
  );
};
