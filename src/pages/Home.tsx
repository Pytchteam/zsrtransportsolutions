import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Key, Truck, ShieldCheck, CheckCircle2, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: 'Buy / Import',
    desc: 'Browse local inventory or source your dream car directly from Japan or UK.',
    icon: Car,
    link: '/vehicles',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Rentals',
    desc: 'Reliable, clean, and fast rental units for personal or commercial use.',
    icon: Key,
    link: '/rentals',
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Wrecker',
    desc: '24/7 emergency roadside support and vehicle recovery across Jamaica.',
    icon: Truck,
    link: '/wrecker',
    color: 'bg-red-50 text-red-600'
  },
  {
    title: 'Custom Sourcing',
    desc: 'Tell us what you need, and we handle the logistics from port to road.',
    icon: ShieldCheck,
    link: '/imports',
    color: 'bg-purple-50 text-purple-600'
  }
];

export function HomePage() {
  return (
    <div className="space-y-24 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://res.cloudinary.com/dopxnugqn/video/upload/v1768777806/From_KlickPin_CF_Unwrap_the_Luxury_of_the_2024_BMW_3_Series_this_Holiday_Season___Luxury_automotive_Car_videos_Car_advertising_iq49jv.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-bold uppercase tracking-[0.2em]"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dopxnugqn/image/upload/v1774279992/WhatsApp_Image_2026-03-23_at_10.32.40_zpruty.jpg" 
                  alt="ZSR Icon" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Jamaica's #1 Mobility Hub
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-white leading-[0.85] tracking-tighter"
            >
              DRIVEN BY <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600 italic">EXCELLENCE.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-neutral-300 leading-relaxed max-w-xl font-light"
            >
              Jamaica's premier destination for vehicle sales, rentals, and 24/7 emergency support. Built on trust, powered by action.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-8"
            >
              <Link to="/vehicles" className="px-8 sm:px-12 py-4 sm:py-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-red-600/20 hover:scale-105 active:scale-95 group">
                Browse Vehicles <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/wrecker" className="px-8 sm:px-12 py-4 sm:py-6 bg-white hover:bg-neutral-100 text-neutral-900 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-white/10 hover:scale-105 active:scale-95 group">
                Emergency Wrecker <Truck size={24} className="group-hover:rotate-12 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 hidden lg:block pointer-events-none">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-20 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-white font-bold">120+ Points</div>
                <div className="text-white/60 text-xs">Inspection Passed</div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-20 right-40 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-white">
                <Clock size={24} />
              </div>
              <div>
                <div className="text-white font-bold">24/7 Support</div>
                <div className="text-white/60 text-xs">Dispatch Ready</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scrolling Loop Section */}
      <section className="py-16 bg-neutral-900 border-y border-white/5 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-900 z-10 pointer-events-none" />
        <div className="flex animate-scroll-loop whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-16 mx-16">
              <span className="text-4xl font-display font-black text-white/20 uppercase tracking-tighter">Fast Delivery</span>
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <span className="text-4xl font-display font-black text-white/20 uppercase tracking-tighter">Verified Units</span>
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              <span className="text-4xl font-display font-black text-white/20 uppercase tracking-tighter">24/7 Wrecker</span>
              <div className="w-3 h-3 bg-red-600 rounded-full" />
              <span className="text-4xl font-display font-black text-white/20 uppercase tracking-tighter">Islandwide Support</span>
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter mb-6 md:mb-8"
          >
            ONE HUB. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600">EVERY SOLUTION.</span>
          </motion.h2>
          <p className="text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed">
            We've simplified the mobility experience. Whether you're buying, renting, or stuck on the road, ZSR is your engine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 bg-white rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-3xl ${service.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-3xl font-display font-black tracking-tight mb-4">{service.title}</h3>
              <p className="text-neutral-500 leading-relaxed mb-10 font-medium">
                {service.desc}
              </p>
              <Link to={service.link} className="flex items-center gap-3 text-red-600 font-black uppercase tracking-widest text-sm group-hover:gap-5 transition-all">
                Explore <ArrowRight size={20} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 text-xs font-bold uppercase tracking-widest"
                >
                  About ZSR Platform
                </motion.div>
                <h2 className="text-5xl font-display font-black tracking-tight leading-none">THE ENGINE BEHIND <br /> JAMAICAN MOBILITY.</h2>
                <p className="text-lg text-neutral-500 leading-relaxed font-light">
                  ZSR was founded on a simple principle: mobility should be seamless. 
                  We've built a technology-first ecosystem that connects Jamaicans with 
                  premium vehicle sales, reliable rentals, and 24/7 emergency support. 
                  Our mission is to eliminate the friction of vehicle ownership and logistics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { t: 'Fast Response', d: 'Average wrecker dispatch time under 30 minutes islandwide.' },
                  { t: 'Verified Units', d: 'Every vehicle undergoes a rigorous 120-point inspection.' },
                  { t: 'Transparent Pricing', d: 'No hidden fees. What you see is what you pay, every time.' },
                  { t: 'Full Logistics', d: 'We handle the paperwork, customs, and delivery for you.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.t} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 text-green-500 shrink-0"><CheckCircle2 size={24} /></div>
                    <div>
                      <h4 className="font-bold text-lg">{item.t}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/about" className="btn-primary px-10 py-4 inline-flex items-center gap-2">
                  Learn More About Us <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000" 
                alt="Logistics" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs">
                <div className="flex gap-1 text-yellow-400 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm font-medium italic">
                  "ZSR saved me when my car broke down at 2 AM. Fast, professional, and reliable."
                </p>
                <p className="text-xs text-neutral-400 mt-2">— Ricardo M., Kingston</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 rounded-[4rem] p-12 md:p-24 text-center text-white space-y-12 relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full -ml-48 -mb-48 blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.85]">READY TO <br /> GET MOVING?</h2>
            <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto font-light">
              Whether you're looking for your next ride or need immediate support, the ZSR team is standing by.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-8">
              <a href="https://wa.me/18768751506" className="px-8 sm:px-12 py-4 sm:py-6 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg sm:text-xl transition-all shadow-2xl shadow-red-600/20 hover:scale-105 active:scale-95">
                WhatsApp Now
              </a>
              <Link to="/contact" className="px-8 sm:px-12 py-4 sm:py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-lg sm:text-xl transition-all hover:scale-105 active:scale-95">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
