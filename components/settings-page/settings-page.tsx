'use client';

import { Button } from '@/components/ui/button';
import { strings } from '@/lib/strings/pl';
import { Typography } from '../ui/typography';

export default function SettingsPageComponent() {
  return (
    <div>
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
  );
}

// Poziom zaawansowania Właściciela / AI - na jakim maja byc odpowiedzi.
// 1 - to moj pierwszy pies,2,3 - znam sie na psach
