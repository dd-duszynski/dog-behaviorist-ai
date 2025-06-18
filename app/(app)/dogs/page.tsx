import { DogCard } from '@/components/dog-card/dog-card';
import FirstDogPage from '@/components/first-dog-page/first-dog.page';
import { Button } from '@/components/ui/button';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { strings } from '@/lib/strings/pl';
import Link from 'next/link';

export default async function DogsPage() {
  const dogs = await getDogsByUserId();
  if (!dogs || dogs.length === 0) {
    return <FirstDogPage />;
  }
  return (
    <div className='flex gap-3 p-3 flex-wrap'>
      {dogs.map((dog) => (
        <DogCard dog={dog} key={dog.id} />
      ))}
      <Link href='/new-dog'>
        <Button variant='outline' className='absolute bottom-4 right-4 '>
          {strings.dogs.add_dog}
        </Button>
      </Link>
    </div>
  );
}
