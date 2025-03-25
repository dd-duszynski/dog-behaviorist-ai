import { DogCard } from '@/components/dog-card/dog-card';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function DogsPage() {
  const dogs = await prisma.dogs.findMany();
  console.log('dogs:', dogs);
  return (
    <div className='flex gap-3 p-3'>
      <DogCard
        name='Kira'
        breed='Mongrel'
        age={3}
        weight={13}
        image='/kira.jpg'
      />
      <DogCard
        name='Diego'
        breed='Mongrel'
        age={1.5}
        weight={19}
        image='/diego.jpg'
      />
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          name={dog.name}
          breed={dog.breed}
          age={new Date().getFullYear() - dog.birthday.getFullYear()}
          weight={dog.weight}
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
