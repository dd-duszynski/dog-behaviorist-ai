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
import { strings } from '@/lib/strings/pl';

export function Header() {
  return (
    <header className='flex justify-between items-center w-full bg-[#3EA8CF] px-4'>
      <SidebarTrigger />
      <div className='flex justify-start items-center gap-1'>
        <Link href='/' className='font-bold text-xl text-white'>
          {strings.header.title}
        </Link>
        <Image
          alt={strings.header.title}
          height={60}
          src='/logo2.webp'
          width={60}
        />
      </div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </SignedIn>
    </header>
  );
}
