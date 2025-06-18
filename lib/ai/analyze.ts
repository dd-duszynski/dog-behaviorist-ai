'use server';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

export const askAi = async (question: string, dogInfo: string) => {
  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4.1-nano',
    temperature: 0,
  });
  //   new SystemMessage("You are a helpful assistant that answers concisely."),
  // new HumanMessage(body.message || "What is the capital of France?"),
  const messages = [
    new SystemMessage(
      `Jesteś pomocnym asystentem AI specjalizującym się w behawiorystyce psów. Odpowiadaj tylko na pytania dotyczące psów. Jeśli pytanie nie dotyczy psów, odpowiedz: "Odpowiadam tylko na pytania dotyczące psów". Do odpowiedzi używaj języka polskiego. Weź pod uwagę następujące informacje o psie: ${dogInfo}`
    ),
    new HumanMessage(question),
  ];

  const response = await model.invoke(messages);
  // Return only the serializable content
  return { content: response.content?.toString() ?? '' };
};
