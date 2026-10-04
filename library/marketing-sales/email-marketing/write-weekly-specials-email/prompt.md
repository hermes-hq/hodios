---
schema: 1
id: write-weekly-specials-email
kind: prompt
title: Write a weekly specials email
description: Writes a restaurant, cafe or deli's weekly specials email that fits one phone screen, with events, one booking or order button, allergen notes from supplied data only and a reusable template.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, individual]
subject: [hospitality]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: beginner
tags: [restaurant, weekly-specials, menu-copy, allergens, email-template]
pairs_with:
  prompts: [write-promo-email, write-market-day-email, announce-last-minute-openings]
args:
  - name: specials
    description: This week's specials with prices, any events (live music, tasting night), opening hours changes, and allergen or dietary information exactly as your kitchen records it. Rough notes are fine.
    type: text
    required: true
  - name: booking_link
    description: The booking or ordering link or phone number for the button. Optional; a placeholder is used if missing.
    type: string
  - name: tone
    description: How the email should sound - warm (friendly neighbourhood place), playful (jokes and personality) or refined (calm, chef-led, minimal).
    type: enum
    enum: [warm, playful, refined]
    default: warm
output_contract:
  format: markdown
  sections: [Subject lines, Email, Template for next week, Checks before sending]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the weekly email for a restaurant, cafe, deli or bakery. Regulars read it on a phone, often in the hour before deciding where to eat, so it has to work in one screen: what is special this week, when, and one button to book or order. Three mistakes are common: a long newsletter where the specials sink below the fold; mouth-watering descriptions that drift from what the kitchen actually serves; and allergen or dietary claims ("gluten-free", "vegan") written by the copywriter rather than taken from the kitchen's records, which is a safety problem, not a style one.

Tone: {{tone}}
</context>

<task>
<specials>
{{specials}}
</specials>

{{#booking_link}}Booking or order link: {{booking_link}}{{/booking_link}}

1. Pick the lead: the one special or event most likely to make a regular book this week (new, seasonal or limited). The subject line names it.
2. Write three subject lines under 45 characters each, plus a preheader that adds the day or price.
3. Write the email in this order, 90-160 words of body in total:
   - one-line greeting in the chosen tone;
   - the lead special: name, a 12-20 word description using only ingredients and methods from the notes, price;
   - two to four other specials or events as a short list (name, one line, price, day);
   - opening hours changes, if any;
   - one button with a verb ("Book a table", "Order for pickup") linking to the booking link, or [BOOKING LINK];
   - allergen line: dietary tags only where the notes state them, plus "Ask us about allergens before you order".
4. Write the template: the same structure with square-bracket fields ([LEAD SPECIAL], [PRICE], [DAY]) and a 2-minute fill-in guide so the owner can reuse it each week.
5. List the checks before sending.
</task>

<constraints>
- Never add or infer allergen, dietary or sourcing claims (vegan, gluten-free, nut-free, organic, local) that are not in the notes; if notes are unclear, write [CHECK WITH KITCHEN].
- Keep prices, dates and times exactly as given; if a price or day is missing, mark it [NEEDED: ...] rather than guessing.
- One call to action only; no second competing button.
- No invented reviews, awards, chef quotes or "selling fast" claims.
- If there are no specials or events in the notes, ask what is new this week and stop.
</constraints>

<output_format>
## Subject lines
Three numbered options and one preheader.

## Email
The ready-to-paste email with the button text shown as [Button: text -> link].

## Template for next week
The bracketed template, then the fill-in guide as three to five bullets.

## Checks before sending
Checklist: prices, days, allergen tags against the kitchen sheet, link works on a phone, unsubscribe link and business address in the footer.
</output_format>
