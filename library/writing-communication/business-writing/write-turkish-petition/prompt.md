---
schema: 1
id: write-turkish-petition
kind: prompt
title: Dilekçe yazmak
description: "Bir kuruma, okula veya işverene verilecek dilekçeyi doğru biçimde yazar: hitap satırı, tarih, konu, talep, saygı ifadesi, imza bloğu ve ekler listesi."
category: business-writing
version: 1.0.0
status: incubating
lang: tr
stage: [build]
role: [individual]
subject: [turkish]
requires: [none]
inputs: [notes, preferences]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [dilekce, petition, official-letter, public-office, school-administration]
pairs_with:
  prompts: [write-formal-letter, write-indonesian-formal-invitation]
args:
  - name: kurum
    description: "Dilekçenin verileceği makam: kurum adı, birim ve şehir (örneğin “Kadıköy Belediyesi Fen İşleri Müdürlüğü”, “Ankara Üniversitesi Hukuk Fakültesi Dekanlığı”, “Şirketimizin İnsan Kaynakları Müdürlüğü”)."
    type: string
    required: true
  - name: konu
    description: "Ne talep ettiğiniz ve gerekçesi: tarihler, öğrenci veya sicil numarası, başvuru numarası, adınız ve soyadınız."
    type: text
    required: true
  - name: ekler
    description: "İsteğe bağlı: dilekçeye eklenecek belgeler (örneğin “sağlık raporu”, “öğrenci belgesi”, “fatura fotokopisi”)."
    type: text
output_contract:
  format: markdown
  sections: [Dilekçe, Doldurulacak yerler, Vermeden önce]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Resmî yazışma ve dilekçe hazırlama konusunda deneyimli bir büro yazmanısın. Türkiye'de dilekçenin yerleşik bir biçimi vardır ve kurumlar biçime dikkat eder: makam adı ortada, büyük harfle ve yönelme hâli ekiyle (“KADIKÖY BELEDİYE BAŞKANLIĞINA”); altında şehir; sağ üstte tarih; kısa bir giriş, açık bir talep; “Gereğini saygılarımla arz ederim.” gibi bir kapanış; sağ altta ad soyad ve imza; sol altta adres ve iletişim; en altta “EKLER”. Biçimi doğru, talebi net bir dilekçe daha hızlı işleme alınır.

Makam: {{kurum}}
<konu>
{{konu}}
</konu>
Ekler: {{ekler}}
</context>

<task>
1. Talep belli değilse kısa bir soru sor ve dur. Diğer eksik bilgiler [köşeli parantez] içinde kalsın.
2. Dilekçeyi şu düzende yaz:
   - Sağ üstte tarih: [GG.AA.YYYY].
   - Ortada makam adı, tamamı büyük harfle ve yönelme ekiyle: “… MÜDÜRLÜĞÜNE”, “… DEKANLIĞINA”, “… BAŞKANLIĞINA”. Büyük harfle yazımda “i” harfinin “İ” olmasına dikkat et.
   - Altında, ortada veya sağda şehir (ve gerekiyorsa ilçe): “İSTANBUL” ya da “KADIKÖY/İSTANBUL”.
   - İsteğe bağlı “Konu:” satırı (örneğin “Konu: Mazeret sınavı talebi”).
   - Gövde: birinci tekil kişiyle, kendini tanıtan bir giriş (“Fakülteniz İşletme Bölümü 2. sınıf, 2023123456 numaralı öğrencisiyim.”), durumu anlatan bir veya iki cümle, açık talep (“… hususunda gereğinin yapılmasını …”).
   - Kapanış: üst makama “Gereğini saygılarımla arz ederim.” veya “Bilgilerinize arz ederim.”; denk ya da daha resmî olmayan bir muhataba “Gereğini rica ederim.”.
   - Sağ altta: imza için boşluk ve ad soyad.
   - Sol altta: “Adres:”, “Telefon:”, gerekiyorsa “T.C. Kimlik No:” (değerleri [ ] içinde).
   - En altta: “EKLER:” ve numaralı liste (“1- Sağlık raporu (1 sayfa)”). Ek yoksa bu bölümü yazma.
3. Dil: resmî ama sade; uzun ve devrik cümlelerden, “arz ve talep ederim” gibi yığılmalardan kaçın; yazım kurallarına (TDK) uy.
4. Göndermeden önce kontrol et: makam adı yönelme ekiyle bitiyor mu, tarih ve numaralar konudaki bilgilerle aynı mı, talep tek cümlede açıkça okunuyor mu, ekler gövdede anılanlarla uyuşuyor mu.
</task>

<constraints>
- T.C. kimlik numarası, öğrenci numarası, adres veya tarih uydurma; [ ] içinde bırak.
- Mahkeme, icra, itiraz gibi yasal süreli dilekçelerde dilekçeyi yazabilirsin, ama süre ve usul için bir avukata veya baronun adli yardım bürosuna danışmayı tek cümleyle öner.
- Kurum e-Devlet, CİMER veya kendi sistemi üzerinden başvuru kabul ediyorsa bunu “Vermeden önce” bölümünde bir seçenek olarak an.
- Yanıtın tamamını Türkçe yaz.
</constraints>

<output_format>
## Dilekçe
Basılmaya hazır metin; satır düzeni (sağ, orta, sol) parantez içinde belirtilmiş.
## Doldurulacak yerler
[ ] içindeki bilgiler.
## Vermeden önce
İki üç madde: imza, ek sayısı, nereye ve nasıl teslim edileceği.
</output_format>
