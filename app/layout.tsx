import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { Header } from '@/components/header/header';
import { ClerkProvider } from '@clerk/nextjs';
import { getDogs } from '@/lib/getDogs';

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
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider>
            <AppSidebar dogs={dogs} />
            <main className='w-full min-h-full relative'>
              <Header />
              {children}
            </main>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
