import Link from 'next/link';
import { SidebarTrigger } from '../ui/sidebar';
import Image from 'next/image';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export function Header() {
  return (
    <header className='flex justify-between w-full bg-slate-500'>
      <SidebarTrigger />
      <div className='flex justify-start items-center gap-1'>
        <Link href='/' className='font-bold text-xl'>
          AI Dog behaviorist
        </Link>
        <Image
          src='/logo.webp'
          alt='AI Dog behaviorist'
          width={60}
          height={60}
        />
      </div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
