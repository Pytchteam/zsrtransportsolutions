import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Settings, 
  Plus, 
  LogOut, 
  ChevronRight, 
  Image as ImageIcon, 
  X, 
  MessageSquare, 
  Calendar, 
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Ship,
  AlertTriangle,
  Phone,
  Clock,
  MoreVertical,
  Search,
  Filter,
  FileText,
  DollarSign,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Vehicle, SalesRequest, RentalBooking, CourierRequest, ImportRequest, TowingRequest } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function TestimonialsTable({ testimonials, onRefresh }: { testimonials: any[], onRefresh: () => void }) {
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/testimonials/${id}`, { status });
      onRefresh();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await axios.patch(`/api/testimonials/${id}`, { featured });
      onRefresh();
    } catch (e) {
      alert('Failed to update featured status');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      onRefresh();
    } catch (e) {
      alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Service</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Rating</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Quote</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold">{t.customer_name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">{t.service_type}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-200"} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-neutral-500 italic line-clamp-2 max-w-xs">"{t.quote}"</p>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={t.status}
                    onChange={(e) => updateStatus(t.id, e.target.value)}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border-none outline-none cursor-pointer",
                      t.status === 'Approved' ? "bg-emerald-100 text-emerald-600" :
                      t.status === 'Pending' ? "bg-orange-100 text-orange-600" :
                      "bg-red-100 text-red-600"
                    )}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleFeatured(t.id, !t.featured)}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        t.featured ? "bg-yellow-50 text-yellow-600" : "bg-neutral-50 text-neutral-400 hover:text-neutral-600"
                      )}
                      title={t.featured ? "Unfeature" : "Feature"}
                    >
                      <Star size={16} fill={t.featured ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => deleteTestimonial(t.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MediaLibrary() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // We can fetch from vehicles, testimonials, and import docs
        const [vRes, tRes, iRes] = await Promise.all([
          axios.get('/api/vehicles'),
          axios.get('/api/testimonials'),
          axios.get('/api/import-requests')
        ]);

        const allImages: any[] = [];
        
        vRes.data.forEach((v: any) => {
          if (v.cover_image_url) allImages.push({ url: v.cover_image_url, source: 'Vehicle', id: v.id });
          try {
            const gallery = JSON.parse(v.gallery_urls || '[]');
            gallery.forEach((url: string) => allImages.push({ url, source: 'Vehicle Gallery', id: v.id }));
          } catch (e) {}
        });

        tRes.data.forEach((t: any) => {
          if (t.media_url) allImages.push({ url: t.media_url, source: 'Testimonial', id: t.id });
        });

        iRes.data.forEach((i: any) => {
          if (i.id_document_url) allImages.push({ url: i.id_document_url, source: 'Import Doc', id: i.id });
        });

        setMedia(allImages);
      } catch (e) {
        console.error('Failed to fetch media');
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading media...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {media.map((item, i) => (
        <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <img 
            src={item.url} 
            className="w-full h-full object-cover transition-transform group-hover:scale-110" 
            alt="Media"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
            <span className="text-[10px] font-bold uppercase text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
              {item.source}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TowingRequestsTable({ requests, onRefresh }: { requests: TowingRequest[], onRefresh: () => void }) {
  const [editingRequest, setEditingRequest] = useState<TowingRequest | null>(null);

  const updateStatus = async (id: string, status: TowingRequest['status']) => {
    try {
      await axios.patch(`/api/towing-requests/${id}`, { status });
      onRefresh();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    try {
      await axios.patch(`/api/towing-requests/${id}`, { notes });
      onRefresh();
      setEditingRequest(null);
    } catch (e) {
      alert('Failed to update notes');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Customer</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Vehicle/Issue</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Location</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Urgency</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold">{req.full_name}</div>
                  <div className="text-xs text-neutral-500">{req.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">{req.vehicle_type}</div>
                  <div className="text-xs text-red-600 font-bold">{req.issue_type}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm truncate max-w-[200px]" title={req.pickup_location}>
                    <span className="font-bold text-xs text-neutral-400">Pickup:</span> {req.pickup_location}
                  </div>
                  {req.dropoff_location && (
                    <div className="text-xs text-neutral-500 truncate max-w-[200px]" title={req.dropoff_location}>
                      <span className="font-bold text-xs text-neutral-400">Dropoff:</span> {req.dropoff_location}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    req.urgency === 'Emergency' ? "bg-red-100 text-red-600" :
                    req.urgency === 'Urgent' ? "bg-orange-100 text-orange-600" :
                    "bg-blue-100 text-blue-600"
                  )}>
                    {req.urgency}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value as any)}
                    className={cn(
                      "text-xs font-bold px-3 py-1 rounded-lg border-none outline-none",
                      req.status === 'Completed' ? "bg-green-100 text-green-600" :
                      req.status === 'Cancelled' ? "bg-red-100 text-red-600" :
                      req.status === 'Dispatched' ? "bg-blue-100 text-blue-600" :
                      req.status === 'In Progress' ? "bg-orange-100 text-orange-600" :
                      "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {['New', 'Dispatched', 'In Progress', 'Completed', 'Cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setEditingRequest(req)}
                    className="text-brand-primary hover:underline text-sm font-bold"
                  >
                    Details/Notes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {editingRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-display font-bold">Request Details</h3>
                <button onClick={() => setEditingRequest(null)} className="p-2 hover:bg-neutral-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase">Customer</label>
                    <p className="font-bold">{editingRequest.full_name}</p>
                    <p>{editingRequest.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-neutral-400 uppercase">Request ID</label>
                    <p className="font-mono text-xs">{editingRequest.id}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase">Pickup Location</label>
                  <p className="text-sm bg-neutral-50 p-3 rounded-xl border border-neutral-100">{editingRequest.pickup_location}</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-400 uppercase">Admin Notes</label>
                  <textarea
                    className="w-full mt-2 p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-primary"
                    rows={4}
                    defaultValue={editingRequest.notes}
                    onBlur={(e) => updateNotes(editingRequest.id, e.target.value)}
                    placeholder="Add driver notes, dispatch info, etc."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setEditingRequest(null)}
                    className="flex-1 py-3 bg-neutral-100 text-neutral-600 rounded-xl font-bold"
                  >
                    Close
                  </button>
                  <a 
                    href={`tel:${editingRequest.phone}`}
                    className="flex-1 py-3 bg-brand-primary text-white rounded-xl font-bold text-center flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> Call Customer
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CourierRequestsTable({ requests, onRefresh }: { requests: CourierRequest[], onRefresh: () => void }) {
  const [editingRequest, setEditingRequest] = useState<CourierRequest | null>(null);

  const updateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      await axios.patch(`/api/courier-requests/${editingRequest.id}`, data);
      setEditingRequest(null);
      onRefresh();
    } catch (e) {
      alert('Failed to update request');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Route</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Package</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Quote</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <MapPin size={12} /> {req.pickup_address}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-accent">
                    <Truck size={12} /> {req.delivery_address}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-sm">{req.package_type}</div>
                <div className="text-[10px] text-neutral-400 uppercase">{req.package_size} • {req.urgency}</div>
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                {req.quote_amount ? `JMD ${req.quote_amount.toLocaleString()}` : 'Not Quoted'}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  req.status === 'New' ? 'bg-blue-100 text-blue-600' : 
                  req.status === 'Quoted' ? 'bg-yellow-100 text-yellow-600' : 
                  req.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
                  'bg-neutral-100 text-neutral-600'
                }`}>
                  {req.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => setEditingRequest(req)}
                  className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <Settings size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRequest && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Update Request</h3>
              <button onClick={() => setEditingRequest(null)} className="p-2 hover:bg-neutral-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={updateRequest} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Status</label>
                <select 
                  name="status" 
                  defaultValue={editingRequest.status}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none"
                >
                  <option value="New">New</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Quote Amount (JMD)</label>
                <input 
                  name="quote_amount" 
                  type="number" 
                  defaultValue={editingRequest.quote_amount}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Admin Notes</label>
                <textarea 
                  name="notes" 
                  defaultValue={editingRequest.notes}
                  rows={3}
                  className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none resize-none" 
                />
              </div>
              <button type="submit" className="w-full btn-primary py-4">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ImportRequestsTable({ requests, onRefresh }: { requests: ImportRequest[], onRefresh: () => void }) {
  const [editingRequest, setEditingRequest] = useState<ImportRequest | null>(null);

  const updateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRequest) return;

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      await axios.patch(`/api/import-requests/${editingRequest.id}`, {
        ...data,
        last_status_update: new Date().toISOString()
      });
      setEditingRequest(null);
      onRefresh();
    } catch (e) {
      alert('Failed to update request');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Tracking / Customer</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Vehicle</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Cost / Deposit</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-mono text-xs font-bold text-brand-accent">{req.tracking_id}</div>
                <div className="font-bold text-sm">{req.full_name}</div>
                <div className="text-[10px] text-neutral-400">{req.phone}</div>
              </td>
              <td className="px-6 py-4">
                <div className="font-bold text-sm">{req.year_range} {req.make} {req.model}</div>
                <div className="text-[10px] text-neutral-400 uppercase">{req.engine_size}cc • {req.transmission}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium">Est: JMD {req.estimated_total_cost?.toLocaleString() || 'TBD'}</div>
                <div className={`text-[10px] font-bold uppercase ${req.deposit_status === 'Paid' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                  Dep: {req.deposit_status} ({req.deposit_amount?.toLocaleString() || '0'})
                </div>
                {req.id_document_url && (
                  <a 
                    href={req.id_document_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-blue-600 hover:underline font-bold mt-1"
                  >
                    <FileText size={10} /> View ID Document
                  </a>
                )}
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded bg-neutral-100 text-neutral-600 text-[10px] font-bold uppercase">
                  {req.import_status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => setEditingRequest(req)}
                  className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <Settings size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingRequest && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Update Import</h3>
              <button onClick={() => setEditingRequest(null)} className="p-2 hover:bg-neutral-100 rounded-full"><X size={20} /></button>
            </div>
            <form onSubmit={updateRequest} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400">Import Status</label>
                <select 
                  name="import_status" 
                  defaultValue={editingRequest.import_status}
                  className="w-full p-3 rounded-xl bg-neutral-50 border-none outline-none text-sm"
                >
                  {IMPORT_STEPS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Deposit Status</label>
                  <select 
                    name="deposit_status" 
                    defaultValue={editingRequest.deposit_status}
                    className="w-full p-3 rounded-xl bg-neutral-50 border-none outline-none text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-neutral-400">Deposit Amount</label>
                  <input name="deposit_amount" type="number" defaultValue={editingRequest.deposit_amount} className="w-full p-3 rounded-xl bg-neutral-50 border-none outline-none text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400">Estimated Total Cost (JMD)</label>
                <input name="estimated_total_cost" type="number" defaultValue={editingRequest.estimated_total_cost} className="w-full p-3 rounded-xl bg-neutral-50 border-none outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-neutral-400">Admin Notes</label>
                <textarea name="notes" defaultValue={editingRequest.notes} rows={2} className="w-full p-3 rounded-xl bg-neutral-50 border-none outline-none text-sm resize-none" />
              </div>
              <button type="submit" className="w-full btn-primary py-4 mt-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const IMPORT_STEPS = [
  'Request Received',
  'Sourcing',
  'Purchased',
  'Shipping',
  'Arrived at Port',
  'Customs/Clearance',
  'Ready for Pickup'
];

export function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'vehicles' | 'bookings' | 'courier' | 'imports' | 'towing' | 'testimonials' | 'media'>('leads');
  const [leads, setLeads] = useState<SalesRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [bookings, setBookings] = useState<RentalBooking[]>([]);
  const [courierRequests, setCourierRequests] = useState<CourierRequest[]>([]);
  const [importRequests, setImportRequests] = useState<ImportRequest[]>([]);
  const [towingRequests, setTowingRequests] = useState<TowingRequest[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { password });
      if (res.data.success) {
        setIsLoggedIn(true);
        localStorage.setItem('zsr_token', res.data.token);
      }
    } catch (e) {
      alert('Invalid password');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'leads') {
        const res = await axios.get('/api/admin/sales-requests');
        setLeads(res.data);
      } else if (activeTab === 'vehicles') {
        const res = await axios.get('/api/vehicles');
        setVehicles(res.data);
      } else if (activeTab === 'bookings') {
        const res = await axios.get('/api/rentals/bookings');
        setBookings(res.data);
      } else if (activeTab === 'courier') {
        const res = await axios.get('/api/courier-requests');
        setCourierRequests(res.data);
      } else if (activeTab === 'imports') {
        const res = await axios.get('/api/import-requests');
        setImportRequests(res.data);
      } else if (activeTab === 'towing') {
        const res = await axios.get('/api/towing-requests');
        setTowingRequests(res.data);
      } else if (activeTab === 'testimonials') {
        const res = await axios.get('/api/testimonials');
        setTestimonials(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    const file = formData.get('cover_image') as File;
    
    try {
      let cover_image_url = editingVehicle?.cover_image_url || '';
      
      if (file && file.size > 0) {
        const reader = new FileReader();
        const base64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        const uploadRes = await axios.post('/api/upload', { file: base64, folder: 'vehicles' });
        cover_image_url = uploadRes.data.url;
      }

      if (editingVehicle) {
        await axios.patch(`/api/vehicles/${editingVehicle.id}`, { ...data, cover_image_url });
      } else {
        await axios.post('/api/vehicles', {
          ...data,
          listing_type: 'Sale',
          currency: 'JMD',
          seats: 5,
          category: 'SUV',
          status: 'Available',
          featured: false,
          cover_image_url,
          gallery_urls: '[]',
          cloudinary_public_ids: '[]',
        });
      }
      setShowModal(false);
      setEditingVehicle(null);
      fetchData();
    } catch (e) {
      alert('Failed to save vehicle');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl space-y-8">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-lg bg-white border-4 border-neutral-100">
              <img 
                src="https://res.cloudinary.com/dopxnugqn/image/upload/v1774279992/WhatsApp_Image_2026-03-23_at_10.32.40_zpruty.jpg" 
                alt="ZSR Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-bold">ZSR Ops Login</h1>
              <p className="text-neutral-500">Enter the admin password to manage the platform.</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-brand-accent outline-none"
              required
            />
            <button type="submit" className="btn-primary w-full py-4">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-white/5 p-6 space-y-8 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <img 
              src="https://res.cloudinary.com/dopxnugqn/image/upload/v1774279992/WhatsApp_Image_2026-03-23_at_10.32.40_zpruty.jpg" 
              alt="ZSR Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">Ops Center</span>
        </div>

        <nav className="space-y-1.5">
          {[
            { id: 'leads', label: 'Sales Requests', icon: Users },
            { id: 'bookings', label: 'Rental Bookings', icon: Calendar },
            { id: 'courier', label: 'Courier Requests', icon: Package },
            { id: 'imports', label: 'Import Requests', icon: Ship },
            { id: 'towing', label: 'Towing Dispatch', icon: AlertTriangle },
            { id: 'testimonials', label: 'Testimonials', icon: Star },
            { id: 'vehicles', label: 'Inventory', icon: Car },
            { id: 'media', label: 'Media Library', icon: ImageIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-neutral-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={18} /> Settings
          </button>
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-display font-black capitalize tracking-tight">
              {activeTab === 'leads' ? 'Sales Requests' : 
               activeTab === 'bookings' ? 'Rental Bookings' : 
               activeTab === 'courier' ? 'Courier Requests' : 
               activeTab === 'imports' ? 'Import Requests' : 
               activeTab === 'towing' ? 'Towing Dispatch' : 
               activeTab === 'testimonials' ? 'Testimonials' :
               activeTab === 'media' ? 'Media Library' :
               'Inventory'}
            </h2>
            <p className="text-neutral-500 font-medium tracking-wide">Manage your ZSR {activeTab} in real-time.</p>
          </div>
          {activeTab === 'vehicles' && (
            <button 
              onClick={() => { setEditingVehicle(null); setShowModal(true); }}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20 hover:scale-105 active:scale-95"
            >
              <Plus size={20} /> Add New Listing
            </button>
          )}
        </header>

        {loading ? (
          <div className="py-24 text-center text-neutral-400">Loading data...</div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
            {activeTab === 'leads' ? (
              <LeadsTable leads={leads} onRefresh={fetchData} />
            ) : activeTab === 'bookings' ? (
              <BookingsTable bookings={bookings} onRefresh={fetchData} />
            ) : activeTab === 'courier' ? (
              <CourierRequestsTable requests={courierRequests} onRefresh={fetchData} />
            ) : activeTab === 'imports' ? (
              <ImportRequestsTable requests={importRequests} onRefresh={fetchData} />
            ) : activeTab === 'towing' ? (
              <TowingRequestsTable requests={towingRequests} onRefresh={fetchData} />
            ) : activeTab === 'testimonials' ? (
              <TestimonialsTable testimonials={testimonials} onRefresh={fetchData} />
            ) : activeTab === 'media' ? (
              <MediaLibrary />
            ) : (
              <VehiclesTable 
                vehicles={vehicles} 
                onEdit={(v) => { setEditingVehicle(v); setShowModal(true); }} 
                onAdd={() => { setEditingVehicle(null); setShowModal(true); }}
              />
            )}
          </div>
        )}
      </main>

      {/* Vehicle Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-12 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-display font-bold">{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-neutral-100 rounded-full"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Make</label>
                <input name="make" defaultValue={editingVehicle?.make} required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Model</label>
                <input name="model" defaultValue={editingVehicle?.model} required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Year</label>
                <input name="year" type="number" defaultValue={editingVehicle?.year} required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Price (JMD)</label>
                <input name="price" type="number" defaultValue={editingVehicle?.price} required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Mileage (km)</label>
                <input name="mileage" type="number" defaultValue={editingVehicle?.mileage} required className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Transmission</label>
                <select name="transmission" defaultValue={editingVehicle?.transmission} className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Cover Image</label>
                <input name="cover_image" type="file" accept="image/*" className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
                {editingVehicle?.cover_image_url && (
                  <img src={editingVehicle.cover_image_url} className="mt-2 w-32 h-20 object-cover rounded-lg" />
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-neutral-400">Description</label>
                <textarea name="description" defaultValue={editingVehicle?.description} rows={4} className="w-full p-4 rounded-xl bg-neutral-50 border-none outline-none" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary md:col-span-2 py-5 text-lg disabled:opacity-50">
                {loading ? 'Processing...' : (editingVehicle ? 'Update Listing' : 'Create Listing')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadsTable({ leads, onRefresh }: { leads: SalesRequest[], onRefresh: () => void }) {
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/sales-requests/${id}`, { status });
      onRefresh();
    } catch (e) {
      alert('Failed to update status');
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Customer</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Budget</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Date</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold">{lead.full_name}</div>
                <div className="text-xs text-neutral-400">{lead.phone}</div>
              </td>
              <td className="px-6 py-4 text-sm">
                {lead.budget_range}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  lead.status === 'New' ? 'bg-blue-100 text-blue-600' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-neutral-500">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <select 
                  value={lead.status} 
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                  className="text-xs font-bold p-2 rounded-lg bg-neutral-100 border-none outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Negotiating">Negotiating</option>
                  <option value="Sold">Sold</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VehiclesTable({ vehicles, onEdit, onAdd }: { vehicles: Vehicle[], onEdit: (v: Vehicle) => void, onAdd: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h3 className="text-xl font-bold">Current Inventory</h3>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
        >
          <Plus size={18} /> Add Vehicle
        </button>
      </div>
      <div className="bg-white rounded-[2rem] border border-neutral-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Vehicle</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Price</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Type</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {vehicles.map((v) => (
            <tr key={v.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
                  <img src={v.cover_image_url || 'https://picsum.photos/seed/car/100/100'} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold">{v.year} {v.make} {v.model}</div>
                  <div className="text-[10px] text-neutral-400 uppercase">{v.id}</div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                {v.currency} {v.price.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  v.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {v.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-neutral-500">
                {v.listing_type}
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onEdit(v)}
                  className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <Settings size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
}

function BookingsTable({ bookings, onRefresh }: { bookings: RentalBooking[], onRefresh: () => void }) {
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/rentals/bookings/${id}`, { booking_status: status });
      onRefresh();
    } catch (e) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Customer</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Dates</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Documents</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Status</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold">{booking.full_name}</div>
                <div className="text-xs text-neutral-400">{booking.phone}</div>
              </td>
              <td className="px-6 py-4 text-sm">
                <div>{new Date(booking.pickup_date).toLocaleDateString()}</div>
                <div className="text-neutral-400">to {new Date(booking.return_date).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  {booking.driver_license_url && (
                    <a href={booking.driver_license_url} target="_blank" className="p-1 bg-neutral-100 rounded text-[10px] font-bold">DL</a>
                  )}
                  {booking.government_id_url && (
                    <a href={booking.government_id_url} target="_blank" className="p-1 bg-neutral-100 rounded text-[10px] font-bold">ID</a>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  booking.booking_status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                  booking.booking_status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                  'bg-neutral-100 text-neutral-600'
                }`}>
                  {booking.booking_status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button onClick={() => updateStatus(booking.id, 'Confirmed')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg"><CheckCircle2 size={18} /></button>
                  <button onClick={() => updateStatus(booking.id, 'Cancelled')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><X size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
