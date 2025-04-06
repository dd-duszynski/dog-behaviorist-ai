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

type DogCardProps = {
  name: string;
  breed: string;
  age: number;
  weight: number;
  image?: string;
};

export function DogCard({
  age,
  weight,
  name,
  breed,
  image = '/dog-default.jpg',
}: DogCardProps) {
  return (
    <Card className='w-[350px] flex flex-col justify-between'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Breed: {breed}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} alt={name} width={300} height={300} />
        <p>Age: {age}</p>
        <p>weight: {weight} kg</p>
      </CardContent>
      <CardFooter>
        <Link className='w-full' href={`/dogs/${name}`}>
          <Button className='w-full'>More info</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
