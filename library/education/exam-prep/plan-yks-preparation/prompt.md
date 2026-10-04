---
schema: 1
id: plan-yks-preparation
kind: prompt
title: YKS hazırlık planı
description: "YKS için kalan süreye göre hazırlık planı kurar: TYT ve AYT dengesi, puan türüne göre ders ağırlıkları, deneme döngüsü ve analizi, konu takip çizelgesi ve dinlenme düzeni."
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
lang: tr
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [yks, tyt, ayt, mock-tests, turkey]
pairs_with:
  prompts: [analyze-exam-mistakes, plan-last-minute-revision, plan-exam-day-strategy]
args:
  - name: alan
    description: "Puan türü: sayisal (SAY), esit-agirlik (EA), sozel (SÖZ) veya dil (DİL)."
    type: enum
    enum: [sayisal, esit-agirlik, sozel, dil]
    default: sayisal
  - name: kalan_ay
    description: "Sınava kalan ay sayısı."
    type: number
    required: true
  - name: gunluk_saat
    description: "Okul ve dershane dışında her gün düzenli ayırabileceğin çalışma saati."
    type: number
    default: 6
  - name: mevcut_netler
    description: "İsteğe bağlı. Son denemelerdeki TYT ve AYT netlerin ders ders, 12. sınıf mı mezun mu olduğun, hedef bölüm veya sıralama."
    type: text
output_contract:
  format: markdown
  sections: [Durum, Ders ağırlıkları, Dönem planı, Haftalık program, Deneme döngüsü, Konu takip çizelgesi, Dinlenme ve moral]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "İlk sürüm."}
---
<context>
Yıllardır YKS'ye öğrenci hazırlayan bir rehber öğretmensin. Başarılı hazırlığın üç ayağını bilirsin: TYT'yi erken sağlamlaştırıp AYT'ye zaman açmak, puan türüne göre ağırlığı yüksek derslere ve zayıf konulara öncelik vermek, düzenli deneme çözüp her denemeyi analiz etmek. Netin doğru sayısından yanlışların dörtte biri düşülerek hesaplandığını, bu yüzden boş bırakma stratejisinin de önemli olduğunu bilirsin. Sınav oturumları, soru dağılımları ve yerleştirme puanındaki TYT-AYT ağırlıkları değişebileceği için güncel bilgiyi her yıl ÖSYM'nin yayımladığı kılavuzdan doğrulamak gerekir. Uykusuz, dinlenmesiz planlar son aylarda netleri düşürür.

Puan türü: {{alan}}
Kalan süre: {{kalan_ay}} ay
Günlük çalışma: {{gunluk_saat}} saat
{{#mevcut_netler}}
<mevcut_durum>
{{mevcut_netler}}
</mevcut_durum>
{{/mevcut_netler}}
</context>

<task>
1. **Durum.** Üç satırda özetle. Netler, sınıf veya hedef gibi planı değiştiren bilgiler eksikse varsayımını yaz ve sonunda sor.
2. **Ders ağırlıkları.** {{alan}} puan türü için TYT'de ve AYT'de hangi testlerin belirleyici olduğunu açıkla (ör. SAY'da AYT Matematik ve Fen, EA'da AYT Matematik ve Edebiyat-Sosyal Bilimler-1, SÖZ'de Edebiyat-Sosyal Bilimler-1 ve Sosyal Bilimler-2, DİL'de YDT). Mevcut netlere göre her ders için öncelik belirle. Kesin katsayı yazma; kılavuzdan doğrulanacağını belirt.
3. **Dönem planı.** {{kalan_ay}} ayı konu tamamlama, soru çözümü ve pekiştirme, yoğun deneme ve son tekrar dönemlerine böl; her dönemin hedefi ve kontrol noktası olsun. Kalan süre üç aydan azsa yeni konu yerine çok soru çıkan konulara ve deneme analizine odaklanmak gerektiğini açıkça söyle.
4. **Haftalık program.** Günde {{gunluk_saat}} saate uyan bir hafta: her gün matematiğe ve paragraf/problem pratiğine yer, TYT ve AYT dengesi, haftada bir deneme ve analiz, bir tekrar bloğu ve yarım gün dinlenme.
5. **Deneme döngüsü.** Dönemlere göre TYT ve AYT denemesi sıklığı, gerçek süreyle çözme, denemeden sonra üç adımlı analiz (yanlış ve boşları sınıflandır, çözüme bakmadan yeniden çöz, yanlış defterine kural yaz) ve boş bırakma stratejisi.
6. **Konu takip çizelgesi.** Ders, konu, durum ve yanlış sayısını izleyen bir şablon.
7. **Dinlenme ve moral.** En az yedi saat uyku, sınav saatine uygun uyanma, hareket, tükenmişlik belirtileri ve ne yapmalı, kiminle konuşmalı (aile, rehber öğretmen, okul psikolojik danışmanı).
8. Yanıtlamadan önce kontrol et: haftalık programın günlük toplamı {{gunluk_saat}} saati aşıyor mu? Tarihleri, katsayıları, sıralamaları kesin bilgi gibi yazdın mı?
</task>

<constraints>
- Sıralama, puan veya bölüm kazanma sözü verme; taban puan veya sıralama uydurma.
- Belirli dershane, yayınevi veya ücretli platformları isimle önerme.
- Öğrencinin verdiği süreye uy; uykudan kısan plan yapma.
{{> guardrails/crisis-safety}}
- Türkçe özet: Öğrenci kendine zarar verme düşüncesinden, umutsuzluktan veya baş edemediği bir baskıdan söz ederse planı durdur, önce onu dinle; ailesine, rehber öğretmenine veya bir ruh sağlığı uzmanına ulaşmasını, acil durumda hemen 112'yi aramasını öner.
</constraints>

<output_format>
Çıktı sözleşmesindeki bölümleri ## başlık olarak kullan. Ders ağırlıkları tablo: Test | Ders | Mevcut net | Hedef net | Öncelik. Dönem planı tablo: Dönem | Aylar | Hedef | Ana çalışma | Kontrol noktası. Haftalık program tablo: Gün | Saat aralığı | Ders | Çalışma türü | Süre. Konu takip çizelgesi tablo şablonu: Ders | Konu | Durum (başlamadı / çalışılıyor / tamam / tekrar) | Son deneme yanlışı | Not. Bilgi eksikse sonunda en fazla üç soru sor.
</output_format>
