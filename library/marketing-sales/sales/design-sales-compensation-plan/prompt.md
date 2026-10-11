---
schema: 1
id: design-sales-compensation-plan
kind: prompt
title: Design a sales compensation plan
description: Designs a sales comp plan - on-target earnings and pay mix, measures, rates, accelerators, caps, clawbacks and plain-language payout examples reps can check themselves.
category: sales
version: 1.0.0
status: incubating
stage: [design]
role: [founder, executive, manager, financial-analyst]
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sales-compensation, commission-plan, on-target-earnings, accelerators, incentive-design]
pairs_with:
  prompts: [set-sales-quotas, build-commission-calculator, plan-sales-territory]
args:
  - name: business
    description: What you sell, deal sizes, sales cycle, recurring or one-off revenue, gross margin, the roles to cover (new business reps, account managers, SDRs) and what the company most needs this year (new logos, multi-year deals, margin, retention).
    type: text
    required: true
  - name: current
    description: Current pay (base, commission, OTE) per role, how it works today, what goes wrong (sandbagging, discounting, disputes, reps chasing the wrong deals), and the budget for sales pay as a share of revenue if known. Optional.
    type: text
  - name: country
    description: Country or countries where reps are employed, so the plan can flag local rules on commissions and pay. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Principles, Plan per role, Payout examples, Rules and edge cases, Cost check, Rollout, Check with HR and legal]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design sales compensation plans for small and growing companies. Reps do what the plan pays for, not what the leadership deck says, so a plan that pays on bookings regardless of discount gets discounts, one that caps earnings makes top reps stop in month ten, and one too complex to calculate on a napkin creates distrust and disputes. Comp designers know the main levers: on-target earnings (OTE) set against the market for the role; pay mix (the split of base and variable) set by how much the rep influences the outcome, more variable for hunters, less for account managers and SDRs; one to three measures at most; a commission rate that pays the variable part at 100% of quota; accelerators above quota and decelerators or thresholds below it; clear rules for when commission is earned (booking, invoice, cash), splits, clawbacks and quota relief. Every plan should be tested with worked examples at low, target and high attainment before it is announced.
</context>

<task>
<business>
{{business}}
</business>

{{#current}}<current>
{{current}}
</current>{{/current}}

{{#country}}Country: {{country}}{{/country}}

1. **Principles:** three to five principles for this plan derived from the company's needs (for example "pay more for multi-year terms", "simple enough to check on one page"), and what behaviours the current plan rewards by accident.
2. **Plan per role:** for each role, OTE (use the figures given; if none, say market data for the role and location must be checked and use placeholders), pay mix, measures and weights, quota basis, base commission rate and how it was derived (variable at target divided by quota), accelerators, any threshold, cap policy, payment timing and when commission is earned.
3. **Payout examples:** for each role, payouts at 50%, 80%, 100%, 130% and 180% of quota, with the calculation shown, plus one example of a discounted deal and a multi-year deal if relevant.
4. **Rules and edge cases:** splits between reps, deals that cancel or do not pay (clawback window and how it is calculated), territory changes, leavers and joiners, quota relief, deals over a size that need review, and how disputes are raised.
5. **Cost check:** total expected sales pay at target and at a high-performance scenario, as a percentage of the revenue it brings, compared with the budget if given.
6. **Rollout:** how to explain the plan, the one-page plan document contents, timing before the period starts and a review date.
7. **Check with HR and legal:** the points that depend on local employment law and contracts.
</task>

<constraints>
- Show every rate and payout calculation so it can be checked.
- Do not state market pay levels as fact; ask for or use the user's figures and mark placeholders clearly.
- Commission and wage rules differ by country (for example, whether written plans are required, whether earned commission can be clawed back, holiday pay on commission, payment after leaving). Do not state specific legal requirements as settled; list the questions for HR or an employment lawyer, naming the country if given.
- Keep the plan to at most three measures per role unless the user insists, and explain why.
- If the business details are too thin to design a plan, ask for what is needed and stop.
</constraints>

<output_format>
## Principles
Numbered list, then the behaviours the current plan rewards by accident.

## Plan per role
One table per role: Element | Design | Reason.

## Payout examples
Table per role: Attainment | Calculation | Variable pay | Total pay.

## Rules and edge cases
Bullets.

## Cost check
Table and a short verdict.

## Rollout
Numbered steps.

## Check with HR and legal
Bullets.
</output_format>
