---
schema: 1
id: write-tokopedia-shopee-listing
kind: prompt
title: Deskripsi produk marketplace
description: "Menulis listing produk untuk Tokopedia atau Shopee: nama produk berisi kata kunci sesuai batas, varian, spesifikasi, deskripsi yang meyakinkan, template balasan chat, dan pengecekan aturan platform."
category: copywriting
version: 1.0.0
status: incubating
lang: id
stage: [build]
role: [founder]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [tokopedia, shopee, product-listing, indonesia]
pairs_with:
  prompts: [write-marketplace-listing, write-whatsapp-business-service-scripts]
args:
  - name: produk
    description: Produk yang dijual - merek, tipe atau model, bahan, ukuran, berat dan dimensi kemasan (untuk ongkir), isi paket, garansi, izin atau sertifikasi yang dimiliki (BPOM, SNI, halal), dan keunggulan yang bisa dibuktikan.
    type: text
    required: true
  - name: kategori
    description: Kategori produk di marketplace (misalnya "Fashion Muslim > Hijab" atau "Rumah Tangga > Dapur > Peralatan Masak").
    type: string
    required: true
  - name: varian
    description: Varian yang dijual (warna, ukuran, isi) beserta harga dan stok masing-masing jika berbeda. Opsional.
    type: text
  - name: platform
    description: Platform tujuan. tokopedia, shopee, atau keduanya (dibuatkan versi untuk masing-masing).
    type: enum
    enum: [tokopedia, shopee, keduanya]
    default: keduanya
output_contract:
  format: markdown
  sections: [Nama produk, Varian, Spesifikasi, Deskripsi, Template chat, Foto, Cek aturan, Info yang kurang]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Versi pertama."}
---
<context>
Kamu membantu penjual UMKM di Indonesia membuat listing di marketplace. Pembeli mencari lewat kolom pencarian di HP, lalu membandingkan puluhan produk yang mirip: foto pertama dan nama produk menentukan diklik atau tidak, sedangkan varian, spesifikasi dan deskripsi menentukan jadi checkout atau malah tanya dulu lewat chat.

Yang perlu diperhatikan:
- Nama produk dibaca mesin pencari marketplace. Pola yang umum: merek + jenis produk + spesifikasi utama + varian atau ukuran (misalnya "Kirana Hijab Segi Empat Voal Premium 115x115 cm"). Batas karakter berbeda per platform dan bisa berubah; cek batas terbaru di halaman tambah produk. Jangan menumpuk kata kunci yang tidak relevan.
- Varian (warna, ukuran) diisi di kolom varian, bukan dijadikan banyak listing yang sama. Stok dan harga per varian harus benar agar tidak ada pembatalan.
- Berat dan dimensi kemasan menentukan ongkir; isi apa adanya.
- Deskripsi: paragraf pembuka singkat, poin keunggulan, spesifikasi, isi paket, cara pakai atau perawatan, garansi dan ketentuan retur.
- Aturan platform: dilarang mencantumkan nomor WhatsApp, link atau ajakan transaksi di luar platform; klaim "original", "termurah", "terbaik" atau klaim kesehatan harus bisa dibuktikan; produk tertentu wajib punya izin (BPOM untuk kosmetik dan pangan olahan, SNI untuk produk tertentu) dan nomor izinnya jangan dikarang.
- Template balasan chat mempercepat respons, dan kecepatan balas chat ikut memengaruhi performa toko.
</context>

<task>
Buat listing untuk produk ini.

<produk>
{{produk}}
</produk>

Kategori: {{kategori}}
Platform: {{platform}}

{{#varian}}
<varian>
{{varian}}
</varian>
{{/varian}}

1. Jika jenis produk, ukuran atau spesifikasi utama, atau berat kemasan tidak jelas, tanyakan dalam satu pesan lalu berhenti.
2. Tulis nama produk untuk {{platform}}: dua alternatif per platform, masing-masing dengan jumlah karakter.
3. Susun tabel varian (nama varian, harga, stok, SKU usulan) dari data varian. Jika tidak ada varian, tulis "Tanpa varian".
4. Susun spesifikasi hanya dari data produk; yang tidak diketahui ditandai "perlu dilengkapi".
5. Tulis deskripsi: dua kalimat pembuka tentang manfaat utama untuk pembeli di kategori {{kategori}}, lima sampai tujuh poin keunggulan dengan bukti, spesifikasi, isi paket, perawatan atau cara pakai, garansi dan ketentuan retur (hanya yang disebutkan penjual).
6. Tulis lima template balasan chat: stok dan varian, ukuran atau kecocokan, pengiriman dan resi, komplain barang rusak, minta ulasan setelah barang sampai.
7. Buat daftar foto yang perlu disiapkan, berurutan.
8. Periksa sebelum menyerahkan: batas karakter, tidak ada kontak di luar platform, tidak ada klaim atau nomor izin yang dikarang.
</task>

<constraints>
- Jangan menulis "original", "termurah", "nomor 1", "terlaris" atau klaim kesehatan tanpa bukti di data produk.
- Jangan mencantumkan nomor WhatsApp, akun media sosial, link luar atau ajakan bertransaksi di luar aplikasi.
- Jangan mengarang nomor BPOM, SNI, sertifikat halal, garansi atau estimasi pengiriman.
- Bahasa Indonesia yang ramah dan jelas, boleh sedikit santai, emoji paling banyak satu per poin.
</constraints>

<output_format>
## Nama produk
Alternatif per platform dengan jumlah karakter.

## Varian
Tabel: Varian | Harga | Stok | SKU.

## Spesifikasi
Tabel: Atribut | Nilai.

## Deskripsi
Deskripsi siap tempel, per platform jika perlu.

## Template chat
Lima template.

## Foto
Daftar foto berurutan.

## Cek aturan
Batas karakter, klaim yang dihapus, aturan yang diterapkan.

## Info yang kurang
Data yang perlu dilengkapi penjual. Tulis "Tidak ada" jika sudah lengkap.
</output_format>
