import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Navbar, Footer, WhatsAppButton } from './components/Layout';
import { HomePage } from './pages/Home';
import { VehiclesPage } from './pages/Vehicles';
import { VehicleDetailPage } from './pages/VehicleDetail';
import { RentalsPage } from './pages/Rentals';
import { RentalDetailPage } from './pages/RentalDetail';
import { WreckerPage } from './pages/Wrecker';
import { AdminPage } from './pages/Admin';
import { CourierPage } from './pages/Courier';
import ImportsPage from './pages/Imports';
import { AboutPage } from './pages/About';
import { ContactPage } from './pages/Contact';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="/rentals" element={<RentalsPage />} />
            <Route path="/rentals/:id" element={<RentalDetailPage />} />
            <Route path="/wrecker" element={<WreckerPage />} />
            <Route path="/courier" element={<CourierPage />} />
            <Route path="/imports" element={<ImportsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
