---
schema: 1
id: write-german-application-letter
kind: prompt
title: Bewerbungsanschreiben nach DIN 5008
description: "Schreibt ein deutsches Bewerbungsanschreiben im DIN-5008-Layout mit individuellem Einstieg, Belegen zu den Anforderungen und auf Wunsch Gehaltsvorstellung und Eintrittstermin."
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [job-seeker]
lang: de
requires: [none]
inputs: [job-posting, resume]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [anschreiben, din-5008, germany, job-application, formal-letter]
pairs_with:
  prompts: [convert-cv-to-country-format, analyze-job-posting, decode-arbeitszeugnis]
  workflows: [ausbildung-application-track]
args:
  - name: stellenanzeige
    description: Der vollständige Text der Stellenanzeige, mit Kennziffer, Ansprechperson und Firmenadresse, falls vorhanden.
    type: text
    required: true
  - name: lebenslauf
    description: Ihr Lebenslauf oder Stichpunkte zu Stationen, Erfolgen mit Zahlen, Qualifikationen und Sprachkenntnissen, außerdem Ihr Grund für den Wechsel.
    type: text
    required: true
  - name: gehaltsvorstellung
    description: Optional. Ihre Gehaltsvorstellung, am besten als Bruttojahresgehalt („58.000 € brutto jährlich“). Nur angeben, wenn die Anzeige danach fragt oder Sie es wünschen.
    type: string
  - name: eintrittstermin
    description: Optional. Frühestmöglicher Eintrittstermin oder Kündigungsfrist („drei Monate zum Quartalsende“).
    type: string
  - name: stil
    description: klassisch für Behörden, Banken, Versicherungen und Kanzleien; modern für Start-ups, Agenturen und die meisten Tech- und Kreativbranchen.
    type: enum
    enum: [klassisch, modern]
    default: modern
output_contract:
  format: markdown
  sections: [Anschreiben, Warum so, Vor dem Absenden prüfen]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
<context>
Sie sind Recruiterin in einem deutschen Unternehmen und haben Tausende Anschreiben gelesen. Die meisten scheitern an denselben Stellen: Sie beginnen mit „hiermit bewerbe ich mich“, wiederholen den Lebenslauf, behaupten Eigenschaften („teamfähig, belastbar“) ohne Beleg und sind länger als eine Seite. Gute Anschreiben beantworten in einer Seite drei Fragen: Warum diese Stelle bei diesem Unternehmen, was bringe ich nachweislich für die wichtigsten Anforderungen mit, und wann und zu welchen Konditionen kann ich anfangen.

Formale Erwartungen nach DIN 5008 und deutscher Geschäftsbriefpraxis: Absenderblock, Anschriftfeld, Ort und Datum rechtsbündig, Betreffzeile ohne das Wort „Betreff“ (gegebenenfalls mit Kennziffer), Anrede mit Namen („Sehr geehrte Frau Dr. Weber,“), danach klein weiter, eine Seite, Grußformel „Mit freundlichen Grüßen“, Unterschrift, Anlagen.

<stellenanzeige>
{{stellenanzeige}}
</stellenanzeige>

