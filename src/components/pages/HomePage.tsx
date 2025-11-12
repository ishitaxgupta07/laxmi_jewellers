import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Sparkles, Shield, Award, Heart } from 'lucide-react';

export default function HomePage() {
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
              <Button asChild size="lg" className="bg-buttonbackground text-buttonforeground hover:bg-buttonbackground/90">
                <Link to="/store">Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/customization">Custom Design</Link>
              </Button>
            </div>
          </div>

          {/* Asymmetrical Image Placement - Using provided jewelry images */}
          <div className="absolute top-16 left-8 w-48 h-64 hidden lg:block">
            <Image
              src="https://static.wixstatic.com/media/73b405_3bd31be1cec44a278f00dd44e17bed40~mv2.jpg"
              alt="Traditional gold jewelry set with earrings"
              width={192}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="absolute bottom-20 left-16 w-56 h-72 hidden lg:block">
            <Image
              src="https://static.wixstatic.com/media/73b405_e4849ef22cec425da9bfab75e4496287~mv2.jpg"
              alt="Elegant gold necklace with matching earrings"
              width={224}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="absolute top-24 right-12 w-52 h-68 hidden lg:block">
            <Image
              src="https://static.wixstatic.com/media/73b405_39e9a6762acd4c57a0e1586d6b778da6~mv2.jpg"
              alt="Traditional Indian gold jewelry with intricate designs"
              width={208}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="absolute bottom-32 right-8 w-44 h-56 hidden lg:block">
            <Image
              src="https://static.wixstatic.com/media/73b405_b149cae6b8ed45c59fa0c1d4340c98da~mv2.jpg"
              alt="Exquisite gold necklace with traditional motifs"
              width={176}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Additional images for enhanced visual richness */}
          <div className="absolute top-40 left-32 w-40 h-52 hidden xl:block">
            <Image
              src="https://static.wixstatic.com/media/73b405_95a47a76a4ea4c75a3f59b6398b61a2f~mv2.jpg"
              alt="Ornate gold necklace with detailed craftsmanship"
              width={160}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="absolute bottom-48 right-32 w-44 h-60 hidden xl:block">
            <Image
              src="https://static.wixstatic.com/media/73b405_91b5d5ce389747bba4f76b390ebbd4a3~mv2.jpg"
              alt="Luxury diamond and emerald necklace"
              width={176}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
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
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-buttonbackground" />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Gold Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">Timeless pieces in yellow, white, and rose gold</p>
              </div>
            </Link>

            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-buttonbackground" />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Diamond Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">Brilliant cuts and exceptional clarity</p>
              </div>
            </Link>

            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-buttonbackground" />
                </div>
                <h3 className="font-heading text-2xl text-secondary-foreground mb-3">Platinum Jewelry</h3>
                <p className="font-paragraph text-secondary-foreground/80">Pure elegance in the finest metal</p>
              </div>
            </Link>

            <Link to="/store" className="group">
              <div className="bg-secondary rounded-lg p-8 text-center hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-buttonbackground" />
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
                src="https://static.wixstatic.com/media/73b405_d107d299437f4126806ad70ecde4118f~mv2.png?originWidth=576&originHeight=384"
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