---
schema: 1
id: write-indonesian-formal-invitation
kind: prompt
title: Menulis surat undangan resmi
description: "Menulis surat undangan resmi berbahasa Indonesia untuk rapat, acara kantor, sekolah, atau kegiatan warga dengan struktur baku, bahasa santun, dan penulisan sesuai EYD."
category: business-writing
version: 1.0.0
status: incubating
lang: id
stage: [build]
role: [individual]
requires: [none]
inputs: [notes, preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [surat-undangan, formal-invitation, eyd, community-meeting, office-letter, indonesian]
pairs_with:
  prompts: [write-event-invitation, write-turkish-petition]
args:
  - name: acara
    description: "Rincian acara: nama kegiatan, tujuan, tempat, waktu (jam dan zona WIB/WITA/WIT), susunan acara singkat jika ada, nama lembaga atau panitia pengundang, dan nama serta jabatan penanda tangan."
    type: text
    required: true
  - name: penerima
    description: "Siapa yang diundang, misalnya “Bapak/Ibu warga RT 05/RW 02”, “Kepala Dinas Pendidikan Kota Bandung”, “Orang tua/wali murid kelas VI”, “seluruh karyawan divisi pemasaran”."
    type: string
    required: true
  - name: tanggal
    description: "Tanggal acara, sebaiknya beserta harinya (misalnya “Sabtu, 17 Oktober 2026”)."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Surat undangan, Yang perlu dilengkapi, Pemeriksaan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Anda adalah sekretaris berpengalaman yang terbiasa menyusun surat dinas untuk kantor, sekolah, dan pengurus RT/RW. Surat undangan resmi dinilai dari kelengkapan dan kerapiannya: kop surat, nomor, lampiran, perihal, alamat tujuan, salam pembuka, isi dengan rincian hari, tanggal, waktu, dan tempat yang mudah ditemukan, salam penutup, tanda tangan, serta nama terang. Kesalahan kecil seperti hari yang tidak cocok dengan tanggal, penulisan jam yang salah, atau “Kepada Yth.” yang berlebihan membuat surat terlihat kurang cermat.

Penerima: {{penerima}}
Tanggal acara: {{tanggal}}
<acara>
{{acara}}
</acara>
</context>

<task>
1. Jika nama kegiatan, tempat, atau waktu tidak ada, ajukan pertanyaan singkat lalu berhenti. Data lain yang kurang ditulis dalam [kurung siku].
2. Susun surat dengan urutan baku:
   - Kop surat: nama lembaga atau panitia dan alamat ([ ] jika tidak ada).
   - Nomor surat ([nomor surat], jangan dikarang), Lampiran (“-” jika tidak ada), Perihal: Undangan.
   - Tempat dan tanggal surat di kanan atas: “[Kota], [tanggal surat]”.
   - Alamat tujuan: “Yth. Bapak/Ibu …” diikuti tempat jika perlu. Gunakan “Yth.” saja, tanpa “Kepada” di depannya.
   - Salam pembuka: “Dengan hormat,”; untuk kegiatan warga atau lembaga keagamaan Islam dapat “Assalamu’alaikum warahmatullahi wabarakatuh,” sesuai kebiasaan pengundang.
   - Paragraf pembuka: maksud undangan (“Sehubungan dengan …, kami mengundang Bapak/Ibu untuk hadir pada:”).
   - Rincian dalam bentuk daftar rata titik dua: hari/tanggal, waktu, tempat, acara.
   - Paragraf penutup: “Mengingat pentingnya acara tersebut, kami mengharapkan kehadiran Bapak/Ibu tepat waktu. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.” (sesuaikan dengan acaranya).
   - Salam penutup: “Hormat kami,” atau “Wassalamu’alaikum warahmatullahi wabarakatuh,” jika dibuka dengan salam yang sama; jabatan; ruang tanda tangan; nama terang.
   - Tembusan, hanya jika disebutkan dalam rincian.
3. Ikuti EYD: jam ditulis dengan titik dan zona waktu (“pukul 09.00 WIB”, “pukul 09.00–11.30 WIB”), nama hari dan bulan diawali huruf kapital, “Bapak/Ibu” dengan huruf kapital saat menyapa, tanpa singkatan tidak baku.
4. Hari dan tanggal: jika pengguna hanya memberi tanggal, jangan menebak harinya; tulis “[hari], {{tanggal}}” dan minta pengguna memastikan. Jika hari dan tanggal sama-sama diberikan, cantumkan apa adanya dan ingatkan untuk mencocokkannya dengan kalender.
5. Sebelum menjawab, pastikan semua rincian (waktu, tempat, nama, jabatan) sama dengan data pengguna dan tidak ada yang dikarang.
</task>

<constraints>
- Jangan mengarang nomor surat, nama, jabatan, alamat, atau susunan acara.
- Bahasa santun dan ringkas; satu halaman.
- Jawab seluruhnya dalam bahasa Indonesia.
</constraints>

<output_format>
## Surat undangan
Surat lengkap siap dicetak, dengan tata letak (kanan/kiri) ditandai dalam kurung bila perlu.
## Yang perlu dilengkapi
Daftar isian dalam [kurung siku].
## Pemeriksaan
Dua sampai tiga hal yang perlu dicek: kecocokan hari dan tanggal, tanda tangan dan stempel, cara pengiriman.
</output_format>
