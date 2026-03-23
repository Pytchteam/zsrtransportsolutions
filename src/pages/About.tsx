import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Award, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="pt-24 pb-24 space-y-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 text-sm font-bold uppercase tracking-[0.2em]"
        >
          Our Story
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter leading-[0.85]"
        >
          REDEFINING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600">MOBILITY</span> IN JAMAICA
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-500 max-w-3xl mx-auto font-light leading-relaxed"
        >
          ZSR is more than just a vehicle platform. We are a technology-driven mobility ecosystem 
          dedicated to providing trust, transparency, and speed to every driver on the island.
        </motion.p>
      </section>

      {/* Mission/Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-neutral-900 text-white p-12 rounded-[3rem] space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <Target className="text-red-600" size={48} />
            <h2 className="text-4xl font-display font-bold">Our Mission</h2>
            <p className="text-neutral-400 text-lg leading-relaxed">
              To empower Jamaicans with seamless access to quality vehicles and reliable emergency support 
              through innovation, integrity, and unparalleled customer service.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white border border-neutral-100 p-12 rounded-[3rem] shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            <ShieldCheck className="text-indigo-600" size={48} />
            <h2 className="text-4xl font-display font-bold">Our Vision</h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              To become the most trusted and efficient mobility hub in the Caribbean, 
              setting the gold standard for vehicle sales, rentals, and logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-neutral-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-display font-bold">The ZSR Standard</h2>
            <p className="text-neutral-500">The values that drive us every single day.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Unwavering Trust',
                desc: 'We believe in complete transparency. Every vehicle is verified, and every transaction is secure.',
                icon: ShieldCheck
              },
              {
                title: 'Customer Obsession',
                desc: 'Your mobility is our priority. We are available 24/7 to ensure you never stay stuck.',
                icon: Users
              },
              {
                title: 'Excellence in Action',
                desc: 'We don\'t just move cars; we move fast. Efficiency is at the heart of everything we do.',
                icon: Award
              }
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-indigo-600">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold">{value.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-display font-black tracking-tight">WHY CHOOSE <br /> ZSR PLATFORM?</h2>
            <div className="space-y-6">
              {[
                '120-Point Inspection on all sales units',
                '24/7 Islandwide Wrecker & Emergency Support',
                'Seamless Vehicle Importation from Japan & UK',
                'Premium Rental Fleet with flexible terms',
                'Transparent pricing with no hidden fees'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-lg font-medium">
                  <div className="text-green-500 shrink-0"><CheckCircle2 size={24} /></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white">
              <img 
                src="https://res.cloudinary.com/dopxnugqn/image/upload/v1774279992/WhatsApp_Image_2026-03-23_at_10.32.40_zpruty.jpg" 
                alt="ZSR Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-indigo-600 text-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block">
              <div className="text-5xl font-display font-black">100%</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="bg-neutral-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold uppercase tracking-widest">
                Visit Us
              </div>
              <h2 className="text-5xl font-display font-black tracking-tight">OUR HEADQUARTERS</h2>
              <p className="text-neutral-400 text-lg leading-relaxed font-light">
                Located in the heart of Kingston, our main logistics hub is where the magic happens. 
                From vehicle inspections to custom sourcing consultations, our team is ready to welcome you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Kingston, Jamaica</div>
                    <div className="text-neutral-500">Main Logistics Hub</div>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.app.goo.gl/c4G9MsVME16yeHY58" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 rounded-2xl font-bold hover:bg-neutral-100 transition-all group"
              >
                Open in Google Maps <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent rounded-[3rem] pointer-events-none z-10" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl aspect-video">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.444747447474!2d-76.7935!3d18.0179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eda296242525252%3A0x0!2zMTjCsDAxJzA0LjQiTiA3NsKwNDcnMzYuNiJX!5e0!3m2!1sen!2sjm!4v1711180000000!5m2!1sen!2sjm"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZSR Headquarters Location"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
