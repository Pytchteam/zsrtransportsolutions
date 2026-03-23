import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ship, 
  Calculator, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Upload, 
  Clock, 
  DollarSign, 
  ShieldCheck,
  MessageSquare,
  Truck,
  Anchor,
  FileText,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const IMPORT_STEPS = [
  'Request Received',
  'Sourcing',
  'Purchased',
  'Shipping',
  'Arrived at Port',
  'Customs/Clearance',
  'Ready for Pickup'
];

export default function ImportsPage() {
  const [activeTab, setActiveTab] = useState<'request' | 'calculator' | 'track'>('request');
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  // Calculator State
  const [calcData, setCalcData] = useState({
    cif: 0,
    engineSize: '1000',
    isHybrid: false,
    isElectric: false
  });

  const [calcConfig, setCalcConfig] = useState<any>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get('/api/import-calculator-config');
        setCalcConfig(res.data);
      } catch (e) {
        console.error('Failed to fetch calculator config');
      }
    };
    fetchConfig();
  }, []);

  const calculateDuty = () => {
    const { cif, engineSize, isHybrid, isElectric } = calcData;
    
    // Default rates if config not loaded
    const rates = calcConfig || {
      base_duty: 0.20,
      electric_duty: 0.10,
      hybrid_duty: 0.15,
      high_engine_duty: 0.35,
      mid_engine_duty: 0.25,
      standard_fees: 150000,
      gct_rate: 0.15
    };

    let dutyRate = parseFloat(rates.base_duty);

    if (isElectric) dutyRate = parseFloat(rates.electric_duty);
    else if (isHybrid) dutyRate = parseFloat(rates.hybrid_duty);
    else if (parseInt(engineSize) > 2000) dutyRate = parseFloat(rates.high_engine_duty);
    else if (parseInt(engineSize) > 1500) dutyRate = parseFloat(rates.mid_engine_duty);

    const duty = cif * dutyRate;
    const gct = (cif + duty) * parseFloat(rates.gct_rate);
    const fees = parseFloat(rates.standard_fees);
    const total = cif + duty + gct + fees;

    return { duty, gct, fees, total };
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingLoading(true);
    setTrackingError('');
    try {
      const res = await axios.get(`/api/import-requests/track/${trackingId}`);
      setTrackingData(res.data);
    } catch (e) {
      setTrackingError('Tracking ID not found. Please check and try again.');
      setTrackingData(null);
    } finally {
      setTrackingLoading(false);
    }
  };

  const whatsappLink = `https://wa.me/18765550123?text=${encodeURIComponent("Hi ZSR, I'm interested in importing a vehicle. Can you help me?")}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-neutral-900">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Vehicle Import"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-neutral-900/60 to-neutral-900" />
        </motion.div>

        <div className="container relative z-10 px-4 text-center text-white space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-600/20 border border-red-600/30 text-red-500 text-sm font-bold uppercase tracking-[0.2em] backdrop-blur-md"
          >
            <Ship size={16} className="animate-pulse" /> Global Vehicle Sourcing
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl font-display font-black leading-[0.85] tracking-tighter"
            >
              IMPORT YOUR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-500">DREAM CAR</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-neutral-400 text-xl font-light leading-relaxed"
          >
            From Japan, UK, and USA directly to your driveway. We handle the sourcing, shipping, and customs clearance with absolute precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={() => setActiveTab('request')}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-red-600/20"
            >
              Start Sourcing
            </button>
            <button 
              onClick={() => setActiveTab('calculator')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold transition-all backdrop-blur-md"
            >
              Calculate Duty
            </button>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0],
              y: [0, 50, 0],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]"
          />
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-100 shadow-sm">
        <div className="container px-4">
          <div className="flex justify-center gap-8">
            {[
              { id: 'request', label: 'Find My Car', icon: Search },
              { id: 'calculator', label: 'Cost Calculator', icon: Calculator },
              { id: 'track', label: 'Track Import', icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-6 text-sm font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab.id ? 'text-indigo-600' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'animate-bounce' : ''} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-red-600 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="py-20 container px-4 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'request' && (
            <motion.div
              key="request"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-display font-bold">Vehicle Intake Form</h2>
                <p className="text-neutral-500">Tell us what you're looking for and our sourcing team will find the best options.</p>
              </div>
              <ImportRequestForm />
            </motion.div>
          )}

          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-display font-bold">Import Calculator</h2>
                  <p className="text-neutral-500">Get an estimate of the total cost to land your vehicle in Jamaica.</p>
                </div>

                <div className="space-y-6 bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400 tracking-widest">Vehicle CIF (USD)</label>
                    <div className="relative group">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <input 
                        type="number" 
                        value={calcData.cif}
                        onChange={(e) => setCalcData({...calcData, cif: parseFloat(e.target.value) || 0})}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-transparent bg-white shadow-sm outline-none focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-600/5 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-neutral-400 tracking-widest">Engine Size (cc)</label>
                    <select 
                      value={calcData.engineSize}
                      onChange={(e) => setCalcData({...calcData, engineSize: e.target.value})}
                      className="w-full p-4 rounded-xl border-2 border-transparent bg-white shadow-sm outline-none focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-600/5 transition-all appearance-none"
                    >
                      <option value="1000">Under 1000cc</option>
                      <option value="1500">1000cc - 1500cc</option>
                      <option value="2000">1500cc - 2000cc</option>
                      <option value="3000">Over 2000cc</option>
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm cursor-pointer border-2 border-transparent hover:border-indigo-600/20 hover:bg-indigo-50/30 transition-all">
                      <input 
                        type="checkbox" 
                        checked={calcData.isHybrid}
                        onChange={(e) => setCalcData({...calcData, isHybrid: e.target.checked, isElectric: false})}
                        className="w-5 h-5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm font-bold">Hybrid</span>
                    </label>
                    <label className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-white shadow-sm cursor-pointer border-2 border-transparent hover:border-indigo-600/20 hover:bg-indigo-50/30 transition-all">
                      <input 
                        type="checkbox" 
                        checked={calcData.isElectric}
                        onChange={(e) => setCalcData({...calcData, isElectric: e.target.checked, isHybrid: false})}
                        className="w-5 h-5 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <span className="text-sm font-bold">Electric</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 text-white p-10 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl" />
                
                <h3 className="text-2xl font-display font-bold relative z-10">Estimated Totals</h3>
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between text-neutral-400">
                    <span>CIF Amount</span>
                    <span className="text-white font-mono">USD {calcData.cif.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Import Duty</span>
                    <span className="text-white font-mono">USD {calculateDuty().duty.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>GCT (15%)</span>
                    <span className="text-white font-mono">USD {calculateDuty().gct.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Port & Processing Fees</span>
                    <span className="text-white font-mono">JMD {calculateDuty().fees.toLocaleString()}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase text-red-500 tracking-widest">Total Landed Estimate</span>
                        <div className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
                          JMD {(calculateDuty().total * 155).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex gap-3 relative z-10">
                  <AlertCircle className="text-red-500 shrink-0" size={20} />
                  <p className="text-xs text-neutral-400">
                    Estimates are based on current exchange rates and duty structures. Final costs may vary based on specific vehicle valuation by customs.
                  </p>
                </div>

                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] relative z-10"
                >
                  <MessageSquare size={20} /> Discuss This Quote
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === 'track' && (
            <motion.div
              key="track"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-2xl mx-auto space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-display font-bold">Track Your Import</h2>
                <p className="text-neutral-500">Enter your tracking ID to see the current status of your vehicle.</p>
              </div>

              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  placeholder="ZSR-XXXXXX"
                  className="flex-grow p-5 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent text-lg font-mono"
                  required
                />
                <button 
                  type="submit" 
                  disabled={trackingLoading}
                  className="btn-primary px-8 py-5 sm:py-3 flex items-center justify-center gap-2"
                >
                  {trackingLoading ? 'Searching...' : <><Search size={20} /> Track</>}
                </button>
              </form>

              {trackingError && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
                  <AlertCircle size={18} /> {trackingError}
                </div>
              )}

              {trackingData && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-xl space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{trackingData.year_range} {trackingData.make} {trackingData.model}</h3>
                      <p className="text-neutral-400 font-mono text-sm">{trackingData.tracking_id}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent text-xs font-bold uppercase">
                        {trackingData.import_status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {IMPORT_STEPS.map((step, idx) => {
                      const currentIdx = IMPORT_STEPS.indexOf(trackingData.import_status);
                      const isCompleted = idx < currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={step} className="flex gap-4 relative">
                          {idx !== IMPORT_STEPS.length - 1 && (
                            <div className={`absolute left-[11px] top-7 bottom-[-20px] w-0.5 ${isCompleted ? 'bg-emerald-500' : 'bg-neutral-100'}`} />
                          )}
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                            isCompleted ? 'bg-emerald-500 text-white' : 
                            isCurrent ? 'bg-brand-accent text-white animate-pulse' : 
                            'bg-neutral-100 text-neutral-400'
                          }`}>
                            {isCompleted ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                          </div>
                          <div className="space-y-1">
                            <p className={`text-sm font-bold ${isCurrent ? 'text-neutral-900' : isCompleted ? 'text-neutral-500' : 'text-neutral-300'}`}>
                              {step}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-neutral-400">Last updated: {new Date(trackingData.last_status_update).toLocaleDateString()}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* WhatsApp CTA */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href={whatsappLink}
          target="_blank"
          className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-all hover:scale-105 group"
        >
          <MessageSquare size={24} />
          <span className="font-bold">Chat with an Import Expert</span>
        </a>
      </div>
    </div>
  );
}

function ImportRequestForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    make: '',
    model: '',
    year_range: '',
    budget: '',
    engine_size: '',
    transmission: 'Automatic',
    notes: '',
    id_document_url: ''
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await axios.post('/api/upload', {
          file: reader.result,
          folder: 'zsr/documents/imports'
        });
        setFormData({ ...formData, id_document_url: res.data.secure_url });
      } catch (e) {
        alert('Upload failed. Please try again.');
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id_document_url) {
      alert('Please upload your ID document first.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/import-requests', formData);
      setSuccess(true);
    } catch (e) {
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-20 space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-display font-bold">Request Submitted!</h3>
        <p className="text-neutral-500 max-w-md mx-auto">
          Our sourcing team has received your request. We'll contact you within 24 hours with some initial options.
        </p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Full Name</label>
            <input 
              required
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Phone Number</label>
            <input 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="+1 (876) 000-0000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Email Address</label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Vehicle Make</label>
            <input 
              required
              value={formData.make}
              onChange={(e) => setFormData({...formData, make: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="Toyota, Honda, etc."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Vehicle Model</label>
            <input 
              required
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="Voxy, Fit, CR-V, etc."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Year Range</label>
            <input 
              required
              value={formData.year_range}
              onChange={(e) => setFormData({...formData, year_range: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="2018 - 2022"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Budget (JMD)</label>
            <input 
              required
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="3500000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-neutral-400">Transmission</label>
            <select 
              value={formData.transmission}
              onChange={(e) => setFormData({...formData, transmission: e.target.value as any})}
              className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-neutral-400">Upload ID Document (JPG/PNG/PDF)</label>
          <div className={`relative p-8 border-2 border-dashed rounded-2xl transition-all flex flex-col items-center gap-4 ${
            formData.id_document_url ? 'bg-emerald-50 border-emerald-200' : 'bg-neutral-50 border-neutral-200 hover:border-indigo-600/30'
          }`}>
            <input 
              type="file" 
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept=".jpg,.jpeg,.png,.pdf"
            />
            {formData.id_document_url ? (
              <>
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Document Uploaded</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold uppercase tracking-widest">Click or Drag to Upload</p>
                  <p className="text-xs text-neutral-400 mt-1">Maximum file size: 5MB</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-neutral-400">Additional Notes</label>
          <textarea 
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={4}
            className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent resize-none"
            placeholder="Color preference, specific features, etc."
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-2"
        >
          {loading ? 'Submitting...' : <><CheckCircle2 size={20} /> Submit Sourcing Request</>}
        </button>
      </form>
    </div>
  );
}
