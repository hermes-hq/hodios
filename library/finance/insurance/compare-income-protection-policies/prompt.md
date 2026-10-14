---
schema: 1
id: compare-income-protection-policies
kind: prompt
title: Compare income protection policies
description: Compares income protection or disability insurance quotes on the incapacity definition, waiting period, benefit period and amount, premium type and exclusions, against your sick pay and savings.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [document, text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [income-protection, disability-insurance, own-occupation, deferred-period, sick-pay]
pairs_with:
  prompts: [review-insurance-coverage, calculate-life-cover-need, prepare-insurance-disclosure]
args:
  - name: quotes
    description: "Each quote or policy: monthly benefit, definition of incapacity (own occupation, suited occupation, any occupation, or activities of daily living), waiting or deferred period, benefit period, premium and whether it is guaranteed or reviewable, indexation, offsets for other income, exclusions."
    type: text
    required: true
  - name: work_and_money
    description: Your occupation and its duties, employed or self-employed, income, employer sick pay and how long it lasts, savings you could live on, essential monthly costs, and country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Quotes side by side, Does the definition fit your work, Waiting period versus sick pay and savings, How much and for how long, Exclusions and terms to check, Questions for the insurer or adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Income protection (called disability insurance in some countries) pays a monthly income if illness or injury stops you working. Policies that look alike on price can be worlds apart. The definition of incapacity decides whether it pays: "own occupation" pays if you cannot do your own job, "suited occupation" if you cannot do a job suited to your experience, "any occupation" only if you cannot work at all, and activities-of-daily-living tests are stricter still. The waiting (deferred) period should start when employer sick pay or savings run out; a longer one is cheaper. The benefit period matters most: short-term policies pay for one or two years, full-term policies pay until retirement age, and long illnesses are where the real financial damage happens. Benefit is usually capped as a share of income and may be reduced by other income. Guaranteed premiums stay fixed; reviewable ones can rise. Self-employed people may need to prove income from accounts. Mental health and musculoskeletal problems are among the most common reasons for long absence, so exclusions there matter.

<work_and_money>
{{work_and_money}}
</work_and_money>
</context>

<task>
<quotes>
{{quotes}}
</quotes>

1. Line the quotes up: benefit, definition, waiting period, benefit period, premium and type, indexation, offsets, exclusions. Mark anything not stated.
2. Does the definition fit your work: for each quote, whether a realistic illness or injury that stops this person doing their specific job would trigger payment, with an example for their occupation.
3. Waiting period versus sick pay and savings: how long employer sick pay lasts and how many months savings cover essential costs; whether each quote's waiting period leaves a gap or pays when it is not needed.
4. How much and for how long: whether the benefit (after any offsets and tax treatment to check) covers essential costs, and what each benefit period would mean for an illness lasting 6 months, 3 years and until retirement, with arithmetic.
5. Exclusions and terms to check: mental health, back problems, pre-existing conditions, dangerous pursuits, premium reviews, partial or proportionate benefit when returning part-time, and how the insurer handles a change of job.
6. Summary of trade-offs without choosing for the person, and questions for the insurer or a regulated adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Compare only what the quotes state; never assume a definition or term that is not given.
- Do not recommend a specific insurer, product or exact benefit amount; describe the trade-offs.
- Do not state tax treatment of benefits as fact; it varies by country and by who pays the premium. Mark it to check.
- Remind the person that accurate answers on the application decide whether a claim is paid.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three or four sentences on the key trade-offs.

## Quotes side by side
Table: feature | quote 1 | quote 2 | ...

## Does the definition fit your work
Bullets per quote with an example.

## Waiting period versus sick pay and savings
Timeline in bullets.

## How much and for how long
Table: illness length | quote 1 pays | quote 2 pays | ... with arithmetic.

## Exclusions and terms to check
Bullets.

## Questions for the insurer or adviser
Numbered.
</output_format>
