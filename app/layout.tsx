import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LocaleProvider } from '@/components/LocaleProvider';
import { OrderProvider } from '@/components/OrderProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingHelp } from '@/components/FloatingHelp';

export const metadata: Metadata = {
  title: 'Aspire Lounge Switzerland · Digital Buffet Menu',
  description:
    'A calm, premium digital buffet menu for Aspire Lounge guests at Swiss airports. Browse dishes, dietary info, and discreet table service.',
  manifest: '/manifest.json',
  applicationName: 'Aspire Lounge Switzerland',
  appleWebApp: {
    capable: true,
    title: 'Aspire Lounge',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Aspire Lounge Switzerland',
    description: 'A calm, premium moment before your flight.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FBF9F5',
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
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingHelp />
          </OrderProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
