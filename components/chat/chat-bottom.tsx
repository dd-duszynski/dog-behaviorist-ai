'use client';
import { askAI } from '@/lib/ai/analyze';
import { createMessageAction } from '@/lib/db/create-message-action';
import { TChat } from '@/lib/models/chat-model';
import { strings } from '@/lib/strings/pl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface ChatBottomProps {
  chat: TChat | null;
  id: string;
  userId: string;
  mappedDogInfo: string;
}

export function ChatBottom({ chat, mappedDogInfo }: ChatBottomProps) {
  const [content, setContent] = useState('');
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };

  const triggerAiAnswer = async (question: string) => {
    if (!chat) return;
    try {
      const aiAnswer = await askAI(question, mappedDogInfo || '');
      if (aiAnswer) {
        await createMessageAction(chat.id, aiAnswer.content.toString(), true);
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
          if (!chat) return;
          await createMessageAction(chat.id, content);
          await triggerAiAnswer(content);
          setContent('');
          refresh();
        }}
      >
        {strings.general.submit}
      </Button>
    </div>
  );
}
