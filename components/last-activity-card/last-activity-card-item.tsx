import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getImageSrc } from '@/lib/utils/getImageSrc';
import Image from 'next/image';
import React from 'react';
import { TChatWithDog } from './last-activity-card';
import Link from 'next/link';
import { Typography } from '../ui/typography';
import { strings } from '@/lib/strings/pl';

interface LastActivityCardItemProps {
  item: TChatWithDog;
}

export const LastActivityCardItem: React.FC<
  LastActivityCardItemProps
> = async ({ item }) => {
  const imageSrc = getImageSrc(item.dog?.photo);
  return (
    <Link href={`/chat/${item.id}`}>
      <Card className='grid grid-cols-[90px_1fr] items-center justify-start px-6 py-1 gap-2 hover:scale-[1.005] hover:shadow-md hover:bg-secondary-100 cursor-pointer mx-3 mb-3 border-none shadow-none'>
        <Image
          alt={item.dog?.name || strings.general.your_dog}
          className='rounded-2xl object-cover w-[90px] h-[90px] min-w-[90px] min-h-[90px]'
          height={90}
          src={imageSrc}
          width={90}
        />

        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Typography variant='h4' className='m-0'>
              {item.dog?.name || strings.general.your_dog}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography variant='small' className='m-0'>
              {item.summary || ''}
            </Typography>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
