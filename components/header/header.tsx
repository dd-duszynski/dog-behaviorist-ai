import Link from 'next/link';
import { SidebarTrigger } from '../ui/sidebar';
import Image from 'next/image';

export function Header() {
  return (
    <header className='flex justify-between w-full bg-slate-500'>
      <SidebarTrigger />

      <Link href='/' className='font-bold text-xl'>
        AI Dog behaviorist
      </Link>
      <div className='flex justify-start items-center gap-1'>
        <Image
          src='/logo.webp'
          alt='AI Dog behaviorist'
          width={60}
          height={60}
        />
      </div>
    </header>
  );
}
