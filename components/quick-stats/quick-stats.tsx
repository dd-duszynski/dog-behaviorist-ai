import { IconCard } from '@/components/icon-card/icon-card';
import { strings } from '@/lib/strings/pl';
import {
  BatteryCharging,
  Dog as DogIcon,
  Goal,
  MessageSquareIcon,
} from 'lucide-react';
import { TDog } from '../../lib/models/dog-model';

type QuickStatsProps = {
  dogs: TDog[];
};

export const QuickStats = ({ dogs }: QuickStatsProps) => {
  return (
    <div className='flex gap-4 mt-6 justify-around '>
      <IconCard
        description={dogs.length.toString()}
        iconComponent={<DogIcon className='h-7 w-7 text-white' />}
        title={strings.general.your_dogs}
      />
      <IconCard
        description={'12'}
        iconComponent={<MessageSquareIcon className='h-7 w-7 text-white' />}
        iconContainerClassNames='bg-gradient-to-r from-secondary-500 to-secondary-300'
        title={strings.general.chats}
      />
      <IconCard
        description='5/12'
        iconComponent={<Goal className='h-7 w-7 text-white' />}
        iconContainerClassNames='bg-gradient-to-r from-tertiary-500 to-tertiary-300'
        title={strings.general.achieved_goals}
      />
      <IconCard
        description='+23%'
        iconComponent={<BatteryCharging className='h-7 w-7 text-white' />}
        iconContainerClassNames='bg-gradient-to-r from-primary-500 to-primary-300'
        title={strings.general.progress}
      />
    </div>
  );
};
