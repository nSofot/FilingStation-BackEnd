import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import LedgerAccount from "../models/ledgerAccounts.js"; // your schema

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder for uploaded files

// API endpoint: POST /api/import-customers
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1. Read uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet);

    // 2. Transform rows → match LedgerAccount schema fields
    const ledgerAccount = rows.map((row) => ({
      accountId: row["Account No"], 
      accountType: row["Account Type"],
      accountCategory: row["Category"],
      accountSubCategory: row["Sub Category"]  || "",
      headerAccount: row["Header Accounts"]  || "",
      accountName: row["Account Name"]  || "",
      accountBalance: Number(row["Balance"] || 0),
      updatedAt: new Date(),
      createdAt: new Date(),
      isDeleted: "false"
    }));

    // 3. Insert into MongoDB
    await LedgerAccount.insertMany(ledgerAccount, { ordered: false }); // skip duplicates

    res.json({ success: true, inserted: ledgerAccount.length });
  } catch (err) {
    console.error("Import error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;