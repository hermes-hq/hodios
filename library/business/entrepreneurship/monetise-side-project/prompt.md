---
schema: 1
id: monetise-side-project
kind: prompt
title: Monetise a side project
description: Turns a side project that already has users into a business - what to charge for, pricing, payments, entity, licence and IP checks, and a first revenue test that keeps users.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, software-engineer, content-creator, individual]
advice_risk: [legal]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [side-project, paid-tier, freemium, first-revenue, pricing-test]
pairs_with:
  prompts: [check-side-project-ip-ownership, plan-side-business, plan-creator-monetization, model-unit-economics]
args:
  - name: project
    description: The project - what it is (app, tool, community, template, newsletter, open-source library), how many users and how active, what they use most, what it costs you to run, and any requests to pay you already.
    type: text
    required: true
  - name: situation
    description: Your job and employer (if any), the country you live in, how much time you can give, whether others contributed, and what you want (pocket money, replace a salary, sell it later).
    type: text
output_contract:
  format: markdown
  sections: [Value and usage, What to charge for, Pricing, Payments and admin, Ownership and licence checks, First revenue test, Communication to users]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people turn a free side project into income without losing the users who made it worth monetising. What usually works is charging for what heavy users or businesses value (more capacity, team features, support, commercial use, saved time), keeping what made the project popular free, and testing with the most engaged users before announcing to everyone. What usually goes wrong: paywalling the core feature overnight, pricing from running costs instead of value, ignoring who owns the code or content (employer contracts, contributors, open-source licences, third-party data or API terms), and taking money before setting up tax, refunds and a simple legal structure.

<project>
{{project}}
</project>
{{#situation}}
<situation>
{{situation}}
</situation>
{{/situation}}
</context>

<task>
1. Value and usage: who uses the project, who uses it most, and what job it does for them. Identify the segment most likely to pay (often businesses or power users) and the evidence for it.
2. What to charge for: list two to four monetisation models that fit (paid tier, one-off licence, usage pricing, sponsorship, paid support, hosted version, services). Recommend one and say what stays free.
3. Pricing: a starting price and structure with the reasoning (value to the paying segment, alternatives they would use, a simple anchor). Mark it as a hypothesis to test.
4. Payments and admin: payment provider options to compare, handling sales tax on digital sales, refunds, terms and privacy notice, and when to register as a business. Present these as checks for the founder's country.
5. Ownership and licence checks: employer contract clauses on side projects and IP, contributions from others, the project's own licence, and terms of any APIs, data or assets it uses that may forbid commercial use.
6. First revenue test: offer the paid option to the most engaged users first, the measure of success (conversions, payments, churn of free users), and how long to run it.
7. Communication to users: a short draft announcement that explains what changes, what stays free and why.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that the founder owns the project or that a licence allows commercial use; say what to check and that a lawyer can confirm if the employer or licence situation is unclear.
- Do not invent user numbers, conversion rates or competitor prices. If a typical conversion rate is mentioned, say it varies widely and is only for planning.
- Never recommend removing features users rely on without notice, or changing a licence without checking contributor rights.
</constraints>

<output_format>
## Value and usage
Short paragraph.
## What to charge for
Table: Model | Fit | Risk to users. Then the recommendation and what stays free.
## Pricing
## Payments and admin
Checklist.
## Ownership and licence checks
Checklist: Item | What to check | Who to ask.
## First revenue test
## Communication to users
A draft of under 150 words.
</output_format>
