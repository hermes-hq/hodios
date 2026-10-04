---
schema: 1
id: write-collection-drop-emails
kind: prompt
title: Write new collection drop emails
description: Writes the email run for a small brand's collection or product drop - teaser, VIP early access, launch day and last sizes - with send times, segment rules and honest stock language.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, marketer, artist]
subject: [ecommerce, retail]
requires: [none]
inputs: [text]
output: [copy, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [product-drop, collection-launch, early-access, small-batch, honest-scarcity]
pairs_with:
  prompts: [write-back-in-stock-emails, write-preorder-campaign-emails, plan-email-segmentation]
args:
  - name: drop_details
    description: What is launching - pieces, prices, quantities or sizes made, what makes it special (materials, story, collaborator), whether it will be restocked, and the brand voice.
    type: text
    required: true
  - name: launch_date
    description: Launch date and time with time zone, for example "Thursday 14 November, 7pm CET".
    type: string
    required: true
  - name: vip_segment
    description: Who gets early access and how you identify them (for example "customers with 2+ orders" or "people who joined the waitlist"), and how many. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Run plan, Emails, Segment rules, Stock language, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write launch email runs for makers and small brands: a new collection, a capsule, a limited batch. A drop lives or dies in the first 24-48 hours, so timing and segments matter as much as the words. Three mistakes are common: one big launch email and nothing else, so people who missed it never hear again; emailing buyers "Last chance!" after they already bought; and invented scarcity ("almost gone" on day one) that customers notice, especially when the "limited" pieces are restocked a month later. Honest specifics ("we made 40 of each", "sizes S and M are sold out") sell better and keep trust.

Launch: {{launch_date}}
{{#vip_segment}}VIP segment: {{vip_segment}}{{/vip_segment}}
</context>

<task>
<drop_details>
{{drop_details}}
</drop_details>

1. **Run plan:** four to five sends relative to launch: teaser (5-7 days before; what is coming and when, with a reminder or waitlist option), VIP early access (12-24 hours before public, only if a VIP group exists), launch (at the moment it goes live), a follow-up 24-48 hours later to people who did not click or buy, and a "last sizes" or "final pieces" email only if stock data supports it. Recommend send times from the user's own past results if given; otherwise send at the launch time and state the assumption.
2. **Emails:** for each send, two subject lines, a preheader, a 60-140 word body and one call to action. The teaser shows enough to want it (a detail, a material, a first image description) without giving the full reveal. The launch email leads with the pieces and prices. The follow-up answers the likely hesitation (fit, care, gifting, delivery dates).
3. **Segment rules:** who gets each send, and exclusions: anyone who bought the drop leaves the sales sends and gets a thank-you or care email instead; VIPs are not sent the public teaser twice; unsubscribed and suppressed contacts never receive.
4. **Stock language:** write the scarcity wording for each stage from the real quantities and restock plan (for example "We made 60. When they're gone, this colour is retired."). If quantities are unknown, use neutral wording and ask for them.
5. **Checks:** links to live product pages at launch time, sold-out states, the time zone in every email, and a plan if the site crashes or the launch slips.
</task>

<constraints>
- Do not invent quantities, prices, materials, collaborator names or restock dates. Use [NEEDED: ...].
- No fake countdowns, "only 3 left" unless true, or "never again" if a restock is possible.
- Send "last sizes" only when stock data says so, and name the sizes.
- If the drop details say nothing about what is launching or its price, ask and stop.
</constraints>

<output_format>
## Run plan
Table: Send | When (relative to launch and local time) | Who receives | Goal.

## Emails
Each send with subject lines, preheader, body and call to action.

## Segment rules
Bullets with inclusions and exclusions per send.

## Stock language
Wording per stage, tied to the numbers given.

## Checks
A short pre-launch checklist.
</output_format>
