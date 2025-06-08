import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { Header } from '@/components/header/header';
import { ClerkProvider } from '@clerk/nextjs';
import { getDogsByUserId } from '@/lib/db/get-dogs-by-user-id';
import { getAllChatsByUserId } from '@/lib/db/get-all-chats-by-user-id';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AI Dog behaviorist',
  description: 'AI Dog behaviorist',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dogs = await getDogsByUserId();
  const chats = await getAllChatsByUserId();
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        >
          <SidebarProvider>
            <AppSidebar dogs={dogs} chats={chats} />
            <main className='w-full min-h-full relative'>
              <Header />
              <div className='overflow-y-auto h-[calc(100vh-6rem)]'>
                {children}
              </div>
            </main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
