import { TChat } from '@/lib/models/chat-model';
import { strings } from '@/lib/strings/pl';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { TDog } from '../../lib/models/dog-model';
import { DogHistoryTable } from '../dog-history-table/dog-history-table';
import { Button } from '../ui/button';
import { Typography } from '../ui/typography';

type HistoryPageComponentProps = {
  dogs: TDog[];
  chats: TChat[];
};

export function HistoryPageComponent({
  dogs,
  chats,
}: HistoryPageComponentProps) {
  return (
    <div>
      <div className='flex gap-3 justify-between items-center'>
        <div>
          <Typography variant='h2'>Twoje psy 🐾</Typography>
          <Typography variant='p'>
            Zarządzaj profilami swoich pupili i śledź ich postępy.
          </Typography>
        </div>
        <Link href='/new-dog'>
          <Button variant='action'>
            <Plus />
            {strings.dogs.add_dog}
          </Button>
        </Link>
      </div>
      <DogHistoryTable dogs={dogs} chats={chats} />
    </div>
  );
}
