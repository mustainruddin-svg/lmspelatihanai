/* ==========================================================
   AI UNTUK GURU — BACKEND (Google Apps Script)
   Yayasan Ar-Rahmah Sulawesi

   Cara pakai singkat (detail lengkap ada di backend/README.md):
   1. Buat Google Sheet baru, buat sheet bernama "Progress" dengan
      header di baris 1: Timestamp | Nama | Unit | ModuleId | Completed | Score
   2. Buka Extensions > Apps Script, hapus isi default, tempel kode ini.
   3. Deploy > New deployment > Web app.
      - Execute as: Me
      - Who has access: Anyone
   4. Salin URL Web App, tempel ke CONFIG.API_URL di config.js.
   ========================================================== */

const SHEET_NAME = "Progress";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Timestamp", "Nama", "Unit", "ModuleId", "Completed", "Score"]);
  }
  return sheet;
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ----------------------------------------------------------
   GET — dipakai untuk membaca progres
   ?action=getProgress&nama=...   -> progres 1 guru (semua device)
   ?action=getAllProgress         -> semua baris (untuk admin.html)
   ---------------------------------------------------------- */
function doGet(e) {
  const action = (e.parameter.action || "").toString();
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const header = values.shift(); // buang header

  const rows = values.map(r => ({
    timestamp: r[0],
    nama: r[1],
    unit: r[2],
    moduleId: r[3],
    completed: r[4] === true || r[4] === "TRUE",
    score: r[5]
  }));

  if (action === "getProgress") {
    const nama = (e.parameter.nama || "").toString().trim().toLowerCase();
    const filtered = rows.filter(r => (r.nama || "").toString().trim().toLowerCase() === nama);
    return jsonOut_({ ok: true, rows: filtered });
  }

  if (action === "getAllProgress") {
    return jsonOut_({ ok: true, rows: rows });
  }

  return jsonOut_({ ok: false, error: "Aksi tidak dikenal. Gunakan ?action=getProgress atau ?action=getAllProgress" });
}

/* ----------------------------------------------------------
   POST — dipakai untuk menyimpan progres
   body JSON: { action:"saveProgress", nama, unit, moduleId, completed, score, timestamp }
   Perilaku: upsert berdasarkan (nama + unit + moduleId)
   ---------------------------------------------------------- */
function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonOut_({ ok: false, error: "Body tidak valid" });
  }

  if (payload.action !== "saveProgress") {
    return jsonOut_({ ok: false, error: "Aksi tidak dikenal" });
  }

  const sheet = getSheet_();
  const data = sheet.getDataRange().getValues();
  const nama = (payload.nama || "").toString().trim();
  const unit = (payload.unit || "").toString().trim();
  const moduleId = Number(payload.moduleId);

  let targetRow = -1;
  for (let i = 1; i < data.length; i++) {
    const rowNama = (data[i][1] || "").toString().trim().toLowerCase();
    const rowUnit = (data[i][2] || "").toString().trim().toLowerCase();
    const rowModule = Number(data[i][3]);
    if (rowNama === nama.toLowerCase() && rowUnit === unit.toLowerCase() && rowModule === moduleId) {
      targetRow = i + 1; // +1 karena getDataRange 0-index, sheet 1-index
      break;
    }
  }

  const rowValues = [
    payload.timestamp || new Date().toISOString(),
    nama,
    unit,
    moduleId,
    !!payload.completed,
    Number(payload.score) || 0
  ];

  if (targetRow > 0) {
    sheet.getRange(targetRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  return jsonOut_({ ok: true });
}
