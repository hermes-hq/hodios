---
schema: 1
id: proofread-print-piece-before-ordering
kind: prompt
title: Proofread a print piece before ordering
description: Proofreads short print pieces such as invitations, menus, flyers, signs and order-of-service cards for names, day-date matches, times, prices, phone numbers and web addresses before the print order.
category: editing
version: 1.0.0
status: incubating
stage: [verify]
role: [individual, parent, founder, marketer]
requires: [none]
inputs: [text, image]
output: [checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [invitations, flyers, menu-boards, print-proof, typos]
pairs_with:
  prompts: [proofread-text, check-for-unintended-meanings, run-final-proof-check]
args:
  - name: text
    description: Every word on the piece, front and back, as it will be printed, or a photo or proof image of it.
    type: text
    required: true
  - name: piece_type
    description: What it is, for example "wedding invitation", "café menu", "event flyer", "shop sign".
    type: string
    required: true
  - name: source_facts
    description: The facts the piece must match, typed from your own source, such as names, date and year, venue address, prices, phone, website. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Must fix before ordering, Check against your source, Looks right, Final sign-off]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Short print pieces fail on facts, not grammar. The typical reprint is caused by a weekday that does not match the date, a misspelled name of someone being honoured, a phone number with a digit missing, a web address that a reader cannot type, a price that differs from the till, or an RSVP date after the event. People proofread these by reading for sense, which is exactly how the brain skips errors in familiar words. Professional proofreaders check short pieces item by item against a source, read names and numbers character by character, and treat anything they cannot verify as a question for the owner. Once printed, a single error costs the whole run.

Piece: {{piece_type}}
{{#source_facts}}
<source_facts>
{{source_facts}}
</source_facts>
{{/source_facts}}
<piece>
{{text}}
</piece>
</context>

<task>
1. If the piece's text or image is missing, ask for it and stop. If an image is unreadable in places, list those places instead of guessing.
2. Build an inventory of every fact on the piece: names, dates, weekdays, times, venues and addresses, prices and currency, phone numbers, emails, web and social handles, dress codes, RSVP and booking details, allergen or dietary marks, legal lines.
3. Compare each fact with the source facts, character by character for names and numbers. Anything that differs is a must-fix.
4. Check internal logic: the weekday matches the date in the stated or assumed year (say the weekday you calculated and the year assumed), times use one format and have am/pm or 24-hour clarity, the RSVP or booking deadline comes before the event, prices for the same item agree, menu items marked as vegetarian or allergen-free do not list ingredients that contradict the mark.
5. Check that contact details are plausible: phone numbers have the right digit count for the country if known, emails contain one @ and a domain, web addresses have no spaces and will be typed easily (flag confusable characters such as l and 1).
6. Proofread the wording: spelling, apostrophes (plurals of names such as "the Smiths", not "the Smith's"), capitalisation, consistent punctuation, line breaks that split a name or number.
7. Flag missing essentials for this type of piece (for an invitation: who, what, when, where, how to reply; for a menu: prices and allergen notice where the user's region requires one, which you name as something to check locally).
</task>

<constraints>
- Never correct a name, number or address to what you think it should be. Report it as a question unless the source facts settle it.
- Do not rewrite the copy for style; suggest at most one wording change, only where meaning is unclear.
- Do not claim a phone number, address or website exists or works; you can only check form.
- Do not state local legal requirements as fact; say which ones to confirm.
</constraints>

<output_format>
## Must fix before ordering
Table: # | Where on the piece | Problem | Fix or question.
## Check against your source
Bullets: facts you could not verify, to read against the original yourself.
## Looks right
Bullets: facts checked and consistent.
## Final sign-off
A five-to-eight item checklist for the person ordering: read names and numbers aloud letter by letter, have a second person check, check the printer's proof at full size, confirm quantity and size, and so on.
</output_format>
