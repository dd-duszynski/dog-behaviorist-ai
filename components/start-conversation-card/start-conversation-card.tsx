'use client';

import { GradientCard } from '@/components/gradient-card/gradient-card';
import { strings } from '@/lib/strings/pl';
import { MessageSquareIcon, Sparkles } from 'lucide-react';

export const StartConversationCard = () => {
  return (
    <GradientCard
      actionButton={{
        icon: <MessageSquareIcon className='h-5 w-5 mr-2' />,
        label: strings.chat.new_chat,
        onClick: () => {
          console.log('test');
        },
      }}
      description={strings.chat.start_conversation_description}
      iconComponent={<Sparkles className='h-8 w-8 text-white' />}
      title={strings.chat.start_conversation}
    />
  );
};
