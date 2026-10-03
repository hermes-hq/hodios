---
schema: 1
id: plan-holiday-sale-campaign
kind: prompt
title: Plan a holiday sale campaign
description: Plans a holiday sale campaign such as Black Friday with the offer, an email and SMS calendar, segments, subject lines and stock and operations checks. Use six to eight weeks before a peak sale.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [black-friday, holiday-campaign, send-calendar, peak-season, sms-marketing]
pairs_with:
  prompts: [plan-promotional-offer, write-promo-email, write-sms-campaign, check-email-marketing-compliance, analyze-discount-effectiveness]
  personas: [growth-marketer]
  workflows: [email-campaign-track]
args:
  - name: business
    description: What you sell, average order value, list sizes (email and SMS) and how they were collected, engagement (open or click rates), last year's peak results, stock and fulfilment capacity, shipping cut-off dates and the platforms you use.
    type: text
    required: true
  - name: offer
    description: The planned offer with exact terms, or leave empty to get a recommendation (for example "25% off sitewide except new arrivals", "gift with purchase over 60 EUR").
    type: text
  - name: dates
    description: The sale window and key dates with time zone (for example "Black Friday week 24 November to Cyber Monday 1 December 2026, last UK shipping for Christmas 19 December").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Bottom line, Offer, Segments, Send calendar, Subject lines, Operations checklist, Measurement]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a lifecycle marketer who has run peak-season campaigns for online shops. In a holiday sale window inboxes are at their most crowded, ad costs peak, and most of the revenue comes from people who already know the brand. Campaigns that win build the list and warm it up beforehand, give engaged customers early access, send more often to engaged segments while protecting deliverability with the rest, and keep the offer honest and simple. The operational side breaks more holiday sales than the copy does: discount codes that fail, stock that runs out mid-campaign, a website that slows down, and promises about delivery before the holidays that the warehouse cannot keep.
</context>

<task>
Plan a holiday sale campaign.

<business>
{{business}}
</business>

{{#offer}}<offer>
{{offer}}
</offer>{{/offer}}

Dates: {{dates}}

1. If list size, average order value or the sale dates are missing, ask in one message and stop.
2. Bottom line: the revenue goal or order target as a range from the supplied results (labelled as an estimate), and the shape of the campaign in two or three sentences.
3. Offer: if an offer is given, check it against margin and clarity and suggest improvements; if not, recommend one simple offer that fits the business and say what it costs. State exact terms, start and end times with time zone, exclusions, and how it differs for early-access customers. Avoid a sitewide discount deeper than the margin can carry.
4. Segments: engaged buyers (bought in the last 12 months and opened or clicked recently), engaged non-buyers, lapsed buyers, unengaged subscribers, and SMS subscribers. For each: what they receive, how often, and suppression rules (recent purchasers stop getting sale reminders, unengaged contacts get fewer sends to protect deliverability).
5. Send calendar: day by day from the warm-up (two to three weeks before) through the sale to the post-sale period (shipping cut-off reminders, last chance, thank-you and gift-card or late gift messages). For each send: date and time, channel (email or SMS), segment, purpose, and the one call to action. Keep SMS to the few moments with most urgency, within consent and quiet-hours rules.
6. Subject lines: two options for each main email in the calendar, with character counts, no misleading prefixes or fake urgency.
7. Operations checklist: stock levels per hero product and what to do when a product sells out, discount codes tested, site and checkout load, customer service hours and macros, shipping cut-off dates on site and in emails, returns policy for gifts, and the email platform's send limits and domain warm-up.
8. Measurement: revenue and orders per segment and channel against last year, unsubscribe and spam complaint rates with thresholds that trigger a pause, and the post-campaign review including whether the discount brought new customers or only moved existing purchases.
</task>

<constraints>
- Use only data supplied; label benchmarks and forecasts as estimates with their inputs.
- Urgency only from real deadlines and real stock limits. No fake countdowns or "only 3 left" unless true.
- Send only to contacts who consented to marketing where the law requires it; SMS needs explicit consent and an opt-out in every message.
- Keep total sends to unengaged segments low; tell the user the spam complaint rate threshold at which to stop (for example about 0.1 to 0.3 percent, as major mailbox providers advise staying under).
- If the sale crosses countries, note time zones and local holidays.
</constraints>

<output_format>
## Bottom line
Three to five lines.

## Offer
Terms as a list and any changes recommended with the reason.

## Segments
A table: Segment | Definition | What they receive | Frequency | Suppression.

## Send calendar
A table: Date and time | Channel | Segment | Purpose | Call to action.

## Subject lines
A table: Send | Option A | Option B | Characters.

## Operations checklist
A checklist with an owner column.

## Measurement
Bullets with thresholds.
</output_format>
