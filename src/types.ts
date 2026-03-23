export interface Vehicle {
  id: string;
  listing_type: 'Sale' | 'Rental' | 'Import';
  make: string;
  model: string;
  year: number;
  price: number; // For rentals, this is daily rate
  currency: string;
  mileage: number;
  transmission: 'Automatic' | 'Manual';
  fuel_type: 'Gasoline' | 'Diesel' | 'Hybrid' | 'Electric';
  body_type: string;
  color: string;
  seats: number;
  category: 'Economy' | 'Luxury' | 'SUV' | 'Commercial' | 'Sports';
  status: 'Available' | 'Reserved' | 'Sold' | 'Coming Soon' | 'Archived';
  featured: boolean;
  cover_image_url: string;
  gallery_urls: string; // JSON string of array
  cloudinary_public_ids: string; // JSON string of array
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RentalBooking {
  id: string;
  vehicle_id: string;
  full_name: string;
  phone: string;
  email: string;
  pickup_date: string;
  return_date: string;
  pickup_location: string;
  return_location: string;
  driver_license_url: string;
  government_id_url: string;
  proof_of_address_url?: string;
  deposit_amount: number;
  deposit_status: 'Pending' | 'Paid' | 'Refunded';
  security_deposit_required: number;
  booking_status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  payment_reference?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SalesRequest {
  id: string;
  listing_id: string;
  full_name: string;
  phone: string;
  email: string;
  budget_range: string;
  deposit_ready: 'Yes' | 'No';
  trade_in: 'Yes' | 'No';
  preferred_contact_method: 'WhatsApp' | 'Phone' | 'Email';
  message: string;
  source: string;
  status: 'New' | 'Contacted' | 'Negotiating' | 'Closed' | 'Lost';
  created_at: string;
  updated_at: string;
}

export interface CourierRequest {
  id: string;
  sender_name: string;
  sender_phone: string;
  recipient_name: string;
  recipient_phone: string;
  pickup_address: string;
  delivery_address: string;
  package_type: string;
  package_size: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  urgency: 'Standard' | 'Express' | 'Same Day';
  quote_amount?: number;
  notes?: string;
  status: 'New' | 'Quoted' | 'Accepted' | 'Picked Up' | 'Delivered' | 'Cancelled';
  created_at: string;
  updated_at: string;
}

export interface ImportRequest {
  id: string;
  tracking_id: string;
  full_name: string;
  phone: string;
  email: string;
  make: string;
  model: string;
  year_range: string;
  budget: number;
  engine_size: string;
  transmission: 'Automatic' | 'Manual';
  notes?: string;
  id_document_url?: string;
  deposit_amount?: number;
  deposit_status: 'Pending' | 'Paid' | 'Refunded';
  import_status: 'Request Received' | 'Sourcing' | 'Purchased' | 'Shipping' | 'Arrived at Port' | 'Customs/Clearance' | 'Ready for Pickup';
  last_status_update: string;
  estimated_total_cost?: number;
  created_at: string;
  updated_at: string;
  doc_url?: string;
}

export interface TowingRequest {
  id: string;
  full_name: string;
  phone: string;
  vehicle_type: string;
  issue_type: string;
  pickup_location: string;
  pickup_lat?: number;
  pickup_lng?: number;
  dropoff_location?: string;
  urgency: 'Standard' | 'Urgent' | 'Emergency';
  image_url?: string;
  notes?: string;
  status: 'New' | 'Dispatched' | 'In Progress' | 'Completed' | 'Cancelled';
  created_at: string;
  updated_at: string;
}
