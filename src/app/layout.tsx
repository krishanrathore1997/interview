import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const title = 'Full Stack Interview Prep | Krishan Rathore';
const description =
  'Complete fullstack interview preparation guide covering HTML, CSS, Laravel, PHP, JavaScript, TypeScript, React, MySQL, HTTP & APIs, Next.js, Git, Security, Testing, System Design, and DevOps.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Full Stack Interview Prep',
  },
  description,
  keywords:
    'HTML interview, CSS interview, Laravel interview, PHP interview, JavaScript interview, TypeScript interview, React interview, MySQL interview, Next.js interview, API design, system design, testing, security, devops, full stack interview preparation',
  authors: [{ name: 'Krishan Rathore' }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Full Stack Interview Prep',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: '#0f766e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
