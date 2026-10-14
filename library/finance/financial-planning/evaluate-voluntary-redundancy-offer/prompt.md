---
schema: 1
id: evaluate-voluntary-redundancy-offer
kind: prompt
title: Evaluate a voluntary redundancy or early retirement offer
description: Weighs a voluntary redundancy or early retirement package against staying - net payout after tax, pension effects, benefits lost, runway until new income, and the risk of staying.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [voluntary-redundancy, severance-package, early-retirement-offer, job-security, pension-impact]
pairs_with:
  prompts: [review-severance-agreement, plan-finances-after-job-loss, plan-early-retirement-bridge, recover-from-layoff]
  personas: [personal-finance-coach]
args:
  - name: offer
    description: The package - lump sum and how it is made up (statutory, enhanced, notice pay, holiday pay, bonus), pension terms (early access, added years, enhancement), benefits that continue, deadline to decide.
    type: text
    required: true
  - name: situation
    description: Age, salary and take-home pay, pension details, savings, debts, household spending, partner's income, health, job market for your skills, and what you would do next.
    type: text
    required: true
  - name: country
    description: Country, because tax treatment of payouts, unemployment benefit rules and pension access differ.
    type: string
output_contract:
  format: markdown
  sections: [The decision, What the package is worth, Staying, Runway, Pension effects, Questions before the deadline, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide whether to accept a voluntary redundancy, voluntary severance or early retirement package. The headline lump sum is not the number to judge. Parts are taxed differently: in many countries part of a redundancy payment can be tax-free up to a limit while notice pay, holiday pay and bonuses are taxed as earnings (verify locally). The fair comparison is the net payout against what staying would earn, and against the risk of staying: compulsory redundancy later may pay less, while the job may also be secure. The other key figure is runway: how many months the payout and savings cover household spending, against a realistic time to find comparable work for someone of that age and skill set. Early retirement offers can include enhanced or unreduced pensions, which may be worth far more than the cash, or early pension access with a permanent reduction. Lost benefits (health cover, employer pension contributions, life cover, share schemes) have a real value. Taking a voluntary package can affect unemployment benefit in some systems, and paying part of the payout into a pension may save tax. A deadline is common, and negotiation is sometimes possible.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Offer:

<offer>
{{offer}}
</offer>

Situation:

<situation>
{{situation}}
</situation>

1. State the decision and the deadline in one or two lines.
2. Break down what the package is worth: each component, its likely tax treatment (marked "verify"), an approximate net total, and the value of any pension enhancement or benefits that continue. If tax cannot be estimated reliably, say what to ask the employer's payroll or a tax adviser.
3. Describe staying: income and benefits over the next one to three years, and the realistic risk that the role ends anyway on less generous terms, based on what the person knows.
4. Calculate runway: months the net payout plus savings cover essential spending, with and without a partner's income, and compare with a cautious job-search time. Show the arithmetic.
5. Explain pension effects: contributions lost, early access and any permanent reduction, enhancement value, and whether paying part of the payout into a pension may be tax-efficient (verify).
6. List questions to ask before the deadline: tax breakdown, pension figures in writing, benefit continuation, effect on unemployment benefit, whether terms can be improved, and whether legal advice is required or funded for signing a settlement.
7. State assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent tax-free limits, benefit rules or pension reduction rates. Mark any you mention with country and "verify".
- Do not tell the person to accept or refuse; show what the package is worth, the runway and the risks.
- Say that the settlement agreement terms should be reviewed separately, often by a lawyer, before signing.
- Do not pressure toward a decision before the person has the figures in writing.
{{> output/uncertainty}}
</constraints>

<output_format>
## The decision
One or two lines with the deadline.

## What the package is worth
Table: component | gross | likely tax treatment | approx net.

## Staying
Short bullets.

## Runway
Short calculation.

## Pension effects
Bullets.

## Questions before the deadline
Bullets grouped by who to ask.

## Assumptions
Bullets.
</output_format>
