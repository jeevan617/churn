import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Churn Prediction Base',
  description: 'AI-driven Churn Prediction UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
