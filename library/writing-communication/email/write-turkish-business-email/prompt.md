---
schema: 1
id: write-turkish-business-email
kind: prompt
title: Türkçe iş e-postası yazma
description: "Türkçe iş e-postalarını doğru hitap, siz dili, açık konu satırı ve uygun kapanış ifadeleriyle yazar: talep, bilgilendirme, takip, özür, ret ve toplantı ayarlama için."
category: email
version: 1.0.0
status: incubating
lang: tr
stage: [build]
role: [individual, manager, sales-rep]
subject: [turkish]
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
tags: [is-yazismasi, hitap, siz-dili, business-turkish, kapanis-ifadesi]
pairs_with:
  prompts: [write-turkish-petition, write-follow-up-email, check-tone-before-sending]
args:
  - name: amac
    description: "E-postanın amacı: talep (bir şey istemek), bilgilendirme, takip (hatırlatma), ozur (özür), ret (nazikçe reddetme) veya toplanti (toplantı önermek ya da ertelemek)."
    type: enum
    enum: [talep, bilgilendirme, takip, ozur, ret, toplanti]
    default: talep
  - name: alici
    description: "Alıcı ve ilişkiniz: ad soyad, unvan, şirket, dış müşteri mi iç ekip mi, üst mü, ilk temas mı yoksa tanışıyor musunuz (örnek: \"Ayşe Yılmaz, Satın Alma Müdürü, Demir Gıda A.Ş., ilk temas\")."
    type: string
    required: true
  - name: icerik
    description: "Söylemek veya elde etmek istediğiniz şey ve tüm bilgiler: tarihler, son tarih, tutarlar, sipariş veya teklif numaraları, ekler; gönderenin adı, unvanı ve şirketi. Türkçe, İngilizce veya karışık yazabilirsiniz."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Konu, E-posta metni, Dil notları, Göndermeden önce kontrol]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Türkçe iş yazışmalarında hitap ilk izlenimi belirler. Kurumsal yazışmada deneyimli olanlar şunu bilir: ilk temasta ve resmi durumlarda "Sayın Ayşe Yılmaz," veya "Sayın Yılmaz," kullanılır; tanışılan kişilere "Ayşe Hanım," ya da "Mehmet Bey," daha doğal ve yine saygılıdır; "Sayın Ayşe Hanım" gibi çift saygı ifadesi yaygın olsa da birçok yazışma kılavuzunda gereksiz sayılır; tek bir saygı ifadesi yeterlidir. Siz dili, karşı taraf aksini önermedikçe esastır ve e-posta boyunca tutarlı olmalıdır. Sık yapılan hatalar: konuyu üçüncü paragrafa saklamak, "en kısa sürede" gibi belirsiz süreler, İngilizceden çeviri kalıplar ("Umarım bu e-posta sizi iyi bulur"), "Selamlar" gibi fazla gündelik kapanışlar ve gereksiz uzun nezaket cümleleri. İyi bir iş e-postası amacı ilk cümlede söyler, ayrıntıları maddeler, tarih ve tutarları açık yazar ve "Saygılarımla," veya "İyi çalışmalar dilerim." ile kapanır.
</context>

<task>
Türkçe bir iş e-postası yaz. Amaç: {{amac}}. Alıcı: {{alici}}.

<icerik>
{{icerik}}
</icerik>

1. Amaç için vazgeçilmez bilgiler eksikse (talep: ne ve ne zamana kadar; takip: ilk e-postanın tarihi; özür: ne oldu ve ne yapılacak; ret: neyin reddedildiği; toplantı: olası zamanlar), en fazla üç kısa soru sor ve dur. Yalnızca gönderen bilgileri eksikse [yer tutucu] kullanarak devam et.
2. Konu satırı: somut, varsa sipariş, teklif numarası veya tarih ile (ör. "4711 No'lu Teklif - Teslim Süresi Hakkında").
3. Hitap: ilk temas veya resmi durumda "Sayın [Ad Soyad]," ya da "Sayın [Soyad],"; tanışılan kişilere "[Ad] Hanım," / "[Ad] Bey,"; daha samimi iç yazışmalarda "Merhaba [Ad] Hanım,". İsim bilinmiyorsa "Sayın Yetkili,". Seçimini dil notlarında kısaca açıkla.
4. İlk temas ise tek cümlede kendini ve şirketini tanıt; ardından amacı ilk veya ikinci cümlede söyle.
5. Birden fazla konu varsa numaralı maddeler kullan.
6. Amaca göre:
   - talep: "...rica ederim" veya "...iletebilir misiniz?" ile açık bir istek, tarih ve gerekçe.
   - bilgilendirme: ana bilgi önce, alıcının yapması gereken varsa açıkça.
   - takip: önceki e-postayı tarihiyle an, suçlamadan, yeni bir tarih ver.
   - ozur: olay ve etkisi, bir iki kez özür, neden, çözüm ve önlem; mazeretle başlama.
   - ret: teşekkür, ikinci cümlede açık ret, kısa gerekçe, gerçekten varsa alternatif.
   - toplanti: gün, tarih, saat ve biçimiyle iki üç somut seçenek.
7. Kapanış: amaca uygun bir cümle ("Bilgilerinize sunar, iyi çalışmalar dilerim.", "Dönüşünüzü rica ederim.") ve "Saygılarımla," ardından ad soyad, unvan, şirket, telefon; eksikse [yer tutucu].
</task>

<constraints>
- E-postanın tamamını ve notları, girdi İngilizce olsa bile, Türkçe yaz.
- Olmayan bilgi, tarih, tutar, isim, unvan veya belge numarası uydurma; [yer tutucu] kullan.
- Tarihleri "20 Kasım 2026" veya "20.11.2026", saatleri "14.30", tutarları "25.000 TL" biçiminde yaz.
- Siz dilini e-posta boyunca tutarlı kullan; argo, gereksiz İngilizce ve çeviri kalıplarından kaçın. Metin genelde yaklaşık 150 kelimenin altında olsun.
</constraints>

<output_format>
## Konu
Tek satır.
## E-posta metni
Hitap, metin, kapanış ve imza.
## Dil notları
İki ila dört madde: hitap seçimi, resmiyet düzeyi, sık yanlış kullanılan bir ifade.
## Göndermeden önce kontrol
[Yer tutucular], ekler, tarihler ve bilgi verilecek kişiler.
</output_format>
