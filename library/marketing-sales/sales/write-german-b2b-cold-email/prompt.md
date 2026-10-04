---
schema: 1
id: write-german-b2b-cold-email
kind: prompt
title: B2B-Kaltakquise per E-Mail
description: "Schreibt eine deutsche B2B-Erstansprache per E-Mail mit zwei Follow-ups: sachlich, passend förmlich, mit relevantem Aufhänger, Beleg und unverbindlicher Frage, plus UWG- und DSGVO-Punkte zur Prüfung."
category: sales
version: 1.0.0
status: incubating
lang: de
stage: [build]
role: [sales-rep, founder]
requires: [none]
inputs: [text, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [cold-email, b2b-outreach, follow-up, germany]
pairs_with:
  prompts: [write-cold-outreach, write-outbound-sequence]
args:
  - name: zielkunde
    description: Wen Sie ansprechen. Unternehmen, Branche, Größe, Name und Rolle der Ansprechperson, und ein konkreter, überprüfbarer Anlass (Stellenanzeige, Pressemitteilung, Messeauftritt, Gesetzesänderung, die die Branche trifft).
    type: text
    required: true
  - name: angebot
    description: Was Sie anbieten, welches Problem es löst und welche Belege Sie haben (Referenzkunden mit Freigabe, Kennzahlen, Zertifizierungen). Dazu Ihre Firmendaten für die Signatur.
    type: text
    required: true
  - name: ansprache
    description: Sie oder Du. In deutschen B2B-Erstkontakten ist Sie der Standard; Du nur, wenn die Branche oder die Zielfirma es erkennbar pflegt (etwa manche Start-ups und Agenturen).
    type: enum
    enum: [Sie, Du]
    default: Sie
  - name: kontaktgrundlage
    description: Woher der Kontakt stammt. kalt = keine Beziehung und keine Einwilligung; messe = persönliches Gespräch oder Visitenkarte; empfehlung = Empfehlung durch eine Person; bestandskunde = bestehende Geschäftsbeziehung; einwilligung = ausdrückliche Zustimmung zu E-Mails.
    type: enum
    enum: [kalt, messe, empfehlung, bestandskunde, einwilligung]
    default: kalt
output_contract:
  format: markdown
  sections: [Rechtlicher Hinweis zuerst, Erst-E-Mail, Follow-up 1, Follow-up 2, Signatur, Prüfliste vor dem Versand, Fehlende Angaben]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "Erste Version."}
---
<context>
Sie schreiben Akquise-E-Mails für Vertriebsteams und Gründer, die deutsche Unternehmen ansprechen. Deutsche Entscheiderinnen und Entscheider erwarten Sachlichkeit: einen klaren Grund, warum gerade sie angeschrieben werden, einen nachvollziehbaren Nutzen, Belege statt Superlative und eine Frage, die man leicht beantworten kann. Übertriebene Vertrautheit, Druck und Marketingsprache ("revolutionär", "einzigartig", "nur heute") wirken unseriös. Kurz heißt hier nicht salopp: korrekte Anrede, vollständige Sätze, ordentliche Signatur.

Rechtlicher Rahmen, den Sie immer ansprechen (ohne Rechtsberatung zu geben):
- Werbe-E-Mails ohne vorherige ausdrückliche Einwilligung sind in Deutschland nach § 7 UWG grundsätzlich unzulässig, auch gegenüber Unternehmen. Die "mutmaßliche Einwilligung" im B2B-Bereich gilt für Telefonanrufe, nicht für E-Mails. Abmahnungen sind ein reales Risiko.
- Bei Bestandskunden gibt es eine enge Ausnahme (§ 7 Abs. 3 UWG: eigene ähnliche Waren oder Dienstleistungen, E-Mail-Adresse aus einem Verkauf, Hinweis auf Widerspruchsrecht).
- Die DSGVO verlangt eine Rechtsgrundlage für die Verarbeitung der Kontaktdaten, Informationen nach Art. 14 bei nicht direkt erhobenen Daten und eine einfache Widerspruchsmöglichkeit.
- Geschäftliche E-Mails brauchen die Pflichtangaben in der Signatur (bei einer GmbH etwa Firma, Rechtsform, Sitz, Registergericht, Registernummer, Geschäftsführung).
Bei kontaktgrundlage "kalt" weisen Sie deshalb zuerst auf das Risiko hin und schlagen zulässige Wege vor (Anruf im B2B-Bereich mit mutmaßlichem Interesse, Nachricht in einem beruflichen Netzwerk, Empfehlung, Kontakt auf einer Messe). Die Texte schreiben Sie trotzdem so, dass sie für diese Wege oder nach einer Einwilligung nutzbar sind.
</context>

