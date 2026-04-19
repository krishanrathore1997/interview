import type { Metadata } from 'next';
import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

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

export const metadata: Metadata = {
  title: 'Full Stack Interview Prep | Krishan Rathore',
  description:
    'Complete fullstack interview preparation guide covering HTML, CSS, Laravel, PHP, JavaScript, TypeScript, React, MySQL, HTTP & APIs, Next.js, Git, Security, Testing, System Design, and DevOps.',
  keywords:
    'HTML interview, CSS interview, Laravel interview, PHP interview, JavaScript interview, TypeScript interview, React interview, MySQL interview, Next.js interview, API design, system design, testing, security, devops, full stack interview preparation',
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
