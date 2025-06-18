import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TDog } from '@/lib/models/dog-model';
import { strings } from '@/lib/strings/pl';
import { getImageSrc } from '@/lib/utils/getImageSrc';
import { getYearsAndMonths } from '@/lib/utils/getYearsAndMonths';
import { Mars, Venus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BotMessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type DogCardProps = {
  dog: TDog;
};

export function DogCard({ dog }: DogCardProps) {
  const imageSrc = getImageSrc(dog.photo);
  const chatsCount = dog.chats.length;
  return (
    <Link href={`/dogs/${dog.id}`}>
      <Card className='w-[300px] h-[400px] flex flex-col justify-between select-none hover:scale-[1.01] transition-transform duration-200 ease-in-out hover:shadow-md'>
        <CardHeader className='py-3'>
          <CardTitle className='flex items-center gap-1'>
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center gap-1'>
                {dog.name} {dog.gender === 'MALE' ? <Mars /> : <Venus />}
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-primary',
                  !chatsCount && 'hidden'
                )}
              >
                <BotMessageSquare />
                {chatsCount}
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <p>{`${strings.new_dog_form.breed_label}: ${dog.breed}`}</p>
            <p>{`${strings.general.age}: ${getYearsAndMonths(
              dog.birthday
            )}`}</p>
            <p>{`${strings.general.weight}: ${dog.weight} ${strings.general.kg}`}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={imageSrc}
            className='rounded-2xl h-[260px] object-cover'
            alt={dog.name}
            width={260}
            height={260}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
