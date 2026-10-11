---
schema: 1
id: design-wellbeing-program
kind: prompt
title: Design an employee wellbeing programme
description: Designs an employee wellbeing programme from survey, absence and turnover evidence, choosing initiatives that address root causes in work design as well as support, with a budget and evaluation plan.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [operations-manager, executive, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employee-wellbeing, burnout-prevention, psychosocial-risk, workload, employee-assistance]
pairs_with:
  prompts: [design-engagement-survey, design-absence-management-process, design-benefits-package, rebalance-team-workload]
  personas: [hr-business-partner]
args:
  - name: evidence
    description: What you know - engagement or pulse survey results, absence reasons in aggregate, turnover and exit interview themes, overtime or workload data - anonymised and summarised.
    type: text
    required: true
  - name: organisation
    description: Headcount, type of work, locations, current wellbeing offer (for example an assistance programme, gym subsidy) and how much it is used.
    type: text
    required: true
  - name: budget
    description: Budget per head or in total, and who has to approve it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the evidence says, Root causes, Programme design, Budget, Evaluation, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design wellbeing programmes the way an evidence-minded occupational health and HR lead does. What experts know: individual offers (apps, yoga, resilience training) are popular to buy but show weak effects on their own; the strongest drivers of work-related stress are organisational - workload, control over work, role clarity, support from managers, fairness and change handled badly - and many countries treat these psychosocial risks as part of health and safety duties; manager capability is the most effective lever; low use of an employee assistance programme usually means people do not know about it or do not trust its confidentiality; and programmes with no baseline and no measure cannot show they worked. Good programmes combine fixes to work design, manager training, accessible support and a small number of visible initiatives people asked for.

<evidence>
{{evidence}}
</evidence>

<organisation>
{{organisation}}
</organisation>
{{#budget}}
<budget>
{{budget}}
</budget>
{{/budget}}
</context>

<task>
1. What the evidence says: the three to five clearest signals, with the numbers given, and what is missing. Separate signals from guesses.
2. Root causes: link each signal to likely causes in work design, management, support or personal factors, and say what would confirm each.
3. Programme design: initiatives in three layers - prevent (work design, workload, role clarity, policies), equip (manager training, conversations), support (assistance programme, adjustments, signposting) - each with the problem it addresses, owner, cost, effort and timing. Include at least one change to how work is done, not only individual support.
4. Budget: allocation across initiatives within the stated budget, and what to cut first if needed.
5. Evaluation: the baseline, measures (survey items, absence for stress-related reasons, assistance programme use, turnover, overtime), when to measure and what result would justify continuing each initiative.
6. Questions for leadership.
</task>

<constraints>
- Use only the data given; never invent survey scores or rates.
- Do not recommend monitoring individuals' health, mood or personal data; report only aggregated, anonymous data with minimum group sizes.
- Do not frame stress as an individual resilience problem when the evidence points to workload or management.
- Health and safety duties on psychosocial risk vary by country; flag them to confirm locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the evidence says
## Root causes
Table: Signal | Likely cause | How to confirm.
## Programme design
Table: Layer | Initiative | Problem addressed | Owner | Cost | Timing.
## Budget
## Evaluation
Table: Measure | Baseline | Target | When.
## Questions
Numbered.
</output_format>
