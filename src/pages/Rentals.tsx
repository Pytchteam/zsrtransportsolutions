import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageSquare, Info, Users, Settings2, Fuel, ChevronDown, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Vehicle } from '../types';
import { RequestListingButton } from '../components/RequestListingButton';

const DEMO_RENTALS: Vehicle[] = [
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
    gallery_urls: '[]',
    cloudinary_public_ids: '[]',
    description: 'Perfect for exploring Jamaica. Rugged, reliable, and fun to drive.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'rental-2',
    listing_type: 'Rental',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    price: 8500,
    currency: 'JMD',
    mileage: 15000,
    transmission: 'Automatic',
    fuel_type: 'Gasoline',
    body_type: 'Sedan',
    color: 'Silver',
    seats: 5,
    category: 'Economy',
    status: 'Available',
    featured: false,
    cover_image_url: 'https://images.unsplash.com/photo-1623860841273-34e86745914a?auto=format&fit=crop&q=80&w=800',
    gallery_urls: '[]',
    cloudinary_public_ids: '[]',
    description: 'Reliable and fuel-efficient. Great for city driving and long trips.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'rental-3',
    listing_type: 'Rental',
    make: 'BMW',
    model: 'X5',
    year: 2023,
    price: 35000,
    currency: 'JMD',
    mileage: 2000,
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    body_type: 'SUV',
    color: 'Black Sapphire',
    seats: 5,
    category: 'Luxury',
    status: 'Available',
    featured: true,
    cover_image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    gallery_urls: '[]',
    cloudinary_public_ids: '[]',
    description: 'Ultimate luxury and performance. Experience Jamaica in style.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function RentalsPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [transmission, setTransmission] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        const rentals = res.data.filter((v: any) => v.listing_type === 'Rental');
        const data = rentals.length > 0 ? rentals : DEMO_RENTALS;
        setVehicles(data);
      } catch (e) {
        console.error(e);
        setVehicles(DEMO_RENTALS);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = (v.make + ' ' + v.model).toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || v.category === category;
    const matchesTransmission = transmission === 'All' || v.transmission === transmission;
    return matchesSearch && matchesCategory && matchesTransmission;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-sm font-bold uppercase tracking-[0.2em] mb-4"
        >
          <Calendar size={16} className="animate-pulse" /> Premium Fleet
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter leading-[0.85]"
        >
          RENTAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600">FLEET</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-500 max-w-2xl mx-auto font-light"
        >
          Premium rentals for every journey in Jamaica. Experience absolute freedom with our meticulously maintained fleet.
        </motion.p>
      </div>

      {/* Search & Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-xl space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-grow group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search make, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-neutral-50 border-2 border-transparent focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all font-medium"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10 active:scale-95"
          >
            <Filter size={20} /> Filters {showFilters ? <X size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-400 tracking-widest">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 rounded-xl bg-neutral-50 border-2 border-transparent focus:border-indigo-600/20 outline-none transition-all font-bold appearance-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Economy">Economy</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-neutral-400 tracking-widest">Transmission</label>
                  <select 
                    value={transmission} 
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full p-4 rounded-xl bg-neutral-50 border-2 border-transparent focus:border-indigo-600/20 outline-none transition-all font-bold appearance-none"
                  >
                    <option value="All">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-[2rem] h-[450px] animate-pulse border border-neutral-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <RentalCard key={vehicle.id} data={vehicle} />
          ))}
          {filteredVehicles.length === 0 && (
            <div className="col-span-full py-24 text-center space-y-4">
              <div className="bg-neutral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold">No rentals found</h3>
              <p className="text-neutral-500">Try adjusting your filters or contact us for a special request.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); setTransmission('All'); }} className="text-brand-accent font-bold">Clear all filters</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const RentalCard = ({ data }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={data.cover_image_url || 'https://picsum.photos/seed/car/800/600'} 
          alt={data.model} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
            {data.category}
          </span>
        </div>
        <div className="absolute bottom-6 right-6">
          <span className="bg-neutral-900 text-white px-6 py-3 rounded-2xl text-lg font-black shadow-xl">
            {data.currency} {data.price.toLocaleString()} <span className="text-xs font-normal opacity-60">/ day</span>
          </span>
        </div>
      </div>
      
      <div className="p-10 space-y-8">
        <div className="space-y-3">
          <h3 className="text-3xl font-display font-black tracking-tight group-hover:text-red-600 transition-colors">{data.year} {data.make} {data.model}</h3>
          <div className="flex items-center gap-6 text-neutral-400 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Users size={16} className="text-red-600" /> {data.seats} Seats</span>
            <span className="flex items-center gap-2"><Settings2 size={16} className="text-red-600" /> {data.transmission}</span>
            <span className="flex items-center gap-2"><Fuel size={16} className="text-red-600" /> {data.fuel_type}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Link 
            to={`/rentals/${data.id}`}
            className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-center flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95"
          >
            <Calendar size={22} /> Book Now
          </Link>
          <RequestListingButton 
            listing={data}
            variant="outline"
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
