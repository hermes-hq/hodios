---
schema: 1
id: request-arbeitszeugnis-correction
kind: prompt
title: Berichtigung des Arbeitszeugnisses anfordern
description: "Entwirft ein höfliches, bestimmtes Schreiben an den früheren Arbeitgeber, das konkrete Sätze im Arbeitszeugnis benennt, Ersatzformulierungen vorschlägt und eine Frist setzt."
category: career-growth
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
advice_risk: [legal]
lang: de
requires: [none]
inputs: [document, notes]
output: [message, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [arbeitszeugnis, zeugnisberichtigung, germany, employment-reference, formal-letter]
pairs_with:
  prompts: [decode-arbeitszeugnis, write-resignation-letter]
args:
  - name: zeugnis_text
    description: Der vollständige Text des erhaltenen Zeugnisses, einschließlich Datum und Unterschriftszeile. Namen dürfen durch Platzhalter ersetzt werden.
    type: text
    required: true
  - name: issues
    description: Was falsch oder unvollständig ist und was Sie belegen können, zum Beispiel fehlende Aufgaben, eine zu schwache Zufriedenheitsformel, fehlende Schlussformel, falsche Daten, Lob aus Mitarbeitergesprächen oder Zielvereinbarungen.
    type: text
    required: true
  - name: deadline_days
    description: Frist für die Antwort des Arbeitgebers in Tagen ab Zugang des Schreibens.
    type: number
    default: 14
  - name: ton
    description: kooperativ für ein gutes Verhältnis zum früheren Arbeitgeber oder eine erste Bitte; bestimmt, wenn eine erste Bitte ignoriert wurde.
    type: enum
    enum: [kooperativ, bestimmt]
    default: kooperativ
output_contract:
  format: markdown
  sections: [Vorab, Änderungsliste, Schreiben, Vor dem Versand prüfen, Wenn keine Antwort kommt]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
<context>
Sie helfen Beschäftigten in Deutschland, ein fehlerhaftes oder unvollständiges Arbeitszeugnis berichtigen zu lassen, ohne die Beziehung zum früheren Arbeitgeber unnötig zu belasten. Erfahrungsgemäß hat eine Bitte die besten Chancen, wenn sie konkret ist: Sie nennt jede beanstandete Stelle wörtlich, schlägt eine fertige Ersatzformulierung vor, begründet kurz mit überprüfbaren Tatsachen und setzt eine angemessene Frist. Pauschale Kritik („das Zeugnis ist zu schlecht“) wird meist abgelehnt.

Rechtlicher Rahmen, den die Person selbst prüfen lassen sollte: Nach § 109 GewO besteht ein Anspruch auf ein qualifiziertes Zeugnis, das wahr, wohlwollend sowie klar und verständlich ist. Nach verbreiteter Rechtsprechung muss in der Regel die beschäftigte Person eine bessere als eine durchschnittliche Bewertung belegen, der Arbeitgeber eine schlechtere. Ausschlussfristen in Arbeits- oder Tarifverträgen können sehr kurz sein (oft wenige Monate). Eine berichtigte Fassung trägt üblicherweise das ursprüngliche Ausstellungsdatum.

<zeugnis>
{{zeugnis_text}}
</zeugnis>

<beanstandungen>
{{issues}}
</beanstandungen>

Frist: {{deadline_days}} Tage. Ton: {{ton}}.
</context>

<task>
1. Lesen Sie Zeugnis und Beanstandungen. Ordnen Sie jede Beanstandung einer Stelle im Zeugnis zu. Wenn eine Beanstandung zu vage ist, um eine Ersatzformulierung zu schreiben (zum Beispiel „Note zu schlecht“ ohne Angabe, was belegt werden kann), formulieren Sie eine Rückfrage und machen Sie trotzdem mit den übrigen Punkten weiter.
2. Unterscheiden Sie drei Arten von Änderungen: sachliche Fehler (Daten, Titel, Aufgaben), fehlende Bausteine (zum Beispiel Verhaltensbeurteilung, Führungsleistung, Schlussformel) und Bewertungsfragen (Zufriedenheitsformel, Steigerungen). Kennzeichnen Sie, welche Belege bei Bewertungsfragen helfen würden.
3. Schreiben Sie für jede Stelle eine Ersatzformulierung, die wahr bleibt und im Stil des übrigen Zeugnisses steht. Schlagen Sie nur Verbesserungen vor, die durch die genannten Tatsachen gedeckt sind.
4. Verfassen Sie das Schreiben im Ton {{ton}}: Bezug auf das Zeugnis vom [Datum], Dank für die Ausstellung (bei kooperativ), die Bitte um Berichtigung mit Verweis auf die Änderungsliste in der Anlage, die Bitte, das berichtigte Zeugnis auf Firmenbogen, mit dem ursprünglichen Datum und Unterschrift zu erstellen, und eine Frist von {{deadline_days}} Tagen mit konkretem Datum als [Datum]. Bei bestimmt zusätzlich: Hinweis auf die frühere Bitte und dass Sie sich weitere Schritte vorbehalten, ohne zu drohen.
5. Ergänzen Sie, was vor dem Versand zu prüfen ist und was die Person tun kann, wenn keine oder eine ablehnende Antwort kommt.
6. Prüfen Sie vor der Ausgabe: Jede Ersatzformulierung ist durch eine genannte Tatsache gedeckt, keine Rechtslage wird als sicher dargestellt, alle unbekannten Angaben sind Platzhalter in eckigen Klammern.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Auf Deutsch zusammengefasst: Dies ist allgemeine Information und keine Rechtsberatung; Ansprüche, Beweislast und Fristen lässt die Person im Zweifel von einem Fachanwalt für Arbeitsrecht, der Gewerkschaft oder dem Betriebsrat prüfen.
- Sagen Sie nie voraus, ob eine Zeugnisberichtigungsklage Erfolg hätte.
- Erfinden Sie keine Leistungen, Kennzahlen oder Lobesäußerungen. Fehlende Belege werden als Platzhalter mit Hinweis markiert.
- Keine Drohungen, keine Vorwürfe gegen Personen, keine Formulierungen, die den Arbeitgeber zu einer bestimmten Note „verpflichten“ sollen, wenn die Tatsachen sie nicht stützen.
- Halten Sie das Schreiben auf einer Seite; die Details stehen in der Änderungsliste.
</constraints>

<output_format>
## Vorab
Zwei Sätze: was dieses Schreiben leistet, und dass Fristen aus Arbeits- oder Tarifvertrag sofort geprüft werden sollten.
## Änderungsliste
Tabelle: Nr. | Stelle im Zeugnis (Zitat) | Art (Fehler / fehlt / Bewertung) | Begründung und Beleg | Vorgeschlagene Formulierung.
## Schreiben
Das fertige Schreiben in DIN-5008-Reihenfolge (Absender, Empfänger, Ort und Datum, Betreff, Anrede, Text, Grußformel, Anlage), mit [Platzhaltern].
## Vor dem Versand prüfen
Checkliste, unter anderem Ausschlussfrist, Versandweg mit Nachweis, Kopie aufbewahren.
## Wenn keine Antwort kommt
Höchstens vier Schritte, von freundlicher Erinnerung bis Beratung; jeweils „zu prüfen“.
</output_format>
