import CustomizationPage from '@/components/pages/CustomizationPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Design - Laxmi Jewellers',
  description: 'Create your dream jewelry piece with our custom design services.',
}

export default function Customization() {
  return <CustomizationPage />
}
