---
schema: 1
id: design-attribution-survey
kind: prompt
title: Design a how-did-you-hear survey
description: Designs a "how did you hear about us" question for checkout, booking or phone intake, with answer options that match real channels, staff phrasing and a monthly tally to compare with platform numbers.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [design, operate]
role: [founder, marketer, operations-manager]
requires: [none]
inputs: [text]
output: [questions, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [self-reported-attribution, how-did-you-hear, intake-form, marketing-measurement, tally-sheet]
pairs_with:
  prompts: [choose-marketing-channels, measure-brand-awareness, plan-local-advertising, plan-weekly-promotion-routine]
args:
  - name: business
    description: What you sell and how customers buy or book (walk-in, phone, online booking, checkout, enquiry form).
    type: text
    required: true
  - name: channels
    description: Every way you market or get found now (Google search and maps, social accounts, ads, flyers, signs, directories, referrals, events, partners, press).
    type: text
    required: true
  - name: capture_points
    description: Where the question can be asked (online checkout, booking form, phone call, till, first appointment form). Optional.
    type: string
output_contract:
  format: markdown
  sections: [The question, Answer options, Where and how to ask, Tally sheet, Reading the results]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small businesses learn where customers really come from by asking them. Platform dashboards claim credit for the same customer several times and miss word of mouth, signs and offline ads entirely; one well-asked question at the right moment fills that gap cheaply. It goes wrong when the options use marketing words customers do not recognise ("organic search", "paid social"), when "Google" hides the difference between an ad, a search result and the map, when there is no open-text or "don't remember" option so people pick anything, and when staff ask it inconsistently or answers sit in notebooks nobody totals. Self-reported answers have their own bias: people remember the last or most memorable touch, so the tally is compared with platform numbers rather than trusted alone.
</context>

<task>
<business>
{{business}}
</business>

<channels>
{{channels}}
</channels>

{{#capture_points}}Capture points: {{capture_points}}{{/capture_points}}

1. If you do not know how customers buy or book, or which channels are in use, ask and stop.
2. Write the question in customer words, one version per capture point (form label, spoken phrasing for phone or till). Keep it optional and quick.
3. Write answer options: one per real channel in the customer's words ("Searched on Google", "Found you on Google Maps", "Saw the shop or sign", "Friend or family", "Instagram", "Leaflet through the door"), plus "Friend or family" if not already covered, "Other (please say)" and "Don't remember". Six to ten options; split Google into search, maps and ads only where the customer can tell the difference. For online forms, suggest randomising order except the last two.
4. Add one follow-up only where useful: "Who can we thank?" for referrals, or "Which one?" for directories or events.
5. Where and how to ask: the moment (at booking or first contact, not after payment when people rush), staff phrasing that does not lead ("How did you hear about us?" not "Was it Instagram?"), and how to record it (form field, till button, phone log column).
6. Tally sheet: a monthly table by channel with counts, share, sales or bookings and revenue if available, and a column for what the platform reports for comparison.
7. Reading the results: wait for a reasonable number of answers (rule of thumb: at least 30 in a month before reading shifts), compare with platform data, look for channels customers name that you do not pay for, and decide monthly what to keep, test or drop.
</task>

<constraints>
- Options must match the supplied channels; do not add channels the business does not use, except "Friend or family" (word of mouth reaches every business, listed or not), "Other (please say)" and "Don't remember".
- Never make the question required at online checkout if it blocks the sale; say so.
- Do not collect more personal data than needed; the answer is stored with the order or booking, not as a separate profile, and follows the business's privacy notice.
- Label rules of thumb as such; do not invent benchmarks.
</constraints>

<output_format>
## The question
The question per capture point.

## Answer options
Numbered list in the order shown, with the follow-up question if any.

## Where and how to ask
Bullets per capture point: moment, staff phrasing, where it is recorded.

## Tally sheet
Table: Channel | Count | Share | Bookings or sales | Revenue | Platform says | Notes.

## Reading the results
Bullets: when to read it, how to compare, monthly decisions.
</output_format>
