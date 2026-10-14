---
schema: 1
id: write-online-store-terms-of-sale
kind: prompt
title: Write terms of sale for an online shop
description: Drafts consumer terms of sale for an online shop selling physical goods - ordering, pricing errors, delivery and risk, cancellation rights, faulty goods, liability and complaints - in plain language.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
subject: [law, ecommerce, retail]
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
depth: specific
tags: [terms-and-conditions, consumer-contracts, online-shop, pricing-errors, cancellation-rights, faulty-goods]
pairs_with:
  prompts: [write-refund-policy, write-shipping-policy-page, check-online-shop-consumer-law, write-product-warranty-terms]
args:
  - name: shop
    description: What you sell (including personalised, perishable or sealed hygiene items), the business name and legal form, where you are based, how orders are confirmed and charged, delivery options, your returns approach, and any marketplace or platform you sell through.
    type: text
    required: true
  - name: markets
    description: Countries or states where your customers are.
    type: string
    required: true
  - name: existing_policies
    description: Your current returns, shipping or privacy pages, so the terms stay consistent with them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key points to check, Terms of sale, Checkout and email wording, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft the terms of sale an online shop uses with consumers. Good terms do practical jobs: they set when the contract is formed (commonly the order is an offer and the contract forms when the shop confirms dispatch, which helps with pricing errors and stock problems, provided the confirmation emails match); they explain delivery, when risk and ownership pass (for consumers in the EU and UK, risk generally passes on delivery to them, not on handing to the courier); they state the right to cancel and its exceptions; they describe what happens with faulty or misdescribed goods; and they limit liability only as far as the law allows. Consumer law limits what terms can do. In the EU and UK, terms that are unfair or not transparent are not binding, statutory rights for faulty goods cannot be removed, liability for death or personal injury caused by negligence cannot be excluded, and choosing the shop's home law does not remove the protections of the consumer's own country when the shop targets it. In the US, rules differ by state, implied warranty disclaimers must meet formal requirements and some states restrict them, and arbitration or class waiver clauses raise their own issues. Shops commonly copy terms from larger retailers that refer to services they do not offer, contradict their own returns page, or include "no refunds" wording that is unenforceable and itself misleading.
</context>

<task>
Shop:
<shop>
{{shop}}
</shop>

Markets: {{markets}}
{{#existing_policies}}

Existing policies:
<policies>
{{existing_policies}}
</policies>
{{/existing_policies}}

1. Key points to check: decisions the user must make and conflicts with existing policies, such as when the contract forms, how pricing errors are handled, and which items are excluded from the right to cancel.
2. Terms of sale in plain language with numbered sections: who we are and how to contact us; these terms and other policies; ordering and contract formation; prices, taxes and pricing errors; payment; delivery, risk and ownership; your right to cancel (period, how, exceptions, refund timing, return costs, condition of returned goods); faulty or misdescribed goods and the legal guarantee; any extra guarantee offered; our liability; events outside our control; complaints and dispute resolution; personal data (link to privacy notice); changes to these terms; governing law and courts, with the consumer protection caveat. Use [BRACKETS] for anything not supplied.
3. Checkout and email wording: the acceptance checkbox or statement, the order button label, the order acknowledgment and dispatch confirmation lines that match the contract formation clause.
4. Points to confirm for each market.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not include terms that remove statutory rights, exclude liability for death or injury caused by negligence, or say "no refunds" without the legal exceptions.
- Do not state time limits, dispute resolution bodies or legal references as fact for a market unless confident; mark "confirm for [market]". You may use the commonly known 14-day cancellation period for EU and UK distance sales of goods.
- Do not invent business details; use [BRACKETS].
- Recommend a lawyer review when selling into several countries, selling regulated products, or using arbitration clauses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key points to check
Numbered list.

## Terms of sale
Numbered sections with headings.

## Checkout and email wording
Short text blocks.

## Points to confirm
Numbered list by market.
</output_format>
