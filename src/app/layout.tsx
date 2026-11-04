import type { Metadata, Viewport } from 'next';
import { Archivo_Black, Barlow_Condensed } from 'next/font/google';
import { MotionConfig } from 'framer-motion';
import StoreProvider from '@/store/StoreProvider';
import './globals.css';

const display = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const body = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Ceramic Tile Order Form — The Artisan Kiln',
  description: 'Order handmade ceramic tiles and design your own pattern.',
};

export const viewport: Viewport = { themeColor: '#F6F0E1', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <StoreProvider>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </StoreProvider>
      </body>
    </html>
  );
}
