/* ==========================================================
   KONFIGURASI LMS — AI UNTUK GURU (Yayasan Ar-Rahmah Sulawesi)
   Cukup ubah nilai di bawah ini, tidak perlu sentuh file lain.
   ========================================================== */
const CONFIG = {
  // Tempel URL Web App Google Apps Script di sini setelah deploy
  // (lihat backend/README.md). Contoh:
  // "https://script.google.com/macros/s/XXXXXXXXXXXXXXXX/exec"
  API_URL: "https://script.google.com/macros/s/AKfycbzMk7XmgV8HKIgkZB_OMqgETLyEV2ITRGydh8zbNUaBYT3h2JgtL6w7FyvmvnpWhkX9VA/exec",

  // Ambang lulus kuis per modul (0.66 = minimal 66% benar)
  PASS_SCORE: 0.66,

  // PIN untuk membuka halaman rekap (admin.html).
  // Ini hanya proteksi ringan di sisi tampilan, bukan keamanan data.
  ADMIN_PIN: "2026"
};
