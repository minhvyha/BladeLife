import type { Metadata } from 'next'
import { Nunito, Itim } from 'next/font/google'

import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const itim = Itim({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-header',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BladeLife - Ice Skate Blade Maintenance',
  description:
    'Track your ice skate blade life, log skating sessions, and manage blade maintenance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${itim.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
