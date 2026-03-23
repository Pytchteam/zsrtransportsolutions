import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Clock, ShieldAlert, AlertTriangle, Truck, User, ChevronRight, CheckCircle2, Upload, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';

const VEHICLE_TYPES = ['Sedan', 'SUV', 'Pickup Truck', 'Motorcycle', 'Commercial Truck', 'Other'];
const ISSUE_TYPES = ['Accident', 'Breakdown', 'Flat Tire', 'Dead Battery', 'Out of Fuel', 'Lockout', 'Other'];

export function WreckerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    vehicle_type: '',
    issue_type: '',
    pickup_location: '',
    dropoff_location: '',
    urgency: 'Standard',
    notes: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('/api/towing-requests', formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting towing request:', error);
      alert('Failed to submit request. Please call us directly for immediate assistance.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const message = `*EMERGENCY TOWING REQUEST*\n\n` +
      `*Name:* ${formData.full_name || 'Not provided'}\n` +
      `*Vehicle:* ${formData.vehicle_type || 'Not provided'}\n` +
      `*Issue:* ${formData.issue_type || 'Not provided'}\n` +
      `*Pickup:* ${formData.pickup_location || 'Not provided'}\n` +
      `*Urgency:* ${formData.urgency}`;
    return `https://wa.me/18768751506?text=${encodeURIComponent(message)}`;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-3xl p-12 text-center shadow-xl border border-neutral-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Request Received!</h1>
          <p className="text-neutral-600 text-lg mb-8">
            Our dispatch team is processing your request. A driver will contact you shortly.
          </p>
          <div className="space-y-4">
            <a href="tel:18768751506" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
              <Phone size={20} /> Call Dispatch Directly
            </a>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-brand-primary font-medium hover:underline"
            >
              Submit another request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sticky Emergency CTAs */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden bg-white/80 backdrop-blur-lg border-t border-neutral-200 flex gap-3">
        <a href="tel:18768751506" className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
          <Phone size={20} /> Call Now
        </a>
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
          <MessageSquare size={20} /> WhatsApp
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative bg-neutral-900 pt-40 pb-24 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1920" 
            alt="Towing Service" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 via-neutral-900/40 to-neutral-900"></div>
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-md border border-red-500/30 px-6 py-2 rounded-full text-red-500 text-sm font-bold uppercase tracking-[0.2em] mb-12"
          >
            <ShieldAlert size={18} className="animate-pulse" /> 24/7 Emergency Roadside
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-9xl font-display font-black text-white mb-8 tracking-tighter leading-[0.85]"
          >
            STUCK? <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-500">WE'RE ON IT.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed"
          >
            Fast, reliable wrecking and towing services across Jamaica. Professional recovery when you need it most, with absolute precision.
          </motion.p>

          <div className="hidden md:flex justify-center gap-8">
            <motion.a 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="tel:18768751506" 
              className="bg-red-600 text-white py-6 px-12 rounded-[2rem] font-bold text-2xl shadow-2xl shadow-red-600/30 flex items-center gap-4 border-b-4 border-red-800 transition-all"
            >
              <Phone size={32} /> Call Dispatch
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-emerald-500 text-white py-6 px-12 rounded-[2rem] font-bold text-2xl shadow-2xl shadow-emerald-600/30 flex items-center gap-4 border-b-4 border-emerald-700 transition-all"
            >
              <MessageSquare size={32} /> WhatsApp Now
            </motion.a>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              x: [-100, 100, -100],
              y: [0, 50, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-0 text-white/5"
          >
            <Truck size={400} />
          </motion.div>
          
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]"
          />
        </div>
      </section>

      {/* Rapid Request Form */}
      <section className="max-w-4xl mx-auto px-4 -mt-12 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-neutral-100 overflow-hidden"
        >
          <div className="bg-neutral-900 p-10 text-white flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
            
            <div className="flex items-center gap-6 relative z-10">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-5 bg-red-600 rounded-2xl shadow-lg shadow-red-600/20"
              >
                <Truck size={32} />
              </motion.div>
              <div>
                <h2 className="text-4xl font-display font-bold tracking-tight">Rapid Request</h2>
                <div className="flex items-center gap-2 text-red-500 text-sm font-bold tracking-widest">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  LIVE DISPATCH ACTIVE
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md">
              <Clock size={18} className="text-red-500" /> Avg. 15-30m Response
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <User size={14} className="text-red-600" /> Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                  <Phone size={14} className="text-red-600" /> Phone Number
                </label>
                <input
                  required
                  type="tel"
                  placeholder="876-XXX-XXXX"
                  className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Vehicle Type</label>
                <select
                  required
                  className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all appearance-none"
                  value={formData.vehicle_type}
                  onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                >
                  <option value="">Select vehicle type</option>
                  {VEHICLE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Issue Type</label>
                <select
                  required
                  className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all appearance-none"
                  value={formData.issue_type}
                  onChange={(e) => setFormData({ ...formData, issue_type: e.target.value })}
                >
                  <option value="">What's the problem?</option>
                  {ISSUE_TYPES.map(issue => <option key={issue} value={issue}>{issue}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-red-600" /> Pickup Location
              </label>
              <div className="relative group">
                <input
                  required
                  type="text"
                  placeholder="Street, Area, Landmark"
                  className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all"
                  value={formData.pickup_location}
                  onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                />
                <button 
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((pos) => {
                        setFormData({ ...formData, pickup_location: `Current Location (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})` });
                      });
                    }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600 hover:bg-red-50 p-2 rounded-xl transition-colors flex items-center gap-2 text-xs font-bold"
                >
                  <MapPin size={16} /> Use GPS
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-neutral-300" /> Dropoff Location (Optional)
              </label>
              <input
                type="text"
                placeholder="Where should we take the vehicle?"
                className="w-full px-6 py-4 bg-neutral-50 border-2 border-transparent rounded-2xl focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all"
                value={formData.dropoff_location}
                onChange={(e) => setFormData({ ...formData, dropoff_location: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Urgency Level</label>
              <div className="grid grid-cols-3 gap-4">
                {['Standard', 'Urgent', 'Emergency'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: level as any })}
                    className={cn(
                      "py-4 rounded-2xl font-bold text-sm transition-all border-2",
                      formData.urgency === level 
                        ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200 scale-105" 
                        : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-red-200"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-red-600 text-white py-6 rounded-[2rem] font-bold text-xl shadow-xl hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Truck size={24} /> Request Towing Now
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-8 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-widest">
                <ShieldAlert size={14} className="text-red-600" /> Licensed & Insured
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-xs font-bold uppercase tracking-widest">
                <Clock size={14} className="text-red-600" /> 24/7 Dispatch
              </div>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Map Integration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-display font-bold">Real-time Recovery Network</h2>
              <p className="text-neutral-500 text-lg leading-relaxed">
                Our advanced dispatch system connects you to the nearest available recovery unit. With over 50+ units across the island, we ensure the fastest response time in the industry.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Kingston & St. Andrew', status: 'High Availability', color: 'text-emerald-500' },
                { label: 'St. Catherine & Clarendon', status: 'Moderate Availability', color: 'text-orange-500' },
                { label: 'Montego Bay & St. James', status: 'High Availability', color: 'text-emerald-500' },
                { label: 'Ocho Rios & St. Ann', status: 'High Availability', color: 'text-emerald-500' },
              ].map((region) => (
                <div key={region.label} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-red-600" />
                    <span className="font-bold text-neutral-800">{region.label}</span>
                  </div>
                  <div className={cn("text-xs font-bold uppercase tracking-widest", region.color)}>
                    {region.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-neutral-900 rounded-3xl text-white flex items-center gap-6">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                <ShieldAlert size={24} />
              </div>
              <div>
                <p className="text-sm font-bold">GPS Tracking Enabled</p>
                <p className="text-xs text-neutral-400">Once dispatched, you'll receive a live tracking link via SMS.</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin size={48} className="text-red-600 mx-auto animate-bounce" />
                <p className="font-display font-bold text-neutral-400">Interactive Map Loading...</p>
              </div>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.562!2d-76.79!3d18.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb368!2sKingston%2C%20Jamaica!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s" 
              className="absolute inset-0 w-full h-full grayscale contrast-125 opacity-80"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-900/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Trust Badges & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-neutral-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Why choose ZSR Wrecker?</h2>
          <p className="text-neutral-500">The most trusted recovery network in Jamaica.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: 'Island-wide Coverage',
              desc: 'From Kingston to Negril, our network covers every parish with rapid response units.',
              icon: MapPin,
              color: 'bg-indigo-50 text-indigo-600'
            },
            {
              title: 'Professional Recovery',
              desc: 'Our operators are highly trained in damage-free towing and specialized recovery.',
              icon: ShieldAlert,
              color: 'bg-red-50 text-red-600'
            },
            {
              title: 'Transparent Pricing',
              desc: 'No hidden fees. Get a clear quote before we hook up your vehicle.',
              icon: Info,
              color: 'bg-emerald-50 text-emerald-600'
            }
          ].map((item) => (
            <motion.div 
              key={item.title}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-8", item.color)}>
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
