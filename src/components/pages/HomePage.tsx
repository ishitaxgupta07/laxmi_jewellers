import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, Award, Heart } from 'lucide-react';

export default function HomePage() {
  const [currentImageSet, setCurrentImageSet] = useState(0);

  // Define image sets for left and right side rotation
  const leftSideImages = [
    {
      src: "https://static.wixstatic.com/media/73b405_3bd31be1cec44a278f00dd44e17bed40~mv2.jpg",
      alt: "Traditional gold jewelry set with earrings"
    },
    {
      src: "https://static.wixstatic.com/media/73b405_b149cae6b8ed45c59fa0c1d4340c98da~mv2.jpg",
      alt: "Exquisite gold necklace with traditional motifs"
    },
    {
      src: "https://static.wixstatic.com/media/73b405_95a47a76a4ea4c75a3f59b6398b61a2f~mv2.jpg",
      alt: "Ornate gold necklace with detailed craftsmanship"
    }
  ];

  const rightSideImages = [
    {
      src: "https://static.wixstatic.com/media/73b405_39e9a6762acd4c57a0e1586d6b778da6~mv2.jpg",
      alt: "Traditional Indian gold jewelry with intricate designs"
    },
    {
      src: "https://static.wixstatic.com/media/73b405_e4849ef22cec425da9bfab75e4496287~mv2.jpg",
      alt: "Elegant gold necklace with matching earrings"
    },
    {
      src: "https://static.wixstatic.com/media/73b405_91b5d5ce389747bba4f76b390ebbd4a3~mv2.jpg",
      alt: "Luxury diamond and emerald necklace"
    }
  ];

  // Timer for image rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageSet((prev) => (prev + 1) % leftSideImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, [leftSideImages.length]);

  const currentLeftImage = leftSideImages[currentImageSet];
  const currentRightImage = rightSideImages[currentImageSet];
  return (
    <div className="min-h-screen">
      {/* Hero Section - Inspired by the asymmetrical layout */}
      <section className="relative bg-primary min-h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-[120rem] w-full px-6 relative">
          {/* Central Content */}
          <div className="text-center relative z-10">
            <h1 className="font-heading text-6xl md:text-8xl text-primary-foreground mb-4">
              Timeless Elegance
            </h1>
            <p className="font-heading text-2xl md:text-4xl text-primary-foreground italic mb-8">
              in Every Piece
            </p>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-12">
              Discover the finest collection of handcrafted jewelry, where tradition meets contemporary design in perfect harmony.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-buttonbackground text-buttonforeground hover:bg-buttonbackground/90 border border-primary-foreground">
                <Link to="/store">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/customization">Custom Design</Link>
              </Button>
            </div>
          </div>

          {/* Elegant Left and Right Image Animation */}
          <div className="absolute inset-0 hidden lg:block">
            {/* Left Side Image */}
            <div className="absolute left-12 top-1/2 -translate-y-1/2 w-72 h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${currentImageSet}`}
                  initial={{ opacity: 0, x: -50, scale: 0.9, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95, rotateY: 15 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: 0.8 }
                  }}
                  className="w-full h-full"
                >
                  <div className="relative w-full h-full group">
                    <Image
                      src={currentLeftImage.src}
                      alt={currentLeftImage.alt}
                      width={288}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl transform transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Elegant overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side Image */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-72 h-96">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${currentImageSet}`}
                  initial={{ opacity: 0, x: 50, scale: 0.9, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, x: 30, scale: 0.95, rotateY: -15 }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: 0.8 },
                    delay: 0.2
                  }}
                  className="w-full h-full"
                >
                  <div className="relative w-full h-full group">
                    <Image
                      src={currentRightImage.src}
                      alt={currentRightImage.alt}
                      width={288}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl transform transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Elegant overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-transparent to-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      {/* Trust Indicators */}
      <section className="bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-buttonbackground mx-auto mb-4" />
              <h3 className="font-heading text-xl text-secondary-foreground mb-2">Certified Diamonds</h3>
              <p className="font-paragraph text-secondary-foreground/80">Every diamond comes with international certification</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-buttonbackground mx-auto mb-4" />
              <h3 className="font-heading text-xl text-secondary-foreground mb-2">Lifetime Maintenance</h3>
              <p className="font-paragraph text-secondary-foreground/80">Complimentary cleaning and maintenance services</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-buttonbackground mx-auto mb-4" />
              <h3 className="font-heading text-xl text-secondary-foreground mb-2">Buyback Guarantee</h3>
              <p className="font-paragraph text-secondary-foreground/80">100% value protection on all purchases</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-buttonbackground mx-auto mb-4" />
              <h3 className="font-heading text-xl text-secondary-foreground mb-2">Custom Design</h3>
              <p className="font-paragraph text-secondary-foreground/80">Personalized jewelry crafted to perfection</p>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Explore Our Collections</h2>
            <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
              From traditional gold jewelry to contemporary diamond designs, discover pieces that celebrate every moment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 overflow-hidden">
                  <Image 
                    src="https://static.wixstatic.com/media/73b405_4dc59fbd5bd7490eb371913e990b9390~mv2.jpg" 
                    alt="Gold jewelry necklace display"
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Gold Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">{"Timeless pieces in yellow and rose gold"}</p>
              </div>
            </Link>

            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 overflow-hidden">
                  <Image 
                    src="https://static.wixstatic.com/media/73b405_42bddd0b86c64597be213e700b6d7fb9~mv2.jpg" 
                    alt="Diamond necklace with intricate design"
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Diamond Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">Brilliant cuts and exceptional clarity</p>
              </div>
            </Link>

            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 rounded-full mx-auto mb-6 overflow-hidden">
                  <Image 
                    src="https://static.wixstatic.com/media/73b405_6753a1e586b84636b896dc8490e2d674~mv2.jpg" 
                    alt="Elegant diamond tennis necklace"
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Platinum Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">Pure elegance in the finest metal</p>
              </div>
            </Link>

            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://static.wixstatic.com/media/73b405_83e2a6698f8245938b5445f356cbe66c~mv2.jpg"
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                    originWidth={736}
                    originHeight={980} />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Silver Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">Contemporary designs in sterling silver</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* Brand Story Section */}
      <section className="bg-primary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-6">Our Legacy</h2>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-6">
                For over three decades, Laxmi Jewellers has been crafting exceptional jewelry that tells stories, 
                celebrates milestones, and creates lasting memories. Our commitment to quality, authenticity, and 
                customer satisfaction has made us a trusted name in fine jewelry.
              </p>
              <p className="font-paragraph text-lg text-primary-foreground/90 mb-8">
                Every piece in our collection is carefully curated and crafted by skilled artisans who understand 
                the art of jewelry making. We believe that jewelry is not just an accessory, but an expression 
                of your unique style and personality.
              </p>
              <Button asChild size="lg" className="bg-buttonbackground text-buttonforeground hover:bg-buttonbackground/90">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://i.pinimg.com/1200x/c6/ba/82/c6ba82cc2f1c5d540198b66174cbd1a8.jpg"
                alt="Skilled craftsman creating jewelry"
                width={600}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="bg-secondary py-16">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-secondary-foreground mb-4">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Explore our complete collection or work with our designers to create something uniquely yours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-buttonbackground text-buttonforeground hover:bg-buttonbackground/90">
              <Link to="/store">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}