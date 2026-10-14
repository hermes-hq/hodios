---
schema: 1
id: set-discount-policy
kind: prompt
title: Set a discount policy
description: Writes a discount policy - when discounts are allowed, limits by deal size, what customers give in return, who approves, and how discounts are tracked and reviewed.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, sales-rep, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [discount-policy, deal-approval, price-discipline, margin-protection, sales-governance]
pairs_with:
  prompts: [calculate-discount-break-even, analyze-price-realisation, find-pricing-leakage, design-pricing]
args:
  - name: business
    description: What you sell, typical deal sizes, gross margin, who sets prices and who gives discounts today, and the problems you see (sales giving discounts too easily, end-of-quarter cuts, inconsistent prices).
    type: text
    required: true
  - name: discount_data
    description: Any figures on current discounting - average discount, range, share of deals discounted, by rep or customer type. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Discount types allowed, Limits and approvals, Give-gets, Exceptions, Tracking and review, Policy text]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a business set discount rules. Uncontrolled discounting is one of the biggest sources of lost profit: a 10% discount on a 30% gross margin product needs about 50% more volume just to stand still, and once customers learn that asking works, list prices stop meaning anything. A good policy makes discounts a trade, not a gift (the customer gives something back: volume, a longer term, upfront payment, a case study, faster signature), sets limits that scale with deal size and margin, puts approval at the right level without slowing every deal, and tracks discounts so patterns become visible. It also covers the legal basics: treat similar customers consistently, and never agree discounts with competitors.
</context>

<task>
Write a discount policy for this business:

<business>
{{business}}
</business>
{{#discount_data}}

<discount_data>
{{discount_data}}
</discount_data>
{{/discount_data}}

1. State 3 to 5 principles (for example: list price is the default; every discount buys something; no discount to close a deal that is already won).
2. Define the discount types allowed: volume or tier, term or commitment, early payment, launch or promotional, strategic or new-logo, loyalty. For each give the purpose and the conditions.
3. Set limits and approvals: a table of discount bands by deal size or margin, and who can approve each band (salesperson, manager, owner or finance). Show the margin effect of each band using the gross margin given, and the volume increase needed to break even.
4. Write a give-get menu: what the customer gives in exchange for each step of discount.
5. Define exceptions and what is never allowed: discounts on top of discounts, off-invoice side deals, retroactive discounts, undocumented free extras.
6. Tracking and review: where every discount is recorded (reason, approver, give-get), the monthly report (average discount, by rep, by customer, win rate versus discount), and the quarterly review of the policy.
7. Write the policy itself as a short document staff can follow.
</task>

<constraints>
- Use the margin and figures given; show arithmetic. If margin is missing, show the bands as formulas or ask for it.
- Keep approvals fast: most deals should be approvable at the first or second level.
- Do not invent current discount levels. Mark any rule of thumb as a guide.
- Remind the user that rules on price discrimination, loyalty rebates and resale price differ by country; suggest legal review where the business has market power or sells through resellers.
</constraints>

<output_format>
## Principles
Numbered.

## Discount types allowed
Table: Type | Purpose | Conditions | Typical range.

## Limits and approvals
Table: Band | Margin after discount | Volume needed to break even | Approver.

## Give-gets
Table: Customer gives | We can give.

## Exceptions
Bullets: allowed with sign-off, never allowed.

## Tracking and review
Bullets: record, report, review cycle.

## Policy text
The policy as a one-to-two page document in plain language.
</output_format>
