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
    <><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /></head><html lang="en">
      <body className={inter.className}>
        <Link id="home" className="material-symbols-outlined" href="/">home</Link>
        <div>{children}</div>
      </body>
    </html></>
  )
}
