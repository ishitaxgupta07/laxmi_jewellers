import StorePage from '@/components/pages/StorePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop - Laxmi Jewellers',
  description: 'Browse our exquisite collection of gold, diamond, platinum, and silver jewelry.',
}

export default function Store() {
  return <StorePage />
}
