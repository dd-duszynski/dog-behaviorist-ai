'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dog } from '@prisma/client';
import { Mars, Venus } from 'lucide-react';
import Link from 'next/link';
import { ButtonWithConfirmationDialog } from '../button-with-confirmation-dialog/button-with-confirmation-dialog';
import { Button } from '../ui/button';
import { removeDogAction } from '@/lib/removeDogAction';
import { redirect } from 'next/navigation';

type DogEditableCardProps = {
  dog: Dog;
};

export const DogEditableCard = ({ dog }: DogEditableCardProps) => {
  const dogAge = new Date().getFullYear() - dog.birthday.getFullYear();
  return (
    <>
      <Card className='w-[350px] flex flex-col justify-between'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            {dog.name}
            {dog.gender === 'MALE' ? <Mars /> : <Venus />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Age: {dogAge}</p>
          <p>Weight: {dog.weight} kg</p>
        </CardContent>
        <CardFooter>
          <div className='flex flex-col gap-2 w-full'>
            <Link className='w-full' href={`/edit-dog/${dog.id}`}>
              <Button className='w-full' variant='outline'>
                Edit
              </Button>
            </Link>
            <ButtonWithConfirmationDialog
              description='Are you sure you want to remove this dog profile?'
              onConfirm={async () => {
                const result = await removeDogAction(dog.id);
                console.log('result:', result);
                redirect(`/dogs`);
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
