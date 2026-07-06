/* ============================================================
   MODULES-DATA.JS
   Sumber data konten LMS "AI untuk Guru: PAUD sampai SMP"
   Yayasan Ar-Rahmah Sulawesi
   ============================================================ */

const JENJANG_LABEL = {
  paud: "PAUD",
  sd: "SD / SDIT",
  smp: "SMP / SMA"
};

// Struktur formula prompt yang dipakai berulang di semua modul
const FORMULA_TEKS = [
  { key: "peran", label: "1. PERAN", sub: "Siapa AI ini?" },
  { key: "konteks", label: "2. KONTEKS", sub: "Jenjang & tema" },
  { key: "tugas", label: "3. TUGAS", sub: "Apa yang dibuat?" },
  { key: "format", label: "4. FORMAT", sub: "Bentuk hasilnya" }
];

const FORMULA_VISUAL = [
  { key: "subjek", label: "1. SUBJEK", sub: "Objek/karakter" },
  { key: "gaya", label: "2. GAYA", sub: "Gaya visual" },
  { key: "warna", label: "3. WARNA", sub: "Palet warna" },
  { key: "teks", label: "4. TEKS & UKURAN", sub: "Judul & orientasi" }
];

const MODULES = [
// =========================================================
// MODUL 1
// =========================================================
{
  id: 1,
  title: "Modul Ajar Harian",
  subtitle: "Menyusun draf RPP/modul ajar dalam hitungan menit",
  icon: "📘",
  formulaType: "teks",
  tujuan: "Guru mampu menyusun draf modul ajar atau RPP harian yang lengkap — capaian pembelajaran, tujuan, dan urutan kegiatan — sebagai titik awal yang tinggal disesuaikan, bukan hasil akhir yang langsung dipakai mentah.",
  contoh: {
    paud: {
      peran: "Kamu adalah ahli kurikulum PAUD yang berpengalaman.",
      konteks: "Untuk anak Kelompok B usia 5–6 tahun, dengan tema \"Tanaman di Sekitarku\", durasi 1 hari.",
      tugas: "Buatkan draf modul ajar harian lengkap dengan capaian pembelajaran, tujuan, dan urutan kegiatan.",
      format: "Buat dalam format tabel yang mudah dibaca.",
      catatan: "Hasil AI akan berupa tabel kegiatan pembuka–inti–penutup yang bisa langsung disesuaikan dengan APE (alat permainan edukatif) yang tersedia di kelas."
    },
    sd: {
      peran: "Kamu adalah guru kelas SD yang berpengalaman menyusun RPP Kurikulum Merdeka.",
      konteks: "Untuk siswa kelas 4 SD, mata pelajaran IPAS, materi \"Siklus Air\", durasi 2 jam pelajaran (2 x 35 menit).",
      tugas: "Buatkan draf RPP lengkap dengan tujuan pembelajaran, kegiatan pembuka–inti–penutup, dan asesmen formatif sederhana.",
      format: "Sajikan dalam format tabel dengan kolom Kegiatan, Waktu, dan Keterangan.",
      catatan: "Minta AI menambahkan 1 pertanyaan pemantik di kegiatan pembuka agar RPP tidak hanya berisi instruksi, tapi juga memancing rasa ingin tahu siswa."
    },
    smp: {
      peran: "Kamu adalah guru mata pelajaran IPA SMP yang terbiasa menerapkan pembelajaran berdiferensiasi.",
      konteks: "Untuk siswa kelas 8 SMP, materi \"Sistem Pernapasan Manusia\", durasi 3 jam pelajaran.",
      tugas: "Buatkan draf modul ajar dengan tujuan pembelajaran, langkah kegiatan berdiferensiasi (untuk siswa yang butuh pendampingan dan yang butuh tantangan tambahan), serta rubrik penilaian singkat.",
      format: "Sajikan dalam format tabel yang terstruktur per tahap kegiatan.",
      catatan: "Berdiferensiasi bukan berarti dua modul terpisah — minta AI menandai bagian mana yang bisa \"dinaikkan\" atau \"diturunkan\" tingkat kesulitannya dalam satu alur yang sama."
    }
  },
  tip: "Tambahkan detail fasilitas sekolah dan karakter kelas Anda (jumlah siswa, ada/tidaknya proyektor, dsb.) agar kegiatan yang disarankan AI lebih realistis untuk diterapkan.",
  selfCheck: [
    "Prompt saya menyebutkan dengan jelas siapa/apa peran AI-nya",
    "Prompt saya menyebutkan jenjang, mapel/tema, dan durasi",
    "Prompt saya menyebutkan tugas spesifik yang harus dibuat AI",
    "Prompt saya menyebutkan format hasil yang saya inginkan (tabel, poin, dll.)"
  ],
  quiz: [
    {
      q: "Dalam formula PERAN–KONTEKS–TUGAS–FORMAT, bagian mana yang menjelaskan jenjang usia dan tema/materi pembelajaran?",
      options: ["Peran", "Konteks", "Tugas", "Format"],
      correct: 1
    },
    {
      q: "Apa manfaat utama menyertakan bagian FORMAT saat meminta AI menyusun modul ajar?",
      options: [
        "Membuat AI menjawab lebih cepat",
        "Hasilnya langsung sah dipakai tanpa ditinjau guru",
        "Memudahkan guru membaca dan menggunakan hasil sesuai kebutuhan",
        "Tidak berpengaruh apa-apa"
      ],
      correct: 2
    },
    {
      q: "Pernyataan mana yang paling tepat tentang peran AI dalam menyusun modul ajar?",
      options: [
        "AI menggantikan tugas guru sepenuhnya",
        "AI memberi draf awal yang tetap perlu ditinjau dan disesuaikan guru",
        "Modul dari AI selalu cocok untuk semua kondisi kelas tanpa revisi",
        "Guru tidak perlu lagi memahami kurikulum"
      ],
      correct: 1
    }
  ]
},

// =========================================================
// MODUL 2
// =========================================================
{
  id: 2,
  title: "Ide Eksplorasi & Aktivitas Belajar",
  subtitle: "Menghasilkan ide kegiatan yang variatif dan bermakna",
  icon: "🎨",
  formulaType: "teks",
  tujuan: "Guru mampu meminta AI memberi beberapa alternatif ide kegiatan pembelajaran yang konkret — lengkap dengan alat, bahan, dan langkah singkat — sehingga guru tinggal memilih dan menyesuaikan dengan kondisi kelas.",
  contoh: {
    paud: {
      peran: "Berperanlah sebagai guru seni TK yang kreatif.",
      konteks: "Anak-anak sedang belajar di Fase Fondasi.",
      tugas: "Berikan 3 ide kegiatan eksplorasi seni menggunakan media alam seperti batu dan daun kering yang melatih motorik halus.",
      format: "Jelaskan alat, bahan, dan langkah-langkahnya secara singkat.",
      catatan: "Fokus Capaian Pembelajaran: mendukung ragam eksplorasi seni yang tidak berfokus pada hasil akhir, melainkan pada proses."
    },
    sd: {
      peran: "Berperanlah sebagai fasilitator proyek IPAS SD yang kreatif.",
      konteks: "Untuk siswa kelas 5 SD, tema \"Energi Alternatif\", pembelajaran berbasis proyek kelompok.",
      tugas: "Berikan 3 ide kegiatan eksplorasi sederhana menggunakan bahan bekas/daur ulang untuk memahami sumber energi terbarukan.",
      format: "Jelaskan alat, bahan, langkah kerja, dan pertanyaan refleksi setelah kegiatan.",
      catatan: "Minta AI menambahkan estimasi waktu tiap ide agar mudah dicocokkan dengan jam pelajaran yang tersedia."
    },
    smp: {
      peran: "Berperanlah sebagai guru Prakarya/IPA SMP yang mendorong pembelajaran berbasis inkuiri.",
      konteks: "Untuk siswa kelas 7 SMP, tema \"Perubahan Iklim dan Lingkungan Sekitar\".",
      tugas: "Berikan 3 ide kegiatan investigasi sederhana yang bisa dilakukan di lingkungan sekolah untuk mengamati dampak perubahan iklim skala kecil (misalnya suhu, sampah, tanaman).",
      format: "Jelaskan tujuan, alat/bahan, langkah kerja, dan cara siswa mempresentasikan temuannya.",
      catatan: "Ide yang berbasis observasi nyata di lingkungan sekolah biasanya lebih mudah dikaitkan dengan asesmen proyek."
    }
  },
  tip: "Minta 3 ide sekaligus, bukan 1 — ini memberi Anda pilihan untuk menyesuaikan dengan bahan yang benar-benar tersedia di sekolah.",
  selfCheck: [
    "Prompt saya menyebutkan peran AI yang relevan dengan bidang kegiatan",
    "Prompt saya menyebutkan jenjang dan tema pembelajaran",
    "Prompt saya meminta jumlah ide yang jelas (misalnya 3 ide)",
    "Prompt saya meminta rincian alat, bahan, dan langkah kerja"
  ],
  quiz: [
    {
      q: "Mengapa sebaiknya meminta beberapa ide kegiatan sekaligus (misalnya 3), bukan hanya 1?",
      options: [
        "Supaya AI terlihat lebih pintar",
        "Supaya guru punya pilihan untuk disesuaikan dengan bahan yang tersedia",
        "Supaya jawabannya lebih panjang",
        "Tidak ada alasan khusus"
      ],
      correct: 1
    },
    {
      q: "Fokus Capaian Pembelajaran pada kegiatan eksplorasi seni anak usia dini sebaiknya menekankan pada...",
      options: [
        "Hasil akhir karya yang rapi",
        "Proses eksplorasi anak, bukan hasil akhir",
        "Kecepatan anak menyelesaikan karya",
        "Kesamaan hasil karya semua anak"
      ],
      correct: 1
    },
    {
      q: "Untuk jenjang SMP, tambahan apa yang membuat ide kegiatan eksplorasi lebih mudah dinilai secara proyek?",
      options: [
        "Cara siswa mempresentasikan temuannya",
        "Warna kertas yang digunakan",
        "Jumlah siswa dalam kelas",
        "Nama sekolah"
      ],
      correct: 0
    }
  ]
},

// =========================================================
// MODUL 3
// =========================================================
{
  id: 3,
  title: "Poster Edukasi (Visual)",
  subtitle: "Membuat media visual pembelajaran yang menarik",
  icon: "🖼️",
  formulaType: "visual",
  tujuan: "Guru mampu menyusun prompt visual untuk menghasilkan poster edukasi yang sesuai jenjang, lengkap dengan judul dan gaya visual yang tepat.",
  contoh: {
    paud: {
      subjek: "Karakter anak-anak yang lucu sedang mempraktikkan \"6 Langkah Cuci Tangan\"",
      gaya: "Bergaya kartun ceria untuk anak TK",
      warna: "Warna dominan cerah (kuning, biru, hijau muda)",
      teks: "Orientasi potret, judul teks besar \"Ayo Cuci Tangan!\"",
      catatan: "AI kadang salah mengeja teks di dalam gambar — rapikan judul/teks menggunakan Canva setelah gambar dihasilkan."
    },
    sd: {
      subjek: "Ilustrasi siklus air (penguapan, kondensasi, presipitasi) dengan tokoh anak SD yang mengamati",
      gaya: "Gaya flat design infografis yang bersih dan informatif",
      warna: "Warna dominan biru dan putih dengan aksen kuning",
      teks: "Orientasi lanskap, judul \"Perjalanan Setetes Air\", disertai label singkat tiap tahapan",
      catatan: "Untuk poster infografis, minta AI menyisakan area kosong agar Anda bisa menambahkan label/panah sendiri di Canva."
    },
    smp: {
      subjek: "Diagram sistem pernapasan manusia tampak samping dengan gaya ilustrasi ilmiah semi-realistis",
      gaya: "Gaya infografis edukatif, garis tegas, minim dekorasi",
      warna: "Warna dominan biru tua dan putih dengan aksen merah muda untuk organ",
      teks: "Orientasi potret, judul \"Sistem Pernapasan Manusia\", ruang kosong untuk label bagian organ",
      catatan: "Untuk materi sains SMP, minta gaya \"semi-realistis\" bukan \"kartun\" agar terlihat lebih kredibel secara akademis."
    }
  },
  tip: "AI terkadang salah mengeja teks di dalam gambar. Gunakan aplikasi seperti Canva untuk merapikan tulisan/judul setelah gambar dihasilkan.",
  selfCheck: [
    "Prompt saya menyebutkan subjek/objek utama poster dengan jelas",
    "Prompt saya menyebutkan gaya visual yang sesuai jenjang",
    "Prompt saya menyebutkan palet warna yang diinginkan",
    "Prompt saya menyebutkan judul teks dan orientasi gambar (potret/lanskap)"
  ],
  quiz: [
    {
      q: "Mengapa sebaiknya teks/judul pada poster hasil AI tetap dirapikan di aplikasi seperti Canva?",
      options: [
        "Karena AI tidak bisa membuat gambar sama sekali",
        "Karena AI kadang salah mengeja teks di dalam gambar",
        "Karena Canva lebih murah",
        "Karena tidak boleh memakai AI untuk visual"
      ],
      correct: 1
    },
    {
      q: "Untuk poster sains jenjang SMP, gaya visual apa yang lebih tepat dibanding gaya kartun anak kecil?",
      options: ["Gaya semi-realistis/infografis", "Gaya dongeng", "Gaya coretan tangan acak", "Tidak perlu gaya khusus"],
      correct: 0
    },
    {
      q: "Dalam formula visual SUBJEK–GAYA–WARNA–TEKS&UKURAN, bagian \"TEKS & UKURAN\" mengatur apa?",
      options: [
        "Jenis kertas yang dipakai mencetak",
        "Judul teks besar dan orientasi gambar (potret/lanskap)",
        "Jumlah karakter dalam gambar",
        "Harga cetak poster"
      ],
      correct: 1
    }
  ]
},

// =========================================================
// MODUL 4
// =========================================================
{
  id: 4,
  title: "Cerita Penguatan Karakter",
  subtitle: "Menulis narasi pendek untuk pendidikan karakter & emosi",
  icon: "📖",
  formulaType: "teks",
  tujuan: "Guru mampu meminta AI menulis cerita pendek yang mendukung pengenalan emosi atau nilai karakter tertentu, dengan bahasa yang sesuai usia siswa.",
  contoh: {
    paud: {
      peran: "Kamu adalah penulis cerita anak yang ahli.",
      konteks: "Untuk anak TK yang sedang belajar mengenali rasa sedih dan marah sesuai Fase Fondasi.",
      tugas: "Tuliskan cerita pendek pengantar istirahat tentang seekor beruang kecil yang belajar menenangkan diri saat mainannya rusak.",
      format: "Tulis dalam 3 paragraf pendek dengan bahasa yang lembut dan repetitif.",
      catatan: "Bahasa yang repetitif (pola kalimat berulang) membantu anak usia dini mengikuti alur cerita dengan lebih mudah."
    },
    sd: {
      peran: "Kamu adalah penulis cerita anak yang memahami pendidikan karakter.",
      konteks: "Untuk siswa kelas 3 SD yang sedang belajar nilai kejujuran.",
      tugas: "Tuliskan cerita pendek tentang seorang anak yang menemukan uang temannya dan harus memutuskan apa yang akan dilakukan.",
      format: "Tulis dalam 4 paragraf dengan akhir cerita terbuka, diikuti 2 pertanyaan diskusi untuk siswa.",
      catatan: "Akhir cerita yang terbuka (tanpa kesimpulan langsung) mendorong siswa berdiskusi dan menyimpulkan sendiri nilai moralnya."
    },
    smp: {
      peran: "Kamu adalah penulis cerita remaja yang memahami isu sosial-emosional usia SMP.",
      konteks: "Untuk siswa kelas 8 SMP yang sedang membahas tema tekanan teman sebaya (peer pressure).",
      tugas: "Tuliskan cerita pendek tentang seorang siswa yang diajak temannya melakukan hal yang bertentangan dengan nilai pribadinya.",
      format: "Tulis dalam 5–6 paragraf dengan gaya bahasa yang relevan untuk remaja, diakhiri 3 pertanyaan reflektif.",
      catatan: "Untuk remaja, hindari kesan menggurui — biarkan cerita menampilkan dilema nyata tanpa menyimpulkan \"pesan moral\" secara eksplisit."
    }
  },
  tip: "Semakin spesifik situasi yang Anda gambarkan (bukan sekadar \"cerita tentang kejujuran\"), semakin relevan cerita yang dihasilkan AI dengan kondisi nyata siswa Anda.",
  selfCheck: [
    "Prompt saya menyebutkan peran AI sebagai penulis cerita",
    "Prompt saya menyebutkan jenjang usia dan nilai/emosi yang ingin diperkuat",
    "Prompt saya menggambarkan situasi/tokoh cerita secara spesifik",
    "Prompt saya menyebutkan panjang cerita dan gaya bahasa yang diinginkan"
  ],
  quiz: [
    {
      q: "Untuk cerita anak usia TK, gaya bahasa apa yang paling membantu anak mengikuti alur cerita?",
      options: ["Bahasa formal dan panjang", "Bahasa lembut dan repetitif", "Bahasa ilmiah", "Bahasa asing"],
      correct: 1
    },
    {
      q: "Mengapa akhir cerita yang terbuka cocok digunakan untuk pendidikan karakter siswa SD?",
      options: [
        "Karena lebih singkat ditulis",
        "Karena mendorong siswa berdiskusi dan menyimpulkan nilai moral sendiri",
        "Karena AI tidak bisa membuat akhir cerita",
        "Karena tidak butuh pertanyaan diskusi"
      ],
      correct: 1
    },
    {
      q: "Untuk cerita bertema sosial-emosional remaja SMP, hal apa yang sebaiknya dihindari?",
      options: [
        "Menampilkan dilema yang nyata",
        "Kesan menggurui dengan pesan moral yang terlalu eksplisit",
        "Pertanyaan reflektif di akhir cerita",
        "Bahasa yang relevan untuk remaja"
      ],
      correct: 1
    }
  ]
},

// =========================================================
// MODUL 5
// =========================================================
{
  id: 5,
  title: "Pertanyaan Pemantik",
  subtitle: "Memancing rasa ingin tahu dan berpikir kritis siswa",
  icon: "💡",
  formulaType: "teks",
  tujuan: "Guru mampu meminta AI menyusun daftar pertanyaan terbuka (open-ended) yang memancing rasa ingin tahu dan kemampuan berpikir siswa, tanpa jawaban benar-salah yang kaku.",
  contoh: {
    paud: {
      peran: "Berperanlah sebagai fasilitator PAUD.",
      konteks: "Anak-anak sedang mengamati karya seni lukisan tradisional dan mendengarkan musik daerah.",
      tugas: "Buatkan daftar 5 pertanyaan pemantik terbuka (open-ended) untuk menggali rasa ingin tahu dan perasaan mereka, tanpa ada jawaban benar atau salah.",
      format: "Sajikan dalam bentuk poin-poin (bullet points).",
      catatan: "Pertanyaan terbuka untuk anak usia dini sebaiknya dimulai dengan \"Bagaimana perasaanmu...\" atau \"Apa yang kamu lihat...\", bukan \"Apa nama...\"."
    },
    sd: {
      peran: "Berperanlah sebagai fasilitator diskusi kelas SD.",
      konteks: "Siswa kelas 5 baru saja membaca teks tentang dampak sampah plastik terhadap laut.",
      tugas: "Buatkan daftar 5 pertanyaan pemantik untuk mendorong siswa berpikir kritis dan menghubungkan isu tersebut dengan kehidupan sehari-hari mereka.",
      format: "Sajikan dalam bentuk poin-poin, urutkan dari pertanyaan paling sederhana ke paling menantang.",
      catatan: "Menyusun pertanyaan dari yang sederhana ke yang menantang membantu siswa yang butuh pemanasan sebelum berpikir lebih dalam."
    },
    smp: {
      peran: "Berperanlah sebagai fasilitator diskusi Kelas SMP yang mendorong berpikir tingkat tinggi (HOTS).",
      konteks: "Siswa kelas 9 sedang membahas topik perkembangan teknologi dan dampaknya terhadap lapangan kerja.",
      tugas: "Buatkan daftar 5 pertanyaan pemantik HOTS (analisis, evaluasi, atau mencipta) yang mendorong siswa berargumen dengan alasan, bukan sekadar menghafal fakta.",
      format: "Sajikan dalam bentuk poin-poin, sertakan 1 kata kunci taksonomi Bloom di setiap pertanyaan (misalnya: [Analisis], [Evaluasi]).",
      catatan: "Menandai level taksonomi Bloom membantu guru memastikan diskusi benar-benar naik ke level berpikir yang lebih tinggi, bukan sekadar mengingat."
    }
  },
  tip: "Pertanyaan pemantik yang baik tidak memiliki jawaban benar/salah tunggal — tujuannya memancing siswa berbicara dan berpikir, bukan menebak jawaban yang \"diinginkan\" guru.",
  selfCheck: [
    "Prompt saya menyebutkan konteks kegiatan/bacaan yang baru dialami siswa",
    "Prompt saya secara eksplisit meminta pertanyaan \"terbuka\" atau tanpa jawaban benar-salah",
    "Prompt saya menyebutkan jumlah pertanyaan yang diinginkan",
    "Prompt saya menyebutkan format daftar (poin-poin)"
  ],
  quiz: [
    {
      q: "Ciri utama pertanyaan pemantik yang baik adalah...",
      options: [
        "Punya satu jawaban benar yang pasti",
        "Bersifat terbuka dan memancing siswa berpikir/berbicara",
        "Selalu berupa soal pilihan ganda",
        "Sangat panjang dan rumit"
      ],
      correct: 1
    },
    {
      q: "Untuk siswa SMP, menandai level taksonomi Bloom (misalnya [Analisis]) pada tiap pertanyaan pemantik berguna untuk...",
      options: [
        "Membuat pertanyaan terlihat lebih rumit",
        "Memastikan diskusi benar-benar naik ke level berpikir yang lebih tinggi",
        "Mengurangi jumlah pertanyaan yang perlu dijawab",
        "Tidak ada gunanya"
      ],
      correct: 1
    },
    {
      q: "Untuk anak PAUD, pertanyaan pemantik sebaiknya dimulai dengan kalimat seperti...",
      options: [
        "\"Sebutkan nama benda ini!\"",
        "\"Apa jawaban yang benar?\"",
        "\"Bagaimana perasaanmu...\" atau \"Apa yang kamu lihat...\"",
        "\"Hitunglah jumlah...\""
      ],
      correct: 2
    }
  ]
},

// =========================================================
// MODUL 6
// =========================================================
{
  id: 6,
  title: "Yel-Yel & Lagu Rutinitas",
  subtitle: "Membuat transisi kegiatan lebih menyenangkan",
  icon: "🎵",
  formulaType: "teks",
  tujuan: "Guru mampu meminta AI menggubah lirik lagu populer atau menyusun yel-yel pendek untuk membantu transisi antar kegiatan di kelas.",
  contoh: {
    paud: {
      peran: "Kamu adalah pencipta lagu anak.",
      konteks: "Untuk anak usia dini yang butuh transisi menyenangkan dari bermain bebas ke kegiatan lingkaran pagi (circle time).",
      tugas: "Ubah lirik lagu populer \"Balonku Ada Lima\" menjadi lagu ajakan merapikan mainan dan duduk melingkar.",
      format: "Sertakan petunjuk gerakan sederhana di dalam kurung pada setiap lirik.",
      catatan: "Menggunakan lagu yang sudah dikenal anak membuat transisi terasa familiar dan mudah diikuti tanpa perlu diajarkan dari nol."
    },
    sd: {
      peran: "Kamu adalah fasilitator kelas SD yang kreatif.",
      konteks: "Untuk siswa kelas 2–3 SD yang butuh yel-yel semangat sebelum memulai pelajaran matematika.",
      tugas: "Buatkan yel-yel pendek (4 baris) bertema semangat berhitung, dengan pola tepuk tangan sederhana.",
      format: "Sertakan instruksi tepuk/gerakan di setiap barisnya.",
      catatan: "Untuk SD, yel-yel bisa dipakai sebagai penanda rutin sebelum mapel tertentu — konsistensi membantu siswa membangun kebiasaan fokus."
    },
    smp: {
      peran: "Kamu adalah fasilitator ice-breaking untuk remaja SMP.",
      konteks: "Untuk siswa kelas 7–9 yang butuh energizer singkat setelah jam istirahat sebelum masuk ke materi baru.",
      tugas: "Buatkan yel-yel atau chant pendek (bukan lagu anak-anak) yang terasa \"keren\" untuk usia remaja dan tetap mendukung fokus belajar.",
      format: "Tulis dalam 4–6 baris dengan catatan intonasi/ritme yang disarankan.",
      catatan: "Untuk remaja, hindari nada yang terkesan \"kekanakan\" — gunakan gaya chant/yel-yel olahraga yang lebih maskulin/netral dan energik."
    }
  },
  tip: "Latih dulu yel-yel/lagunya sendiri sebelum dipakai di kelas — pastikan iramanya pas dan mudah diikuti siswa dalam satu-dua kali dengar.",
  selfCheck: [
    "Prompt saya menyebutkan jenjang/usia siswa yang dituju",
    "Prompt saya menyebutkan kapan/untuk transisi apa yel-yel atau lagu ini dipakai",
    "Prompt saya menyebutkan referensi lagu atau gaya yang diinginkan",
    "Prompt saya meminta petunjuk gerakan/ritme, bukan hanya lirik"
  ],
  quiz: [
    {
      q: "Mengapa menggunakan lagu yang sudah dikenal anak (seperti \"Balonku\") efektif untuk transisi kegiatan PAUD?",
      options: [
        "Karena liriknya lebih pendek",
        "Karena terasa familiar dan mudah diikuti tanpa diajarkan dari nol",
        "Karena tidak perlu melodi",
        "Karena anak tidak suka lagu baru"
      ],
      correct: 1
    },
    {
      q: "Untuk yel-yel remaja SMP, gaya seperti apa yang sebaiknya dihindari?",
      options: [
        "Gaya chant olahraga yang energik",
        "Nada yang terkesan kekanakan",
        "Ritme yang jelas",
        "Baris yang singkat"
      ],
      correct: 1
    },
    {
      q: "Sebelum yel-yel/lagu dipakai di kelas, langkah penting apa yang sebaiknya dilakukan guru?",
      options: [
        "Langsung dipakai tanpa latihan",
        "Melatih dulu iramanya agar mudah diikuti siswa",
        "Menerjemahkan ke bahasa asing",
        "Menghapus semua instruksi gerakan"
      ],
      correct: 1
    }
  ]
},

// =========================================================
// MODUL 7
// =========================================================
{
  id: 7,
  title: "Lembar Kerja (Worksheet) Kognitif",
  subtitle: "Merancang instruksi aktivitas kognitif sesuai jenjang",
  icon: "📝",
  formulaType: "teks",
  tujuan: "Guru mampu meminta AI menyusun ide aktivitas lembar kerja yang melatih kemampuan kognitif tertentu, dalam bentuk instruksi yang bisa dirancang sendiri di aplikasi desain atau langsung dipakai sebagai worksheet cetak.",
  contoh: {
    paud: {
      peran: "Berperan sebagai spesialis pendidikan kognitif anak.",
      konteks: "Untuk tema \"Kendaraan di Darat\".",
      tugas: "Berikan 3 ide aktivitas lembar kerja (worksheet) tanpa huruf/angka yang melatih kemampuan mencocokkan pola dan warna untuk motorik halus.",
      format: "Formatkan sebagai daftar instruksi visual yang bisa dirancang sendiri di aplikasi pembuat gambar.",
      catatan: "Untuk PAUD, hindari huruf/angka di worksheet — fokuskan pada pengenalan bentuk, warna, dan pola sesuai tahap perkembangan motorik halus."
    },
    sd: {
      peran: "Berperan sebagai spesialis pendidikan kognitif untuk siswa SD.",
      konteks: "Untuk siswa kelas 2 SD, tema \"Bagian-Bagian Tumbuhan\".",
      tugas: "Berikan 3 ide aktivitas worksheet yang melatih kemampuan klasifikasi dan sebab-akibat sederhana, menggunakan gambar dan sedikit teks.",
      format: "Formatkan sebagai daftar instruksi berisi: nama aktivitas, tujuan kognitif, dan cara pengerjaannya.",
      catatan: "Untuk kelas rendah SD, kombinasi gambar + teks singkat (bukan teks panjang) tetap membuat worksheet mudah dikerjakan mandiri."
    },
    smp: {
      peran: "Berperan sebagai spesialis asesmen kognitif untuk siswa SMP.",
      konteks: "Untuk siswa kelas 8, materi \"Sebab-Akibat Perubahan Iklim\".",
      tugas: "Berikan 3 ide aktivitas worksheet berbasis analisis (bukan hafalan) yang melatih kemampuan menghubungkan data/grafik sederhana dengan kesimpulan.",
      format: "Formatkan sebagai daftar instruksi berisi: nama aktivitas, tujuan kognitif (kaitkan dengan level Bloom), dan langkah pengerjaan.",
      catatan: "Untuk SMP, worksheet berbasis data/grafik lebih efektif melatih berpikir analitis dibanding worksheet isian sederhana."
    }
  },
  tip: "Untuk PAUD, selalu tegaskan \"tanpa huruf/angka\" dalam prompt agar AI tidak otomatis menyisipkan teks yang belum sesuai tahap perkembangan anak.",
  selfCheck: [
    "Prompt saya menyebutkan jenjang dan tema/materi worksheet",
    "Prompt saya menyebutkan kemampuan kognitif spesifik yang ingin dilatih",
    "Prompt saya meminta jumlah ide aktivitas yang jelas",
    "Prompt saya meminta format instruksi yang bisa langsung dirancang/dieksekusi"
  ],
  quiz: [
    {
      q: "Untuk worksheet anak PAUD, instruksi apa yang penting ditambahkan dalam prompt?",
      options: [
        "Minta banyak huruf dan angka",
        "Minta \"tanpa huruf/angka\" agar sesuai tahap motorik halus",
        "Minta teks sepanjang mungkin",
        "Tidak perlu instruksi khusus"
      ],
      correct: 1
    },
    {
      q: "Worksheet berbasis data/grafik lebih cocok untuk melatih kemampuan berpikir jenjang mana?",
      options: ["PAUD", "SMP", "Tidak ada bedanya", "Hanya untuk guru"],
      correct: 1
    },
    {
      q: "Format hasil yang diminta pada modul ini adalah...",
      options: [
        "Video animasi",
        "Daftar instruksi yang bisa dirancang/dieksekusi sendiri",
        "Rekaman suara",
        "Nomor telepon orang tua"
      ],
      correct: 1
    }
  ]
},

// =========================================================
// MODUL 8
// =========================================================
{
  id: 8,
  title: "Poster Visual Aturan Kelas",
  subtitle: "Menyampaikan aturan/tata tertib lewat ilustrasi",
  icon: "🪧",
  formulaType: "visual",
  tujuan: "Guru mampu menyusun prompt visual untuk poster aturan/tata tertib kelas yang komunikatif tanpa harus penuh teks — cocok ditempel untuk semua jenjang.",
  contoh: {
    paud: {
      subjek: "Ilustrasi anak-anak membereskan mainan bersama, tanpa teks",
      gaya: "Gaya flat design watercolor yang sangat lembut dan ramah anak",
      warna: "Warna dominan pastel hangat",
      teks: "Orientasi lanskap untuk dicetak ukuran A3 dan ditempel di dinding kelas",
      catatan: "Poster tanpa teks efektif untuk PAUD karena aturan disampaikan lewat gambar/perilaku yang ditiru, bukan dibaca."
    },
    sd: {
      subjek: "Ilustrasi siswa SD mengangkat tangan sebelum bicara, duduk rapi, dan menjaga kebersihan meja",
      gaya: "Gaya ilustrasi flat/vektor yang bersih dengan sedikit humor visual",
      warna: "Warna dominan biru muda, kuning, dan putih",
      teks: "Orientasi potret, judul \"5 Aturan Kelasku\" dengan ruang untuk 5 ikon aturan",
      catatan: "Untuk SD, kombinasi ikon + judul singkat lebih efektif daripada teks paragraf panjang."
    },
    smp: {
      subjek: "Ilustrasi semi-realistis siswa SMP berdiskusi dengan sikap saling menghargai (mendengarkan, tidak memotong pembicaraan)",
      gaya: "Gaya infografis modern, garis bersih, minim ilustrasi kartun",
      warna: "Warna dominan biru tua, putih, dan aksen emas",
      teks: "Orientasi potret, judul \"Kesepakatan Kelas\" dengan ruang kosong untuk daftar poin kesepakatan",
      catatan: "Untuk SMP, istilah \"kesepakatan kelas\" (bukan \"aturan\") lebih sesuai pendekatan yang melibatkan siswa dalam menyusun norma bersama."
    }
  },
  tip: "Sesuaikan istilah dengan jenjang: \"aturan\" untuk PAUD/SD lebih mudah dipahami, sementara \"kesepakatan kelas\" untuk SMP terasa lebih menghargai kemandirian siswa.",
  selfCheck: [
    "Prompt saya menyebutkan perilaku/aturan spesifik yang ingin divisualisasikan",
    "Prompt saya menyebutkan gaya visual yang sesuai jenjang",
    "Prompt saya menyebutkan warna dan orientasi cetak",
    "Prompt saya menyebutkan apakah poster perlu teks/judul atau tanpa teks"
  ],
  quiz: [
    {
      q: "Mengapa poster aturan kelas untuk PAUD sering dibuat tanpa teks sama sekali?",
      options: [
        "Karena tidak ada aturan untuk PAUD",
        "Karena aturan disampaikan lewat gambar/perilaku yang ditiru, bukan dibaca",
        "Karena AI tidak bisa membuat teks",
        "Karena lebih murah dicetak"
      ],
      correct: 1
    },
    {
      q: "Untuk jenjang SMP, istilah yang lebih tepat menggantikan kata \"aturan kelas\" adalah...",
      options: ["Hukuman kelas", "Kesepakatan kelas", "Larangan kelas", "Peraturan mutlak"],
      correct: 1
    },
    {
      q: "Elemen apa yang perlu ditentukan dalam bagian \"TEKS & UKURAN\" pada prompt poster aturan kelas?",
      options: [
        "Judul dan orientasi cetak",
        "Harga kertas",
        "Nama percetakan",
        "Jumlah siswa di kelas"
      ],
      correct: 0
    }
  ]
},

// =========================================================
// MODUL 9
// =========================================================
{
  id: 9,
  title: "Modifikasi Lingkungan Belajar",
  subtitle: "Merancang sudut/area kelas yang mendukung pembelajaran",
  icon: "🏫",
  formulaType: "teks",
  tujuan: "Guru mampu meminta AI memberi ide penataan sudut atau area belajar di kelas yang sesuai tema dan mendukung kenyamanan belajar siswa.",
  contoh: {
    paud: {
      peran: "Berperan sebagai spesialis lingkungan belajar PAUD.",
      konteks: "Untuk sudut baca (reading corner) di kelas Kelompok B.",
      tugas: "Berikan ide penataan sudut baca yang nyaman, dengan rak buku rendah, bantal duduk, dan pencahayaan yang mendukung.",
      format: "Formatkan sebagai daftar instruksi visual yang bisa dirancang sendiri.",
      catatan: "Sudut baca yang nyaman (bukan sekadar rapi) mendorong anak usia dini betah berlama-lama dengan buku."
    },
    sd: {
      peran: "Berperan sebagai spesialis lingkungan belajar SD.",
      konteks: "Untuk pojok literasi kelas 3 SD bertema \"Cerita Rakyat Nusantara\".",
      tugas: "Berikan ide penataan pojok literasi yang menampilkan tema tersebut, termasuk area pajangan karya siswa.",
      format: "Formatkan sebagai daftar instruksi berisi: nama area, elemen yang dibutuhkan, dan tata letaknya.",
      catatan: "Menyertakan area pajangan karya siswa membuat sudut belajar terasa \"milik siswa\", bukan hanya milik guru."
    },
    smp: {
      peran: "Berperan sebagai spesialis desain ruang belajar untuk remaja SMP.",
      konteks: "Untuk area diskusi kelompok di kelas 8 yang mendukung pembelajaran berbasis proyek.",
      tugas: "Berikan ide penataan area diskusi yang fleksibel (mudah diubah formasi) untuk kerja kelompok 4–5 orang.",
      format: "Formatkan sebagai daftar instruksi berisi: kebutuhan furnitur, tata letak, dan pertimbangan fleksibilitas ruang.",
      catatan: "Untuk remaja, ruang yang fleksibel (bukan bangku berbaris permanen) lebih mendukung kerja kelompok dan diskusi terbuka."
    }
  },
  tip: "Sebutkan ukuran ruang kelas dan furnitur yang sudah ada agar ide yang diberikan AI benar-benar bisa diterapkan, bukan sekadar ide ideal di atas kertas.",
  selfCheck: [
    "Prompt saya menyebutkan area/sudut kelas yang ingin ditata",
    "Prompt saya menyebutkan jenjang dan tema yang relevan",
    "Prompt saya meminta rincian elemen dan tata letak",
    "Prompt saya meminta format instruksi yang bisa langsung dieksekusi"
  ],
  quiz: [
    {
      q: "Mengapa penting menyebutkan ukuran ruang dan furnitur yang sudah ada saat meminta ide penataan kelas ke AI?",
      options: [
        "Agar AI terlihat lebih canggih",
        "Agar ide yang diberikan benar-benar bisa diterapkan, bukan sekadar ide ideal",
        "Karena AI tidak bisa memberi ide tanpa itu",
        "Tidak penting sama sekali"
      ],
      correct: 1
    },
    {
      q: "Menyertakan area pajangan karya siswa di pojok literasi bertujuan untuk...",
      options: [
        "Menghemat tempat",
        "Membuat sudut belajar terasa \"milik siswa\"",
        "Mengurangi jumlah buku yang dibutuhkan",
        "Tidak ada tujuan khusus"
      ],
      correct: 1
    },
    {
      q: "Untuk area diskusi kelompok remaja SMP, pertimbangan penataan yang penting adalah...",
      options: [
        "Bangku berbaris permanen menghadap papan tulis",
        "Fleksibilitas formasi untuk kerja kelompok",
        "Tidak perlu furnitur sama sekali",
        "Semua siswa duduk sendiri-sendiri"
      ],
      correct: 1
    }
  ]
},

// =========================================================
// MODUL 10
// =========================================================
{
  id: 10,
  title: "Meta-Prompt: Gaya Visual Konsisten",
  subtitle: "Membuat \"rahasia gaya\" agar semua visual Anda seragam",
  icon: "🧩",
  formulaType: "visual",
  tujuan: "Guru mampu menyusun satu template gaya visual (meta-prompt) yang bisa dipakai berulang, sehingga semua media visual kelas terasa konsisten dan mudah dikenali.",
  contoh: {
    paud: {
      subjek: "[sebutkan benda, misalnya: buku terbuka]",
      gaya: "Direnderdalam style minimalis 3D clay art, tekstur matte halus seperti playdough",
      warna: "Pencahayaan studio yang lembut (soft lighting), warna background solid pastel mentega",
      teks: "Tanpa ada teks apa pun di dalam gambar",
      catatan: "Template ini bisa dipakai berulang untuk semua ikon/ilustrasi PAUD agar terasa satu keluarga visual yang sama."
    },
    sd: {
      subjek: "[sebutkan benda, misalnya: alat tulis di atas meja]",
      gaya: "Direnderdalam style flat design vektor dengan sedikit bayangan lembut (soft shadow)",
      warna: "Warna background solid biru muda atau putih, palet warna cerah namun tidak terlalu ramai",
      teks: "Tanpa ada teks apa pun di dalam gambar",
      catatan: "Gaya flat design memudahkan konsistensi visual antar mapel dan antar kelas paralel di jenjang SD."
    },
    smp: {
      subjek: "[sebutkan benda/konsep, misalnya: struktur DNA sederhana]",
      gaya: "Direnderdalam style infografis semi-realistis, garis bersih, minim dekorasi berlebih",
      warna: "Warna dominan biru tua dan putih dengan aksen emas, kontras tinggi agar mudah dibaca",
      teks: "Tanpa ada teks apa pun di dalam gambar",
      catatan: "Untuk SMP, gaya yang lebih \"serius\" secara visual membantu materi terlihat kredibel secara akademis, bukan seperti buku cerita anak."
    }
  },
  tip: "Simpan meta-prompt ini di catatan Anda. Setiap kali butuh visual baru, tinggal ganti bagian \"SUBJEK\"-nya saja — bagian gaya, warna, dan teks tetap sama sehingga semua visual terasa satu keluarga.",
  selfCheck: [
    "Saya memahami bagian mana dari meta-prompt yang boleh diganti (subjek) dan mana yang tetap (gaya/warna/teks)",
    "Saya sudah punya 1 template gaya visual yang ingin dipakai konsisten di unit saya",
    "Saya memahami pentingnya konsistensi visual untuk branding sekolah",
    "Saya siap mencoba meta-prompt ini untuk kebutuhan visual nyata di kelas saya"
  ],
  quiz: [
    {
      q: "Apa tujuan utama menyusun sebuah \"meta-prompt\" gaya visual?",
      options: [
        "Agar setiap gambar terlihat berbeda-beda",
        "Agar semua visual yang dihasilkan terasa konsisten dan mudah dikenali",
        "Agar proses generate gambar lebih lama",
        "Tidak ada tujuan khusus"
      ],
      correct: 1
    },
    {
      q: "Saat memakai ulang sebuah meta-prompt untuk kebutuhan visual baru, bagian mana yang biasanya diganti?",
      options: ["Gaya visual", "Warna background", "Subjek/objeknya saja", "Semua bagian diganti total"],
      correct: 2
    },
    {
      q: "Untuk jenjang SMP, gaya visual yang lebih \"serius\" (bukan gaya kartun anak) dipilih karena...",
      options: [
        "Lebih murah dibuat",
        "Membantu materi terlihat kredibel secara akademis",
        "AI tidak bisa membuat gaya kartun",
        "Tidak ada alasan khusus"
      ],
      correct: 1
    }
  ]
}

];

// Ekspor untuk dipakai app.js
if (typeof module !== "undefined") { module.exports = { MODULES, JENJANG_LABEL, FORMULA_TEKS, FORMULA_VISUAL }; }
