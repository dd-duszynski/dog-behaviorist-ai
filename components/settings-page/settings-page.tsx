'use client';

import { Button } from '@/components/ui/button';
import { strings } from '@/lib/strings/pl';
import { Typography } from '../ui/typography';

export default function SettingsPageComponent() {
  return (
    <div className='p-4'>
      <div className='pt-4'>
        <Typography variant='h1' className='text-gray-500 m-0'>
          {strings.general.settings}
        </Typography>
        <Typography variant='p'>
          {strings.settings.delete_account_description}
        </Typography>
        <Button
          variant='destructive'
          onClick={() => {
            /* Handle account deletion */
          }}
        >
          {strings.settings.delete_account}
        </Button>
      </div>
    </div>
  );
}
