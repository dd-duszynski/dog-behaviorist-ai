import { DogCard } from '@/components/dog-card/dog-card';
import { Button } from '@/components/ui/button';
import { getDogs } from '@/lib/getDogs';
import Link from 'next/link';

export default async function DogsPage() {
  const dogs = await getDogs();
  return (
    <div className='flex gap-3 p-3 flex-wrap'>
      {/* <DogCard
        name='Kira'
        breed='Mongrel'
        age={3}
        weight={13}
        image='/kira.jpg'
        id='kira'
      />
      <DogCard
        name='Diego'
        breed='Mongrel'
        age={1.5}
        weight={19}
        image='/diego.jpg'
        id='diego'
      /> */}
      {dogs.map((dog) => (
        <DogCard
          age={new Date().getFullYear() - dog.birthday.getFullYear()}
          breed={dog.breed}
          id={dog.id}
          key={dog.id}
          name={dog.name}
          weight={+dog.weight}
        />
      ))}
      <Link href='/new-dog'>
        <Button className='absolute bottom-4 right-4 bg-orange-400 hover:bg-orange-500'>
          Add new dog
        </Button>
      </Link>
    </div>
  );
}
