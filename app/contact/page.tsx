import ContactPage from '@/components/pages/ContactPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Laxmi Jewellers',
  description: 'Get in touch with Laxmi Jewellers. Visit our showroom or send us a message.',
}

export default function Contact() {
  return <ContactPage />
}
