'use client'

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Bell, ArrowRight } from 'lucide-react';

export default function StorePage() {
  return (
    <div className="min-h-screen">
      {/* Coming Soon Banner Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-[100rem] w-full px-6 relative z-10">
          <div className="text-center">
            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30 rounded-full px-6 py-3 mb-8"
            >
              <Bell className="w-5 h-5 text-primary-foreground" />
              <span className="font-paragraph text-primary-foreground font-semibold">Coming Soon</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 leading-tight"
            >
              Our Online Store is Launching Soon
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-paragraph text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto mb-8"
            >
              Get ready to explore our exclusive collection of handcrafted jewelry. We're putting the finishing touches on an amazing shopping experience just for you.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-paragraph text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-12"
            >
              Browse our curated collections, discover timeless pieces, and experience the finest in jewelry craftsmanship. Stay tuned for the grand opening!
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border border-primary-foreground"
              >
                <Link href="/customization" className="flex items-center gap-2">
                  Explore Custom Design
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link href="/contact">Notify Me</Link>
              </Button>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-8">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-heading text-xl text-primary-foreground mb-2">Exclusive Collections</h3>
                <p className="font-paragraph text-primary-foreground/80">
                  Discover our handpicked selection of gold, diamond, platinum, and silver jewelry
                </p>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-heading text-xl text-primary-foreground mb-2">Certified Quality</h3>
                <p className="font-paragraph text-primary-foreground/80">
                  All pieces come with authentic certifications and quality guarantees
                </p>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-lg p-8">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-heading text-xl text-primary-foreground mb-2">Easy Shopping</h3>
                <p className="font-paragraph text-primary-foreground/80">
                  Seamless browsing, secure checkout, and fast delivery to your doorstep
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-secondary-foreground mb-4">
              What to Expect
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto">
              When our store launches, you'll have access to everything you need to find the perfect piece
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <span className="text-xl">🏆</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-2">Premium Selection</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Browse through our carefully curated collection of jewelry pieces for every occasion and budget
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <span className="text-xl">💎</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-2">Detailed Information</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Complete specifications, certifications, and high-quality images for every product
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <span className="text-xl">🛒</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-2">Easy Checkout</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Secure payment options and a smooth purchasing process from start to finish
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <span className="text-xl">📦</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-2">Fast Delivery</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Quick and reliable shipping with tracking to ensure your jewelry arrives safely
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
            Don't Miss the Launch
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contact us to express your interest or explore our custom design services while you wait
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
