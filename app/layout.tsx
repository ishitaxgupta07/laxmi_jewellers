import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Inter } from 'next/font/google'
import './globals.css'
import { MemberProvider } from '@/lib/mock-auth'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Analytics } from '@vercel/analytics/next'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-navbar',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-paragraph',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Laxmi Jewellers - Timeless Elegance in Every Piece',
  description: 'Discover the finest collection of handcrafted jewelry, where tradition meets contemporary design. BIS Hallmarked gold, IGI certified diamonds, and exceptional craftsmanship.',
  keywords: ['jewelry', 'gold', 'diamonds', 'platinum', 'silver', 'custom jewelry', 'BIS hallmark', 'IGI certified'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${inter.variable}`}>
      <body className="font-paragraph">
        <MemberProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </MemberProvider>
        <Analytics />
      </body>
    </html>
  )
}
