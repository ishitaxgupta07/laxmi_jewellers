import AboutPage from '@/components/pages/AboutPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Laxmi Jewellers',
  description: 'Learn about Laxmi Jewellers legacy of crafting exceptional jewelry for over three decades.',
}

export default function About() {
  return <AboutPage />
}
