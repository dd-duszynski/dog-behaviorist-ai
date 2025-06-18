'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dog } from '@prisma/client';
import { Camera, Mars, Venus } from 'lucide-react';
import Link from 'next/link';
import { ButtonWithConfirmationDialog } from '../button-with-confirmation-dialog/button-with-confirmation-dialog';
import { Button } from '../ui/button';
import { removeDogAction } from '@/lib/db/remove-dog-action';
import { redirect } from 'next/navigation';
import { strings } from '@/lib/strings/pl';
import Image from 'next/image';
import { getImageSrc } from '@/lib/utils/getImageSrc';
import { getYearsAndMonths } from '@/lib/utils/getYearsAndMonths';

type DogEditableCardProps = {
  dog: Dog;
  withImage: boolean;
};

export const DogEditableCard = ({ dog, withImage }: DogEditableCardProps) => {
  const age = getYearsAndMonths(dog.birthday);
  const imageSrc = getImageSrc(dog.photo);
  return (
    <>
      {withImage && (
        <div className='relative'>
          <Image
            alt={dog.name}
            className='rounded-2xl'
            height={300}
            src={imageSrc}
            width={300}
          />
          <div className='absolute top-2 right-2 bg-white rounded-full p-3 shadow-md cursor-pointer'>
            <Camera />
          </div>
        </div>
      )}
      <Card className='w-[350px] h-fit flex flex-col justify-between'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            {dog.name}
            {dog.gender === 'MALE' ? <Mars /> : <Venus />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{`${strings.general.age}: ${age}`}</p>
          <p>{`${strings.general.weight}: ${dog.weight} ${strings.general.kg}`}</p>
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
