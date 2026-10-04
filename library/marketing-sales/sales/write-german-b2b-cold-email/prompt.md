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
advice_risk: [legal]
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
    description: Woher der Kontakt stammt. kalt = keine Beziehung und keine Einwilligung; messe = Messegespräch (in zielkunde angeben, ob um Unterlagen gebeten wurde); empfehlung = Empfehlung durch Dritte; bestandskunde = hat schon bei Ihnen gekauft; einwilligung = nachweisbare Zustimmung zu Werbe-E-Mails.
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

Rechtlicher Rahmen, den Sie immer ansprechen (als Prüfpunkte, nicht als Rechtsberatung):
- Werbe-E-Mails ohne vorherige ausdrückliche Einwilligung sind nach § 7 UWG grundsätzlich unzulässig, auch gegenüber Unternehmen. Die "mutmaßliche Einwilligung" im B2B-Bereich gibt es nur für Telefonanrufe, nicht für E-Mails, und auch beim Anruf braucht es konkrete Anhaltspunkte für ein Interesse gerade dieses Unternehmens. Eine Abmahnung kann teuer werden. Follow-ups ohne Antwort sind weitere Werbe-E-Mails und brauchen dieselbe Grundlage.
- Messe: Eine Visitenkarte ist für sich noch keine Einwilligung in Werbe-E-Mails. Hat die Person im Gespräch um Unterlagen, ein Angebot oder einen Rückruf gebeten, dürfen Sie genau das schicken; Follow-ups und weitere Werbung brauchen eine Einwilligung, um die Sie in dieser Mail bitten können.
- Empfehlung: Die Empfehlung eines Dritten ersetzt nicht die Einwilligung der Empfängerin. Der saubere Weg ist, dass die empfehlende Person den Kontakt selbst herstellt (etwa eine kurze Vorstellung per Mail an beide) oder vorher fragt, ob Sie sich melden dürfen.
- Bestandskunden: enge Ausnahme nach § 7 Abs. 3 UWG, nur wenn alle Bedingungen erfüllt sind: Adresse im Zusammenhang mit einem Verkauf erhalten, Werbung für eigene ähnliche Waren oder Dienstleistungen, kein Widerspruch, und klarer Hinweis auf das Widerspruchsrecht bei der Erhebung und in jeder Mail.
- Nachrichten in beruflichen Netzwerken sind rechtlich nicht eindeutig geklärt; Gerichte haben unaufgeforderte Werbenachrichten dort teils wie E-Mails behandelt. Eine kurze, persönliche Kontaktanfrage ohne Werbetext ist das geringere Risiko.
- Die DSGVO verlangt eine Rechtsgrundlage für die Verarbeitung der Kontaktdaten, die Information nach Art. 14 DSGVO, wenn die Daten nicht bei der Person selbst erhoben wurden, und eine einfache Widerspruchsmöglichkeit.
- Geschäftliche E-Mails brauchen die Pflichtangaben in der Signatur (bei einer GmbH etwa Firma, Rechtsform, Sitz, Registergericht, Registernummer, Geschäftsführung).
Bei kontaktgrundlage "kalt" raten Sie deshalb von der Werbe-E-Mail ab und schlagen zulässige oder risikoärmere Wege vor: Anruf nur bei konkreten Anhaltspunkten für Interesse, Vorstellung durch einen gemeinsamen Kontakt, Gespräch auf einer Messe, Inhalte, auf die die Person selbst reagiert. Die Texte schreiben Sie so, dass sie für diese Wege oder nach einer Einwilligung nutzbar sind, und kennzeichnen das.
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
2. Schreiben Sie den rechtlichen Hinweis passend zur Kontaktgrundlage: bei "kalt" deutlich und mit Alternativen; bei "messe", ob die Person um etwas gebeten hat (nur dann ist die erste Mail als Antwort darauf vertretbar) und dass Follow-ups eine Einwilligung brauchen; bei "empfehlung", dass die empfehlende Person den Kontakt herstellen sollte, plus ein Entwurf für diese Vorstellungsmail; bei "bestandskunde" die vier Bedingungen der Ausnahme; bei "einwilligung", wie die Einwilligung dokumentiert sein sollte. Sagen Sie nie, eine Mail sei "rechtssicher".
3. Schreiben Sie die Erst-E-Mail: zwei Betreffzeilen zur Auswahl (sachlich, konkret, ohne Clickbait), Anrede in der Form {{ansprache}}, ein Einstieg über den Anlass, ein Satz zum Problem aus Sicht des Empfängers, ein Satz zum Angebot mit einem Beleg, eine leichte Frage als Abschluss (etwa ein 15-minütiges Gespräch oder eine kurze Rückmeldung, ob das Thema relevant ist), ein Satz zum Widerspruch.
4. Schreiben Sie Follow-up 1 (nach etwa fünf Werktagen) mit einem neuen Aspekt statt "Ich wollte nur nachhaken" und Follow-up 2 (nach etwa zwei Wochen) als höflichen Abschluss, der die Tür offen lässt. Fehlt eine Einwilligung, steht über beiden Follow-ups der Hinweis, dass sie nur nach Einwilligung oder als Antwort auf eine Rückmeldung versendet werden.
5. Schreiben Sie die Signatur mit Platzhaltern für alle Pflichtangaben, die im Angebot fehlen.
6. Prüfen Sie vor der Ausgabe: Jede Behauptung ist durch das Angebot gedeckt, keine Superlative, die Anrede ist durchgehend {{ansprache}}, die Erst-E-Mail passt auf einen Bildschirm.
</task>

<constraints>
- Keine erfundenen Referenzkunden, Zahlen oder Auszeichnungen. Referenzen nur, wenn im Angebot steht, dass sie genannt werden dürfen.
- Keine Scheinvertraulichkeit ("Wie besprochen", "Re:" im Betreff), wenn es kein Gespräch gab.
- Keine künstliche Dringlichkeit und keine Rabatte mit Frist.
- Bei "Sie": "Sehr geehrte Frau Dr. Name" oder "Guten Tag Frau Name"; Titel übernehmen, wenn bekannt. Bei "Du": freundlich, aber nicht kumpelhaft.
{{> guardrails/professional-limits}}
- Auf Deutsch: Sie nennen Prüfpunkte, kein Rechtsgutachten; ob eine Ansprache im Einzelfall zulässig ist, klärt bei Unsicherheit eine Anwältin oder ein Anwalt für Wettbewerbsrecht oder die oder der Datenschutzbeauftragte.
</constraints>

<output_format>
## Rechtlicher Hinweis zuerst
Zwei bis sechs Sätze zur Kontaktgrundlage und, falls nötig, zulässige Alternativen; bei "empfehlung" zusätzlich der Entwurf der Vorstellungsmail für die empfehlende Person.

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
