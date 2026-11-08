# SITTA — Tugas Praktik 3 Vue.js

Proyek ini disusun ulang mengikuti struktur dan ketentuan pada dokumen STSI4209 Tugas Praktik 3.

## Teknologi
- Vue.js 2.7 (CDN)
- Vue Component dengan `Vue.component()`
- Vue Template eksternal pada folder `templates/`
- Data dummy JSON pada `data/dataBahanAjar.json`
- Tailwind CSS CDN untuk tampilan

## Menjalankan aplikasi
1. Ekstrak folder proyek.
2. Buka folder `tugas3-vue-ut` di Visual Studio Code.
3. Jalankan `index.html` menggunakan ekstensi Live Server.
4. Jangan membuka file `index.html` langsung dengan `file://`, karena aplikasi mengambil file JSON dan template menggunakan `fetch`.

## Struktur
```text
tugas3-vue-ut/
├── index.html
├── assets/
│   └── css/style.css
├── data/
│   └── dataBahanAjar.json
├── js/
│   ├── app.js
│   ├── components/
│   │   ├── app-modal.js
│   │   ├── do-tracking.js
│   │   ├── order-form.js
│   │   ├── status-badge.js
│   │   └── stock-table.js
│   └── services/api.js
└── templates/
    ├── app-modal.html
    ├── do-tracking.html
    ├── order-form.html
    ├── status-badge.html
    └── stock-table.html
```

## Fitur
- Daftar stok, filter UT-Daerah, dependent filter kategori, filter stok kosong/menipis, dan pengurutan judul/stok/harga.
- Tambah, edit, dan hapus bahan ajar dengan konfirmasi.
- Catatan bahan ajar ditampilkan saat pointer diarahkan ke status. HTML catatan dibatasi pada tag format sederhana; tag berbahaya ditampilkan sebagai teks.
- Tracking DO dapat dicari menggunakan nomor DO atau NIM. Enter untuk mencari dan Esc untuk reset.
- Pembuatan DO otomatis dengan tahun berjalan dan nomor urut tiga digit.
- Tambah progress perjalanan menggunakan waktu lokal dan pilihan status Menunggu Diproses / Dalam Perjalanan / Selesai.
- Data awal bersumber dari JSON dummy; perubahan selama sesi berjalan disimpan dalam memori browser.

Catatan: aplikasi membutuhkan koneksi internet saat pertama kali memuat Vue 2 dan Tailwind CDN.

## Catatan menjalankan proyek
Proyek ini menggunakan Vue 2.7 melalui CDN dan tidak memakai Vite, Vue CLI, atau proses bundling.
Karena itu, `npm install` dan `package.json` tidak diperlukan. Jalankan melalui Live Server agar
pemanggilan template HTML dan file JSON melalui `fetch` dapat berjalan.
