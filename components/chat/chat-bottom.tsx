'use client';
import { strings } from '@/lib/strings/pl';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface ChatBottomProps {
  userId: string;
  id: string;
}

export function ChatBottom({}: ChatBottomProps) {
  return (
    <div className='flex flex-row justify-between gap-4 w-full h-full mt-6'>
      <Textarea
        placeholder='Type your message here.'
        onChange={(e) => {
          console.log('Input changed:', e.target.value);
        }}
      />
      <Button
        variant='default'
        className='mt-2 bg-[#3ea8cf]'
        onClick={() => console.log('Send message')}
      >
        {strings.general.submit}
      </Button>
    </div>
  );
}
