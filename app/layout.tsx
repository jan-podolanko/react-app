import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'React Forum',
  description: 'by JP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Link style={{position: "absolute", margin: "10px", fontSize: "2em"}} href="/">🏠</Link>
        <div>{children}</div>
      </body>
    </html>
  )
}
