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
import { removeDogAction } from '@/lib/db/remove-dog-action';
import { redirect } from 'next/navigation';
import { strings } from '@/lib/strings/pl';

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
          <p>{`${strings.general.age}: ${dogAge}`}</p>
          <p>{`${strings.general.weight}: ${dogAge} ${strings.general.kg}`}</p>
        </CardContent>
        <CardFooter>
          <div className='flex flex-col gap-2 w-full'>
            <Link className='w-full' href={`/edit-dog/${dog.id}`}>
              <Button className='w-full' variant='outline'>
                {strings.general.edit}
              </Button>
            </Link>
            <ButtonWithConfirmationDialog
              description={strings.dogs.remove_description}
              onConfirm={async () => {
                await removeDogAction(dog.id);
                redirect(`/`);
              }}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
