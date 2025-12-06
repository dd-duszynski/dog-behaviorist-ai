import { strings } from '@/lib/strings/pl';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { TDog } from '../../lib/models/dog-model';
import { DogCard } from '../dog-card/dog-card';
import { Button } from '../ui/button';
import { Typography } from '../ui/typography';

type DogsPageComponentProps = {
  dogs: TDog[];
};

export function DogsPageComponent({ dogs }: DogsPageComponentProps) {
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
      <div className='flex gap-3 flex-wrap'>
        {dogs.map((dog) => (
          <DogCard dog={dog} key={dog.id} />
        ))}
      </div>
    </div>
  );
}
