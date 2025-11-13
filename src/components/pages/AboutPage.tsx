import { useState, useEffect } from 'react';
import { BaseCrudService } from '@/integrations';
import { Testimonials } from '@/entities';
import { Image } from '@/components/ui/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, Shield, Heart, Users } from 'lucide-react';

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Testimonials>('testimonials');
        setTestimonials(items);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-6">
              Our Story
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Three decades of crafting exceptional jewelry, building trust, and creating memories that last a lifetime
            </p>
          </div>
        </div>
      </section>
      {/* Brand Story */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-4xl text-foreground mb-6">The Laxmi Legacy</h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">{"Founded in 2004, Laxmi Jewellers began as a small family business with a simple vision: to create jewelry that celebrates life's most precious moments. What started as a modest workshop has grown into one of India's most trusted names in fine jewelry."}</p>

              <p className="font-paragraph text-lg text-foreground/80">{"Our founder, Mr. Manish Kumar, believed that jewelry should be more than just an accessory—it should tell a story, capture emotions, and become a treasured heirloom passed down through generations. This philosophy continues to guide everything we do today."}</p>
            </div>
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/73b405_d2a1433fd38d42e2a810dc9dda1d2856~mv2.png"
                alt="Elegant gold jewelry set with ornate necklace and matching earrings on green background"
                width={600}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-secondary-foreground mb-4">Our Values</h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto">
              The principles that guide our craft and define our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-secondary-foreground mb-3">Excellence</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                Every piece is crafted with meticulous attention to detail and uncompromising quality standards
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Shield className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-secondary-foreground mb-3">Trust</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                Transparency in pricing, authenticity in materials, and honesty in every interaction
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Heart className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-secondary-foreground mb-3">Passion</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                Our love for jewelry making drives us to create pieces that touch hearts and souls
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-8 h-8 text-buttonbackground" />
              </div>
              <h3 className="font-heading text-xl text-secondary-foreground mb-3">Family</h3>
              <p className="font-paragraph text-secondary-foreground/80">
                We treat every customer as part of our extended family, building relationships that last
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Craftsmanship Section */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="https://static.wixstatic.com/media/73b405_1f08d248efb246a3a05a0ed1d54248cc~mv2.png?originWidth=576&originHeight=384"
                alt="Skilled artisan crafting jewelry"
                width={600}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="font-heading text-4xl text-foreground mb-6">Master Craftsmanship</h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Our team of skilled artisans combines traditional techniques passed down through generations 
                with modern technology to create jewelry of exceptional beauty and durability.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 mb-6">
                Each piece undergoes rigorous quality checks at multiple stages of production. From the 
                initial design concept to the final polish, every detail is carefully considered and 
                expertly executed.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-buttonbackground rounded-full mt-2"></div>
                  <p className="font-paragraph text-foreground/80">Hand-selected precious metals and gemstones</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-buttonbackground rounded-full mt-2"></div>
                  <p className="font-paragraph text-foreground/80">Traditional techniques combined with modern precision</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-buttonbackground rounded-full mt-2"></div>
                  <p className="font-paragraph text-foreground/80">Multiple quality checkpoints throughout production</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-buttonbackground rounded-full mt-2"></div>
                  <p className="font-paragraph text-foreground/80">Final inspection and certification before delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-primary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-primary-foreground mb-4">What Our Customers Say</h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Hear from the families who have trusted us with their most precious moments
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mx-auto"></div>
              <p className="font-paragraph text-primary-foreground/80 mt-4">Loading testimonials...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="bg-secondary border-bordersubtle">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div>
                        <h4 className="font-heading text-lg text-secondary-foreground">
                          {testimonial.customerName}
                        </h4>
                        <div className="flex items-center">
                          {renderStars(testimonial.rating || 5)}
                        </div>
                      </div>
                    </div>
                    <p className="font-paragraph text-secondary-foreground/80 mb-4">
                      "{testimonial.testimonialText}"
                    </p>
                    {testimonial.productReviewed && (
                      <p className="font-paragraph text-sm text-secondary-foreground/60">
                        Product: {testimonial.productReviewed}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Awards & Recognition */}
      <section className="bg-secondary py-20">
      </section>
    </div>
  );
}