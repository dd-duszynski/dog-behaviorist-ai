import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { strings } from '@/lib/strings/pl';

type DogCardProps = {
  age: number;
  breed: string;
  id: string;
  image?: string;
  name: string;
  weight: number;
};

export function DogCard({
  age,
  breed,
  id,
  image = '/dog-default.jpg',
  name,
  weight,
}: DogCardProps) {
  return (
    <Card className='w-[350px] flex flex-col justify-between'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{`${strings.new_dog_form.breed_label}: ${breed}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} alt={name} width={300} height={300} />
        <p>{`${strings.general.age}: ${age}`}</p>
        <p>{`${strings.general.weight}: ${weight} ${strings.general.kg}`}</p>
      </CardContent>
      <CardFooter>
        <Link className='w-full' href={`/dogs/${id}`}>
          <Button className='w-full' variant='outline'>
            {strings.dogs.more_info}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
