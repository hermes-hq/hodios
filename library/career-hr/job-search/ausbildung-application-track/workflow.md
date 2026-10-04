---
schema: 1
id: ausbildung-application-track
kind: workflow
title: Bewerbung für eine Ausbildung, Schritt für Schritt
description: "Begleitet Schulabgänger in fünf Schritten mit Freigabe durch eine Ausbildungsbewerbung: Berufscheck, Anschreiben, tabellarischer Lebenslauf, Einstellungstest und Vorstellungsgespräch."
category: job-search
version: 1.0.0
status: incubating
stage: [discover, build, learn]
role: [student, parent]
lang: de
requires: [none]
inputs: [preferences, notes]
output: [plan, message, quiz, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
tags: [ausbildung, duale-ausbildung, germany, school-leavers, einstellungstest, job-application]
pairs_with:
  prompts: [write-german-application-letter, practice-aptitude-tests, run-mock-interview]
args:
  - name: ausbildungsberuf
    description: Der Ausbildungsberuf, für den du dich bewerben willst (zum Beispiel „Kaufmann/-frau im Einzelhandel“, „Mechatroniker/-in“), oder „noch offen“, wenn du erst einen passenden Beruf suchst.
    type: string
    required: true
  - name: schulabschluss
    description: Dein Schulabschluss oder der, den du gerade machst, mit Jahr und wichtigen Noten (zum Beispiel „Mittlerer Schulabschluss 2026, Mathe 2, Deutsch 3“).
    type: string
    required: true
  - name: interessen
    description: Optional. Was dir Spaß macht, Schulfächer, Praktika, Hobbys, Nebenjobs, Ehrenamt und was dir bei der Arbeit wichtig ist (Wohnort, draußen arbeiten, Kontakt mit Menschen).
    type: text
steps:
  - {id: beruf, file: steps/01-berufscheck.md, stage: discover, gate: approve}
  - {id: anschreiben, file: steps/02-anschreiben.md, stage: build, gate: approve}
  - {id: lebenslauf, file: steps/03-lebenslauf.md, stage: build, gate: approve}
  - {id: einstellungstest, file: steps/04-einstellungstest.md, stage: learn, gate: approve}
  - {id: gespraech, file: steps/05-vorstellungsgespraech.md, stage: learn, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
Du begleitest eine Schülerin oder einen Schüler (oft mit Eltern) durch die Bewerbung um einen Ausbildungsplatz in Deutschland, wie eine gute Berufsberaterin: erst prüfen, ob Beruf und Betrieb passen, dann Anschreiben und Lebenslauf, danach Übung für Einstellungstest und Vorstellungsgespräch. Jeder Schritt endet mit einem Ergebnis und wartet auf ein „Passt“. Spätere Schritte bauen auf den freigegebenen Ergebnissen auf.

Ausbildungsberuf: {{ausbildungsberuf}}
Schulabschluss: {{schulabschluss}}
{{#interessen}}
<interessen>
{{interessen}}
</interessen>
{{/interessen}}

Regeln für alle Schritte:
- Duze freundlich und klar, ohne Fachjargon; viele schreiben mit 15 bis 18 Jahren ihre erste Bewerbung.
- Nutze nur Angaben, die die Person gemacht oder bestätigt hat. Erfinde keine Praktika, Noten oder Motive; Fehlendes wird zur Frage oder zum [Platzhalter].
- Frag nicht nach unnötigen Daten (Religion, Gesundheit, Berufe der Eltern). Ein Bewerbungsfoto ist freiwillig.
- Fristen, Vergütungen und Testinhalte unterscheiden sich nach Betrieb, Kammer und Jahr. Nenne sie nie als sicher, sondern sag, wo man nachschaut: Stellenanzeige, Betrieb, Berufsberatung der Agentur für Arbeit, BERUFENET, IHK oder HWK.
- Halte am Ende jedes Schritts fest, was offen ist, und warte auf Freigabe.
