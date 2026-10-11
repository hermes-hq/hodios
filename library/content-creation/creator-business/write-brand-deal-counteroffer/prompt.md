---
schema: 1
id: write-brand-deal-counteroffer
kind: prompt
title: Write a brand deal counteroffer
description: Answers a low sponsorship offer with a counter - unbundling fee, usage and exclusivity, setting a floor and ask, two counter options and a short email that keeps the deal warm.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [message, notes]
output: [message, table, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [counteroffer, sponsorship-rates, usage-rights, exclusivity, negotiation-email]
pairs_with:
  prompts: [build-creator-rate-card, review-sponsorship-contract]
  workflows: [brand-deal-track]
  personas: [creator-business-manager]
args:
  - name: offer
    description: "The brand's offer as received: fee, deliverables, usage rights, exclusivity, timeline, payment terms."
    type: text
    required: true
  - name: numbers
    description: "Your rate card or past deal fees, audience and recent performance on the platform involved, how much you want this deal, and your country and currency."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Read of the offer, Your floor and ask, Counter options, The email, If they say no]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A first sponsorship offer is usually an opening number, and brands expect creators to counter. The fee is rarely the only lever: an offer often bundles more deliverables than the fee suggests, plus paid usage (the brand running the content as ads), long or broad exclusivity, raw footage, and long payment terms such as payment months after delivery. Experienced creators price these separately, so a counter can either raise the fee or keep the fee and remove what costs them (shorter usage, narrower exclusivity, fewer deliverables, faster payment). They set a walk-away floor before writing, anchor the ask on their own rate card and real performance, offer two options rather than a single take-it-or-leave-it number, and keep the tone warm and brief. Counters that attack the brand's offer, or that reveal desperation, both lose. Data claims in the email must be real.
</context>

<task>
<offer>
{{offer}}
</offer>

<numbers>
{{numbers}}
</numbers>

1. **Read of the offer:** what the brand is actually asking for, item by item, including hidden asks (usage, exclusivity length and scope, raw files, payment terms), and what is unclear.
2. **Your floor and ask:** a walk-away floor and an ask built from their rate card and performance, with each priced component shown. Use placeholders where numbers are missing; never invent market rates.
3. **Counter options:** two options: one at the ask with the brand's full scope, one closer to their budget with reduced scope (fewer deliverables, shorter usage, narrower exclusivity). Show what changes in each.
4. **The email:** a short, warm email with thanks, the two options, the reason in one line tied to the value delivered, and a clear next step and deadline.
5. **If they say no:** what to concede next and what not to concede, and when to walk away politely.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not quote market rates or 'industry standard' figures as fact; use their own numbers or placeholders.
- Only use performance claims the creator provided.
- Keep the email under 180 words.
- Flag contract terms that need a proper review rather than negotiating them as legal advice.
</constraints>

<output_format>
## Read of the offer
Table: ask | stated | hidden cost.

## Your floor and ask
## Counter options
Table: option | fee | scope changes.

## The email
## If they say no
</output_format>
