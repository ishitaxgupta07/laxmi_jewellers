import { Outlet, Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-bordersubtle sticky top-0 z-40">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl text-foreground">
            Laxmi Jewellers
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors">
              Home
            </Link>

            <Link to="/customization" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors">
              Custom Design
            </Link>
            <Link to="/about" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors">
              About
            </Link>
            <Link to="/resources" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors">
              Resources
            </Link>
            <Link to="/contact" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Authentication */}
            {isLoading ? (
              <div className="w-6 h-6 animate-spin rounded-full border-2 border-buttonbackground border-t-transparent"></div>
            ) : !isAuthenticated ? (
              <Button onClick={actions.login} variant="outline" size="sm">
                Sign In
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors">
                  {member?.profile?.nickname || 'Profile'}
                </Link>
                <Button onClick={actions.logout} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            )}

            {/* Mini Cart */}
            <MiniCart cartIcon={ShoppingCart} cartIconClassName="text-foreground hover:text-buttonbackground transition-colors" />

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
                to="/" 
                className="font-paragraph text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link to="/customization" className="font-paragraph text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Design
              </Link>
              <Link 
                to="/about" 
                className="font-paragraph text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/resources" 
                className="font-paragraph text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                to="/contact" 
                className="font-paragraph text-foreground hover:text-buttonbackground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
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
              <Link to="/customization" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Custom Design
              </Link>
              <Link to="/about" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg mb-4">Services</h4>
            <div className="space-y-2">
              <p className="font-paragraph text-primary-foreground/80">{"Certified Gold & Diamonds"}</p>
              <p className="font-paragraph text-primary-foreground/80">Lifetime Maintenance</p>
              <p className="font-paragraph text-primary-foreground/80">Buyback Guarantee</p>
              <p className="font-paragraph text-primary-foreground/80">Safe Shipping</p>
              <p className="font-paragraph text-primary-foreground/80">Gift Cards</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contact</h4>
            <div className="space-y-2">

              <p className="font-paragraph text-primary-foreground/80">{"Email: manish16121976.ig@gmail.com"}</p>
              <p className="font-paragraph text-primary-foreground/80">{"Phone: +91 7739134542"}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-primary-foreground/80">{"© 2025 Laxmi Jewellers. All rights reserved. | Privacy Policy | Terms of Service"}</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}