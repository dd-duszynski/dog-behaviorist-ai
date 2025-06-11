'use client';

export type MessageProps = {
  text: string;
  isAi: boolean;
};

const Message = ({ text, isAi }: MessageProps) => {
  return (
    <div
      className={`flex flex-row w-[80%] mb-3 items-start ${
        isAi ? 'self-start' : 'self-end justify-end'
      }`}
    >
      <div
        className={`p-4  text-secondary-foreground break-words max-w-full whitespace-pre-wrap ${
          isAi
            ? 'bg-slate-200 rounded-r-lg rounded-tl-lg'
            : 'bg-slate-300 rounded-l-lg rounded-tr-lg'
        }`}
      >
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
