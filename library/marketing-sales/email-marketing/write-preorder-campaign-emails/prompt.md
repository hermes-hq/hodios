---
schema: 1
id: write-preorder-campaign-emails
kind: prompt
title: Write pre-order campaign emails
description: Writes a maker's pre-order campaign - announcement, pre-orders open, progress updates, delay notice and shipping notice - with honest delivery windows and refund terms to confirm.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, artist, marketer]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [copy, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pre-orders, delivery-window, delay-notice, production-updates, crowdfunding-style]
pairs_with:
  prompts: [write-collection-drop-emails, write-promo-email]
args:
  - name: product
    description: What is being made - product, price, pre-order price or perks, quantity planned, who makes it and what could slow it down (supplier, printer, harvest, factory).
    type: text
    required: true
  - name: timeline
    description: Key dates - pre-orders open and close, production steps, expected shipping window - and how confident you are in each.
    type: text
    required: true
  - name: refund_terms
    description: What buyers can do if they change their mind or delivery slips (cancel any time before shipping, refund within X days). Optional; placeholders are used if missing.
    type: string
output_contract:
  format: markdown
  sections: [Campaign plan, Emails, Delivery window wording, Delay notice, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write pre-order campaigns for makers and small producers: a book print run, a game, a batch of sauces, furniture made to order. Pre-orders turn customers into lenders: they pay now for something that does not exist yet, so trust is the product. The usual failures are a single delivery date promised from the most optimistic schedule, months of silence after payment, and a delay announced late and vaguely. Consumer rules in many places also expect clear delivery times and a cancellation or refund option when they slip (for example the US mail order rule and EU and UK distance-selling rules), so the wording must be checked, not improvised.
</context>

<task>
<product>
{{product}}
</product>

<timeline>
{{timeline}}
</timeline>

{{#refund_terms}}Refund terms: {{refund_terms}}{{/refund_terms}}

1. **Campaign plan:** the sends and their dates: announcement (1-2 weeks before opening), pre-orders open, a reminder before close, a thank-you and what-happens-next to buyers, progress updates every 3-4 weeks until shipping, a shipping notice, and a delay notice template kept ready. Buyers and non-buyers get different emails after opening.
2. **Delivery window:** turn the timeline into a window, not a date ("expected to ship between 10 and 28 March"), built from the realistic end of each step. Show how you built it so the maker can adjust.
3. **Emails:** for each send, two subject lines, a preheader, a 60-150 word body and one action. Opening and thank-you emails state price, what is included, the delivery window and the cancellation and refund terms in one plain paragraph. Progress updates show something real (a photo description, a proof, a test batch) and the current window.
4. **Delay notice:** the new window, the honest reason in one or two sentences, what is being done, and the buyer's options (wait, change, cancel for a full refund) with a clear way to choose. Send as soon as the window is at risk, not on the original date.
5. **Questions:** what the maker must confirm before launch.
</task>

<constraints>
- Never promise a single fixed date unless the maker insists and has stock in hand; use windows.
- Do not invent refund terms, legal rights, production steps or reasons for delay; mark gaps as [NEEDED: ...] and list refund and delay rules to confirm for the countries the maker sells to.
- No pressure tactics beyond a real pre-order close date or a real limited quantity.
- If the product or the timeline is missing, ask and stop.
</constraints>

<output_format>
## Campaign plan
Table: Send | Date or trigger | Who receives | Goal.

## Emails
Each send with subject lines, preheader, body and action.

## Delivery window wording
The window, the build-up from the timeline, and the one sentence used in every email.

## Delay notice
The ready-to-use template with placeholders.

## Questions
Numbered items to confirm, including refund and cancellation rules to check locally.
</output_format>
