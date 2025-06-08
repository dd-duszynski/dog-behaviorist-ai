'use server';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { Message } from '@prisma/client';
import { TChat } from '../models/chat-model';

export const generateChatSummary = async (chat: TChat) => {
  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4.1-nano',
    temperature: 0,
  });
  const chatMessages = chat.messages
    .map((msg: Message) => {
      return `${msg.isAi ? 'Asystent AI' : 'Użytkownik'}: ${msg.content}`;
    })
    .join('\n');

  const messages = [
    new SystemMessage(
      `Jesteś pomocnym asystentem AI specjalizującym się w behawiorystyce psów. Przygotuj podsumowanie rozmowy i temat na podstawie poniższych wiadomości.
      Format odpowiedzi powinien wyglądać następująco: 'topic: przykładowy temat ||| podsumowanie: przykładowe podsumowanie'. 
      Podsumowanie powinno być zwięzłe i ale zawierać kluczowe informacje dotyczące problemów psa, jego potrzeb i sugestii dotyczących opieki nad nim. To podsumowanie będzie wykorzystywane w kolejnych pytaniach, tak aby model ai miał pełen obraz wszystkich problemów. `
    ),
    new HumanMessage(`Weź pod uwagę następujące wiadomości: ${chatMessages}`),
  ];

  const response = await model.invoke(messages);
  // Return only the serializable content
  return { content: response.content?.toString() ?? '' };
};
