---
schema: 1
id: set-up-ugc-creator-offer
kind: prompt
title: Set up a UGC creator offer
description: Sets up a creator's offer to make UGC for brands to post or run as ads - packages, a portfolio plan, pricing from production time and usage rights, the job process and a first pitch.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator]
inputs: [notes, preferences]
output: [plan, table, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [ugc, content-for-brands, usage-rights, service-packages, portfolio]
pairs_with:
  prompts: [build-creator-rate-card, write-media-kit, request-ugc-repost-permission]
  personas: [creator-business-manager]
args:
  - name: skills
    description: What you can make (short talking-head videos, unboxings, product photos, voiceovers, edits), your gear and setup, your niche or the products you know, examples you have made, and hours per week.
    type: text
    required: true
  - name: goals
    description: What you want from UGC work (side income, a full-time service, building a portfolio), and your country and currency.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you are selling, Packages, Pricing method, Portfolio plan, How a job runs, First outreach, Watch out for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
UGC work is different from sponsorship: the brand pays for content, not for the creator's audience, and usually posts it on its own channels or runs it as ads. So a following matters little; what sells is a portfolio that looks native to the platforms, strong hooks in the first seconds, a range of formats, fast turnaround and reliability. The money is in production and in usage rights: organic use on the brand's channels is one thing, paid ads use is worth more and should be priced by duration, and perpetual or unlimited rights at a base price is the most common way UGC creators undercharge. Raw footage, extra hooks or versions, and rush delivery are add-ons. Brands brief UGC creators in bulk, so clear packages and a simple process win work. Products sent for content are payment in kind in many places, and some brands ask for content in exchange for product only.
</context>

<task>
<skills>
{{skills}}
</skills>

<goals>
{{goals}}
</goals>

1. **What you are selling:** the formats this creator can deliver well now (for example talking-head testimonial, unboxing, demo, voiceover over product footage, photo sets), and which niches or product types fit their knowledge.
2. **Packages:** three packages (for example one video, a bundle of three with hook variations, a monthly set), each with deliverables, revisions included, turnaround, what usage is included by default (organic only) and what is extra.
3. **Pricing method:** how to set a base price from production time and costs plus a margin, add-ons for paid ads usage per period, raw footage, extra hooks, rush delivery and exclusivity. Give the formula and placeholders; do not quote market rates.
4. **Portfolio plan:** four to six spec pieces to make with products they already own, showing range, and where to host the portfolio.
5. **How a job runs:** brief, script or concept approval, filming, delivery format, revision round, invoice and payment terms (deposit for new clients), and how usage rights are written down.
6. **First outreach:** a short pitch message to a brand they already use, with a portfolio link placeholder.
7. **Watch out for:** product-only offers, requests for unlimited or perpetual rights at base price, unpaid "test" videos, claims they cannot back (health, earnings), and disclosure duties if they post on their own account.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state market rates or what UGC creators earn as fact; show the method and tell them to sanity-check with real quotes and offers.
- Do not invent the user's experience or portfolio.
- Never suggest scripting claims about a product they have not used or cannot back, or fake reviews presented as real customers. UGC used as ads must not pretend to be an independent review where rules require disclosure; disclosure rules vary by country.
- Usage rights and contracts with real money go to a lawyer or a creators' association for review; tax on payments in kind and income to an accountant.
</constraints>

<output_format>
## What you are selling
## Packages
Table: package | deliverables | revisions | turnaround | usage included | add-ons.

## Pricing method
Formula, then a worked example with [X] placeholders.

## Portfolio plan
## How a job runs
Numbered.

## First outreach
## Watch out for
</output_format>
