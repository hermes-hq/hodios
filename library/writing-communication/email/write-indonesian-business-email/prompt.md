---
schema: 1
id: write-indonesian-business-email
kind: prompt
title: Menulis email bisnis berbahasa Indonesia
description: "Menulis email kerja berbahasa Indonesia dengan sapaan Bapak/Ibu yang tepat, subjek jelas, struktur rapi, dan penutup sopan untuk permohonan, konfirmasi, tindak lanjut, dan permintaan maaf."
category: email
version: 1.0.0
status: incubating
lang: id
stage: [build]
role: [individual, manager, sales-rep]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [email-kerja, sapaan-bapak-ibu, bahasa-baku, business-indonesian, eyd]
pairs_with:
  prompts: [write-indonesian-formal-invitation, write-indonesian-job-application, write-follow-up-email]
args:
  - name: tujuan
    description: "Tujuan email: permohonan (meminta sesuatu), konfirmasi, tindak-lanjut (menagih atau mengingatkan), permintaan-maaf, penolakan, atau informasi."
    type: enum
    enum: [permohonan, konfirmasi, tindak-lanjut, permintaan-maaf, penolakan, informasi]
    default: permohonan
  - name: penerima
    description: "Siapa penerimanya dan hubungannya: nama, jabatan, instansi atau perusahaan, eksternal atau internal, atasan atau rekan, kontak pertama atau sudah kenal (contoh: \"Ibu Ratna Dewi, Manajer Pengadaan PT Sinar Abadi, kontak pertama\")."
    type: string
    required: true
  - name: isi
    description: "Apa yang ingin disampaikan, lengkap dengan fakta: tanggal, tenggat, jumlah, nomor PO atau surat, lampiran, serta nama, jabatan, dan perusahaan pengirim. Boleh ditulis dalam bahasa Indonesia, Inggris, atau campuran."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Subjek, Isi email, Catatan bahasa, Periksa sebelum mengirim]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Email kerja di Indonesia memadukan kesopanan yang kuat dengan kebutuhan untuk jelas. Orang yang terbiasa berkorespondensi dengan perusahaan dan instansi tahu beberapa kebiasaan penting: sapaan memakai "Bapak" atau "Ibu" diikuti nama (atau jabatan bila nama tidak diketahui), "Yth." dipakai di baris sapaan untuk surat atau email resmi ke instansi, salam pembuka seperti "Dengan hormat," lazim di email formal, dan "Selamat pagi/siang" cocok untuk kontak yang sudah dikenal. Kesalahan yang sering terjadi: sapaan "Dear Bapak", campuran bahasa gaul ("btw", "oke deh"), maksud email baru muncul di paragraf ketiga, tenggat ditulis "secepatnya" tanpa tanggal, dan penutup yang terlalu panjang. Permintaan yang sopan biasanya memakai "mohon", "kami berharap", atau "apakah Bapak/Ibu berkenan", tetapi tetap menyebut apa yang diminta dan kapan. Untuk zona waktu, sebutkan WIB, WITA, atau WIT bila penerima berada di wilayah lain.
</context>

<task>
Tulis email kerja berbahasa Indonesia. Tujuan: {{tujuan}}. Penerima: {{penerima}}.

<isi>
{{isi}}
</isi>

1. Jika informasi penting untuk tujuan tersebut tidak ada (permohonan: apa dan kapan; tindak-lanjut: tanggal email pertama; permintaan-maaf: apa yang terjadi dan langkah perbaikannya; penolakan: apa yang ditolak), ajukan paling banyak tiga pertanyaan singkat lalu berhenti. Jika hanya data pengirim yang kurang, gunakan [penanda].
2. Subjek: jelas dan spesifik, dengan nomor PO, nomor surat, atau tanggal bila ada, misalnya "Konfirmasi Jadwal Pengiriman PO 2291 - 20 November 2026".
3. Sapaan: "Yth. Bapak/Ibu [Nama]," untuk email resmi atau kontak pertama, "Bapak/Ibu [Nama] yang terhormat," sebagai alternatif, atau "Selamat pagi, Pak/Bu [Nama]," untuk kontak yang sudah akrab. Jika nama tidak diketahui, gunakan jabatan ("Yth. Bapak/Ibu Kepala Bagian Keuangan").
4. Pembuka singkat: "Dengan hormat," untuk email formal. Pada kontak pertama, perkenalkan diri dalam satu kalimat.
5. Maksud email di kalimat pertama atau kedua isi, lalu rincian dalam poin bernomor bila lebih dari satu hal.
6. Sesuai tujuan:
   - permohonan: permintaan jelas dengan "mohon" atau "apakah Bapak/Ibu berkenan", tenggat dengan tanggal dan alasannya.
   - konfirmasi: hal yang perlu dikonfirmasi dalam daftar, dan batas waktu balasan.
   - tindak-lanjut: rujuk email sebelumnya beserta tanggalnya, tanpa nada menyalahkan, dengan tenggat baru.
   - permintaan-maaf: fakta dan dampaknya, permintaan maaf satu atau dua kali, penyebab, perbaikan, dan pencegahan.
   - penolakan: terima kasih, penolakan yang jelas, alasan singkat, dan alternatif hanya bila memang ada.
   - informasi: inti informasi dulu, lalu apa yang perlu dilakukan penerima.
7. Penutup: "Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih." atau yang lebih singkat untuk kontak akrab, lalu "Hormat kami," atau "Salam," dan tanda tangan lengkap (nama, jabatan, perusahaan, nomor telepon) dengan [penanda] bila belum ada.
</task>

<constraints>
- Seluruh email dan catatan ditulis dalam bahasa Indonesia baku sesuai EYD, meskipun masukan berbahasa Inggris.
- Jangan mengarang fakta, tanggal, jumlah, nama, jabatan, atau nomor dokumen; gunakan [penanda].
- Tulis tanggal sebagai "20 November 2026", waktu "pukul 14.00 WIB", dan jumlah uang "Rp15.000.000".
- Hindari bahasa gaul, campuran Inggris yang tidak perlu, dan kalimat yang bertele-tele. Isi email umumnya di bawah sekitar 170 kata.
</constraints>

<output_format>
## Subjek
Satu baris.
## Isi email
Sapaan, isi, penutup, tanda tangan.
## Catatan bahasa
Dua sampai empat poin: pilihan sapaan, tingkat formalitas, ungkapan yang sering salah.
## Periksa sebelum mengirim
[Penanda], lampiran, tenggat, dan tembusan.
</output_format>
