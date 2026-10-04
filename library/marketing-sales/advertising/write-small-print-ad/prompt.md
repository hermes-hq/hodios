---
schema: 1
id: write-small-print-ad
kind: prompt
title: Write a small print ad
description: Writes a small display ad for a local paper, parish or school magazine, sports programme or directory, with one headline, one offer, contact and a trackable code, sized to the box with layout notes.
category: advertising
version: 1.0.0
status: incubating
stage: [build]
role: [founder, individual]
requires: [none]
inputs: [text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [print-ads, local-paper, community-magazine, offer-code, ad-layout]
pairs_with:
  prompts: [plan-local-advertising, write-outdoor-ad-copy]
  personas: [local-ads-advisor]
args:
  - name: business
    description: What you do, where, what makes you the one to call (years, reviews, guarantee, local), phone, website or address, opening hours, and any logo or photo you have.
    type: text
    required: true
  - name: ad_size
    description: The box you are buying, with its size and placement, for example "quarter page 90 x 130 mm, black and white, parish magazine" or "1/8 page, colour, football club programme".
    type: string
    required: true
  - name: offer
    description: A reason to call now, if you have one (for example "10% off first service", "free quote within 48 hours"). Optional; a suitable one is suggested if empty.
    type: text
output_contract:
  format: markdown
  sections: [Recommended ad, Layout notes, Alternative headlines, Plain-text version, Tracking]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a tradesperson, shop, restaurant or local service buying a small ad in a printed local publication. Readers glance at these boxes for a second or two, often among a dozen other ads, so the box must say what you do, for whom, and how to contact you, at a size readable by older eyes. Small print ads fail when they cram in every service, use a logo as the headline, set phone numbers in small type, rely on colour that the publication prints in black and white, and have no way to tell whether anyone responded. Small ads also sit there for weeks or months: the offer must still be valid at the end of the run.
</context>

<task>
<business>
{{business}}
</business>

Ad size and placement: {{ad_size}}
{{#offer}}
<offer>
{{offer}}
</offer>
{{/offer}}

1. If the business type, contact method or ad size is missing, ask in one message and stop.
2. Pick the one message for this readership (parish magazine readers differ from sports programme readers) and the one service or product to lead with.
3. Word budget by size: an eighth of a page or business-card box holds about 15 to 25 words; a quarter page about 30 to 50; a half page about 60 to 90. Stay inside it.
4. Write the ad: a headline of seven words or fewer naming the benefit or the problem solved; one to three supporting lines (proof such as years local or a review score supplied by the user); the offer with an end date or "while this ad runs"; the phone number largest after the headline; web or address; and a code or phrase to mention ("Mention PARISH10").
5. Layout notes: top-to-bottom order, relative type sizes, minimum type size for body text (about 9 to 10 pt for older readers), white space, whether a photo earns its space, and how it works in black and white.
6. Give three alternative headlines with different angles (problem, local trust, offer).
7. A plain-text version for directories or classifieds that print text only.
</task>

<constraints>
- Use only claims the user supplied; mark any detail to confirm as [CHECK]. No invented reviews, awards or years.
- No fake urgency; the offer must be honest and last the ad's run.
- Respect any rules the user mentions about the publication (no prices, charity or school guidelines); if it is a school or children's publication, keep the ad suitable for families.
- Check that the phone number and web address appear exactly as given.
</constraints>

<output_format>
## Recommended ad
The ad as it should read, line by line, with [Headline], [Body], [Offer], [Contact], [Code] labels.

## Layout notes
Short bullets.

## Alternative headlines
Three numbered options with their angle.

## Plain-text version
One block of text.

## Tracking
The code, how staff should record it, and how to judge whether to rebook the ad.
</output_format>
