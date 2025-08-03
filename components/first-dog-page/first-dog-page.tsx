import { Button } from '@/components/ui/button';
import { strings } from '@/lib/strings/pl';
import Link from 'next/link';

export default async function FirstDogPage() {
  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <p>{strings.first_dog_page.paragraph1}</p>
      <p>{strings.first_dog_page.paragraph2}</p>
      <p>{strings.first_dog_page.paragraph3}</p>
      <Link href='/new-dog' className='mt-4'>
        <Button variant='outline'>{strings.dogs.add_dog}</Button>
      </Link>
    </div>
  );
}
