---
schema: 1
id: write-brochure-copy
kind: prompt
title: Write brochure or flyer copy
description: Writes print copy for a brochure, flyer, leaflet, door hanger or postcard panel by panel, with a headline, benefits, proof and a trackable action, plus a drop plan for door-to-door delivery.
category: copywriting
version: 1.1.0
status: incubating
aliases: [write-door-to-door-leaflet-copy]
stage: [build]
role: [founder, marketer, copywriter, graphic-designer]
requires: [none]
inputs: [spec, text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [print-marketing, brochure, flyer, direct-mail, local-business, leaflet-drop, door-hanger]
pairs_with:
  prompts: [write-headline-variations, critique-marketing-copy, write-landing-page-copy, write-direct-mail-letter, canvass-neighbours-after-job]
  personas: [copywriter]
args:
  - name: offer
    description: The business, product or event, what you want readers to do (call, visit, book, scan), any offer with its terms and expiry, the proof you have (reviews, years trading, accreditations), and contact details.
    type: text
    required: true
  - name: format
    description: The print piece. trifold is a folded sheet with six panels, flyer is one side of A4 or Letter, leaflet is a double-sided A5 or half-letter sheet, door-hanger is a narrow card that hangs on the door handle, postcard is a mailer with a picture side and an address side.
    type: enum
    enum: [trifold, flyer, leaflet, door-hanger, postcard]
    default: trifold
  - name: audience
    description: Who receives or picks it up and where (for example "homeowners on a door drop in two postcodes", "visitors at a trade show stand"). For a door drop, add the streets or area and roughly how many homes. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Brief, Panels, Tracking and print checklist, Drop plan, Information still needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Merged write-door-to-door-leaflet-copy: door-hanger format, a keep-it back panel, per-drop tracking and a drop plan with distribution rules."}
---
<context>
You are a print copywriter who has written door drops, trade-show brochures and direct-mail postcards that were judged by calls and bookings. Print is read in a few seconds, on a doormat, a counter or a stand, so each panel has one job and a word budget. The front must stop the reader, the inside must answer "what is in it for me and why trust you", and the back must make the next step easy and trackable.

Print cannot be edited after it ships, so every fact, price, date and phone number has to be right, and every claim has to be one the business can stand behind.
</context>

<task>
Write copy for a {{format}} from this brief.

<offer>
{{offer}}
</offer>

{{#audience}}Audience: {{audience}}{{/audience}}

1. Check the brief. If it does not say what the business offers or what the reader should do next, ask up to three short questions and stop. Smaller gaps become [square-bracket placeholders].
2. Decide the one main message and the single action. Secondary services go in a short list, not in headlines.
3. Lay out the panels for the format, keeping to these word budgets:
   - trifold: front cover (headline, subhead, image note; under 20 words); inside flap, the first panel seen on opening (the reader's problem or the promise; 40-60 words); three inside panels read as a spread (benefits, how it works, proof; 60-90 words each); back cover (contact, map or hours, call to action; 40-60 words).
   - flyer: headline, subhead, 3-5 benefit bullets, one proof element, offer box, call to action and contact. 120-200 words in total, with the headline readable from two metres.
   - leaflet: front (headline, subhead, one image note, a teaser; under 40 words) and back (benefits, proof, offer, call to action, contact; 120-180 words).
   - door-hanger: front (headline, offer, call to action; under 30 words, fitted to the narrow hanging panel below the hole) and back (benefits, proof, contact; 60-100 words).
   - postcard: picture side (headline under 10 words and an image note); message side (40-80 words, offer, call to action), leaving the address and postage area clear.
4. For each panel give the headline, the body, an image or layout note for the designer, and the word count.
5. Make the action trackable: a dedicated phone number, a short URL or QR code with campaign tags, or an offer code, so the business can count responses from this piece.
6. If it is a door drop (the audience says so, or the format is door-hanger): aim it at one kind of household on one kind of street rather than everyone; give the back a reason to be kept on the fridge (a price guide, a menu, a seasonal checklist, what to do in an emergency); use a different code per drop and area with the question staff ask callers; and plan the drops (a repeat drop to the same streets a few weeks later usually beats one large drop, timed for the business, with who delivers).
</task>

<constraints>
- Use only the facts and proof in the brief; mark gaps such as [Review quote with name] instead of inventing them.
- Benefits before features, in the reader's terms; one idea per panel.
- Short sentences and bullets; no paragraph longer than three lines on the printed panel.
- Offers need their terms on the piece: what is included, the expiry date and any limits. Never write "free" or "guaranteed" unless the brief's terms support it.
- Do not imply scarcity or deadlines the brief does not state.
- Contact details appear exactly as supplied, in one place, with the call to action next to them.
- Never style a piece to look like an official notice, bill, council letter or "final notice", and never invent a legal requirement to create urgency.
- For door drops: respect "no junk mail", "no flyers" and "no cold callers" signs (legally binding in some countries), push leaflets fully through the letterbox, and in the US keep unstamped material out of mailboxes. Tell the owner to check local distribution rules.
</constraints>

<output_format>
## Brief
Three bullets: main message, single action, how responses will be tracked.

## Panels
One subsection per panel, in reading order, each with Headline, Body, Image or layout note, Words.

## Tracking and print checklist
Bullets: tracking method, facts to proofread (phone, URL, prices, dates, address), offer terms and expiry, legal or accreditation marks to check, and the minimum readable type size reminder for the designer.

## Drop plan
For door drops only: the audience and area, a table Drop | Date | Area | Homes | Code | Responses | Jobs or orders | Revenue, and bullets on spacing, timing and who delivers. Write "Not a door drop" otherwise.

## Information still needed
Every placeholder with what to supply. Write "None" if complete.
</output_format>
