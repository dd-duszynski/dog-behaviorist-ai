'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Typography } from '../ui/typography';

type GradientCardProps = {
  iconComponent: React.ReactNode;
  title: string;
  description: string;
  actionButton: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
};

export const GradientCard = ({
  iconComponent,
  title,
  description,
  actionButton,
}: GradientCardProps) => {
  return (
    <>
      <Card className='w-full h-fit flex flex-col justify-between bg-gradient-to-br from-primary-300 to-secondary-300 rounded-2xl px-8 py-3 mt-6'>
        <CardHeader>
          {iconComponent}
          <CardTitle className='flex items-center gap-2'>
            <Typography variant='h3' className='text-white m-0'>
              {title}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography variant='p' className='text-white m-0'>
              {description}
            </Typography>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className='bg-white text-[#4ECDC4] px-6 py-3 rounded-xl hover:shadow-lg'
            variant='action'
            // onClick={actionButton.onClick}
          >
            {actionButton.label}
            {actionButton.icon}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
