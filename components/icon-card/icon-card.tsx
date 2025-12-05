import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Typography } from '../ui/typography';

type DogCardProps = {
  description: string;
  iconComponent: React.ReactNode;
  iconContainerClassNames?: string;
  title: string;
};

export function IconCard({
  description,
  iconComponent,
  iconContainerClassNames = 'bg-gradient-to-r from-primary-500 to-primary-300',
  title,
}: DogCardProps) {
  return (
    <Card className='min-w-[250px] flex justify-start items-center select-none hover:scale-[1.01] transition-transform duration-200 ease-in-out hover:shadow-md hover:bg-secondary-100'>
      <CardContent className='flex justify-between items-center gap-2 h-full p-4'>
        <div className={cn('p-4  rounded-lg', iconContainerClassNames)}>
          {iconComponent}
        </div>
        <div>
          <Typography variant='h3' className='text-gray-500 text-base m-0'>
            {title}
          </Typography>
          <Typography variant='p' className='text-xl m-0 semibold'>
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
