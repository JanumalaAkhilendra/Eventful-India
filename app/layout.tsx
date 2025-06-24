import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@/contexts/app-context';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ArtistHub - Book Amazing Artists for Your Events',
  description: 'Connect with talented performers, speakers, and entertainers. Find the perfect artist for your event with our comprehensive booking platform.',
  keywords: 'artists, booking, events, performers, entertainment, speakers, musicians',
  authors: [{ name: 'ArtistHub Team' }],
  openGraph: {
    title: 'ArtistHub - Book Amazing Artists for Your Events',
    description: 'Connect with talented performers, speakers, and entertainers.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtistHub - Book Amazing Artists for Your Events',
    description: 'Connect with talented performers, speakers, and entertainers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}