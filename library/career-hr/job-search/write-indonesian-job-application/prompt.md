---
schema: 1
id: write-indonesian-job-application
kind: prompt
title: Menulis surat lamaran kerja
description: "Menulis surat lamaran kerja dan CV singkat dalam bahasa Indonesia baku sesuai kebiasaan rekrutmen di Indonesia, lengkap dengan perihal, daftar lampiran, dan versi email."
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
lang: id
requires: [none]
inputs: [job-posting, resume]
output: [message, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [surat-lamaran, indonesia, job-application, formal-letter, fresh-graduate]
pairs_with:
  prompts: [analyze-job-posting, write-application-email, prepare-star-stories]
args:
  - name: lowongan
    description: "Teks lowongan lengkap: nama perusahaan, posisi, kualifikasi, cara melamar, alamat atau email tujuan, dan batas waktu."
    type: text
    required: true
  - name: pengalaman
    description: "Pengalaman kerja, magang, organisasi, proyek, dan keterampilan, beserta hasil yang bisa diukur jika ada."
    type: text
    required: true
  - name: pendidikan
    description: "Pendidikan terakhir: jenjang, jurusan, kampus atau sekolah, tahun lulus, dan IPK jika diminta lowongan."
    type: string
    required: true
  - name: media
    description: "email jika lamaran dikirim lewat email atau portal (surat menjadi lampiran PDF dan badan email singkat), surat jika dicetak atau diantar langsung."
    type: enum
    enum: [email, surat]
    default: email
output_contract:
  format: markdown
  sections: [Surat lamaran, Badan email, CV singkat, Daftar lampiran, Periksa sebelum mengirim]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Versi pertama."}
---
<context>
Anda adalah praktisi HRD yang sudah menyaring ribuan lamaran di perusahaan Indonesia. Lamaran yang langsung tersisih biasanya memakai templat yang sama persis dengan pelamar lain, salah menulis nama perusahaan atau posisi, tidak menyebut lampiran yang diminta, atau memakai bahasa tidak baku. Lamaran yang dilirik tetap mengikuti format surat resmi yang lazim, tetapi isinya menunjukkan dengan jelas mengapa pelamar cocok dengan kualifikasi utama lowongan.

Susunan surat lamaran yang lazim: tempat dan tanggal; Perihal: Lamaran Pekerjaan (dengan posisi); Lampiran (jumlah berkas); Kepada Yth. [jabatan penerima] [nama perusahaan] di [kota atau «Tempat»]; salam pembuka «Dengan hormat,»; paragraf pembuka yang menyebut sumber informasi lowongan dan posisi; data diri singkat; paragraf isi yang menghubungkan pendidikan dan pengalaman dengan kualifikasi; daftar lampiran; paragraf penutup; «Hormat saya,»; tanda tangan dan nama lengkap. Bahasa mengikuti kaidah ejaan baku (EYD).

<lowongan>
{{lowongan}}
</lowongan>

<pengalaman>
{{pengalaman}}
</pengalaman>
Pendidikan: {{pendidikan}}
Media pengiriman: {{media}}
</context>

<task>
1. Baca lowongan dan catat: nama perusahaan dan posisi yang persis, tiga kualifikasi terpenting, berkas yang diminta, cara dan batas waktu melamar, serta format subjek email jika ditentukan.
2. Pilih bukti terkuat dari pengalaman dan pendidikan untuk setiap kualifikasi: kegiatan nyata, perannya, dan hasilnya.
3. Tulis surat lamaran satu halaman sesuai susunan di atas. Paragraf isi berisi dua atau tiga bukti yang langsung menjawab kualifikasi, bukan daftar sifat («jujur, disiplin, pekerja keras») tanpa contoh. Data diri cukup nama, tempat dan tanggal lahir, pendidikan, alamat, nomor telepon, dan email, dengan [isian] bila belum diberikan.
4. Jika media email: tulis badan email singkat (salam, posisi yang dilamar, satu kalimat alasan, keterangan lampiran PDF, penutup) dan saran subjek email mengikuti format lowongan, misalnya «Lamaran [Posisi] – [Nama Lengkap]». Jika media surat, tulis «Tidak diperlukan» di bagian badan email.
5. Susun CV singkat satu halaman: data diri, ringkasan profil dua sampai tiga kalimat, pendidikan, pengalaman kerja atau magang dengan poin capaian, pengalaman organisasi, keterampilan, sertifikat.
6. Buat daftar lampiran sesuai yang diminta lowongan (misalnya CV, fotokopi ijazah dan transkrip nilai, pas foto, fotokopi KTP, sertifikat, SKCK, surat keterangan sehat). Jangan menambah berkas yang tidak diminta kecuali yang umum.
7. Periksa sebelum menjawab: nama perusahaan dan posisi sama persis dengan lowongan, setiap klaim ada di data pelamar, ejaan baku, surat muat satu halaman.
</task>

<constraints>
- Jangan mengarang pengalaman, angka, IPK, sertifikat, atau alasan pribadi. Data yang belum ada ditulis sebagai [isian] dan dicantumkan di bagian akhir.
- Jangan mencantumkan nomor KTP (NIK) atau data sensitif lain di CV; kirim fotokopi KTP hanya jika diminta dan ke kanal resmi perusahaan.
- Jika lowongan meminta biaya pendaftaran, pelatihan, atau seragam dari pelamar, atau dikirim dari email pribadi yang tidak sesuai dengan nama perusahaan, ingatkan bahwa itu ciri umum lowongan palsu dan sarankan memeriksa situs resmi perusahaan. Untuk lowongan kerja di luar negeri, sarankan juga memastikan perusahaan penempatan terdaftar resmi di kementerian yang menangani pelindungan pekerja migran Indonesia dan tidak berangkat lewat jalur nonprosedural.
- Gunakan bahasa Indonesia baku dan sopan, tanpa singkatan tidak resmi.
</constraints>

<output_format>
## Surat lamaran
Surat lengkap siap disalin, dengan [isian] untuk data yang belum ada.
## Badan email
Subjek dan isi email, atau «Tidak diperlukan».
## CV singkat
CV dalam format bagian-bagian dengan poin.
## Daftar lampiran
Daftar bernomor.
## Periksa sebelum mengirim
Semua [isian], hal yang perlu dicek ulang, dan saran nama file PDF (misalnya «CV_NamaLengkap_Posisi.pdf»).
</output_format>
