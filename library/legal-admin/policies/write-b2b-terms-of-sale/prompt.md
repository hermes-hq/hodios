---
schema: 1
id: write-b2b-terms-of-sale
kind: prompt
title: Write business-to-business terms of sale
description: Drafts standard terms of sale for a manufacturer, wholesaler or distributor selling to trade customers - quotes, payment, late interest, retention of title, delivery, warranty and liability caps.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, sales-rep]
subject: [law, supply-chain, retail]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [b2b-terms, standard-terms, retention-of-title, late-payment, limitation-of-liability, wholesale]
pairs_with:
  prompts: [review-supplier-terms, plan-wholesale-pricing, negotiate-client-payment-terms, write-product-warranty-terms]
args:
  - name: business
    description: What you make or sell, how orders come in (quotes, purchase orders, online trade portal), payment terms you want, delivery methods and who arranges transport, custom-made or stock goods, and the problems you have had (late payers, disputed deliveries, returns).
    type: text
    required: true
  - name: customers
    description: Who buys (retailers, contractors, manufacturers), where they are based, and typical order size. Optional.
    type: text
  - name: jurisdiction
    description: Country (and state) whose law you want to govern the terms.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Key commercial choices, Terms of sale, How to make the terms apply, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft standard terms of sale for goods sold business to business. The biggest practical issue is incorporation and the "battle of the forms": if the buyer's purchase order carries its own terms, whose terms win depends on the legal system (some apply the last document sent before performance, others knock out conflicting terms or follow special rules for merchants), so the seller needs its terms on quotes, order acknowledgments and the account application, and accepted before work starts. Core clauses: quotes and their validity; order acceptance; price changes for raw material or currency moves; payment terms, with statutory late payment interest and compensation available in many places; retention of title so the seller keeps ownership until paid (a simple clause is widely workable, but wider "all monies" or proceeds clauses and registration requirements vary by country, and in some places it must be registered as a security interest); delivery terms, ideally with a named Incoterms rule; when risk passes; inspection and notice of defects within a short period; warranty limited to repair, replace or refund; liability caps and exclusion of indirect loss, which must be reasonable or are restricted in some countries and can never exclude liability for death or injury caused by negligence or for fraud; force majeure; cancellation of custom orders; intellectual property in designs and tooling; and governing law and courts. For international sales, the UN Convention on Contracts for the International Sale of Goods applies automatically between many countries unless excluded, which surprises sellers.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Business:
<business>
{{business}}
</business>
{{#customers}}

Customers:
<customers>
{{customers}}
</customers>
{{/customers}}

1. Key commercial choices: the decisions the owner must make (payment days, credit limits, interest rate within statutory limits, cap on liability, defect notice period, Incoterms rule, cancellation charges for custom work) with a recommended default and the trade-off.
2. Terms of sale: numbered clauses covering definitions, basis of contract and precedence over buyer terms, quotes and orders, specifications and custom goods, price, payment and late payment, credit and suspension, delivery and risk, title, inspection and defects, warranty, liability, force majeure, cancellation, intellectual property, confidentiality, assignment, notices, and governing law and jurisdiction, including a decision on excluding the international sales convention. Use [BRACKETS] for anything not supplied.
3. How to make the terms apply: where to put them (quotes, acknowledgments, invoices are too late on their own, credit account forms, website), wording that refers to them, and what to do when a big customer insists on its own terms.
4. Points to confirm, including registration requirements for retention of title and the reasonableness of the liability cap.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state statutory interest rates, registration rules or caps as fact for the jurisdiction unless confident; mark "confirm for {{jurisdiction}}".
- Do not draft clauses excluding liability for death or personal injury caused by negligence, or for fraud.
- If customers include consumers or sole traders treated as consumers locally, say these terms are for business buyers only and consumer terms are needed separately.
- Recommend a commercial lawyer review before use, especially for international sales or high-value custom work.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key commercial choices
Table: choice | recommended default | trade-off.

## Terms of sale
Numbered clauses with headings.

## How to make the terms apply
Bulleted list with sample wording.

## Points to confirm
Numbered list.
</output_format>
