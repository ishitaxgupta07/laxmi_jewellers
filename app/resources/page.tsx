import ResourcesPage from '@/components/pages/ResourcesPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources - Laxmi Jewellers',
  description: 'Jewelry care guides, educational content, and FAQs.',
}

export default function Resources() {
  return <ResourcesPage />
}
