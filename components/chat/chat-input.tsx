'use client';
import { askAI } from '@/lib/ai/analyze';
import { createMessageAction } from '@/lib/db/create-message-action';
import { TChat } from '@/lib/models/chat-model';
import { strings } from '@/lib/strings/pl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createChatAction } from '@/lib/db/create-chat-action';
import { redirect } from 'next/navigation';

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
    <div className='flex flex-row justify-between gap-4 w-full h-full mt-6'>
      <Textarea
        placeholder='Type your message here.'
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        className='mt-2 bg-[#3ea8cf]'
        variant='default'
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
          }
        }}
      >
        {strings.general.submit}
      </Button>
    </div>
  );
}
