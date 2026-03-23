import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, User, HelpCircle, Car } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import { Vehicle } from '../types';

interface RequestListingButtonProps {
  listing: Vehicle;
  className?: string;
  variant?: 'primary' | 'accent' | 'outline';
}

export function RequestListingButton({ listing, className, variant = 'accent' }: RequestListingButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    question: ''
  });

  const getButtonClass = () => {
    const base = "flex items-center justify-center gap-3 py-5 text-lg font-bold w-full transition-all active:scale-95 shadow-lg";
    switch (variant) {
      case 'primary':
        return `${base} bg-brand-primary text-white hover:bg-brand-primary/90 shadow-brand-primary/20`;
      case 'accent':
        return `${base} bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20`;
      case 'outline':
        return `${base} bg-white text-neutral-900 border-2 border-neutral-100 hover:border-neutral-200 shadow-sm`;
      default:
        return `${base} bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20`;
    }
  };

  const buildWhatsAppUrl = () => {
    const serviceType = listing.listing_type;
    const listingId = listing.id;
    const details = `${listing.year} ${listing.make} ${listing.model}`;
    const price = `${listing.currency} ${listing.price.toLocaleString()}`;
    const pageUrl = `${window.location.origin}/vehicles/${listing.id}`;

    const message = `Hello ZSR! I'm interested in this ${serviceType} listing:
    
ID: ${listingId}
Vehicle: ${details}
Price/Rate: ${price}
Link: ${pageUrl}

Is this still available?`;

    return `https://wa.me/18768751506?text=${encodeURIComponent(message)}`;
  };

  const logLead = async (source: 'WhatsApp' | 'Form') => {
    try {
      await axios.post('/api/leads/listing-request', {
        listing_id: listing.id,
        listing_details: `${listing.year} ${listing.make} ${listing.model}`,
        listing_type: listing.listing_type,
        price: listing.price,
        currency: listing.currency,
        source_page: window.location.pathname,
        contact_method: source,
        ...formData
      });
    } catch (e) {
      console.error('Failed to log lead', e);
    }
  };

  const handleWhatsAppClick = async () => {
    await logLead('WhatsApp');
    window.open(buildWhatsAppUrl(), '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await logLead('Form');
    setLoading(false);
    setShowModal(false);
    alert('Thank you! Your request has been received. Our team will contact you shortly.');
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleWhatsAppClick}
          className={cn(getButtonClass(), className)}
        >
          <MessageSquare size={22} /> Request via WhatsApp
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="text-neutral-400 text-sm font-medium hover:text-brand-primary transition-colors flex items-center justify-center gap-2"
        >
          <HelpCircle size={14} /> Other contact options
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold">Request Information</h3>
                  <p className="text-neutral-500 text-sm">
                    Can't use WhatsApp? Fill out this form and we'll call you back.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Car className="text-brand-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Listing</div>
                    <div className="font-bold">{listing.year} {listing.make} {listing.model}</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                      <input
                        required
                        type="tel"
                        placeholder="1 (876) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 ml-1">Question (Optional)</label>
                    <textarea
                      placeholder="I'd like to know about..."
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      className="w-full p-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none font-medium min-h-[100px] resize-none"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg font-bold disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : <><Send size={20} /> Submit Request</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
