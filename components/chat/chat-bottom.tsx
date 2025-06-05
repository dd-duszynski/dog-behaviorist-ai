'use client';
import { createMessageAction } from '@/lib/createMessageAction';
import { strings } from '@/lib/strings/pl';
import { Conversation } from '@prisma/client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { askAI } from '@/lib/ai/analyze';

interface ChatBottomProps {
  conversation: Conversation | null;
  id: string;
  userId: string;
  mappedDogInfo: string;
}

export function ChatBottom({ conversation, mappedDogInfo }: ChatBottomProps) {
  const [content, setContent] = useState('');
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };

  const triggerAiAnswer = async (question: string) => {
    if (!conversation) return;
    console.log('question:', question);
    console.log('conversation:', conversation);
    try {
      const aiAnswer = await askAI(question, mappedDogInfo || '');
      if (aiAnswer) {
        console.log('aiAnswer:', aiAnswer);
        await createMessageAction(
          conversation.id,
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
          if (!conversation) return;
          await createMessageAction(conversation.id, content);
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
