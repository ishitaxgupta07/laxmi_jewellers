'use client'

import Link from 'next/link'
import { useMember } from '@/lib/mock-auth'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import GoldSilverRatesBanner from './GoldSilverRatesBanner'

function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-bordersubtle sticky top-0 z-40">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl text-foreground">
            Laxmi Jewellers
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="font-navbar text-foreground hover:text-buttonbackground transition-colors">
              Home
            </Link>
            <Link href="/store" className="font-navbar text-foreground hover:text-buttonbackground transition-colors">
              Shop
            </Link>
            <Link href="/customization" className="font-navbar text-foreground hover:text-buttonbackground transition-colors">
              Custom Design
            </Link>
            {/* <Link href="/resources" className="font-navbar text-foreground hover:text-buttonbackground transition-colors">
              Resources
            </Link> */}
            <Link href="/about" className="font-navbar text-foreground hover:text-buttonbackground transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-navbar text-foreground hover:text-buttonbackground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            {isLoading ? (
              <div className="w-6 h-6 animate-spin rounded-full border-2 border-buttonbackground border-t-transparent"></div>
            ) : !isAuthenticated ? (
              <Button onClick={actions.login} variant="outline" size="sm" className="hidden">
                Sign In
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="font-paragraph text-foreground">
                  {member?.profile?.nickname || 'Profile'}
                </span>
                <Button onClick={actions.logout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            )}

            {/* Cart Icon */}
            <div className="relative group">
              <button className="p-2 text-foreground hover:text-buttonbackground transition-colors">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-foreground text-primary-foreground px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
                Coming Soon!
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45"></div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-buttonbackground transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-bordersubtle">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="font-navbar text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/store" 
                className="font-navbar text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link href="/customization" className="font-navbar text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Design
              </Link>
              <Link 
                href="/about" 
                className="font-navbar text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {/* <Link 
                href="/resources" 
                className="font-navbar text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link> */}
              <Link 
                href="/contact" 
                className="font-navbar text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl mb-4">Laxmi Jewellers</h3>
            <p className="font-paragraph text-primary-foreground/80 mb-4">
              Crafting timeless elegance for over three decades. Your trusted partner in fine jewelry.
            </p>
            <p className="font-paragraph text-primary-foreground/80">{"Certified gold and diamonds, lifetime maintenance, and exceptional craftsmanship."}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/customization" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Custom Design
              </Link>
              <Link href="/about" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              {/* <Link href="/resources" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Resources
              </Link> */}
              <Link href="/contact" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contact</h4>
            <div className="space-y-2 font-paragraph text-primary-foreground/80">
              <p>Ramnagri More, Ashiana Digha Road</p>
              <p>Patna - 800025</p>
              <p className="mt-4">Phone: +91 7739134542</p>
              <p>Email: manish16121976.ig@gmail.com</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading text-lg mb-4">Hours</h4>
            <div className="space-y-2 font-paragraph text-primary-foreground/80">
              <p>Monday - Sunday</p>
              <p>11:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-primary-foreground/80">
            © {new Date().getFullYear()} Laxmi Jewellers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <GoldSilverRatesBanner />
      <main>{children}</main>
      <Footer />
    </>
  )
}
