import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="pt-24 pb-24 space-y-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-sm font-bold uppercase tracking-[0.2em]"
        >
          Contact Us
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter leading-[0.85]"
        >
          GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600">TOUCH</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-500 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Whether you're looking for your next ride or need immediate roadside support, 
          the ZSR team is standing by 24/7.
        </motion.p>
      </section>

      {/* Contact Info Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Call Us',
              desc: 'Available 24/7 for emergency wrecker support.',
              info: '+1 (876) 875-1506',
              icon: Phone,
              color: 'bg-red-50 text-red-600'
            },
            {
              title: 'Email Us',
              desc: 'For general inquiries and vehicle sales.',
              info: 'team@pytchmarketing.com',
              icon: Mail,
              color: 'bg-indigo-50 text-indigo-600'
            },
            {
              title: 'Visit Us',
              desc: 'Our main office in Kingston.',
              info: 'Kingston, Jamaica',
              icon: MapPin,
              color: 'bg-neutral-900 text-white'
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm space-y-6">
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-neutral-500 text-sm">{item.desc}</p>
              <div className="text-lg font-bold">{item.info}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Form & Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white p-12 rounded-[3rem] border border-neutral-100 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="space-y-2 relative z-10">
            <h2 className="text-4xl font-display font-bold">Send a Message</h2>
            <p className="text-neutral-500">We respond to all inquiries within 2 hours.</p>
          </div>

          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Full Name</label>
                <input required className="w-full p-5 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-red-600/20 font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Phone Number</label>
                <input required className="w-full p-5 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-red-600/20 font-medium" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
              <input required type="email" className="w-full p-5 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-red-600/20 font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Message</label>
              <textarea required rows={5} className="w-full p-5 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-red-600/20 font-medium resize-none" />
            </div>
            <button className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg font-bold">
              Send Message <ArrowRight size={20} />
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-neutral-900 text-white p-12 rounded-[3rem] space-y-8 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="space-y-2 relative z-10">
              <h2 className="text-4xl font-display font-bold">Quick Support</h2>
              <p className="text-neutral-400">Need immediate help? Reach out on WhatsApp.</p>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Clock size={24} className="text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-50">Response Time</div>
                  <div className="text-lg font-bold">Under 30 Minutes</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <MessageSquare size={24} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest opacity-50">Support Channels</div>
                  <div className="text-lg font-bold">WhatsApp, Phone, Email</div>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/18768751506"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 relative z-10"
            >
              <MessageSquare size={24} /> Chat on WhatsApp
            </a>
          </div>

          <div className="bg-neutral-100 rounded-[3rem] p-12 space-y-6">
            <h3 className="text-2xl font-display font-bold">Our Location</h3>
            <p className="text-neutral-500">
              We operate islandwide across Jamaica, with our main logistics hub located in Kingston.
            </p>
            <div className="aspect-[16/9] bg-neutral-200 rounded-2xl overflow-hidden border border-neutral-200 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.444747447474!2d-76.7935!3d18.0179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eda296242525252%3A0x0!2zMTjCsDAxJzA0LjQiTiA3NsKwNDcnMzYuNiJX!5e0!3m2!1sen!2sjm!4v1711180000000!5m2!1sen!2sjm"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="ZSR Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
