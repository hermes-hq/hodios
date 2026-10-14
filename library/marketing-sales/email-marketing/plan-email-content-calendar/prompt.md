---
schema: 1
id: plan-email-content-calendar
kind: prompt
title: Plan a quarter of email campaigns
description: Plans a quarter of email campaigns with themes, seasonal moments, a balance of promotional and value emails, the segment for each send and dates that avoid clashes with automated flows.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder]
subject: [ecommerce, retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [campaign-calendar, send-schedule, seasonal-marketing, promo-mix]
pairs_with:
  prompts: [set-email-frequency, plan-holiday-sale-campaign, plan-email-segmentation]
args:
  - name: business
    description: What the business sells, the country or countries of its customers, key products or services by season, and the email voice.
    type: text
    required: true
  - name: quarter
    description: Which quarter or months, known dates (launches, sales, events, stock arrivals, closures) and how many campaigns per week you can realistically produce.
    type: text
    required: true
  - name: segments
    description: Segments available (new subscribers, buyers, VIPs, lapsed, by interest or location) and the active automated flows. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Quarter overview, Calendar, Segment plan, Production notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan email campaign calendars. A calendar made the week before each send turns into last-minute discount blasts to the whole list, which trains people to wait for sales and wears out the list. A planned quarter balances promotional emails with value emails (how-to, stories, new arrivals, behind the scenes, customer picks) so the list still wants to open when the big sale arrives, builds up to known peaks instead of starting cold, and sends the right campaign to the right segment. Experts plan around the business's real dates first, then the seasonal and cultural moments that matter to its customers in their country, leave buffer weeks, and check that campaigns do not collide with automated flows (for example a sale email landing the same day as a welcome discount).
</context>

<task>
Plan a quarter of email campaigns.

<business>
{{business}}
</business>

<quarter>
{{quarter}}
</quarter>
{{#segments}}Segments and flows: {{segments}}{{/segments}}

1. **Quarter overview:** the main goal per month, the one or two peaks, and the target mix of promotional and value emails (for example about one promotion for every two value emails, adjusted to the business).
2. List the seasonal and cultural moments relevant to the customers' country and products; mark ones the user should confirm (dates that move each year, regional holidays) and skip ones that do not fit the brand.
3. **Calendar:** week by week, each campaign with date, theme, type (promo or value), segment, primary call to action and a one-line subject idea. Respect the production capacity given.
4. **Segment plan:** who gets what, who is excluded (recent buyers from discounts, new subscribers still in the welcome flow), and how VIPs or engaged readers get early access.
5. **Production notes:** what to prepare and when (photography, stock checks, landing pages), and a short checklist for each peak.
</task>

<constraints>
- Do not invent business dates, product launches or stock; use only what is supplied and mark gaps.
- Mark holiday dates that vary by year or region as "confirm date".
- Do not exceed the stated production capacity; if the goals need more, say so.
- Keep discounts to the dates the user supplied or proposes; do not add discount events by default.
</constraints>

<output_format>
## Quarter overview
Short bullets per month.

## Calendar
A table: Week | Date | Campaign | Type | Segment | Call to action | Subject idea.

## Segment plan
Bullets.

## Production notes
Bullets and a checklist per peak.
</output_format>
