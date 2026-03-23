import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MessageSquare, 
  ChevronLeft, 
  Car, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Palette, 
  CheckCircle2,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';
import { motion } from 'motion/react';
import { Vehicle } from '../types';
import { RequestListingButton } from '../components/RequestListingButton';

export function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        const found = res.data.find((v: any) => v.id === id);
        if (found) {
          setVehicle(found);
        } else if (id?.startsWith('demo-')) {
          // Fallback to demo data if not in sheet
          const demoData = [
            {
              id: 'demo-1',
              listing_type: 'Sale',
              make: 'Toyota',
              model: 'Mark X',
              year: 2018,
              price: 3200000,
              currency: 'JMD',
              mileage: 45000,
              transmission: 'Automatic',
              fuel_type: 'Gasoline',
              body_type: 'Sedan',
              color: 'Pearl White',
              status: 'Available',
              featured: true,
              cover_image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
              gallery_urls: '["https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"]',
              description: 'Pristine condition Toyota Mark X. Low mileage, fully loaded with premium interior. Features include keyless entry, push-to-start, dual-zone climate control, and a high-quality sound system. Perfect for those who value both comfort and performance.',
            },
            // ... other demos could go here
          ];
          const demoFound = demoData.find(v => v.id === id);
          if (demoFound) setVehicle(demoFound as any);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
    window.scrollTo(0, 0);
  }, [id]);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await axios.post('/api/sales-requests', {
        ...data,
        listing_id: id,
      });
      setFormStatus('success');
    } catch (e) {
      setFormStatus('error');
    }
  };

  if (loading) return <div className="py-24 text-center text-neutral-400">Loading vehicle details...</div>;
  if (!vehicle) return <div className="py-24 text-center">Vehicle not found. <Link to="/vehicles" className="text-brand-accent">Back to inventory</Link></div>;

  const gallery = JSON.parse(vehicle.gallery_urls || '[]');
  const allImages = [vehicle.cover_image_url, ...gallery].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/vehicles" className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-primary transition-colors mb-8">
        <ChevronLeft size={20} /> Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Media */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-lg"
          >
            <img 
              src={allImages[activeImage]} 
              alt={vehicle.model} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? 'border-brand-accent scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-brand-accent/10 text-brand-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {vehicle.listing_type}
              </span>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                vehicle.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-600'
              }`}>
                {vehicle.status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <div className="text-3xl font-display font-bold text-brand-primary">
              {vehicle.currency} {vehicle.price.toLocaleString()}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-8 border-y border-neutral-100">
            <SpecItem icon={Gauge} label="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
            <SpecItem icon={Settings2} label="Transmission" value={vehicle.transmission} />
            <SpecItem icon={Fuel} label="Fuel Type" value={vehicle.fuel_type} />
            <SpecItem icon={Car} label="Body Type" value={vehicle.body_type} />
            <SpecItem icon={Palette} label="Color" value={vehicle.color} />
            <SpecItem icon={Calendar} label="Year" value={vehicle.year.toString()} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Description</h3>
            <p className="text-neutral-500 leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 space-y-6">
            <div className="flex items-center gap-3 text-brand-primary font-bold">
              <ShieldCheck size={24} />
              ZSR Verified Listing
            </div>
            <p className="text-sm text-neutral-500">
              This vehicle has passed our 120-point inspection. Financing and trade-in options available. 
              Reserve this car with a JMD 50,000 deposit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <RequestListingButton 
                listing={vehicle}
                className="flex-grow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <section className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-3xl font-display font-bold">Interested? Let's talk.</h2>
          <p className="text-neutral-500">
            Fill out the form and a ZSR specialist will contact you within 2 hours to discuss financing, trade-ins, or viewing.
          </p>
          <div className="space-y-4">
            {[
              'Instant WhatsApp support',
              'Flexible financing options',
              'Trade-in valuations',
              'Nationwide delivery'
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 size={18} className="text-green-500" /> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-xl">
          {formStatus === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-bold">Inquiry Sent!</h3>
              <p className="text-neutral-500">We've received your request and will be in touch shortly.</p>
              <button onClick={() => setFormStatus('idle')} className="text-brand-accent font-bold">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-400">Full Name</label>
                  <input name="full_name" required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-400">Phone Number</label>
                  <input name="phone" required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Email Address</label>
                <input name="email" type="email" required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-400">Budget Range</label>
                  <select name="budget_range" className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent">
                    <option>Under JMD 2M</option>
                    <option>JMD 2M - 4M</option>
                    <option>JMD 4M - 7M</option>
                    <option>Over JMD 7M</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-400">Deposit Ready?</label>
                  <select name="deposit_ready" className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Message (Optional)</label>
                <textarea name="message" rows={4} className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" />
              </div>
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-2"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Submit Inquiry'} <ArrowRight size={20} />
              </button>
              {formStatus === 'error' && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function SpecItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-neutral-400">
        <Icon size={16} />
        <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-bold text-sm">{value}</div>
    </div>
  );
}
