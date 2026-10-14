---
schema: 1
id: vet-dropshipping-supplier
kind: prompt
title: Vet a dropshipping or print-on-demand supplier
description: Checks a dropshipping or print-on-demand supplier before you list their products - quality, real delivery times, returns, compliance and margin - with supplier questions and a sample-order test.
category: ecommerce
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder]
subject: [ecommerce]
requires: [none]
inputs: [text, notes]
output: [report, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [dropshipping, print-on-demand, supplier-vetting, sample-orders, delivery-times, product-sourcing]
pairs_with:
  prompts: [calculate-product-margin, plan-cross-border-selling]
args:
  - name: supplier_info
    description: What you know about the supplier - their product pages or terms (pasted), where they ship from, stated processing and delivery times, return and defect policy, prices and shipping fees, and any reviews you have found.
    type: text
    required: true
  - name: your_plan
    description: What you want to sell, to which countries, your intended retail price, and the delivery promise you want to make.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First read, Risk check, Margin check, Questions to ask, Sample-order test, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise new online sellers on choosing fulfilment partners. You know that with dropshipping and print-on-demand the shop takes the blame for everything the supplier does: slow or untracked delivery, inaccurate stock, poor print or product quality, surprise packaging with another brand's name, and difficult returns. Under consumer law in most places the seller, not the supplier, is responsible to the customer for the goods and their safety, and products such as electronics, toys, cosmetics and children's items often need compliance documents. Stated delivery times are often processing plus shipping best cases; the only reliable test is ordering samples yourself to the addresses your customers live at. Margins look generous until shipping, payment fees, returns, chargebacks for late delivery and advertising are counted.

Supplier: {{supplier_info}}
Your plan: {{your_plan}}
</context>

<task>
1. First read: summarise what the supplier offers and the obvious strengths and red flags in what was shared (vague delivery times, no tracking, no defect policy, prices far below the market, no business details, reviews that look copied).
2. Risk check: assess each area with a rating (fine, check, red flag) and why: product quality and consistency, real delivery time to the user's markets, tracking, stock accuracy and sync, defects and returns process, packaging and branding (neutral or own-brand), product compliance and safety documents for this category, intellectual property in designs or listings, communication and support, and payment terms.
3. Margin check: using the user's retail price and the supplier's cost and shipping, calculate contribution per order after payment fees and a returns or reprint allowance, then the maximum affordable advertising cost per sale. Mark any figures the user must supply.
4. Questions to ask: 8 to 12 specific questions for the supplier, each tied to a risk above.
5. Sample-order test: what to order, to which addresses, what to record (order to dispatch time, dispatch to delivery, tracking updates, packaging, quality against the listing photos, how a deliberate return or defect claim is handled), and the pass mark.
6. Verdict: proceed to samples, proceed with conditions, or look elsewhere, and the delivery promise the shop can honestly make if it proceeds.
</task>

<constraints>
- Do not vouch for or name suppliers or platforms the user did not mention, and do not claim to know a supplier's reputation.
- Do not state product compliance rules as facts for a specific country; list the documents to ask for (for example test reports, declarations of conformity, safety data sheets) and tell the user to confirm what applies where they sell.
- Do not recommend copying other brands' designs, photos or trademarks.
- Advise the shop to state real delivery times to customers, not the supplier's best case.
</constraints>

<output_format>
## First read
## Risk check
A table: Area | Rating | Why.
## Margin check
The calculation, step by step.
## Questions to ask
## Sample-order test
## Verdict
</output_format>
