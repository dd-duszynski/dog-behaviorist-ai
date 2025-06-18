'use server';

import { generateAiChatSummary } from '../ai/generate-chat-summary';
import { updateChatAction } from '../db/update-chat-action';
import { TChat } from '../models/chat-model';

export const prepareChatSummary = async (chat: TChat) => {
  const chatSummary = !!chat && (await generateAiChatSummary(chat));
  if (chatSummary) {
    const result = extractTopicAndSummaryFromChatSummary(chatSummary.content);
    await updateChatAction(
      result?.topic || '',
      result?.summary || '',
      chat?.id || ''
    );
  }
};

const extractTopicAndSummaryFromChatSummary = (
  text: string
): { topic: string; summary: string } | null => {
  const topicMatch = text.match(/topic:\s*([^|]+)\|\|\|/i);
  const summaryMatch = text.match(/podsumowanie:\s*(.+)$/i);

  if (topicMatch && summaryMatch) {
    return {
      topic: topicMatch[1].trim(),
      summary: summaryMatch[1].trim(),
    };
  }
  return null;
};
