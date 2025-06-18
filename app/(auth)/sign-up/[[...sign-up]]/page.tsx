import { SignUp } from '@clerk/nextjs';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <div className='flex items-center justify-center h-screen '>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUp />
      </Suspense>
    </div>
  );
}
