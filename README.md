# Backend — Google Sheets + Apps Script

Backend ini opsional untuk tahap awal: aplikasi tetap berjalan penuh lewat
`localStorage` di browser masing-masing guru walau backend belum disambungkan.
Sambungkan backend ini kalau Anda ingin:

- Progres guru tetap ada walau ganti perangkat/browser
- Halaman **Rekap** (`admin.html`) bisa menampilkan progres semua guru

## Langkah setup

1. **Buat Google Sheet baru** (boleh nama bebas, misalnya `DB - AI untuk Guru`).
2. Buka **Extensions > Apps Script**.
3. Hapus semua isi editor bawaan, lalu tempel isi file `Code.gs` di folder ini.
4. Simpan project (nama bebas, misalnya `AI untuk Guru - Backend`).
5. Klik **Deploy > New deployment**.
   - Pilih tipe **Web app**.
   - **Execute as**: Me (akun Anda).
   - **Who has access**: Anyone.
   - Klik **Deploy**, lalu izinkan akses (Authorize access) saat diminta.
6. Salin **URL Web app** yang muncul (formatnya `https://script.google.com/macros/s/XXXXXXXX/exec`).
7. Buka file `config.js` di folder utama project, tempel URL tersebut ke:
   ```js
   API_URL: "https://script.google.com/macros/s/XXXXXXXX/exec"
   ```
8. Deploy ulang website Anda ke Vercel (atau redeploy jika sudah live).

Sheet `Progress` akan otomatis dibuat oleh script saat pertama kali dipanggil,
dengan kolom: `Timestamp | Nama | Unit | ModuleId | Completed | Score`.

## Setiap kali mengubah Code.gs

Google Apps Script **tidak otomatis memperbarui** Web App yang sudah di-deploy.
Setelah mengedit `Code.gs`, buka **Deploy > Manage deployments**, pilih deployment
aktif, klik ikon pensil, lalu pilih **Version: New version** dan **Deploy** lagi.
URL Web App tidak berubah, jadi tidak perlu update `config.js` lagi.

## PIN halaman Rekap

PIN untuk `admin.html` diatur di `config.js` (`ADMIN_PIN`). Ini hanya proteksi
ringan di sisi tampilan (bukan keamanan data) — cocok untuk membatasi akses
santai di lingkungan internal yayasan, sama seperti dashboard PIN-protected
lain yang sudah biasa dipakai.
