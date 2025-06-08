import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { Header } from '@/components/header/header';
import { ClerkProvider } from '@clerk/nextjs';
import { getDogs } from '@/lib/getDogs';
import { getAllUserConversations } from '@/lib/getAllUserConversations';

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
  const dogs = await getDogs();
  const conversations = await getAllUserConversations();
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        >
          <SidebarProvider>
            <AppSidebar dogs={dogs} conversations={conversations} />
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
