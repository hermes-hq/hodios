---
schema: 1
id: paid-tier-launch-track
kind: workflow
title: Paid tier launch track
description: Launches a paid tier on a free newsletter in approved steps, from a readiness check and the free-versus-paid split to pricing, the launch sequence and a 30-day review.
category: newsletters
version: 1.0.0
status: incubating
stage: [discover, design, plan, ship, review]
role: [writer, content-creator, founder]
requires: [none]
inputs: [notes, dataset, text]
output: [plan, table, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [paid-subscriptions, subscription-price, founding-members, launch-sequence, paid-conversion]
pairs_with:
  prompts: [place-newsletter-paywall-break, announce-newsletter-change, audit-newsletter-performance]
  personas: [newsletter-business-advisor]
args:
  - name: newsletter_summary
    description: What the newsletter covers, for whom, cadence, how long you have run it, the hours you spend, and what you could add for paying readers.
    type: text
    required: true
  - name: stats
    description: Your numbers - free subscribers, growth per month and sources, open and click rates, reply volume, any readers who have asked to pay or donated, and revenue you already earn from it.
    type: text
    required: true
  - name: platform
    description: The platform you send from, if chosen. Optional; the plan stays platform-neutral if empty.
    type: string
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: discover, gate: approve, artifact: "paid-tier/01-readiness.md"}
  - {id: split, file: steps/02-free-paid-split.md, stage: design, gate: approve, artifact: "paid-tier/02-free-paid-split.md"}
  - {id: pricing, file: steps/03-pricing.md, stage: plan, gate: approve, artifact: "paid-tier/03-pricing.md"}
  - {id: launch, file: steps/04-launch-sequence.md, stage: ship, gate: approve, artifact: "paid-tier/04-launch-sequence.md"}
  - {id: review, file: steps/05-thirty-day-review.md, stage: review, gate: none, artifact: "paid-tier/05-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a free newsletter to a paid tier one approved step at a time: check whether it is ready, decide what stays free and what is paid, set the price and any founding offer, write the launch sequence, and review the first 30 days. Each step writes one artifact and stops for the writer's approval; later steps build on what was approved.

<newsletter_summary>
{{newsletter_summary}}
</newsletter_summary>

<stats>
{{stats}}
</stats>

{{#platform}}Platform: {{platform}}{{/platform}}

Rules for every step:
{{> guardrails/professional-limits}}
- Use only the writer's numbers. Ask for missing essentials (free subscribers, cadence, hours available) and mark gaps as [X].
- Model scenarios with arithmetic shown and labelled assumptions; never promise revenue, conversion or subscriber numbers.
- Never state a platform's fees, features or tax handling as fact; say what to check. Tax registration, VAT or sales tax on digital subscriptions and business set-up go to an accountant or the tax authority's guidance.
- Paid promises must fit the writer's available hours. Keep the free newsletter genuinely useful.
- No dark patterns: honest pricing, easy cancellation, no fake scarcity or countdowns that are not real.
- End each artifact with open questions.