<lebenslauf>
{{lebenslauf}}
</lebenslauf>
{{#gehaltsvorstellung}}
Gehaltsvorstellung: {{gehaltsvorstellung}}
{{/gehaltsvorstellung}}
{{#eintrittstermin}}
Eintrittstermin oder Kündigungsfrist: {{eintrittstermin}}
{{/eintrittstermin}}
Stil: {{stil}}
</context>

<task>
1. Analysieren Sie die Anzeige: die drei Anforderungen, die für diese Stelle entscheidend sind (aus den Aufgaben abgeleitet, nicht nur aus der Wunschliste), Ansprechperson, Kennziffer, Firmenname und -adresse sowie Fragen, die die Anzeige ausdrücklich stellt (Gehalt, Eintritt, Arbeitsort).
2. Wählen Sie zu jeder der drei Anforderungen den stärksten Beleg aus dem Lebenslauf: eine konkrete Tätigkeit mit Umfang und Ergebnis.
3. Schreiben Sie das Anschreiben:
   - Einstieg (zwei bis drei Sätze): ein konkreter, wahrer Bezug zur Stelle oder zum Unternehmen, oder direkt die stärkste Übereinstimmung. Kein „hiermit bewerbe ich mich“, kein „mit großem Interesse habe ich gelesen“.
   - Hauptteil: ein kurzer Absatz pro Anforderung, jeweils Anforderung, Beleg, Ergebnis, Nutzen für das Unternehmen. Eine offensichtliche Frage (Branchenwechsel, Lücke, Umzug) beantworten Sie in einem souveränen Satz.
   - Rahmendaten: Wenn angegeben, Eintrittstermin und Gehaltsvorstellung in einem nüchternen Satz vor dem Schluss.
   - Schluss: ein Satz zum Gespräch, ohne Konjunktiv-Unterwürfigkeit („Ich freue mich auf ein persönliches Gespräch.“ statt „Ich würde mich sehr freuen, wenn …“).
4. Passen Sie die Sprache an {{stil}} an: klassisch mit „Sie“-Form, vollständigen Sätzen und zurückhaltendem Ton; modern mit kürzeren Sätzen und persönlicherem Einstieg, aber weiterhin förmlicher Anrede, außer die Anzeige duzt ausdrücklich.
5. Setzen Sie alles in DIN-5008-Reihenfolge. Fehlt die Ansprechperson, verwenden Sie „Sehr geehrte Damen und Herren,“ und notieren Sie unter „Vor dem Absenden prüfen“, dass ein Name besser wirkt.
6. Prüfen Sie vor der Ausgabe: höchstens eine Seite (etwa 250 bis 350 Wörter Fließtext), jede Behauptung durch den Lebenslauf gedeckt, keine Floskel aus der Verbotsliste.
</task>

<constraints>
- Verwenden Sie nur Fakten aus dem Lebenslauf. Erfinden Sie keine Zahlen, Arbeitgeber, Zertifikate oder Motive. Fehlt etwas Wichtiges, setzen Sie [Platzhalter] und listen Sie ihn auf.
- Verbotene Floskeln: „hiermit bewerbe ich mich“, „teamfähig, belastbar und flexibel“ ohne Beleg, „Ihre Anzeige hat mein Interesse geweckt“, „Über eine Einladung würde ich mich sehr freuen“.
- Nennen Sie ein Gehalt nur, wenn ein Wert angegeben ist; erfinden Sie nie einen Betrag. Fragt die Anzeige nach dem Gehalt, ohne dass ein Wert vorliegt, setzen Sie [Gehaltsvorstellung] und erklären unter „Vor dem Absenden prüfen“, dass ein Bruttojahresgehalt üblich ist.
- Keine Angaben zu Alter, Familienstand, Religion oder Gesundheit im Anschreiben.
- Rechtschreibung nach aktueller amtlicher Regelung, Datumsformat einheitlich (TT.MM.JJJJ).
</constraints>

<output_format>
## Anschreiben
Der vollständige Brief als Textblock in dieser Reihenfolge: Absender ([Vorname Nachname], [Adresse], [Telefon], [E-Mail]), Anschriftfeld, „[Ort], [Datum]“ rechtsbündig markiert, Betreffzeile, Anrede, Text, „Mit freundlichen Grüßen“, [Unterschrift], [Vorname Nachname], „Anlagen: Lebenslauf, Zeugnisse“ (angepasst).
## Warum so
Höchstens drei Punkte: welche Anforderungen Sie adressiert haben und mit welchem Beleg.
## Vor dem Absenden prüfen
Alle [Platzhalter], Angaben zum Prüfen, und ob als PDF zusammen mit Lebenslauf und Zeugnissen zu senden ist.
</output_format>
