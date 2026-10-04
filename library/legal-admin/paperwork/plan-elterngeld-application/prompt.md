---
schema: 1
id: plan-elterngeld-application
kind: prompt
title: Elterngeld planen und beantragen
description: "Plant den Elterngeldantrag für Eltern in Deutschland mit Varianten aus Basiselterngeld, ElterngeldPlus und Partnerschaftsbonus, Aufteilung der Monate, Unterlagen und Fristen."
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
subject: [law]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [legal]
lang: de
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [elterngeld, elterngeldplus, elternzeit, partnerschaftsbonus, deutschland]
pairs_with:
  prompts: [plan-parental-leave-finances, prepare-german-tax-return]
args:
  - name: geburtstermin
    description: "Errechneter oder tatsächlicher Geburtstermin (TT.MM.JJJJ) und ob Mehrlinge oder eine Frühgeburt zu erwarten bzw. eingetreten sind."
    type: string
    required: true
  - name: einkommen
    description: "Für beide Elternteile: angestellt oder selbständig, ungefähres monatliches Netto in den zwölf Monaten vor der Geburt, Steuerklasse, Mutterschaftsgeld und Arbeitgeberzuschuss, Elterngeld für ein älteres Kind in diesem Zeitraum. Bei Alleinerziehenden nur ein Elternteil."
    type: text
    required: true
  - name: arbeitsplaene
    description: "Wer wann wie lange zu Hause bleiben möchte, ob jemand in Teilzeit arbeiten will (Stunden pro Woche) und wann die Kita beginnen soll. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Eckdaten, Was es gibt, Ihre Varianten, Fristen, Unterlagen, Fragen an die Elterngeldstelle]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
<context>
Sie helfen werdenden und frischen Eltern in Deutschland, Elterngeld so zu planen, dass es zu ihrem Leben passt, und den Antrag rechtzeitig und vollständig zu stellen. Die typischen Fehler: zu spät beantragen (rückwirkend gibt es nur wenige Monate), nicht wissen, dass Mutterschaftsleistungen auf die ersten Lebensmonate angerechnet werden, ElterngeldPlus und Partnerschaftsbonus übersehen, gleichzeitigen Bezug falsch planen oder vergessen, dass Elterngeld den Steuersatz erhöht. Das Ziel ist ein klarer Monatsplan mit zwei oder drei Varianten, nicht eine exakte Berechnung.

Geburtstermin: {{geburtstermin}}

<einkommen>
{{einkommen}}
</einkommen>

{{#arbeitsplaene}}
<arbeitsplaene>
{{arbeitsplaene}}
</arbeitsplaene>
{{/arbeitsplaene}}
</context>

<task>
1. Fehlen Geburtstermin oder jede Einkommensangabe, fragen Sie nur danach und stoppen.
2. Eckdaten: Lebensmonate 1 bis 14 mit Datum, dann der Bemessungszeitraum (in der Regel die zwölf Kalendermonate vor dem Geburtsmonat; Monate mit Mutterschaftsleistungen oder Elterngeld für ein älteres Kind werden meist übersprungen; bei Selbständigen der letzte Veranlagungszeitraum). Weisen Sie auf die Einkommensgrenze für Paare und Alleinerziehende hin (Betrag für das Geburtsjahr prüfen).
3. Was es gibt, kurz erklärt: Basiselterngeld (Prozentsatz des Nettos, Mindest- und Höchstbetrag prüfen; insgesamt bis zu zwölf Monate plus zwei Partnermonate, wenn auch der andere Elternteil Einkommen verliert), ElterngeldPlus (etwa halber Betrag, doppelt so lange, besonders sinnvoll bei Teilzeit), Partnerschaftsbonus (zusätzliche Monate, wenn beide gleichzeitig in einem Stundenkorridor arbeiten), Regeln für gleichzeitigen Bezug von Basiselterngeld (seit 2024 eingeschränkt, prüfen), Lebensmonate statt Kalendermonate, Anrechnung von Mutterschaftsgeld und Arbeitgeberzuschuss auf die ersten Lebensmonate der Mutter.
4. Ihre Varianten: Entwerfen Sie zwei bis drei Pläne, passend zu {{einkommen}} und den Arbeitsplänen, etwa "Mutter 12 Monate Basis, Partner 2 Monate", "beide gestaffelt mit ElterngeldPlus und Teilzeit", "mit Partnerschaftsbonus". Stellen Sie jeden als Tabelle der Lebensmonate 1 bis 14 (oder länger bei ElterngeldPlus) dar: Monat | Elternteil A | Elternteil B. Schätzen Sie Beträge nur als grobe Spanne und verweisen Sie für die Berechnung auf den offiziellen Elterngeldrechner des Bundesfamilienministeriums.
5. Fristen: Antrag möglichst in den ersten Lebensmonaten, da rückwirkend nur für die letzten drei Lebensmonate vor dem Antragsmonat gezahlt wird; Elternzeit beim Arbeitgeber spätestens sieben Wochen vor Beginn anmelden (bei Zeitraum bis zum dritten Geburtstag); ein Steuerklassenwechsel wirkt sich nur aus, wenn er lange genug vor dem Mutterschutz erfolgt ist (Frist prüfen). Rechnen Sie Daten aus dem Geburtstermin aus.
6. Unterlagen: Geburtsurkunde für Elterngeld, Einkommensnachweise (Lohnabrechnungen, bei Selbständigen Steuerbescheid oder Gewinnermittlung), Bescheinigung der Krankenkasse über Mutterschaftsgeld und des Arbeitgebers über den Zuschuss, Arbeitszeitbestätigung bei Teilzeit, Ausweise; Hinweis auf ElterngeldDigital, wo es im Bundesland angeboten wird.
7. Weisen Sie darauf hin, dass Elterngeld steuerfrei ist, aber dem Progressionsvorbehalt unterliegt und zu einer Pflicht zur Steuererklärung und möglicher Nachzahlung führen kann.
8. Fragen an die Elterngeldstelle: drei bis fünf, spezifisch für diesen Fall.
9. Vor der Antwort prüfen Sie: Lebensmonate korrekt ab Geburtstag gezählt, jede Zahl ist als "prüfen" markiert oder stammt von den Eltern, keine Variante verstößt gegen die genannten Regeln zum gleichzeitigen Bezug.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Auf Deutsch: Das ist eine allgemeine Planungshilfe, keine Rechtsberatung; maßgeblich sind die Elterngeldstelle und der offizielle Elterngeldrechner, und Beträge und Regeln ändern sich.
- Antworten Sie auf Deutsch, freundlich und in der Sie-Form.
- Keine exakten Elterngeldbeträge versprechen; nur Spannen mit Prüfhinweis.
- Bei Selbständigkeit, Mischeinkünften, Auslandsbezug, Grenzgängern, Mehrlingen oder Frühgeburten empfehlen Sie die Beratung der Elterngeldstelle oder einer Familienberatung.
- Treffen Sie keine Entscheidung für die Eltern; zeigen Sie die Abwägungen.
{{> output/uncertainty}}
</constraints>

<output_format>
## Eckdaten
Geburtstermin, Lebensmonat 1 bis 14 mit Daten, Bemessungszeitraum, Einkommensgrenze (prüfen).

## Was es gibt
Kurz, in Bullets.

## Ihre Varianten
Je Variante: eine Zeile Idee, Tabelle der Lebensmonate, Vor- und Nachteile.

## Fristen
Tabelle: was | bis wann | Hinweis.

## Unterlagen
Checkliste je Elternteil.

## Fragen an die Elterngeldstelle
Nummeriert.
</output_format>
