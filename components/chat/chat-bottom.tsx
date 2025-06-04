'use client';
import { createMessageAction } from '@/lib/createMessageAction';
import { strings } from '@/lib/strings/pl';
import { Conversation } from '@prisma/client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';

interface ChatBottomProps {
  userId: string;
  id: string;
  conversation: Conversation | null;
}

export function ChatBottom({ conversation }: ChatBottomProps) {
  const [content, setContent] = useState('');
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  return (
    <div className='flex flex-row justify-between gap-4 w-full h-full mt-6'>
      <Textarea
        placeholder='Type your message here.'
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        variant='default'
        className='mt-2 bg-[#3ea8cf]'
        onClick={async () => {
          if (!conversation) return;
          await createMessageAction(conversation.id, content);
          setContent('');
          refresh();
        }}
      >
        {strings.general.submit}
      </Button>
    </div>
  );
}
