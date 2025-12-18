import type { Metadata } from "next";
import {  Montserrat } from "next/font/google";
import "./globals.css";
import SessionProvider from '@/components/SessionProvider';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat', // Add this line
});

export const metadata: Metadata = {
  title: "AmacaThera - Transforming Therapeutics",
  description: "Revolutionizing Therapeutics with Injectable Hydrogel Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${montserrat.className} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
