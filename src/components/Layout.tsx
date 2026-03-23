import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Car, Key, Truck, Info, ShieldCheck, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_LINKS = [
  { name: 'Vehicles', href: '/vehicles', icon: Car },
  { name: 'Rentals', href: '/rentals', icon: Key },
  { name: 'Wrecker', href: '/wrecker', icon: Truck },
  { name: 'Courier', href: '/courier', icon: Package },
  { name: 'Imports', href: '/imports', icon: ShieldCheck },
  { name: 'About', href: '/about', icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const isScrolled = scrolled || !isHome;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-neutral-200 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-white shadow-sm">
              <img 
                src="https://res.cloudinary.com/dopxnugqn/image/upload/v1774279992/WhatsApp_Image_2026-03-23_at_10.32.40_zpruty.jpg" 
                alt="ZSR Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className={cn(
              "font-display font-bold text-xl hidden sm:block transition-colors",
              isScrolled ? "text-neutral-900" : "text-white"
            )}>Transport Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-bold transition-all hover:scale-105",
                  location.pathname === link.href 
                    ? "text-brand-accent" 
                    : isScrolled ? "text-neutral-600 hover:text-brand-primary" : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:18768751506" className={cn(
              "py-3 px-6 text-sm flex items-center gap-2",
              isScrolled ? "btn-primary" : "bg-white text-brand-primary rounded-xl font-bold hover:bg-neutral-100 transition-colors"
            )}>
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn(
              "md:hidden p-2 transition-colors",
              isScrolled ? "text-neutral-900" : "text-white"
            )} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-neutral-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-neutral-700"
                >
                  <link.icon size={20} className="text-brand-accent" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 grid grid-cols-2 gap-4">
                <a href="tel:18768751506" className="btn-primary flex justify-center items-center gap-2">
                  <Phone size={18} /> Call
                </a>
                <a 
                  href="https://wa.me/18768751506" 
                  target="_blank" 
                  className="btn-accent flex justify-center items-center gap-2"
                >
                  <MessageSquare size={18} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/dopxnugqn/image/upload/v1774279992/WhatsApp_Image_2026-03-23_at_10.32.40_zpruty.jpg" 
                  alt="ZSR Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-xl">Transport Solutions</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Jamaica's premier multi-service mobility platform. Fast vehicles, fast support, no stress.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><Link to="/vehicles">Vehicle Sales</Link></li>
              <li><Link to="/rentals">Car Rentals</Link></li>
              <li><Link to="/wrecker">Wrecking & Towing</Link></li>
              <li><Link to="/courier">Courier Services</Link></li>
              <li><Link to="/imports">Vehicle Sourcing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} /> 1 (876) 875-1506</li>
              <li className="flex items-center gap-2"><MessageSquare size={14} /> WhatsApp Available</li>
              <li>Kingston, Jamaica</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-xs">
          <p>&copy; {new Date().getFullYear()} ZSR Transport Solutions Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="tel:18768751506"
        className="bg-red-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
      >
        <Phone size={24} />
      </a>
      <a
        href="https://wa.me/18768751506"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageSquare size={24} />
      </a>
    </div>
  );
}
