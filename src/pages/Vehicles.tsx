import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageSquare, Info, Tag, ChevronDown, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Vehicle } from '../types';
import { RequestListingButton } from '../components/RequestListingButton';

const DEMO_VEHICLES: Vehicle[] = [
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
    seats: 5,
    category: 'Economy',
    status: 'Available',
    featured: true,
    cover_image_url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=800',
    gallery_urls: '[]',
    cloudinary_public_ids: '[]',
    description: 'Pristine condition Toyota Mark X. Low mileage, fully loaded with premium interior.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-2',
    listing_type: 'Sale',
    make: 'Honda',
    model: 'Civic Type R',
    year: 2021,
    price: 7500000,
    currency: 'JMD',
    mileage: 12000,
    transmission: 'Manual',
    fuel_type: 'Gasoline',
    body_type: 'Hatchback',
    color: 'Championship White',
    seats: 4,
    category: 'Sports',
    status: 'Available',
    featured: true,
    cover_image_url: 'https://images.unsplash.com/photo-1606148585254-3b499b30275f?auto=format&fit=crop&q=80&w=800',
    gallery_urls: '[]',
    cloudinary_public_ids: '[]',
    description: 'The ultimate driving machine. Honda Civic Type R in iconic Championship White.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'demo-3',
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
    featured: false,
    cover_image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    gallery_urls: '[]',
    cloudinary_public_ids: '[]',
    description: 'Perfect for exploring Jamaica. Rugged, reliable, and fun to drive.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [make, setMake] = useState('All');
  const [transmission, setTransmission] = useState('All');
  const [status, setStatus] = useState('Available');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get('/api/vehicles');
        // Filter out rentals
        const salesData = res.data.filter((v: any) => v.listing_type !== 'Rental');
        // If sheet is empty, use demo data (filtered)
        const data = salesData.length > 0 ? salesData : DEMO_VEHICLES.filter(v => v.listing_type !== 'Rental');
        setVehicles(data);
      } catch (e) {
        console.error(e);
        setVehicles(DEMO_VEHICLES.filter(v => v.listing_type !== 'Rental'));
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = (v.make + ' ' + v.model).toLowerCase().includes(search.toLowerCase());
    const matchesType = type === 'All' || v.listing_type === type;
    const matchesMake = make === 'All' || v.make === make;
    const matchesTransmission = transmission === 'All' || v.transmission === transmission;
    const matchesStatus = status === 'All' || v.status === status;
    return matchesSearch && matchesType && matchesMake && matchesTransmission && matchesStatus;
  });

  const makes = Array.from(new Set(vehicles.map(v => v.make))).sort();

  return (
    <div className="space-y-12 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://res.cloudinary.com/dopxnugqn/video/upload/v1768777806/From_KlickPin_CF_Derek_Tam_adl%C4%B1_kullan%C4%B1c%C4%B1n%C4%B1n_Car_photo_Shotlist_panosundaki_Pin___Oto_kiralama_Otomobil_Arac%CC%A7_ic%CC%A7i_rpzsiq.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-neutral-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-white"
            >
              ZSR <span className="indigo-red-text">Inventory</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg max-w-2xl mx-auto"
            >
              Explore our curated selection of premium vehicles for sale. 
              Quality verified, performance guaranteed.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Search & Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-[2.5rem] border border-neutral-200 shadow-xl space-y-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" size={22} />
            <input
              type="text"
              placeholder="Search make, model, year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-neutral-50 border-none focus:ring-2 focus:ring-brand-accent outline-none text-lg"
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-neutral-100 rounded-2xl font-bold hover:bg-neutral-200 transition-all"
          >
            <Filter size={20} /> Filters {showFilters ? <X size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-neutral-100 overflow-hidden"
            >
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Listing Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none font-medium"
                >
                  <option value="All">All Types</option>
                  <option value="Sale">For Sale</option>
                  <option value="Import">Imports</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Manufacturer</label>
                <select 
                  value={make} 
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none font-medium"
                >
                  <option value="All">All Makes</option>
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Transmission</label>
                <select 
                  value={transmission} 
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none font-medium"
                >
                  <option value="All">All Transmissions</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Availability</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none font-medium"
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-[2.5rem] h-[500px] animate-pulse border border-neutral-100" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div key={vehicle.id}>
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredVehicles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 text-center space-y-6"
            >
              <div className="bg-neutral-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Search size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">No vehicles found</h3>
                <p className="text-neutral-500 max-w-md mx-auto">Try adjusting your filters or contact us for a custom sourcing request.</p>
              </div>
              <button 
                onClick={() => { setSearch(''); setType('All'); setMake('All'); setStatus('All'); }} 
                className="btn-primary py-3 px-8"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
      </div>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2.5rem] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={vehicle.cover_image_url || 'https://picsum.photos/seed/car/800/600'} 
          alt={vehicle.model} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
            {vehicle.listing_type}
          </span>
          {vehicle.featured && (
            <span className="bg-red-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-6 right-6">
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            vehicle.status === 'Available' ? 'bg-green-500 text-white' : 'bg-neutral-800 text-white'
          }`}>
            {vehicle.status}
          </span>
        </div>
      </div>
      
      <div className="p-10 space-y-8">
        <div className="space-y-2">
          <h3 className="text-3xl font-display font-bold group-hover:indigo-red-text transition-colors">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-neutral-500 font-medium flex items-center gap-2">
            <Tag size={16} /> {vehicle.mileage.toLocaleString()} km • {vehicle.transmission} • {vehicle.fuel_type}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
          <div className="space-y-1">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Price</div>
            <div className="text-3xl font-display font-bold text-brand-primary">
              {vehicle.currency} {vehicle.price.toLocaleString()}
            </div>
          </div>
          <Link 
            to={`/vehicles/${vehicle.id}`}
            className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-brand-primary hover:text-white transition-all"
          >
            <ArrowRight size={24} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <RequestListingButton listing={vehicle} />
          <Link 
            to={`/vehicles/${vehicle.id}`}
            className="bg-neutral-100 text-neutral-900 flex items-center justify-center gap-3 py-5 rounded-2xl font-bold hover:bg-neutral-200 transition-all text-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
