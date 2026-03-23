import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

let doc: GoogleSpreadsheet | null = null;

export const initSheets = async () => {
  if (doc) return doc;

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !email || !privateKey) {
    console.warn("Google Sheets configuration is incomplete. Please check GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY in your environment variables.");
    return null;
  }

  try {
    // Clean up the private key if it's wrapped in quotes or has escaped newlines
    const formattedKey = privateKey
      .replace(/^['"](.*)['"]$/, '$1')
      .replace(/\\n/g, '\n');

    const jwt = new JWT({
      email,
      key: formattedKey,
      scopes: SCOPES,
    });

    doc = new GoogleSpreadsheet(sheetId, jwt);
    await doc.loadInfo();
    return doc;
  } catch (e: any) {
    doc = null; // Reset on failure
    if (e.message?.includes('No key or keyFile set')) {
      console.error("Google Sheets Auth Error: The private key is missing or invalid. Ensure GOOGLE_PRIVATE_KEY is correctly set in your environment variables.");
    } else {
      console.error("Failed to load Google Sheet info:", e.message || e);
    }
    return null;
  }
};

export const getSheetRows = async (sheetTitle: string) => {
  try {
    const spreadsheet = await initSheets();
    if (!spreadsheet) return [];
    const sheet = spreadsheet.sheetsByTitle[sheetTitle];
    if (!sheet) {
      console.warn(`Sheet "${sheetTitle}" not found`);
      return [];
    }
    const rows = await sheet.getRows();
    return rows.map(row => row.toObject());
  } catch (e) {
    console.error(`Error fetching rows from "${sheetTitle}":`, e);
    return [];
  }
};

export const addSheetRow = async (sheetTitle: string, data: any) => {
  try {
    const spreadsheet = await initSheets();
    if (!spreadsheet) return null;
    const sheet = spreadsheet.sheetsByTitle[sheetTitle];
    if (!sheet) {
      console.warn(`Sheet "${sheetTitle}" not found`);
      return null;
    }
    const row = await sheet.addRow({
      ...data,
      id: data.id || Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
    });
    return row.toObject();
  } catch (e) {
    console.error(`Error adding row to "${sheetTitle}":`, e);
    return null;
  }
};

export const updateSheetRow = async (sheetTitle: string, id: string, data: any) => {
  try {
    const spreadsheet = await initSheets();
    if (!spreadsheet) return null;
    const sheet = spreadsheet.sheetsByTitle[sheetTitle];
    if (!sheet) return null;
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (row) {
      Object.keys(data).forEach(key => {
        row.set(key, data[key]);
      });
      await row.save();
      return row.toObject();
    }
    return null;
  } catch (e) {
    console.error(`Error updating row in "${sheetTitle}":`, e);
    return null;
  }
};

export const deleteSheetRow = async (sheetTitle: string, id: string) => {
  try {
    const spreadsheet = await initSheets();
    if (!spreadsheet) return null;
    const sheet = spreadsheet.sheetsByTitle[sheetTitle];
    if (!sheet) return null;
    const rows = await sheet.getRows();
    const row = rows.find(r => r.get('id') === id);
    if (row) {
      await row.delete();
      return true;
    }
    return false;
  } catch (e) {
    console.error(`Error deleting row from "${sheetTitle}":`, e);
    return false;
  }
};
