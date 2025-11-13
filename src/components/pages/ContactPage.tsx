import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contact form submission:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="font-heading text-3xl text-foreground mb-4">Message Sent!</h1>
          <p className="font-paragraph text-foreground/80 mb-6">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="bg-buttonbackground text-buttonforeground">
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-7xl text-primary-foreground mb-6">
              Contact Us
            </h1>
            <p className="font-paragraph text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              We're here to help you find the perfect piece or answer any questions you may have
            </p>
          </div>
        </div>
      </section>
      {/* Contact Information & Form */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="font-heading text-4xl text-foreground mb-8">Get in Touch</h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-8">
                Visit our showroom, call us, or send us a message. Our jewelry experts are ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-buttonbackground mt-1" />
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2">Visit Our Showroom</h3>
                    <p className="font-paragraph text-foreground/80">
                      Ramnagri More, Ashiana Digha Road<br />
                      Patna - 800025
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-buttonbackground mt-1" />
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2">Call Us</h3>
                    <p className="font-paragraph text-foreground/80">
                      +91 7739134542
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-buttonbackground mt-1" />
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2">Email Us</h3>
                    <p className="font-paragraph text-foreground/80">
                      manish16121976.ig@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-buttonbackground mt-1" />
                  <div>
                    <h3 className="font-heading text-xl text-foreground mb-2">Business Hours</h3>
                    <p className="font-paragraph text-foreground/80">
                    Monday - Sunday: 11:00 AM - 9:00 PM
                  </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-bordersubtle">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-foreground">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-paragraph text-foreground mb-2">Name *</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="border-bordersubtle"
                        />
                      </div>
                      <div>
                        <label className="block font-paragraph text-foreground mb-2">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="border-bordersubtle"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-paragraph text-foreground mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-bordersubtle"
                      />
                    </div>

                    <div>
                      <label className="block font-paragraph text-foreground mb-2">Subject *</label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger className="border-bordersubtle">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                          <SelectItem value="product-question">Product Question</SelectItem>
                          <SelectItem value="custom-design">Custom Design</SelectItem>
                          <SelectItem value="repair-service">Repair Service</SelectItem>
                          <SelectItem value="warranty-claim">Warranty Claim</SelectItem>
                          <SelectItem value="appointment">Schedule Appointment</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block font-paragraph text-foreground mb-2">Message *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us how we can help you..."
                        required
                        className="border-bordersubtle min-h-[120px]"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-buttonbackground text-buttonforeground hover:bg-buttonbackground/90">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="bg-secondary py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl text-secondary-foreground mb-4">Our Services</h2>
            <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-3xl mx-auto">
              Comprehensive jewelry services to meet all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-bordersubtle text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Custom Design</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Create unique pieces tailored to your vision and preferences
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Repair & Maintenance</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Professional repair and lifetime maintenance services
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">📜</span>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Certification</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  All diamonds come with international certification
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Buyback Guarantee</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  100% value protection on all your jewelry purchases
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Safe Shipping</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Secure and insured delivery to your doorstep
                </p>
              </CardContent>
            </Card>

            <Card className="border-bordersubtle text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-softaccent rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="font-heading text-xl text-secondary-foreground mb-3">Gift Cards</h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Perfect for special occasions and celebrations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="bg-background py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl text-foreground mb-4">Find Us</h2>
            <p className="font-paragraph text-lg text-foreground/80">
              Located in Patna, Bihar
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-8">
            <div className="w-full h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.2345678901234!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059b8de2b8b8b8b!2sRamnagri%20More%2C%20Ashiana%20Digha%20Road%2C%20Patna%2C%20Bihar%20800025!5e0!3m2!1sen!2sin!4v1699123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ramnagri More, Ashiana Digha Road, Patna - 800025"
              ></iframe>
            </div>
            <div className="mt-4 text-center">
              <p className="font-paragraph text-secondary-foreground">
                <MapPin className="w-5 h-5 inline-block mr-2" />
                Ramnagri More, Ashiana Digha Road, Patna - 800025
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}