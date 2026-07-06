# AI untuk Guru — LMS Yayasan Ar-Rahmah Sulawesi

LMS ringan berbasis 10 modul praktis untuk melatih guru **PAUD sampai SMP/SMA**
memakai AI (Gemini/Claude) dalam menyusun modul ajar, media visual, dan
aktivitas kelas — diadaptasi dari materi "10 Prompt Ajaib untuk Guru TK".

Setiap modul memakai contoh yang otomatis menyesuaikan jenjang guru yang login
(PAUD / SD / SMP–SMA), dilengkapi latihan mandiri dan kuis pemahaman.
Progres tersimpan otomatis (badge ⭐ per modul selesai + progress bar), dan
opsional disinkronkan ke Google Sheets agar bisa direkap lintas-guru.

## Struktur file

```
index.html          -> halaman utama (dipakai guru)
admin.html           -> rekap progres seluruh guru (PIN-protected)
config.js            -> satu-satunya file yang perlu diisi (URL backend, PIN)
modules-data.js       -> seluruh konten 10 modul (teks, contoh, kuis)
app.js                -> logika aplikasi (routing, kuis, localStorage, sync)
style.css             -> desain (palet sky blue/putih/emas sesuai brand Ar-Rahmah)
backend/Code.gs        -> backend Google Apps Script (opsional, lihat backend/README.md)
backend/README.md      -> panduan setup backend
```

## Menjalankan secara lokal (sebelum deploy)

Karena ini murni HTML/CSS/JS statis, cukup buka `index.html` langsung di
browser untuk mencoba — atau jalankan server lokal sederhana:

```bash
npx serve .
```

## Deploy ke Vercel

1. Buat folder ini sebagai satu repo/folder project (tidak perlu build step —
   ini situs statis).
2. Di [vercel.com](https://vercel.com), klik **New Project**, import folder ini
   (lewat GitHub atau upload langsung).
3. Framework preset: pilih **Other** (tidak perlu Next.js/dsb).
4. Deploy. Vercel akan memberi URL seperti `nama-project.vercel.app`.

Tidak ada environment variable yang perlu diisi di Vercel — semua konfigurasi
ada di `config.js`.

## Menghubungkan backend (opsional tapi direkomendasikan)

Ikuti `backend/README.md` untuk membuat Google Sheet + Apps Script, lalu isi
`API_URL` di `config.js`. Tanpa langkah ini, aplikasi tetap 100% berfungsi
untuk satu guru di satu perangkat (data tersimpan di localStorage browser),
hanya saja tidak bisa direkap lintas-guru di `admin.html`.

## Menambah / mengubah materi

Semua konten (judul modul, contoh prompt per jenjang, tips, kuis) ada di satu
file: `modules-data.js`. Tidak perlu menyentuh `app.js` untuk mengubah kata-kata
atau menambah soal kuis — cukup edit array `MODULES` di file tersebut mengikuti
struktur modul yang sudah ada.

## Branding

Palet warna (sky blue primer, putih dominan, emas aksen — tanpa hijau/teal)
sudah ditetapkan sebagai token CSS di bagian atas `style.css` (`:root`), jadi
bisa disesuaikan dari satu tempat jika suatu saat dibutuhkan.
