---
schema: 1
id: write-marketplace-seller-policy
kind: prompt
title: Write a marketplace seller policy
description: Drafts the rules for third-party sellers on an online marketplace - onboarding checks, prohibited items, listing accuracy, fulfilment, fees, performance standards, suspension and appeals.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, product-manager, operations-manager, legal-professional]
subject: [law, ecommerce]
requires: [none]
inputs: [text]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [marketplace-sellers, seller-onboarding, prohibited-items, seller-performance, platform-rules]
pairs_with:
  prompts: [write-terms-of-service, write-acceptable-use-policy, write-refund-policy]
args:
  - name: marketplace
    description: What is sold (physical goods, services, digital items, rentals), who the sellers are (individuals, small businesses, brands), who handles payments and shipping, how disputes work today, and problems already seen (counterfeits, late shipping, off-platform deals).
    type: text
    required: true
  - name: jurisdictions
    description: Where the platform is based and where sellers and buyers are.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Risk summary, Seller policy, Performance standards, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A marketplace's seller policy carries most of its trust and safety load: who may sell, what may not be sold, how listings must describe goods, what shipping and service levels apply, and what happens when sellers break the rules. Platforms are increasingly expected to know who their business sellers are (trader verification and traceability rules apply in the EU under the Digital Services Act and in the US under the INFORM Consumers Act for high-volume sellers), to act on notices of illegal listings, to explain restrictions and allow appeals, and to keep consumer rights such as withdrawal and warranties working when the seller is a trader. Common problems: unclear distinction between private and business sellers (consumer rights differ), prohibited lists copied from another platform, performance metrics that punish sellers for platform-caused delays, and suspensions with no reasons or appeal.

Jurisdictions: {{jurisdictions}}
</context>

<task>
Marketplace:
<marketplace>
{{marketplace}}
</marketplace>

1. Risk summary: the main risks for this marketplace (illegal or unsafe goods, counterfeits, fraud, off-platform payment, misdescribed items, consumer-rights failures) and the policy control for each.
2. Seller policy in plain language:
   - Who can sell, private versus business sellers and what changes for buyers, and verification at onboarding and above volume thresholds marked to confirm.
   - Prohibited and restricted items for this category, with examples and a link placeholder for the full list.
   - Listing rules: accurate descriptions, real photos, condition grading, pricing and fees shown honestly, no fake reviews.
   - Orders, fulfilment, shipping times, cancellations, returns and the seller's consumer-law duties.
   - Payments and fees, payouts, holds and reserves, and the ban on taking payment off-platform.
   - Communications with buyers and data use limits.
   - Intellectual property and the notice route for rights holders.
   - Enforcement: warnings, listing removal, limits, suspension, termination, with reasons given and an appeal route.
   - Changes to the policy and notice periods [PERIOD].
3. Performance standards: a table of metrics (late dispatch, cancellation, defect or complaint rate, response time), targets as placeholders, and what happens if missed, excluding causes outside the seller's control.
4. Points to confirm: trader verification, notice-and-action, consumer rights, product safety and tax reporting duties per jurisdiction.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state legal thresholds or obligations as fact unless supplied; describe them and mark "confirm for [jurisdiction]".
- Never draft rules that strip buyers of statutory consumer rights where the seller is a trader.
- Do not invent fee levels or metric targets; use [PLACEHOLDERS] with the reasoning.
- Give sellers reasons and an appeal route for restrictions; if the user asks for secret, unexplained bans, push back.
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk summary
Table: risk | example | policy control.

## Seller policy
The full policy with headings.

## Performance standards
Table: metric | target | measured over | consequence | exclusions.

## Points to confirm
Numbered.
</output_format>
