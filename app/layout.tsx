
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@/contexts/app-context';
import Navbar from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

// Set your production URL here
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), // Add this to fix metadataBase warning
  title: 'ArtistHub - Book Amazing Artists for Your Events',
  description: 'Connect with talented performers, speakers, and entertainers. Find the perfect artist for your event with our comprehensive booking platform.',
  keywords: 'artists, booking, events, performers, entertainment, speakers, musicians',
  authors: [{ name: 'ArtistHub Team' }],
  openGraph: {
    title: 'ArtistHub - Book Amazing Artists for Your Events',
    description: 'Connect with talented performers, speakers, and entertainers.',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL, // Add URL to openGraph
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`, // Add your OpenGraph image
        width: 1200,
        height: 630,
        alt: 'ArtistHub - Book Amazing Artists',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtistHub - Book Amazing Artists for Your Events',
    description: 'Connect with talented performers, speakers, and entertainers.',
    images: [`${SITE_URL}/twitter-image.jpg`], // Add your Twitter image
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Split into client and server components
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ClientProviders>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}

// Create a separate client component for providers
function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppProvider>
        {children}
      </AppProvider>
    </ThemeProvider>
  );
}