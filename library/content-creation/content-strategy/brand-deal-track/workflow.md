---
schema: 1
id: brand-deal-track
kind: workflow
title: Brand deal track
description: Takes a creator's sponsorship from inbound offer to paid in gated steps, from vetting fit to pricing and countering, checking terms, delivering with disclosure, then reporting results and invoicing.
category: content-strategy
version: 1.0.0
status: incubating
stage: [review, plan, build, ship]
role: [content-creator, writer]
requires: [none]
inputs: [message, document, text]
output: [report, message, checklist, table]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sponsorship, brand-vetting, counter-offer, usage-rights, ad-disclosure, invoicing]
pairs_with:
  prompts: [build-creator-rate-card, review-sponsorship-contract, write-video-sponsor-segment, write-newsletter-sponsor-spot, practise-brand-deal-negotiation]
  personas: [creator-business-manager]
  rules: [sponsored-content-disclosure-rules]
args:
  - name: offer
    description: The brand's message or brief as received - who they are, what they want (deliverables, dates), the fee if stated, and any terms mentioned (usage, exclusivity, payment).
    type: text
    required: true
  - name: audience_stats
    description: Your audience per platform - followers or subscribers, typical views, opens or downloads, engagement, audience location and age if known, and results from past sponsors.
    type: text
    required: true
  - name: platforms
    description: Where the sponsored content would run, for example "YouTube and Instagram stories", "podcast and newsletter".
    type: string
    required: true
steps:
  - {id: vet, file: steps/01-vet-brand.md, stage: review, gate: approve, artifact: "brand-deal/01-vetting.md"}
  - {id: price, file: steps/02-price-and-counter.md, stage: plan, gate: approve, artifact: "brand-deal/02-counter.md"}
  - {id: terms, file: steps/03-check-terms.md, stage: review, gate: approve, artifact: "brand-deal/03-terms.md"}
  - {id: deliver, file: steps/04-deliver.md, stage: build, gate: approve, artifact: "brand-deal/04-delivery.md"}
  - {id: close, file: steps/05-report-and-invoice.md, stage: ship, gate: none, artifact: "brand-deal/05-report-and-invoice.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one sponsorship the way a careful creator manager would: decide whether the brand deserves the audience's trust, price from value and rights, get every term in writing, make content that works for the audience and is clearly disclosed, then prove results and get paid on time. Each step writes one artifact and waits for approval.

<offer>
{{offer}}
</offer>

<audience_stats>
{{audience_stats}}
</audience_stats>

Platforms: {{platforms}}

Rules for every step:
{{> guardrails/professional-limits}}
- Use only facts given. Ask for missing essentials (deliverables, dates, fee, terms) and mark gaps as [X]. Never invent market rates, brand budgets or performance figures.
- Sponsorship is always disclosed clearly and up front; never help hide or soften it.
- The creator's audience trust comes before the fee: flag claims the creator cannot back and products they would not use.
- This is not legal or tax advice: contracts with meaningful money or rights go to a lawyer or a creators' union or association; tax and invoicing duties to an accountant. Rules vary by country.
- End each artifact with open questions.
