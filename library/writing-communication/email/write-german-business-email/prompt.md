---
schema: 1
id: write-german-business-email
kind: prompt
title: Geschäftliche E-Mail auf Deutsch schreiben
description: "Schreibt geschäftliche E-Mails auf Deutsch mit passender Anrede, Sie oder Du, klarem Betreff, Struktur und Grußformel, etwa für Anfragen, Absagen, Nachfassen, Terminabsprachen und Entschuldigungen."
category: email
version: 1.0.0
status: incubating
lang: de
stage: [build]
role: [individual, manager, sales-rep]
subject: [german]
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
tags: [geschaeftskorrespondenz, siezen-duzen, anrede, grussformel, business-german, din-5008]
pairs_with:
  prompts: [check-german-spelling-and-commas, write-german-b2b-cold-email, write-follow-up-email]
args:
  - name: zweck
    description: "Worum es geht: anfrage (Bitte oder Anfrage), absage, nachfassen (Erinnerung), termin (Terminvorschlag oder -verschiebung), entschuldigung, information."
    type: enum
    enum: [anfrage, absage, nachfassen, termin, entschuldigung, information]
    default: anfrage
  - name: empfaenger
    description: "Wer die E-Mail bekommt und Ihre Beziehung: Name, Funktion, Firma, extern oder intern, erster Kontakt oder bekannt, ob man sich duzt (z. B. „Herr Dr. Krämer, Einkaufsleiter bei Lindner AG, bisher nur gesiezt“)."
    type: string
    required: true
  - name: inhalt
    description: "Was Sie sagen oder erreichen wollen, mit allen Fakten: Daten, Fristen, Beträge, Bestell- oder Vorgangsnummern, Absender mit Firma und Funktion. Gern auf Deutsch, Englisch oder gemischt."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Betreff, E-Mail, Kurze Erklärung der Formulierungen, Vor dem Senden prüfen]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Deutsche Geschäftskorrespondenz ist direkter als englische, aber förmlicher in der Form. Wer viel mit deutschen Firmen schreibt, weiß: Die Anrede muss stimmen („Sehr geehrte Frau Dr. Weber,“ mit Titel, wenn bekannt; nach dem Komma geht es kleingeschrieben weiter), Siezen ist Standard, bis jemand das Du anbietet oder die Firmenkultur es klar vorgibt, und das Anliegen gehört in den ersten Satz statt hinter lange Höflichkeiten. Typische Fehler von Nicht-Muttersprachlern und auch von Muttersprachlern: „Hallo Herr Müller“ im ersten Kontakt mit einer Behörde oder einem konservativen Kunden, gemischtes Du und Sie, übertriebene Floskeln („Ich hoffe, diese E-Mail erreicht Sie gut“ ist eine Lehnübersetzung), Ausrufezeichen und „Mit freundlichen Grüßen“ mit Komma oder Abkürzung „MfG“. Der Betreff ist konkret, ohne „Betreff:“ im Text, und Fristen stehen mit Datum, nicht „zeitnah“.
</context>

<task>
Schreibe eine geschäftliche E-Mail auf Deutsch. Zweck: {{zweck}}. Empfänger: {{empfaenger}}.

<inhalt>
{{inhalt}}
</inhalt>

1. Fehlen Angaben, die für den Zweck unverzichtbar sind (bei anfrage: was, bis wann; bei absage: was genau abgesagt wird; bei nachfassen: Datum der ersten Nachricht; bei entschuldigung: was passiert ist und was jetzt getan wird), stelle höchstens drei kurze Fragen und höre auf. Fehlen nur Name oder Firma des Absenders, nutze [Platzhalter].
2. Sie oder Du: Wähle anhand des Empfängers. Im Zweifel Sie. Begründe die Wahl kurz in der Erklärung.
3. Betreff: konkret, mit Vorgangsnummer oder Datum, wenn vorhanden (z. B. „Angebot Nr. 4711 – Rückfrage zur Lieferzeit“).
4. Anrede: „Sehr geehrte Frau …,“ / „Sehr geehrter Herr …,“ mit akademischem Titel, wenn bekannt; „Guten Tag Frau …,“ als modernere Variante bei bestehendem Kontakt; „Liebe/r …,“ oder „Hallo …,“ nur beim Du oder in lockerer Firmenkultur; „Sehr geehrte Damen und Herren,“ nur, wenn kein Name bekannt ist. Nach der Anrede kleingeschrieben weiter.
5. Erster Satz: das Anliegen. Danach Einzelheiten, bei mehreren Punkten als kurze Liste.
6. Nach Zweck:
   - anfrage: klare Bitte im Konjunktiv („Könnten Sie mir bitte … bis zum 15. November senden?“), Frist mit Datum und Grund.
   - absage: Dank, klare Absage im zweiten Satz, kurze Begründung, falls gewünscht, ggf. Ausblick.
   - nachfassen: Bezug auf die erste Nachricht mit Datum, ohne Vorwurf, neue Frist.
   - termin: zwei bis drei konkrete Vorschläge mit Wochentag, Datum, Uhrzeit und Format.
   - entschuldigung: Fehler benennen, Entschuldigung einmal, Lösung und nächste Schritte; keine Ausreden.
   - information: Kernaussage zuerst, was der Empfänger tun muss.
7. Schluss: ein passender Schlusssatz („Für Rückfragen stehe ich Ihnen gern zur Verfügung.“ nur, wenn er etwas sagt) und die Grußformel ohne Komma: „Mit freundlichen Grüßen“ (förmlich), „Freundliche Grüße“ oder „Beste Grüße“ (neutral), „Viele Grüße“ (vertraut).
8. Signatur mit Name, Funktion, Firma als [Platzhalter], wenn nicht angegeben.
</task>

<constraints>
- Schreibe die E-Mail vollständig auf Deutsch, auch wenn die Eingabe englisch ist. Erklärungen ebenfalls auf Deutsch.
- Keine erfundenen Fakten, Daten, Beträge, Namen oder Titel. Fehlendes als [Platzhalter].
- Neue Rechtschreibung, „ß“ korrekt, Datumsformat „15. November 2026“ oder „15.11.2026“, Uhrzeit „14:30 Uhr“.
- Keine Lehnübersetzungen aus dem Englischen, keine Ausrufezeichen im Fließtext, keine „MfG“-Abkürzung.
- E-Mail-Text in der Regel unter etwa 150 Wörtern.
</constraints>

<output_format>
## Betreff
Eine Zeile.
## E-Mail
Anrede, Text, Grußformel, Signatur.
## Kurze Erklärung der Formulierungen
Zwei bis vier Punkte: Sie/Du, Anrede, Grußformel, eine heikle Formulierung.
## Vor dem Senden prüfen
[Platzhalter], Anhänge, Fristen.
</output_format>
