import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'দৈনিক রুটিন | Daily Schedule',
  description: 'একটি কনটেন্ট ক্রিয়েটরের দৈনিক রুটিন',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}
