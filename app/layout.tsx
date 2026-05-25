import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LocaleProvider } from '@/components/LocaleProvider';
import { OrderProvider } from '@/components/OrderProvider';
import { BookingProvider } from '@/components/BookingProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingHelp } from '@/components/FloatingHelp';

export const metadata: Metadata = {
  title: 'Aspire · Airport Lounge Reservations',
  description:
    'Reserve airport lounges, tables and virtual queue places across Aspire Lounges. Real-time occupancy, frictionless check-in.',
  manifest: '/manifest.json',
  applicationName: 'Aspire Reservations',
  appleWebApp: {
    capable: true,
    title: 'Aspire',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Aspire · Airport Lounge Reservations',
    description: 'Premium airport lounges. Reserve a table or join the queue in seconds.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F7F5F3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <OrderProvider>
            <BookingProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <FloatingHelp />
            </BookingProvider>
          </OrderProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
