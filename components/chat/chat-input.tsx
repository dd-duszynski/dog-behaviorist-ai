'use client';
import { askAI } from '@/lib/ai/analyze';
import { createChatAction } from '@/lib/db/create-chat-action';
import { createMessageAction } from '@/lib/db/create-message-action';
import { TChat } from '@/lib/models/chat-model';
import { SendHorizontal } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
interface ChatInputProps {
  chat: TChat | null;
  dogId: string;
  mappedDogInfo: string;
  userId: string;
  isNewChat?: boolean;
}

export function ChatInput({
  chat,
  dogId,
  mappedDogInfo,
  userId,
  isNewChat,
}: ChatInputProps) {
  const [content, setContent] = useState('');
  const router = useRouter();

  const refresh = () => {
    router.refresh();
  };

  const createChat = async (userId: string, dogId: string) => {
    try {
      const result = await createChatAction(userId, dogId);
      return result ? result.id : null;
    } catch (error) {
      console.error('createChat:', error);
    }
  };

  const triggerAiAnswer = async (createdChatId: string, question: string) => {
    try {
      const aiAnswer = await askAI(question, mappedDogInfo || '');
      if (aiAnswer) {
        await createMessageAction(
          createdChatId,
          aiAnswer.content.toString(),
          true
        );
      }
    } catch (error) {
      console.error('triggerAiAnswer:', error);
    }
  };

  return (
    <div className='flex flex-row justify-between gap-4 w-full h-full relative'>
      <Textarea
        placeholder='Type your message here.'
        value={content}
        className='bg-slate-300  min-h-32 max-h-60 pr-14 border-[#3EA8CF] border-2 rounded-lg resize-none'
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        className='bg-[#3ea8cf] h-14 w-14 absolute right-5 bottom-2 rounded-full'
        variant='default'
        disabled={!content.trim()}
        onClick={async () => {
          if (!chat) {
            const createdChatId = await createChat(userId, dogId);
            if (!createdChatId) return;
            await createMessageAction(createdChatId, content);
            await triggerAiAnswer(createdChatId, content);
            setContent('');
            if (isNewChat) {
              redirect(`/chat/${createdChatId}`);
            } else {
              refresh();
            }
          } else {
            await createMessageAction(chat.id, content);
            await triggerAiAnswer(chat.id, content);
            setContent('');
            refresh();
          }
        }}
      >
        <SendHorizontal />
      </Button>
    </div>
  );
}
