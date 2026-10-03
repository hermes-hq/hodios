---
schema: 1
id: compare-pet-insurance
kind: prompt
title: Compare pet insurance
description: Compares pet insurance policy types and terms (lifetime, annual, accident-only, excess, limits) for a pet, with a worked claim example and questions to ask insurers. Use before buying cover.
category: pet-care
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [pet-insurance, vet-costs, insurance-comparison, pre-existing-conditions, policy-terms]
pairs_with:
  prompts: [prepare-vet-visit, plan-new-pet-care, review-insurance-coverage]
  personas: [pet-care-advisor]
args:
  - name: pet
    description: Species, breed or mix, age, any past or current health issues (these are often excluded), and whether you already have a policy.
    type: text
    required: true
  - name: country
    description: Where you live, for example "UK", "US (Texas)", "Germany", "Australia". Policy types and terms differ by market.
    type: string
    required: true
  - name: budget
    description: What you could pay per month for insurance, with currency, and roughly how big a vet bill you could cover from savings. Optional; it matters for the insure-or-save question. Paste any quotes you have here too.
    type: string
output_contract:
  format: markdown
  sections: [What matters for your pet, Policy types, Terms to compare, Worked example, Insurance or savings, Questions to ask insurers, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain pet insurance the way an independent consumer-finance writer who has read hundreds of policy wordings would. The cheapest premium often hides the weakest cover, and the most expensive surprise is a long-term condition that a policy stops paying for after a year or after a per-condition cap.

Common structures (names vary by market):
- Accident-only: injuries, not illness.
- Time-limited: pays for each condition for 12 months from first treatment, then excludes it.
- Maximum benefit: pays up to a cap per condition with no time limit, then excludes it.
- Lifetime: an annual vet-fee limit that resets each year at renewal, so ongoing conditions stay covered while the policy is renewed.
- In the US and some other markets: accident-and-illness policies set by an annual limit, a deductible (per year or per condition), and a reimbursement rate (often 70, 80 or 90 percent); wellness add-ons for routine care are often poor value.

Terms that change real cover: pre-existing condition exclusions and how far back the insurer looks, bilateral condition exclusions (if one knee is affected, the other may be excluded), waiting periods, co-payments that start at a certain age, premium rises with age and after claims, breed-specific exclusions, dental illness cover, behavioural treatment, complementary therapy, death and euthanasia cover, third-party liability for dogs, and whether the insurer pays the vet directly.

Pet: {{pet}}
Country: {{country}}
{{#budget}}Budget and quotes: {{budget}}{{/budget}}
</context>

<task>
1. If something that changes the answer is missing (age, existing conditions), ask in one line and continue with stated assumptions.
2. What matters for your pet: the likely big-ticket risks for this species, age and breed in general terms (for example cruciate ligament injuries in large dogs, breathing problems in flat-faced breeds, dental disease in cats), and how existing conditions affect cover.
3. Policy types: the structures available in {{country}}, in that market's terms, with how each would pay for a one-off injury and for a lifelong condition. Use a table.
4. Terms to compare: the checklist above, explained in one line each, in order of how much they matter for this pet.
5. Worked example: take two realistic claims for this pet (a one-off surgery and a condition needing treatment for several years) and show what the owner would pay under two or three policy structures, with the premium, excess or deductible, co-pay and limits. Label every figure as illustrative, or use the user's quotes when given.
6. Insurance or savings: when self-insuring with a dedicated savings fund can make sense (an older pet with many exclusions, a large emergency fund) and when it is risky (a young pet, little savings, a breed with known costly conditions). Be balanced.
7. Questions to ask insurers before buying.
8. Red flags in quotes and policy wording.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific insurer or claim one is the best. If the user pastes quotes, compare them on the terms above and say which fits their stated priorities and why, as information rather than advice.
- Never invent current premiums, limits or regulations. Tell the user to read the policy wording and the official summary document, which overrides any marketing page.
- If the user is in a market you know less well, say so and keep to the general structures.
</constraints>

<output_format>
## What matters for your pet
## Policy types
A table: Type | How it pays | Good for | Weak spot.
## Terms to compare
## Worked example
A table: Scenario | Policy | Premiums | You pay | Insurer pays.
## Insurance or savings
## Questions to ask insurers
## Red flags
</output_format>
