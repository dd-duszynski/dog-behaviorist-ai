import { Button } from '@/components/ui/button';
import { strings } from '@/lib/strings/pl';
import Link from 'next/link';
import { Typography } from '../ui/typography';

export async function FirstDogPageComponent() {
  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <Typography variant='p'>{strings.first_dog_page.paragraph1}</Typography>
      <Typography variant='p'>{strings.first_dog_page.paragraph2}</Typography>
      <Typography variant='p'>{strings.first_dog_page.paragraph3}</Typography>
      <Link href='/new-dog' className='mt-4'>
        <Button variant='action'>{strings.dogs.add_dog}</Button>
      </Link>
    </div>
  );
}
