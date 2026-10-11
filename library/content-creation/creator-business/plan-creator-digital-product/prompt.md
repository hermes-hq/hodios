---
schema: 1
id: plan-creator-digital-product
kind: prompt
title: Plan a creator digital product
description: Plans a small digital product a creator can sell to their audience - template, preset pack, guide, toolkit - from the audience's repeated asks, with a scope, a presale test, pricing and a launch plan.
category: creator-business
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, writer, designer]
inputs: [notes, dataset, preferences]
output: [plan, table]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [digital-products, templates, presets, presale, launch-plan]
pairs_with:
  prompts: [plan-creator-monetization, plan-paid-online-course, mine-audience-questions]
  personas: [creator-business-manager]
args:
  - name: audience
    description: Your niche, platforms and audience size, email list size, and the questions or requests your audience repeats (paste comments if you can).
    type: text
    required: true
  - name: assets
    description: What you already have that could become a product (your own templates, presets, checklists, spreadsheets, notes), and your hours per week.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Product options, Pick one, Scope for version one, Presale test, Pricing, Launch plan, Checks before selling]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The best first digital product for a creator is usually something they already made for themselves and the audience keeps asking for: the spreadsheet, the preset pack, the checklist, the template. It solves one specific problem, takes weeks rather than months to package, and sells to the engaged part of the audience, which is usually a small share of followers and best reached by email. Common mistakes: building a large course first, guessing what people want instead of using repeated questions, launching to a feed instead of a list, pricing by effort instead of by the value of the problem solved, and skipping a presale or waitlist that would have shown demand. Selling digital goods brings practical duties that vary by country: sales tax or VAT on digital products in the buyer's country, consumer rights to refunds, licence terms for templates and presets, and permission for any fonts, images or assets included.
</context>

<task>
<audience>
{{audience}}
</audience>

<assets>
{{assets}}
</assets>

1. **Product options:** three options built from the repeated asks and existing assets, each with the problem solved, who buys, effort to package, and risk.
2. **Pick one:** the recommended first product and why.
3. **Scope for version one:** exactly what is included, what is left for later, the format, and a build plan in hours.
4. **Presale test:** a waitlist or presale with a clear threshold the creator sets in advance (for example a number of sign-ups or sales from the email list), the message to send, and what to do if it misses.
5. **Pricing:** a method based on the value of the problem and the audience's means, a launch price versus regular price only if both are honest, and a bundle or tier if it fits. Use placeholders and the creator's own numbers; no market prices as fact.
6. **Launch plan:** two to three weeks of content and emails leading to launch, the launch window, and follow-up for buyers (how to use it, a request for feedback).
7. **Checks before selling:** sales tax or VAT on digital goods, refund policy, licence terms for buyers, rights to any included fonts, images or assets, and platform fees. Mark these as checks, not conclusions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the asks and figures given; do not invent demand, conversion rates or prices.
- No fake scarcity or countdowns that reset; deadlines must be real.
- Do not include third-party assets the creator has no right to resell.
- Tax and consumer-law points go to an accountant or official guidance; rules differ by country.
</constraints>

<output_format>
## Product options
Table: option | problem solved | buyers | effort | risk.

## Pick one
## Scope for version one
## Presale test
## Pricing
## Launch plan
Table: week | content | email.

## Checks before selling
Checkbox list.
</output_format>
