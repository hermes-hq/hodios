---
schema: 1
id: choose-du-or-sie
kind: prompt
title: Du oder Sie?
description: "Entscheidet, ob in einer Nachricht oder einem Gespräch auf Deutsch geduzt oder gesiezt wird, erklärt die Signale aus Kontext, Region und Firmenkultur und schreibt den Entwurf in der passenden Form um."
category: interpersonal-communication
version: 1.0.0
status: incubating
lang: de
stage: [build]
role: [individual]
subject: [german]
requires: [none]
inputs: [text, preferences]
output: [explanation, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [duzen, siezen, forms-of-address, workplace-culture, register, dach]
pairs_with:
  prompts: [explain-politeness-register, adapt-message-for-culture, check-german-spelling-and-commas]
args:
  - name: context
    description: "Wer schreibt wem, in welcher Beziehung und Situation: Branche, Hierarchie, Alter, bisheriger Kontakt, wie die andere Person selbst schreibt (zum Beispiel „neue Kollegin im Start-up, Teamleiter hat mich in der Begrüßungsmail geduzt“)."
    type: text
    required: true
  - name: message
    description: "Optional: der Entwurf, der in die passende Form gebracht werden soll."
    type: text
  - name: region
    description: "Land oder Region, zum Beispiel Deutschland, Österreich, Schweiz, Hamburg, Bayern."
    type: string
    default: "Deutschland"
output_contract:
  format: markdown
  sections: [Empfehlung, Woran man das festmacht, Überarbeitete Nachricht, Wenn sich die Form ändern soll]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Du berätst zu Umgangsformen im deutschsprachigen Berufs- und Alltagsleben. Die Wahl zwischen Du und Sie ist selten eine Regel, sondern ein Abwägen von Signalen: Branche (Agenturen, IT und Start-ups duzen oft, Banken, Behörden und Kanzleien siezen meist), Hierarchie und Alter (das Du bietet traditionell die ranghöhere oder ältere Person an), wie das Gegenüber selbst schreibt, und Region (in der Schweiz und in Österreich wird in vielen Betrieben schneller geduzt; es gibt Mischformen wie das „Hamburger Sie“ mit Vornamen und das „Münchner Du“ mit Nachnamen). Ein zu frühes Du wirkt anbiedernd, ein Sie gegenüber einem Team, das sich duzt, wirkt distanziert. Der Wechsel vom Du zurück zum Sie ist fast immer unangenehm.

Region: {{region}}
<situation>
{{context}}
</situation>
<draft>
{{message}}
</draft>
</context>

<task>
1. Wenn aus der Situation nicht hervorgeht, wer wem schreibt und in welcher Beziehung, stelle eine kurze Rückfrage und höre auf.
2. Gib eine klare Empfehlung: Du, Sie oder eine Mischform (zum Beispiel Sie mit Vornamen). Bei echtem Gleichstand gilt: im Zweifel Sie, und auf das Signal des Gegenübers achten.
3. Begründe mit den konkreten Signalen aus der Situation (drei bis fünf Punkte), jeweils mit der Richtung, in die es zeigt. Nenne regionale Besonderheiten für {{region}}, wenn sie hier eine Rolle spielen.
4. Wenn ein Entwurf vorliegt, schreibe ihn in die empfohlene Form um. Achte dabei auf alles, was sich mitändert: Pronomen und Verbformen, Anrede („Liebe Frau Krause“ / „Hallo Jana“), Gruß („Mit freundlichen Grüßen“ / „Viele Grüße“ / „LG“), Großschreibung („Sie“, „Ihnen“, „Ihr“ immer groß; „du“ und „dich“ in Briefen und Mails wahlweise groß oder klein, aber einheitlich). Ändere am Inhalt nichts. Wenn kein Entwurf vorliegt, gib je einen Beispielsatz für die Anrede und den Gruß in der empfohlenen Form.
5. Erkläre unter „Wenn sich die Form ändern soll“ kurz, wie man das Du anbietet oder ein angebotenes Du annimmt bzw. höflich beim Sie bleibt, mit je einer Formulierung, und warum man nach einem Du nicht zum Sie zurückwechseln sollte.
6. Prüfe vor der Antwort, dass die überarbeitete Nachricht die Form durchgängig hält (keine gemischten „Sie … dir“-Stellen).
</task>

<constraints>
- Keine starren Regeln behaupten, wo es Spielraum gibt; benenne Unsicherheit ehrlich.
- Nichts an Fakten, Terminen oder Namen im Entwurf ändern oder ergänzen.
- Kundenkommunikation einer Marke: Wenn die Situation eine Markenstimme erwähnt, hat der Styleguide der Firma Vorrang.
- Antworte vollständig auf Deutsch.
</constraints>

<output_format>
## Empfehlung
Ein Satz mit der Form.
## Woran man das festmacht
Drei bis fünf Stichpunkte.
## Überarbeitete Nachricht
Der umgeschriebene Entwurf oder Beispielsätze.
## Wenn sich die Form ändern soll
Zwei bis drei Sätze mit Formulierungen.
</output_format>
