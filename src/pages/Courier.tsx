import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, Clock, MapPin, Phone, User, Info, CheckCircle2, ChevronRight, MessageSquare, Calculator } from 'lucide-react';
import axios from 'axios';

const PACKAGE_SIZES = [
  { id: 'Small', label: 'Small', desc: 'Envelope, small box (up to 2kg)', base: 500 },
  { id: 'Medium', label: 'Medium', desc: 'Standard box, multiple items (up to 10kg)', base: 1200 },
  { id: 'Large', label: 'Large', desc: 'Large box, heavy items (up to 25kg)', base: 2500 },
  { id: 'Extra Large', label: 'Extra Large', desc: 'Oversized, furniture, bulk (25kg+)', base: 5000 },
];

const URGENCY_LEVELS = [
  { id: 'Standard', label: 'Standard', desc: '1-2 business days', multiplier: 1 },
  { id: 'Express', label: 'Express', desc: 'Next day delivery', multiplier: 1.5 },
  { id: 'Same Day', label: 'Same Day', desc: 'Within 4-6 hours', multiplier: 2.5 },
];

export function CourierPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_phone: '',
    recipient_name: '',
    recipient_phone: '',
    pickup_address: '',
    delivery_address: '',
    package_type: '',
    package_size: 'Small',
    urgency: 'Standard',
    notes: '',
  });

  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const size = PACKAGE_SIZES.find(s => s.id === formData.package_size);
    const urgency = URGENCY_LEVELS.find(u => u.id === formData.urgency);
    if (size && urgency) {
      setEstimate(size.base * urgency.multiplier);
    }
  }, [formData.package_size, formData.urgency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/courier-requests', formData);
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting courier request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const waMessage = encodeURIComponent(
    `Hello ZSR! I'd like to request a courier pickup:\n\n` +
    `Sender: ${formData.sender_name} (${formData.sender_phone})\n` +
    `Recipient: ${formData.recipient_name} (${formData.recipient_phone})\n` +
    `Pickup: ${formData.pickup_address}\n` +
    `Delivery: ${formData.delivery_address}\n` +
    `Package: ${formData.package_type} (${formData.package_size})\n` +
    `Urgency: ${formData.urgency}\n` +
    `Estimate: JMD ${estimate.toLocaleString()}`
  );

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center space-y-6 shadow-xl border border-neutral-100"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold">Request Received!</h2>
          <p className="text-neutral-500">
            Our team is reviewing your request. We'll contact you shortly with a final quote and pickup time.
          </p>
          <div className="pt-4 space-y-3">
            <a 
              href={`https://wa.me/18768751506?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary flex items-center justify-center gap-2 py-4"
            >
              <MessageSquare size={20} /> Follow up via WhatsApp
            </a>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-4 text-neutral-500 font-medium hover:text-neutral-900 transition-colors"
            >
              Submit another request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-neutral-50 overflow-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <motion.img 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity }}
              src="https://images.unsplash.com/photo-1586769852044-692d6e671f05?auto=format&fit=crop&q=80&w=1920"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent" />
          
          <div className="relative z-10 max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-bold uppercase tracking-widest mb-6 border border-white/20"
            >
              ZSR Courier Services
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-7xl md:text-8xl font-display font-black leading-[0.85] mb-8 tracking-tighter"
            >
              FAST, RELIABLE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600 italic">ISLAND-WIDE</span> DELIVERY
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 mb-10 leading-relaxed"
            >
              From documents to bulk cargo, we handle your packages with care. 
              Get an instant estimate and request a pickup in seconds.
            </motion.p>
            
            <div className="flex flex-wrap gap-10 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Truck size={28} className="text-red-500" />
                </div>
                <div>
                  <div className="text-lg font-bold">Door-to-Door</div>
                  <div className="text-sm text-white/50">Pickup & Delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Clock size={28} className="text-red-500" />
                </div>
                <div>
                  <div className="text-lg font-bold">Express Options</div>
                  <div className="text-sm text-white/50">Same day available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Request Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-neutral-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="flex items-center justify-between mb-16 relative z-10">
              <div className="space-y-1">
                <h2 className="text-4xl font-display font-black tracking-tight">Request a Pickup</h2>
                <p className="text-neutral-500 font-medium">Complete the details to get started.</p>
              </div>
              <div className="flex gap-3">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`h-2 rounded-full transition-all duration-700 ${step >= i ? 'w-12 bg-red-600 shadow-lg shadow-red-600/20' : 'w-6 bg-neutral-100'}`} 
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Sender Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all font-bold"
                            value={formData.sender_name}
                            onChange={e => setFormData({...formData, sender_name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Sender Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                          <input 
                            required
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                            value={formData.sender_phone}
                            onChange={e => setFormData({...formData, sender_phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Recipient Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all font-bold"
                            value={formData.recipient_name}
                            onChange={e => setFormData({...formData, recipient_name: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Recipient Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                          <input 
                            required
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                            value={formData.recipient_phone}
                            onChange={e => setFormData({...formData, recipient_phone: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95"
                      >
                        Next Step <ChevronRight size={22} />
                      </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Pickup Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-neutral-400" size={18} />
                        <textarea 
                          required
                          placeholder="Full Pickup Address"
                          rows={3}
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all resize-none font-bold"
                          value={formData.pickup_address}
                          onChange={e => setFormData({...formData, pickup_address: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Delivery Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-4 text-neutral-400" size={18} />
                        <textarea 
                          required
                          placeholder="Full Delivery Address"
                          rows={3}
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all resize-none font-bold"
                          value={formData.delivery_address}
                          onChange={e => setFormData({...formData, delivery_address: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 rounded-2xl bg-neutral-100 font-bold hover:bg-neutral-200 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-[2] py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95"
                      >
                        Next Step <ChevronRight size={22} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Package Type</label>
                        <div className="relative">
                          <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                          <input 
                            required
                            type="text"
                            placeholder="e.g. Documents, Electronics"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none transition-all"
                            value={formData.package_type}
                            onChange={e => setFormData({...formData, package_type: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Package Size</label>
                        <select 
                          className="w-full px-6 py-5 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all appearance-none font-bold"
                          value={formData.package_size}
                          onChange={e => setFormData({...formData, package_size: e.target.value as any})}
                        >
                          {PACKAGE_SIZES.map(s => (
                            <option key={s.id} value={s.id}>{s.label} - {s.desc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Urgency</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {URGENCY_LEVELS.map(u => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setFormData({...formData, urgency: u.id as any})}
                            className={`p-6 rounded-2xl text-left border-2 transition-all ${formData.urgency === u.id ? 'border-red-600 bg-red-600/5 shadow-lg shadow-red-600/5' : 'border-neutral-100 hover:border-neutral-200'}`}
                          >
                            <div className="font-bold mb-1">{u.label}</div>
                            <div className="text-xs text-neutral-500">{u.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400 tracking-wider">Additional Notes</label>
                      <textarea 
                        placeholder="Any special instructions for the driver?"
                        rows={3}
                        className="w-full px-6 py-5 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-red-600/20 focus:ring-4 focus:ring-red-600/5 outline-none transition-all resize-none font-bold"
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 rounded-2xl bg-neutral-100 font-bold hover:bg-neutral-200 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        disabled={loading}
                        className="flex-[2] py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                      >
                        {loading ? 'Submitting...' : 'Submit Request'} <ChevronRight size={22} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Estimate Panel */}
        <div className="space-y-8">
          <div className="bg-neutral-900 rounded-[3rem] p-10 text-white sticky top-24 shadow-2xl overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full -mr-24 -mt-24 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full -ml-24 -mb-24 blur-3xl" />
            
            <div className="relative z-10 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Calculator size={28} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black tracking-tight">Instant Estimate</h3>
                  <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">Real-time calculation</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-bold text-xs uppercase tracking-widest">Base Rate</span>
                  <span className="font-mono text-lg font-bold">JMD {PACKAGE_SIZES.find(s => s.id === formData.package_size)?.base.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-bold text-xs uppercase tracking-widest">Urgency</span>
                  <span className="font-mono text-lg font-bold text-red-600">x{URGENCY_LEVELS.find(u => u.id === formData.urgency)?.multiplier}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between items-end">
                  <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-2">Estimated Total</span>
                  <div className="text-right">
                    <div className="text-5xl font-display font-black text-white tracking-tighter">JMD {estimate.toLocaleString()}</div>
                    <div className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] font-bold mt-1">Final quote may vary</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 flex gap-4 border border-white/5">
                <Info size={20} className="text-red-600 shrink-0" />
                <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                  This is an automated estimate based on standard routes. Final pricing depends on exact distance and package weight.
                </p>
              </div>

              <a 
                href={`https://wa.me/18768751506?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare size={24} /> Chat with Agent
              </a>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-neutral-100 shadow-sm space-y-6">
            <h4 className="font-bold">Why choose ZSR?</h4>
            <ul className="space-y-4">
              {[
                'Real-time tracking updates',
                'Professional, vetted drivers',
                'Secure handling of fragile items',
                'Flexible pickup windows'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
