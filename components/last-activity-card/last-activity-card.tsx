import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getLastActivityByUserId } from '@/lib/db/get-last-activity-by-user-id';
import { TChat } from '@/lib/models/chat-model';
import { TDog } from '@/lib/models/dog-model';
import { Clock } from 'lucide-react';
import React from 'react';
import { LastActivityCardItem } from './last-activity-card-item';
import { Typography } from '../ui/typography';
import { strings } from '@/lib/strings/pl';

interface LastActivityCardProps {
  dogs: TDog[];
}

export type TChatWithDog = TChat & {
  dog: TDog | undefined;
};

function mergeChatWithDog(chats: TChat[], dogs: TDog[]): TChatWithDog[] {
  return chats.map((chat) => ({
    ...chat,
    dog: dogs.find((dog) => dog.id === chat.dogId),
  }));
}

export const LastActivityCard: React.FC<LastActivityCardProps> = async ({
  dogs,
}) => {
  const chats = await getLastActivityByUserId(5);
  const items = mergeChatWithDog(chats, dogs);
  console.log('chats:', chats);

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <div className='p-2 rounded-lg bg-gradient-to-r from-primary-500 to-primary-300'>
            <Clock className='h-7 w-7 text-white' />
          </div>
          <Typography variant='h2'>{strings.home.last_activity}</Typography>
        </CardTitle>
      </CardHeader>
      {items.map((item) => (
        <LastActivityCardItem key={item.id} item={item} />
      ))}
    </Card>
  );
};
