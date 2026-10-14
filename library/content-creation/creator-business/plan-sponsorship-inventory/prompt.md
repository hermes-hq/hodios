---
schema: 1
id: plan-sponsorship-inventory
kind: prompt
title: Plan sponsorship inventory
description: Plans a busy creator's sponsor slots for the coming months - slots per piece, spacing, exclusivity windows, competing brands, lead times and gaps - as a calendar with booking rules.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [content-creator, writer]
inputs: [notes, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sponsor-calendar, ad-inventory, exclusivity-windows, booking-rules, sponsor-fatigue]
pairs_with:
  prompts: [build-creator-rate-card, write-sponsor-renewal-proposal]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: schedule
    description: Your publishing schedule per platform for the next months (videos, episodes, issues, streams), seasonal peaks, and planned breaks.
    type: text
    required: true
  - name: deals
    description: Sponsor deals booked or in talks - brand, category, deliverables, dates, and any exclusivity terms (category and length) - plus inquiries waiting for an answer.
    type: text
    required: true
  - name: limits
    description: Optional. Your own limits, such as no more than one sponsor per video or no sponsors in certain series.
    type: text
output_contract:
  format: markdown
  sections: [Capacity, Calendar, Conflicts, Booking rules, Gaps to sell, Inquiry replies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Once a creator has regular sponsors, the problem shifts from finding deals to managing slots. Inventory is finite: each video, episode or issue can carry only so many sponsor mentions before the audience tunes out or leaves, and some series should stay unsponsored. Exclusivity clauses block whole categories for weeks or months, so accepting a cheap deal with broad exclusivity can block a better one. Brands in the same category should not run close together. Seasonal peaks (end of year, back to school, big launches in the niche) fill first and can carry more, while quiet months often have gaps. Production lead times matter: brands need scripts approved and products shipped before the slot. A simple calendar with capacity, booked slots, exclusivity windows and holds lets the creator answer inquiries quickly and honestly.
</context>

<task>
<schedule>
{{schedule}}
</schedule>

<deals>
{{deals}}
</deals>

{{#limits}}
<limits>
{{limits}}
</limits>
{{/limits}}

1. **Capacity:** sponsor slots available per week or month by platform and format, based on the schedule and the creator's limits; series or pieces that stay unsponsored.
2. **Calendar:** a month-by-month table of slots with booked deals, holds, exclusivity windows (category and dates) and open slots.
3. **Conflicts:** overlapping exclusivity, competing brands too close together, deliverables stacked in one week, and lead-time problems (script approval, product delivery), each with a fix.
4. **Booking rules:** rules for this creator, such as minimum spacing between brands in a category, maximum sponsored pieces per month, holds expire after a set number of days, exclusivity priced separately and capped, and slots in peak months offered to renewing sponsors first.
5. **Gaps to sell:** open slots worth filling and which kinds of past sponsors or categories fit, without inventing brands' interest.
6. **Inquiry replies:** short replies for the waiting inquiries: offering available dates, declining because of exclusivity, or offering a hold.
</task>

<constraints>
- Use only the deals and dates given; mark missing dates or terms as [X] and ask.
- Do not invent brands, budgets or rates.
- Never suggest breaking an exclusivity clause or running a competitor during an exclusivity window.
- Keep the audience in mind: if the schedule is overloaded with sponsors, say so.
</constraints>

<output_format>
## Capacity
## Calendar
Table: month | slot | platform | booked or hold | brand and category | exclusivity window.

## Conflicts
Table: conflict | why it matters | fix.

## Booking rules
Numbered.

## Gaps to sell
## Inquiry replies
</output_format>
