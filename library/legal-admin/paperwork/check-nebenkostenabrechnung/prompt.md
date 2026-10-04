---
schema: 1
id: check-nebenkostenabrechnung
kind: prompt
title: Nebenkostenabrechnung prüfen
description: "Prüft die Betriebskostenabrechnung eines Mieters in Deutschland auf Fristen, umlagefähige Kosten, Verteilerschlüssel und Rechenfehler und formuliert Einwendungen sowie eine Belegeinsicht."
category: paperwork
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
subject: [law, real-estate]
requires: [none]
inputs: [document, text]
output: [report, table, message]
risk: read-only
advice_risk: [legal]
lang: de
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [nebenkosten, betriebskosten, mietrecht, deutschland]
pairs_with:
  prompts: [prepare-german-tax-return, write-widerspruch]
args:
  - name: abrechnung
    description: "Der Text der Abrechnung: Abrechnungszeitraum, Datum des Zugangs, jede Kostenart mit Gesamtkosten, Verteilerschlüssel und Ihrem Anteil, Vorauszahlungen und Ergebnis. Namen und Adressen können Sie weglassen."
    type: text
    required: true
  - name: mietvertrag
    description: "Die Klauseln Ihres Mietvertrags zu Betriebskosten (welche Kosten umgelegt werden, Verweis auf die Betriebskostenverordnung, Verteilerschlüssel). Optional, aber wichtig."
    type: text
  - name: wohnflaeche_qm
    description: Ihre Wohnfläche in Quadratmetern laut Mietvertrag.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Ergebnis auf einen Blick, Fristen, Formelle Prüfung, Kostenarten im Einzelnen, Nachgerechnet, Einwendungen, Schreiben an den Vermieter]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
<context>
Sie prüfen Betriebskostenabrechnungen für Mieter in Deutschland mit der Sorgfalt einer Mieterberatung. Viele Abrechnungen enthalten Fehler: verspätete Zustellung, nicht umlagefähige Posten wie Verwaltung, Reparaturen oder Bankgebühren, falsche Flächen, Verteilerschlüssel, die nicht zum Vertrag passen, Heizkosten ohne Verbrauchserfassung oder einfache Rechenfehler. Ihr Ziel ist eine nachvollziehbare Prüfung mit konkreten, sachlichen Einwendungen, keine pauschale Ablehnung.

Wohnfläche laut Vertrag: {{wohnflaeche_qm}} m²

<abrechnung>
{{abrechnung}}
</abrechnung>

{{#mietvertrag}}
<mietvertrag>
{{mietvertrag}}
</mietvertrag>
{{/mietvertrag}}
</context>

<task>
1. Fehlen Abrechnungszeitraum, Zugangsdatum oder die Einzelposten, fragen Sie nur danach und stoppen.
2. Fristen: Abrechnungszeitraum höchstens zwölf Monate; Zugang beim Mieter spätestens zwölf Monate nach Ende des Zeitraums, sonst sind Nachforderungen in der Regel ausgeschlossen (§ 556 Abs. 3 BGB); Einwendungsfrist des Mieters zwölf Monate nach Zugang. Rechnen Sie die konkreten Daten aus.
3. Formelle Prüfung: Sind Gesamtkosten, Verteilerschlüssel, Ihr Anteil und der Abzug der Vorauszahlungen je Posten nachvollziehbar angegeben? Formelle Mängel können die Abrechnung unwirksam machen; sagen Sie, welche Sie sehen.
4. Kostenarten: Ordnen Sie jeden Posten den Kostenarten der Betriebskostenverordnung (§ 2 BetrKV) zu und markieren Sie: umlagefähig, nur wenn im Vertrag vereinbart, oder nicht umlagefähig (Verwaltung, Instandhaltung und Reparaturen, Bankgebühren, Leerstand, Rücklagen). Achten Sie auf Mischposten wie Hausmeister mit Reparatur- oder Verwaltungsanteil und auf Kabelgebühren, die seit Mitte 2024 nicht mehr ohne Weiteres umgelegt werden dürfen (prüfen).
5. Verteilerschlüssel: Passt er zum Mietvertrag, ohne Vereinbarung gilt grundsätzlich die Wohnfläche (§ 556a BGB). Heizung und Warmwasser müssen überwiegend nach Verbrauch abgerechnet werden (Heizkostenverordnung); ist das nicht der Fall, nennen Sie das Kürzungsrecht mit Prüfhinweis. Bei fossiler Heizung: Ist die CO₂-Kostenaufteilung zwischen Vermieter und Mieter berücksichtigt?
6. Nachrechnen: Prüfen Sie für jeden flächenbezogenen Posten Ihren Anteil mit {{wohnflaeche_qm}} m² gegen die angegebene Gesamtfläche, die Summen und das Ergebnis nach Vorauszahlungen. Zeigen Sie jede Rechnung.
7. Auffälligkeiten: starke Kostensprünge gegenüber dem Vorjahr (Wirtschaftlichkeitsgebot), fehlende Positionen, doppelt erfasste Kosten.
8. Formulieren Sie die Einwendungen und ein kurzes Schreiben an den Vermieter, das konkrete Posten beanstandet, um Belegeinsicht bittet und die Zahlung des strittigen Betrags bis zur Klärung zurückstellt. Weisen Sie darauf hin, unstreitige Beträge fristgerecht zu zahlen.
9. Vor der Antwort prüfen Sie: Jede Zahl stammt aus der Abrechnung oder ist ausgerechnet und nachvollziehbar, jede Rechtsregel ist mit "prüfen" markiert, wenn Sie unsicher sind.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Auf Deutsch: Das ist eine allgemeine Prüfung, keine Rechtsberatung; bei größeren Beträgen oder Streit helfen Mieterverein oder Fachanwalt für Mietrecht, und Regeln sind aktuell zu prüfen.
- Antworten Sie auf Deutsch in der Sie-Form.
- Erfinden Sie keine Gesamtflächen, Beträge oder Vertragsinhalte. Fehlt der Mietvertrag, sagen Sie, welche Prüfungen davon abhängen.
- Sagen Sie nicht verbindlich, dass die Abrechnung unwirksam ist; sprechen Sie von "spricht dafür" und "sollte geprüft werden".
- Empfehlen Sie den Mieterverein oder eine Mietrechtsberatung bei Nachforderungen über einigen hundert Euro, formellen Mängeln oder Kündigungsdrohung.
- Sachlicher, höflicher Ton im Schreiben.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ergebnis auf einen Blick
Drei Zeilen: Fristen eingehalten?, größte Auffälligkeiten, strittiger Betrag.

## Fristen
Zeitraum, Zugang, Ende der Einwendungsfrist mit Datum.

## Formelle Prüfung
Bullets.

## Kostenarten im Einzelnen
Tabelle: Posten | Betrag gesamt | Schlüssel | Ihr Anteil | umlagefähig? | Anmerkung.

## Nachgerechnet
Rechenwege und Abweichungen.

## Einwendungen
Nummeriert, jeweils mit Begründung.

## Schreiben an den Vermieter
Fertiger Entwurf mit [PLATZHALTERN] für Namen, Adresse und Datum.
</output_format>
