import { DogCard } from '@/components/dog-card/dog-card';

export default function DogsPage() {
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
    </div>
  );
}
