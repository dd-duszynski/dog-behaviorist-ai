import { SignIn } from '@clerk/nextjs';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center h-screen '>
      <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
