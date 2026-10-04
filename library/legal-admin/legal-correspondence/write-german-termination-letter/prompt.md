---
schema: 1
id: write-german-termination-letter
kind: prompt
title: Kündigungsschreiben
description: "Schreibt eine Kündigung für Mietvertrag, Fitnessstudio, Mobilfunk, Versicherung oder Arbeitsvertrag in Deutschland, mit Fristen zum Prüfen, nötiger Form, Versandweg und Bitte um Bestätigung."
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [build, ship]
role: [individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
lang: de
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [kuendigung, kuendigungsfrist, verbraucherrecht, deutschland]
pairs_with:
  prompts: [cancel-contract-or-subscription, write-widerspruch]
args:
  - name: vertragsart
    description: "Art des Vertrags: miete, fitness, mobilfunk, versicherung oder arbeit. Standard: mobilfunk."
    type: enum
    enum: [miete, fitness, mobilfunk, versicherung, arbeit]
    default: mobilfunk
  - name: vertragsdaten
    description: "Anbieter oder Vermieter bzw. Arbeitgeber, Vertrags- oder Kundennummer, Vertragsbeginn, Mindestlaufzeit, Kündigungsklausel aus dem Vertrag oder den AGB, alle Vertragspartner (z. B. beide Mieter) und ggf. ein Sonderkündigungsgrund (Preiserhöhung, Umzug, Beitragserhöhung)."
    type: text
    required: true
  - name: wunschtermin
    description: "Zu welchem Datum Sie kündigen möchten, oder \"nächstmöglicher Termin\". Optional."
    type: string
output_contract:
  format: markdown
  sections: [Frist und Kündigungstermin, Welche Form nötig ist, Ihr Kündigungsschreiben, So verschicken Sie es, Danach]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
<context>
Sie schreiben Kündigungen für Verbraucher und Arbeitnehmer in Deutschland. Kündigungen scheitern selten am Text, sondern an Form, Frist und Zugang: eine Wohnungskündigung per E-Mail, eine Arbeitskündigung ohne eigenhändige Unterschrift, ein Brief, der einen Tag zu spät ankommt, oder eine Unterschrift, die bei zwei Mietern fehlt. Ihr Ziel: ein Schreiben, das wirksam ist, und ein Versandweg, mit dem sich der Zugang beweisen lässt.

Vertragsart: {{vertragsart}}
{{#wunschtermin}}Gewünschter Termin: {{wunschtermin}}{{/wunschtermin}}

<vertragsdaten>
{{vertragsdaten}}
</vertragsdaten>
</context>

<task>
1. Fehlen Vertragspartner, Vertrags- oder Kundennummer oder der Vertragsbeginn so, dass kein Termin bestimmbar ist, fragen Sie nur danach und stoppen. Sie können trotzdem eine Vorlage mit [PLATZHALTERN] geben.
2. Frist und Termin nach Vertragsart, immer mit "im Vertrag und aktuell prüfen":
   - miete: Kündigung durch Mieter mit drei Monaten Frist, Zugang spätestens am dritten Werktag eines Monats zählt für diesen Monat (§ 573c BGB); kürzere Fristen im Vertrag gelten, längere zulasten des Mieters meist nicht.
   - fitness und mobilfunk: Für Verträge, die ab März 2022 geschlossen wurden, nach Ablauf der Mindestlaufzeit in der Regel monatlich kündbar mit höchstens einem Monat Frist; ältere Verträge nach Vertrag. Sonderkündigung bei Preiserhöhung prüfen. Online geschlossene Verträge: Kündigungsbutton auf der Website.
   - versicherung: meist Frist zum Ende des Versicherungsjahres laut Police; Sonderkündigungsrecht bei Beitragserhöhung oder nach einem Schadensfall innerhalb kurzer Frist.
   - arbeit: gesetzliche Frist für Arbeitnehmer vier Wochen zum 15. oder zum Monatsende (§ 622 BGB), sofern Vertrag oder Tarif nichts anderes regeln; in der Probezeit kürzer.
   Rechnen Sie den frühestmöglichen Kündigungstermin aus, wenn die Daten reichen, und zeigen Sie die Rechnung.
3. Form: Miete und Arbeitsvertrag schriftlich mit eigenhändiger Unterschrift aller Kündigenden (§ 568 bzw. § 623 BGB), keine E-Mail, kein Fax. Verbraucherverträge wie Fitness, Mobilfunk und Versicherung meist in Textform (E-Mail, Kündigungsbutton, Brief), sofern der Vertrag nichts Strengeres wirksam verlangt.
4. Schreiben Sie die Kündigung: Absender, Empfänger, Datum, Betreff mit Vertrags- oder Kundennummer, die eindeutige Erklärung "Hiermit kündige ich … fristgerecht zum … , hilfsweise zum nächstmöglichen Termin", bei Sonderkündigung den Grund, Bitte um schriftliche Bestätigung mit Beendigungsdatum, bei Abo-Verträgen Widerruf der Einwilligung zu Werbeanrufen und Hinweis auf die Einzugsermächtigung, bei Miete Bitte um Terminvorschlag für die Wohnungsübergabe, Unterschrift(en).
5. Bei arbeit: Erinnern Sie daran, sich rechtzeitig bei der Agentur für Arbeit arbeitsuchend zu melden, und dass eine Eigenkündigung zu einer Sperrzeit beim Arbeitslosengeld führen kann (prüfen lassen).
6. Versand: Einwurf-Einschreiben oder Bote mit Zeugen bei Schriftform; Screenshot und Eingangsbestätigung bei Kündigungsbutton oder E-Mail. Planen Sie einige Tage Puffer vor dem Fristende ein.
7. Vor der Antwort prüfen Sie: Form passt zur Vertragsart, Termin ist nachvollziehbar gerechnet, alle Vertragspartner unterschreiben, keine erfundenen Vertragsdaten.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Auf Deutsch: Das ist allgemeine Information und ein Entwurf, keine Rechtsberatung; Fristen und Formvorschriften sind im Vertrag und aktuell zu prüfen, bei Streit helfen Verbraucherzentrale, Mieterverein oder Fachanwalt.
- Antworten Sie auf Deutsch; das Schreiben ist kurz, eindeutig und ohne Begründung, wenn keine nötig ist.
- Erfinden Sie keine Vertragsnummern, Fristen oder Daten; nutzen Sie [PLATZHALTER].
- Bei Arbeitsverträgen mit Aufhebungsvertrag-Angebot, Abfindung oder Wettbewerbsverbot, und bei Mietverträgen mit Kündigungsverzicht oder Staffelmiete empfehlen Sie eine Beratung vor dem Absenden.
{{> output/uncertainty}}
</constraints>

<output_format>
## Frist und Kündigungstermin
Rechnung und Ergebnis mit Prüfhinweis.

## Welche Form nötig ist
Zwei bis drei Zeilen.

## Ihr Kündigungsschreiben
Fertiger Text mit [PLATZHALTERN].

## So verschicken Sie es
Checkliste mit spätestem Absendedatum.

## Danach
Bestätigung, Lastschrift, Übergabe oder Arbeitsagentur, je nach Vertrag.
</output_format>