<task>
Schreiben Sie die Erstansprache und zwei Follow-ups.

<zielkunde>
{{zielkunde}}
</zielkunde>

<angebot>
{{angebot}}
</angebot>

Anrede: {{ansprache}}
Kontaktgrundlage: {{kontaktgrundlage}}

1. Fehlen Rolle der Ansprechperson, ein konkreter Anlass oder der Nutzen des Angebots, fragen Sie in einer Nachricht danach und hören Sie dort auf.
2. Schreiben Sie den rechtlichen Hinweis passend zur Kontaktgrundlage: bei "kalt" deutlich und mit Alternativen, bei "bestandskunde" mit den Bedingungen der Ausnahme, bei "einwilligung", "messe" oder "empfehlung" kurz mit dem, was zu dokumentieren ist.
3. Schreiben Sie die Erst-E-Mail: zwei Betreffzeilen zur Auswahl (sachlich, konkret, ohne Clickbait), Anrede in der Form {{ansprache}}, ein Einstieg über den Anlass, ein Satz zum Problem aus Sicht des Empfängers, ein Satz zum Angebot mit einem Beleg, eine leichte Frage als Abschluss (etwa ein 15-minütiges Gespräch oder eine kurze Rückmeldung, ob das Thema relevant ist), ein Satz zum Widerspruch.
4. Schreiben Sie Follow-up 1 (nach etwa fünf Werktagen) mit einem neuen Aspekt statt "Ich wollte nur nachhaken" und Follow-up 2 (nach etwa zwei Wochen) als höflichen Abschluss, der die Tür offen lässt.
5. Schreiben Sie die Signatur mit Platzhaltern für alle Pflichtangaben, die im Angebot fehlen.
6. Prüfen Sie vor der Ausgabe: Jede Behauptung ist durch das Angebot gedeckt, keine Superlative, die Anrede ist durchgehend {{ansprache}}, die Erst-E-Mail passt auf einen Bildschirm.
</task>

<constraints>
- Keine erfundenen Referenzkunden, Zahlen oder Auszeichnungen. Referenzen nur, wenn im Angebot steht, dass sie genannt werden dürfen.
- Keine Scheinvertraulichkeit ("Wie besprochen", "Re:" im Betreff), wenn es kein Gespräch gab.
- Keine künstliche Dringlichkeit und keine Rabatte mit Frist.
- Bei "Sie": "Sehr geehrte Frau Dr. Name" oder "Guten Tag Frau Name"; Titel übernehmen, wenn bekannt. Bei "Du": freundlich, aber nicht kumpelhaft.
- Kein Rechtsgutachten: Sie nennen die Prüfpunkte und empfehlen bei Unsicherheit eine anwaltliche Prüfung.
</constraints>

<output_format>
## Rechtlicher Hinweis zuerst
Zwei bis fünf Sätze zur Kontaktgrundlage und, falls nötig, zulässige Alternativen.

## Erst-E-Mail
Zwei Betreffzeilen, dann der Text.

## Follow-up 1
Betreff und Text, mit empfohlenem Versandzeitpunkt.

## Follow-up 2
Betreff und Text, mit empfohlenem Versandzeitpunkt.

## Signatur
Signatur mit Platzhaltern in [eckigen Klammern].

## Prüfliste vor dem Versand
Punkte zu Einwilligung, Datenherkunft, Widerspruch, Pflichtangaben und Belegen.

## Fehlende Angaben
Was noch fehlt. "Keine", wenn vollständig.
</output_format>
