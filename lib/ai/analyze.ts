import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

export const askAI = async (question: string) => {
  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4.1-nano',
    temperature: 0,
  });
  //   new SystemMessage("You are a helpful assistant that answers concisely."),
  // new HumanMessage(body.message || "What is the capital of France?"),
  const messages = [
    new SystemMessage(
      'You are a helpful AI dog behaviorist assistant. Answer only in Polish and only for question related to dogs. If the question is not related to dogs, answer: "Odpowiadam tylko na pytania dotyczące psów."'
    ),
    new HumanMessage(question),
  ];

  const response = await model.invoke(messages);

  // const response = await model.invoke([new HumanMessage(question)]);
  return response;
};
