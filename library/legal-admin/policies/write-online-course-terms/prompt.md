---
schema: 1
id: write-online-course-terms
kind: prompt
title: Write terms for selling online courses
description: Drafts terms for selling online courses, cohorts, coaching programmes and digital downloads - licence, access period, account sharing, refunds and cancellation, payment plans and certificates.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [content-creator, teacher, founder]
subject: [law, ecommerce]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [online-courses, digital-products, course-licence, refund-terms, payment-plans, digital-downloads]
pairs_with:
  prompts: [plan-paid-online-course, write-refund-policy, write-acceptable-use-policy, write-privacy-policy]
args:
  - name: offer
    description: What you sell (self-paced course, live cohort, coaching, templates or downloads, membership), price and payment plans, how long access lasts, the platform used, any money-back guarantee, certificates, community spaces, and whether buyers are consumers, businesses or both.
    type: text
    required: true
  - name: markets
    description: Where you are based and where most buyers live.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Key decisions, Terms, Checkout and email wording, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the terms a course creator or small training business uses when selling online. Most problems come from four places. First, refunds and cancellation: in the EU and UK, consumers buying digital content lose the right to cancel only if they expressly agreed to immediate access and acknowledged losing the right, so the checkout must capture that; live cohorts and coaching are services, where the cancellation period runs from purchase and a proportionate charge can apply if the service started early at the buyer's request. Any money-back guarantee you advertise becomes a binding promise, so its conditions must be stated up front. Second, the licence: buyers get a personal, non-transferable right to use the material, not ownership; account sharing, downloading videos, reselling or using material to train others or AI models are the usual exclusions, and team or company licences need separate terms. Third, access: "lifetime access" should be defined (for example the lifetime of the course on the platform), and terms should say what happens when content is updated, retired, or the platform changes. Fourth, payment plans: buyers usually still owe instalments after starting, but terms must be clear and fair, and cutting off access for missed payments must be explained. Certificates should not imply accreditation that does not exist, and outcome or income claims create misleading-advertising risk.
</context>

<task>
Offer:
<offer>
{{offer}}
</offer>

Markets: {{markets}}

1. Key decisions: refund and guarantee approach, access period, payment plan rules, team licences, and recording or replay policy for live sessions, each with a recommendation.
2. Terms: numbered sections in plain language covering who we are, what you are buying, account and access, licence and restrictions, live sessions and coaching (scheduling, missed sessions, recordings), community rules (link to acceptable use), payment and payment plans, cancellation and refunds (with the digital content consent mechanics where relevant), guarantee conditions, content changes and retirement, certificates, no guaranteed results, our liability, intellectual property, suspension for misuse, personal data, changes to terms, and governing law with the consumer protection caveat. Use [BRACKETS] for missing details.
3. Checkout and email wording: the consent and acknowledgment line for immediate access, the guarantee summary, and the confirmation email lines.
4. Points to confirm, including how the platform's own terms interact with yours.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not draft "no refunds under any circumstances" for consumers without the legal exceptions and mechanics; explain why.
- Do not include income or results promises, or certificate wording that implies accreditation not held.
- Do not state cancellation periods or legal references for a market unless confident; you may use the commonly known 14-day period for EU and UK consumers, and mark the rest "confirm".
{{> output/uncertainty}}
</constraints>

<output_format>
## Key decisions
Table: decision | recommendation | why.

## Terms
Numbered sections with headings.

## Checkout and email wording
Short text blocks.

## Points to confirm
Numbered list.
</output_format>
