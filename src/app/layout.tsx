import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { MenuBar } from '@/components/MenuBar';
import { cn } from '@/lib/utils';
import '@mantine/core/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'XDean Data Analysis',
};

export default function RootLayout(
  {
    children,
  }: {
    children: ReactNode
  },
) {
  return (
    <html lang="en">
    <head>
      <ColorSchemeScript/>
    </head>
    <body className={cn(inter.className, 'h-screen flex flex-col')}>
    <MantineProvider>
      <div className={''}>
        <MenuBar/>
      </div>
      <div className={'h-0 flex-grow overflow-auto'}>
        {children}
      </div>
    </MantineProvider>
    </body>
    </html>
  );
}
