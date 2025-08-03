'use client';

import { Button } from '@/components/ui/button';
import { strings } from '@/lib/strings/pl';

export default function SettingsPageComponent() {
  return (
    <div className='p-4'>
      <div className='pt-4'>
        <h1 className='text-2xl font-bold'>{strings.app_sidebar.settings}</h1>
        <p>{strings.settings.delete_account_description}</p>
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
