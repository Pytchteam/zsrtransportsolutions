import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  ChevronLeft, 
  Users, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Upload,
  CreditCard,
  AlertCircle,
  Clock,
  MapPin,
  Info
} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle, RentalBooking } from '../types';
import { RequestListingButton } from '../components/RequestListingButton';

export function RentalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [step, setStep] = useState(1);
  const [blockedDates, setBlockedDates] = useState<{start: string, end: string}[]>([]);
  
  // Form State
  const [bookingData, setBookingData] = useState({
    pickup_date: '',
    return_date: '',
    pickup_location: 'Kingston - Norman Manley Int\'l (KIN)',
    return_location: 'Kingston - Norman Manley Int\'l (KIN)',
    full_name: '',
    phone: '',
    email: '',
    notes: ''
  });
  
  const [documents, setDocuments] = useState<{
    driver_license: File | null,
    government_id: File | null,
    proof_of_address: File | null
  }>({
    driver_license: null,
    government_id: null,
    proof_of_address: null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        const found = res.data.find((v: any) => v.id === id);
        if (found) {
          setVehicle(found);
        } else if (id?.startsWith('rental-')) {
          // Fallback to demo data
          const demoData = [
            {
              id: 'rental-1',
              listing_type: 'Rental',
              make: 'Suzuki',
              model: 'Jimny',
              year: 2023,
              price: 12000,
              currency: 'JMD',
              mileage: 5000,
              transmission: 'Automatic',
              fuel_type: 'Gasoline',
              body_type: 'SUV',
              color: 'Jungle Green',
              seats: 4,
              category: 'SUV',
              status: 'Available',
              featured: true,
              cover_image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
              gallery_urls: '["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"]',
              description: 'Perfect for exploring Jamaica. Rugged, reliable, and fun to drive. The Suzuki Jimny is the ultimate island explorer.',
            }
          ];
          const demoFound = demoData.find(v => v.id === id);
          if (demoFound) setVehicle(demoFound as any);
        }
        
        // Fetch blocked dates
        const blockedRes = await axios.get(`/api/rentals/blocked-dates/${id}`);
        setBlockedDates(blockedRes.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
    window.scrollTo(0, 0);
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof documents) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const uploadFile = async (file: File, folder: string) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const res = await axios.post('/api/upload', {
            file: reader.result,
            folder: `zsr/documents/rentals/${folder}`
          });
          resolve(res.data.secure_url);
        } catch (e) {
          reject(e);
        }
      };
    });
  };

  const calculateTotal = () => {
    if (!bookingData.pickup_date || !bookingData.return_date || !vehicle) return 0;
    const start = new Date(bookingData.pickup_date);
    const end = new Date(bookingData.return_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(days, 1) * vehicle.price;
  };

  const handleBooking = async () => {
    setFormStatus('submitting');
    try {
      // 1. Upload Documents
      const urls: any = {};
      if (documents.driver_license) urls.driver_license_url = await uploadFile(documents.driver_license, 'licenses');
      if (documents.government_id) urls.government_id_url = await uploadFile(documents.government_id, 'ids');
      if (documents.proof_of_address) urls.proof_of_address_url = await uploadFile(documents.proof_of_address, 'address');

      // 2. Create Booking
      const total = calculateTotal();
      const booking: Partial<RentalBooking> = {
        ...bookingData,
        ...urls,
        vehicle_id: id,
        deposit_amount: total * 0.2, // 20% booking deposit
        security_deposit_required: 50000, // Fixed JMD 50k security deposit
        deposit_status: 'Pending',
        booking_status: 'Pending'
      };

      await axios.post('/api/rentals/bookings', booking);
      setFormStatus('success');
    } catch (e) {
      console.error(e);
      setFormStatus('error');
    }
  };

  if (loading) return <div className="py-24 text-center text-neutral-400">Loading rental details...</div>;
  if (!vehicle) return <div className="py-24 text-center">Rental not found. <Link to="/rentals" className="text-brand-accent">Back to fleet</Link></div>;

  const gallery = JSON.parse(vehicle.gallery_urls || '[]');
  const allImages = [vehicle.cover_image_url, ...gallery].filter(Boolean);
  const totalAmount = calculateTotal();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/rentals" className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-primary transition-colors mb-8">
        <ChevronLeft size={20} /> Back to Fleet
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Media & Info */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-lg"
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
                  className={`aspect-video rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-brand-accent scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-brand-accent/10 text-brand-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {vehicle.category}
              </span>
              <div className="flex items-center gap-4 text-neutral-500 text-sm font-medium">
                <span className="flex items-center gap-1"><Users size={16} /> {vehicle.seats} Seats</span>
                <span className="flex items-center gap-1"><Settings2 size={16} /> {vehicle.transmission}</span>
                <span className="flex items-center gap-1"><Fuel size={16} /> {vehicle.fuel_type}</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>

            <div className="prose prose-neutral max-w-none">
              <p className="text-lg text-neutral-500 leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 space-y-4">
                <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="text-brand-primary" /> Rental Terms</h3>
                <ul className="text-sm text-neutral-500 space-y-2">
                  <li>• Minimum age: 23 years</li>
                  <li>• Valid driver's license (held for 2+ years)</li>
                  <li>• Security deposit: JMD 50,000 (Refundable)</li>
                  <li>• Unlimited mileage within Jamaica</li>
                  <li>• Comprehensive insurance included</li>
                </ul>
              </div>
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 space-y-4">
                <h3 className="font-bold flex items-center gap-2"><Upload className="text-brand-primary" /> Required Documents</h3>
                <ul className="text-sm text-neutral-500 space-y-2">
                  <li>• Driver's License (Front & Back)</li>
                  <li>• Government Issued ID / Passport</li>
                  <li>• Proof of Address (Utility Bill)</li>
                  <li>• Major Credit Card for Security Deposit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-2xl space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-3xl font-display font-bold text-brand-primary">{vehicle.currency} {vehicle.price.toLocaleString()}</span>
                <span className="text-neutral-400 text-sm"> / day</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase text-neutral-400">Security Deposit</span>
                <div className="text-sm font-bold">JMD 50,000</div>
              </div>
            </div>

            {/* Stepper */}
            <div className="flex justify-between items-center px-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= i ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    {i}
                  </div>
                  {i < 3 && <div className={`w-12 h-0.5 ${step > i ? 'bg-brand-primary' : 'bg-neutral-100'}`} />}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input 
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                          value={bookingData.pickup_date}
                          onChange={(e) => setBookingData({...bookingData, pickup_date: e.target.value})}
                          className="w-full pl-12 p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input 
                          type="date" 
                          min={bookingData.pickup_date || new Date().toISOString().split('T')[0]}
                          value={bookingData.return_date}
                          onChange={(e) => setBookingData({...bookingData, return_date: e.target.value})}
                          className="w-full pl-12 p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" 
                        />
                      </div>
                    </div>
                  </div>
                  <button 
                    disabled={!bookingData.pickup_date || !bookingData.return_date}
                    onClick={() => setStep(2)}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    Continue to Info <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Full Name</label>
                      <input 
                        placeholder="John Doe"
                        value={bookingData.full_name}
                        onChange={(e) => setBookingData({...bookingData, full_name: e.target.value})}
                        className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Phone</label>
                      <input 
                        placeholder="1-876-..."
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Email</label>
                      <input 
                        type="email"
                        placeholder="john@example.com"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-brand-accent" 
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl bg-neutral-100 font-bold">Back</button>
                    <button 
                      disabled={!bookingData.full_name || !bookingData.phone || !bookingData.email}
                      onClick={() => setStep(3)}
                      className="btn-primary flex-[2] py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      Documents <ArrowRight size={18} />
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
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Driver's License</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'driver_license')} className="text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-neutral-400">Government ID</label>
                      <input type="file" onChange={(e) => handleFileChange(e, 'government_id')} className="text-xs" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Rental Total ({Math.ceil((new Date(bookingData.return_date).getTime() - new Date(bookingData.pickup_date).getTime()) / (1000 * 60 * 60 * 24))} days)</span>
                      <span className="font-bold">{vehicle.currency} {totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Booking Deposit (20%)</span>
                      <span className="font-bold text-brand-accent">{vehicle.currency} {(totalAmount * 0.2).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl bg-neutral-100 font-bold">Back</button>
                    <button 
                      disabled={!documents.driver_license || !documents.government_id || formStatus === 'submitting'}
                      onClick={handleBooking}
                      className="btn-primary flex-[2] py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? 'Processing...' : 'Pay & Book'} <CreditCard size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {formStatus === 'success' && (
              <div className="absolute inset-0 bg-white rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center space-y-4 z-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold">Booking Requested!</h3>
                <p className="text-neutral-500 text-sm">We've received your booking request. Our team will review your documents and confirm within 1 hour.</p>
                <Link to="/rentals" className="btn-primary w-full py-4">Back to Fleet</Link>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-xs justify-center">
                <AlertCircle size={14} /> Failed to process booking. Please try again.
              </div>
            )}

            <div className="pt-6 border-t border-neutral-100">
              <div className="text-center space-y-4">
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Or Quick Inquiry</p>
                <RequestListingButton 
                  listing={vehicle}
                  variant="outline"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
