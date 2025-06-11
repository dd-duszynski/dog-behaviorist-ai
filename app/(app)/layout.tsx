import { AppSidebar } from '@/components/app-sidebar/app-sidebar';
import { Header } from '@/components/header/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import '@/lib/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

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
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        >
          <SidebarProvider>
            <AppSidebar />
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
