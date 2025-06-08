import { getChatByID } from '@/lib/db/get-chat-by-id';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { mapDogInfoIntoString } from '@/lib/mappers/map-dog-info-into-string';
import { ChatBottom } from './chat-bottom';
import { ChatMessages } from './chat-messages';
import { updateChatAction } from '@/lib/db/update-chat-action';
import { generateChatSummary } from '@/lib/ai/generate-chat-summary';

interface ChatProps {
  userId: string;
  id: string;
}

function extractTopicAndSummary(
  text: string
): { topic: string; summary: string } | null {
  const topicMatch = text.match(/topic:\s*([^|]+)\|\|\|/i);
  const summaryMatch = text.match(/podsumowanie:\s*(.+)$/i);

  if (topicMatch && summaryMatch) {
    return {
      topic: topicMatch[1].trim(),
      summary: summaryMatch[1].trim(),
    };
  }
  return null;
}

export async function Chat({ userId, id }: ChatProps) {
  const chat = await getChatByID(id);
  const chatSummary = await generateChatSummary(chat);
  if (chatSummary) {
    const result = extractTopicAndSummary(chatSummary.content);
    await updateChatAction(
      result?.topic || '',
      result?.summary || '',
      chat?.id || ''
    );
  }
  const dogInfo = !!chat && (await getDogById(chat.dogId));
  const mappedDogInfo = dogInfo ? mapDogInfoIntoString(dogInfo) : '';
  const initialMessages = [
    {
      text: 'Hello, how can I help you today?',
      isAi: true,
    },
  ];
  const messages = [...initialMessages];
  if (chat?.messages) {
    chat.messages.forEach((message) => {
      messages.push({
        text: message.content,
        isAi: message.isAi,
      });
    });
  }

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <ChatMessages userId={userId} id={id} messages={messages} />
      <ChatBottom
        userId={userId}
        id={id}
        chat={chat}
        mappedDogInfo={mappedDogInfo}
      />
    </div>
  );
}
