import express from "express";
import path from "path";
import "dotenv/config";
import { createServer as createViteServer } from "vite";
import { getSheetRows, addSheetRow, updateSheetRow, deleteSheetRow } from "./src/services/sheets.ts";
import { uploadToCloudinary } from "./src/services/cloudinary.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Admin Auth
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, token: "zsr_ops_session_token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid password" });
    }
  });

  // Vehicles
  app.get("/api/vehicles", async (req, res) => {
    try {
      const rows = await getSheetRows("vehicle_listings");
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });

  app.post("/api/vehicles", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await addSheetRow("vehicle_listings", data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to add vehicle" });
    }
  });

  app.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await updateSheetRow("vehicle_listings", req.params.id, data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to update vehicle" });
    }
  });

  // Sales Requests
  app.post("/api/sales-requests", async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        status: 'New', 
        source: 'Website',
        updated_at: new Date().toISOString() 
      };
      const row = await addSheetRow("sales_requests", data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to submit inquiry" });
    }
  });

  app.get("/api/admin/sales-requests", async (req, res) => {
    try {
      const rows = await getSheetRows("sales_requests");
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch inquiries" });
    }
  });

  // Rental Bookings
  app.get("/api/rentals/bookings", async (req, res) => {
    try {
      const rows = await getSheetRows("rental_bookings");
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.get("/api/rentals/blocked-dates/:vehicleId", async (req, res) => {
    try {
      const rows = await getSheetRows("rental_bookings");
      const blocked = rows
        .filter(r => r.vehicle_id === req.params.vehicleId && r.booking_status !== 'Cancelled')
        .map(r => ({
          start: r.pickup_date,
          end: r.return_date
        }));
      res.json(blocked);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch blocked dates" });
    }
  });

  app.post("/api/rentals/bookings", async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        booking_status: 'Pending',
        deposit_status: 'Pending',
        updated_at: new Date().toISOString() 
      };
      const row = await addSheetRow("rental_bookings", data);
      
      // Email notification placeholder
      console.log(`[EMAIL] New booking for ${data.full_name} - Vehicle: ${data.vehicle_id}`);
      
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.patch("/api/rentals/bookings/:id", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await updateSheetRow("rental_bookings", req.params.id, data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // Courier Requests
  app.get("/api/courier-requests", async (req, res) => {
    try {
      const rows = await getSheetRows("courier_requests");
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch courier requests" });
    }
  });

  app.post("/api/courier-requests", async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        status: 'New', 
        updated_at: new Date().toISOString() 
      };
      const row = await addSheetRow("courier_requests", data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to submit courier request" });
    }
  });

  app.patch("/api/courier-requests/:id", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await updateSheetRow("courier_requests", req.params.id, data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to update courier request" });
    }
  });

  // Import Requests
  app.get("/api/import-requests", async (req, res) => {
    try {
      const rows = await getSheetRows("import_requests");
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch import requests" });
    }
  });

  app.get("/api/import-requests/track/:trackingId", async (req, res) => {
    try {
      const rows = await getSheetRows("import_requests");
      const request = rows.find((r: any) => r.tracking_id === req.params.trackingId);
      if (!request) return res.status(404).json({ error: "Tracking ID not found" });
      res.json(request);
    } catch (e) {
      res.status(500).json({ error: "Failed to track request" });
    }
  });

  app.post("/api/import-requests", async (req, res) => {
    try {
      const tracking_id = `ZSR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const data = { 
        ...req.body, 
        tracking_id,
        deposit_status: 'Pending',
        import_status: 'Request Received',
        last_status_update: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString() 
      };
      const row = await addSheetRow("import_requests", data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to submit import request" });
    }
  });

  app.patch("/api/import-requests/:id", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await updateSheetRow("import_requests", req.params.id, data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to update import request" });
    }
  });

  app.get("/api/import-calculator-config", async (req, res) => {
    try {
      const rows = await getSheetRows("import_calculator_config");
      if (rows && rows.length > 0) {
        res.json(rows[0]); // Return the first row as config
      } else {
        // Default fallback if sheet is empty or missing
        res.json({
          base_duty: 0.20,
          electric_duty: 0.10,
          hybrid_duty: 0.15,
          high_engine_duty: 0.35,
          mid_engine_duty: 0.25,
          standard_fees: 150000,
          gct_rate: 0.15
        });
      }
    } catch (e) {
      console.error("Error fetching calculator config, using defaults:", e);
      // Return defaults even on error to prevent 500
      res.json({
        base_duty: 0.20,
        electric_duty: 0.10,
        hybrid_duty: 0.15,
        high_engine_duty: 0.35,
        mid_engine_duty: 0.25,
        standard_fees: 150000,
        gct_rate: 0.15
      });
    }
  });

  // Towing Requests
  app.get("/api/towing-requests", async (req, res) => {
    try {
      const rows = await getSheetRows("towing_requests");
      // Sort by created_at newest first
      const sorted = rows.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      res.json(sorted);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch towing requests" });
    }
  });

  app.post("/api/towing-requests", async (req, res) => {
    try {
      const id = `TW-${Date.now()}`;
      const data = { 
        ...req.body, 
        id,
        status: 'New',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString() 
      };
      const row = await addSheetRow("towing_requests", data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to submit towing request" });
    }
  });

  app.patch("/api/towing-requests/:id", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await updateSheetRow("towing_requests", req.params.id, data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to update towing request" });
    }
  });

  // Lead Capture for Listing Requests
  app.post("/api/leads/listing-request", async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        status: 'New', 
        created_at: new Date().toISOString() 
      };
      // We'll append to a general 'listing_leads' sheet
      const row = await addSheetRow("listing_leads", data);
      res.json(row);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to log lead" });
    }
  });

  // Media Upload
  app.post("/api/upload", async (req, res) => {
    try {
      const { file, folder } = req.body;
      const result = await uploadToCloudinary(file, folder);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const rows = await getSheetRows("testimonials");
      res.json(rows);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const data = { 
        ...req.body, 
        status: 'Pending',
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString() 
      };
      const row = await addSheetRow("testimonials", data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to submit testimonial" });
    }
  });

  app.patch("/api/testimonials/:id", async (req, res) => {
    try {
      const data = { ...req.body, updated_at: new Date().toISOString() };
      const row = await updateSheetRow("testimonials", req.params.id, data);
      res.json(row);
    } catch (e) {
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", async (req, res) => {
    try {
      await deleteSheetRow("testimonials", req.params.id);
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
