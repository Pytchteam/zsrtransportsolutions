import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import axios from 'axios';

interface Testimonial {
  id: string;
  customer_name: string;
  service_type: string;
  rating: number;
  quote: string;
  media_url?: string;
  status: string;
  featured: boolean;
}

export function TestimonialsSection({ serviceType }: { serviceType?: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('/api/testimonials');
        const approved = res.data.filter((t: Testimonial) => t.status === 'Approved');
        const filtered = serviceType 
          ? approved.filter((t: Testimonial) => t.service_type === serviceType)
          : approved;
        setTestimonials(filtered);
      } catch (e) {
        console.error('Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [serviceType]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest"
          >
            <Star size={14} fill="currentColor" /> Customer Stories
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">What Our Clients Say</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">Real experiences from people who trust ZSR for their mobility needs.</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={testimonials[currentIndex].media_url || `https://picsum.photos/seed/${testimonials[currentIndex].id}/800/800`}
                  className="w-full h-full object-cover"
                  alt={testimonials[currentIndex].customer_name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-2xl font-bold">{testimonials[currentIndex].customer_name}</p>
                  <p className="text-white/70 text-sm uppercase tracking-widest">{testimonials[currentIndex].service_type}</p>
                </div>
              </div>

              <div className="space-y-8">
                <Quote size={60} className="text-indigo-600/20" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={i < testimonials[currentIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-200"} 
                    />
                  ))}
                </div>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-800 italic">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div className="flex gap-4">
                  <button onClick={prev} className="p-4 rounded-full bg-white border border-neutral-100 shadow-sm hover:bg-neutral-50 transition-all">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={next} className="p-4 rounded-full bg-white border border-neutral-100 shadow-sm hover:bg-neutral-50 transition-all">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function TrustBadges() {
  return (
    <section className="py-16 border-y border-neutral-100">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: 'Secure Payments', desc: 'Encrypted transactions' },
            { icon: CheckCircle2, title: 'Verified Units', desc: '100+ point inspections' },
            { icon: MapPin, title: 'Islandwide', desc: 'Service across Jamaica' },
            { icon: Star, title: 'Top Rated', desc: '4.9/5 Average Rating' },
          ].map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <badge.icon size={24} />
              </div>
              <h4 className="font-bold text-sm uppercase tracking-widest">{badge.title}</h4>
              <p className="text-xs text-neutral-400">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationCard() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-xl">
      <div className="aspect-video w-full bg-neutral-100 relative">
        {/* Placeholder for Google Maps iframe */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.123456789!2d-76.7912345!3d18.0123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDAwJzQ0LjQiTiA3NsKwNDcnMjguNCJX!5e0!3m2!1sen!2sjm!4v1620000000000!5m2!1sen!2sjm" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="ZSR Location"
        ></iframe>
      </div>
      <div className="p-8 space-y-4">
        <h3 className="text-xl font-bold">Visit Our Showroom</h3>
        <p className="text-neutral-500 text-sm">123 Constant Spring Road, Kingston 10, Jamaica</p>
        <div className="flex gap-4 pt-4">
          <a 
            href="https://maps.google.com" 
            target="_blank" 
            className="flex-1 py-3 bg-neutral-900 text-white rounded-xl text-center text-sm font-bold hover:bg-neutral-800 transition-all"
          >
            Get Directions
          </a>
          <a 
            href="tel:18765550123" 
            className="flex-1 py-3 border border-neutral-200 rounded-xl text-center text-sm font-bold hover:bg-neutral-50 transition-all"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
}
