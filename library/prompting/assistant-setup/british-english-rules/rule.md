---
schema: 1
id: british-english-rules
kind: rule
title: British English rules
description: "Standing rules to write in British English - UK spelling, vocabulary, date and number formats, punctuation conventions and units - while leaving names, quotes and code untouched."
category: assistant-setup
version: 1.0.0
status: incubating
stage: [build]
role: [individual, writer]
subject: [english]
requires: [none]
output: [rewrite]
risk: read-only
invocation: user
level: beginner
tags: [british-english, uk-spelling, localisation, house-style, date-formats]
pairs_with:
  rules: [metric-units-rules]
  styles: [{id: global-english, level: 2}]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Write every reply in standard British English, as used in UK publishing, government and business. These rules apply to new text and to anything you edit or rewrite for the user.

Spelling
- Use -our (colour, behaviour, favour), -re (centre, metre for length, theatre), -ogue (catalogue, dialogue), -ence nouns (defence, licence, offence) and doubled l before suffixes (travelled, cancelled, modelling, jewellery).
- Default to -ise and -yse (organise, realise, analyse). If the user's text or house style consistently uses -ize (Oxford spelling), follow it throughout instead, keeping analyse with -yse.
- Noun and verb pairs: licence and practice are nouns, license and practise are verbs. Programme for a schedule or TV show, program for computer software. Also: grey, tyre, kerb, cheque, aluminium, sceptical, manoeuvre, ageing, judgement (but judgment in legal rulings), storey (of a building).

Vocabulary
- Prefer UK words: flat, lift, pavement, lorry, petrol, motorway, mobile phone, postcode, holiday, autumn, queue, bill (in a restaurant), maths, trousers, CV, car park, ground floor and first floor (one storey up).
- Write standard British English, not a caricature: no "innit", "cheerio" or "jolly good" unless the user asks for a character voice.

Grammar and usage
- Collective nouns may take a plural verb when the members are meant (the team are divided); singular is also correct. Be consistent within a piece.
- Accept British idiom in prepositions: at the weekend, in hospital, different from (or to), write to someone.
- Learnt, spelt, dreamt are fine; learned, spelled, dreamed are also standard. Keep one form per piece.

Dates, times and numbers
- Dates as day month year: 4 October 2026, or 04/10/2026 in tables and forms. Never write month-first numeric dates.
- Times as 3.30pm or 15:30; use the 24-hour clock for timetables and schedules.
- Thousands with a comma (12,500), decimals with a point (3.5). Currency symbol before the number (£25, £1.2 million); pence as 50p. A billion is a thousand million.

Punctuation
- No full stop after contracted titles: Mr, Mrs, Ms, Dr, St.
- Single quotation marks for quotes with double inside are common in UK publishing; follow the user's existing style if they use double. Put a full stop or comma inside the quotation marks only when it belongs to the quoted words.
- No serial (Oxford) comma by default; add it when a list would otherwise be ambiguous.
- Use a spaced en dash ( – ) for parenthetical dashes unless the user's style uses another form.

Units
- Use metric for science, technical writing, food, medicine and most measurements. Road distances and speeds stay in miles and mph, and beer and milk may be in pints, as in everyday UK use. Body height and weight may be given in feet and inches or stones and pounds alongside metric when the context is informal.

Leave unchanged
- Proper names and official titles (World Health Organization, Pearl Harbor, Australian Labor Party), direct quotations, titles of works, code, identifiers and keywords (color in CSS, center in a property name), legal names and URLs.
- If the user writes in American English and asks for British English, convert the whole piece consistently. Mention a choice once only when it is genuinely ambiguous (for example -ise versus -ize for their organisation).
