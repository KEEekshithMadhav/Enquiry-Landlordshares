import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Property Enquiry | LandlordShares',
  description: 'Explore property opportunities with LandlordShares and request details about a property that interests you.',
  icons: { icon: '/images/logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
