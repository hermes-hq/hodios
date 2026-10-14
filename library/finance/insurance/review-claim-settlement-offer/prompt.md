---
schema: 1
id: review-claim-settlement-offer
kind: prompt
title: Review an insurance settlement offer
description: Checks an insurer's settlement offer against the policy and the evidence - valuation, deductions, missing heads of claim - and drafts a reasoned counter or request for a breakdown before you accept.
category: insurance
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent, founder]
requires: [none]
inputs: [document, text]
output: [report, table, message]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [settlement-offer, total-loss, valuation-dispute, claim-negotiation, full-and-final]
pairs_with:
  prompts: [appeal-insurance-denial, price-contents-claim-list, explain-insurance-policy]
  workflows: [insurance-claim-track]
args:
  - name: offer
    description: The insurer's offer and how they explained it - amount, any breakdown, deductions (excess, wear and tear, betterment, underinsurance), and any "full and final settlement" wording.
    type: text
    required: true
  - name: claim
    description: What happened, what you claimed for, the evidence you sent, and the relevant policy wording (settlement basis, limits, extras such as alternative accommodation or a courtesy car).
    type: text
    required: true
  - name: evidence
    description: Your own evidence of value - comparable adverts for a written-off car, repair quotes, replacement prices, receipts.
    type: text
output_contract:
  format: markdown
  sections: [Summary, The offer broken down, Checks against the policy, What may be missing, Your evidence of value, Draft reply, Next steps if it is not resolved]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An insurer's first offer is a starting position, not a ruling, and accepting it in "full and final settlement" usually ends the claim. Offers are often low for checkable reasons: a written-off car valued below what comparable cars actually sell for, deductions for wear and tear or "betterment" that the policy does not allow, an underinsurance reduction applied without showing the calculation, a cash settlement at the insurer's discounted supplier price, or heads of claim left out entirely (emergency repairs, alternative accommodation, damaged food, professional fees, loss of use, recovery and storage). The policy wording decides what is owed. A reply that asks for the breakdown, quotes the clauses and sets out evidence of value gets further than an angry one. If the dispute remains, most countries have an internal complaints process followed by an ombudsman, regulator or dispute service, often with time limits.

<claim>
{{claim}}
</claim>
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
<offer>
{{offer}}
</offer>

1. Break the offer down: what it pays for each part of the claim, each deduction, and anything unexplained. If there is no breakdown, the first step is to ask for one.
2. Check against the policy: settlement basis (new for old, indemnity, market value for vehicles), whether each deduction is allowed by the wording quoted, whether limits and the excess are applied correctly, and whether any underinsurance reduction is calculated correctly.
3. What may be missing: heads of claim the policy covers that the offer omits, given the event.
4. Your evidence of value: compare the person's evidence with the offer (for a car: like-for-like age, mileage, condition and specification adverts; for repairs: independent quotes) and compute the gap.
5. Draft reply: polite and specific, asking for a written breakdown, citing the clauses, attaching evidence, stating the amount the person believes is due and why, and asking for a response by a reasonable date. Say clearly that the person should not sign anything marked "full and final" until satisfied.
6. Next steps if not resolved: formal complaint, the timescale for a final response, the ombudsman or dispute service in their country (to confirm), and when independent advice (a broker, public or loss assessor, solicitor) is worth it given the sums.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not predict that the insurer or an ombudsman will agree; describe the strength of each point.
- Do not invent valuations, prices or policy terms; work only from what is supplied and mark gaps.
- Do not advise accepting or rejecting; set out the gap and the options.
- Note that professional representatives usually charge a percentage of the settlement; mention it when suggesting them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The offer, the amount you can support with evidence, the gap, and the strongest points.

## The offer broken down
Table: item | offered | deduction | explanation given.

## Checks against the policy
Table: point | clause | allowed? | comment.

## What may be missing
Bullets.

## Your evidence of value
Table: evidence | value | comparison with offer.

## Draft reply
The message, ready to adapt.

## Next steps if it is not resolved
Numbered.
</output_format>
