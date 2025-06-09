import { getChatByID } from '@/lib/db/get-chat-by-id';
import { getDogById } from '@/lib/db/get-dog-by-id';
import { mapDogInfoIntoString } from '@/lib/mappers/map-dog-info-into-string';
import { ChatInput } from './chat-input';
import { ChatMessages, MessageProps } from './chat-messages';
import { updateChatAction } from '@/lib/db/update-chat-action';
import { generateChatSummary } from '@/lib/ai/generate-chat-summary';

interface ChatProps {
  id: string;
  userId: string;
}

export async function Chat({ userId, id }: ChatProps) {
  const chat = await getChatByID(id);
  const chatSummary = !!chat && (await generateChatSummary(chat));
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
    <div className='flex flex-col justify-between w-full h-full'>
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
