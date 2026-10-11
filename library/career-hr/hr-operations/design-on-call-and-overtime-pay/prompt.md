---
schema: 1
id: design-on-call-and-overtime-pay
kind: prompt
title: Design on-call and overtime pay
description: Designs how a company pays for on-call standby, call-outs and overtime - eligibility, rates or allowances, time off in lieu, rest rules, costs and the wording for the policy - flagging legal checks.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, engineering-manager, executive]
advice_risk: [legal]
requires: [none]
inputs: [text, dataset]
output: [table, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [on-call-pay, overtime, standby-allowance, time-off-in-lieu, working-time]
pairs_with:
  prompts: [design-on-call-rotation, write-workplace-policy, design-salary-bands, design-benefits-package]
  personas: [hr-business-partner]
args:
  - name: work
    description: Which teams work outside normal hours, how (standby from home, call-outs, planned weekend work, shift extensions), how often, typical call-out length, and how it is paid today.
    type: text
    required: true
  - name: context
    description: Countries or states, headcount by team, salary levels or bands, whether staff are classed as exempt or non-exempt where that applies, collective agreements, budget, and complaints or turnover linked to on-call.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current state and risks, Design options, Recommended scheme, Cost, Policy wording, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design pay for out-of-hours work the way an experienced reward and HR lead does. What experts know: on-call has three parts that are often paid as one: being available (standby), being called out (active work), and the disruption afterwards (lost sleep, rest periods). In some jurisdictions standby time can count as working time depending on how restricted the person is, and some workers are legally entitled to overtime pay while others are not, so classification matters before design. "It's included in your salary" may be lawful for some staff and still drive attrition when on-call load is uneven. A good scheme pays a flat standby allowance per period, pays call-outs by time with a minimum, gives rest or time off after night work, caps frequency, and is costed against real call-out data. Fairness across teams and part-timers needs checking.

<work>
{{work}}
</work>

<context_details>
{{context}}
</context_details>
</context>

<task>
1. Current state and risks: how out-of-hours work is paid now, who may be under-paid relative to legal entitlements (as questions to confirm), uneven load, and rest-period concerns.
2. Design options: for standby, call-outs and overtime separately, two or three options each (flat allowance, hourly rate or multiplier, time off in lieu, included in salary with a cap), with pros and cons.
3. Recommended scheme: eligibility, standby allowance basis, call-out pay with a minimum period, overtime rule, time off in lieu rules, rest after night call-outs, maximum frequency, and how part-timers and people at different grades are treated.
4. Cost: annual cost from the user's call-out data and headcount, with the working; mark assumptions.
5. Policy wording: short, plain clauses ready to go into a policy.
6. Questions for an employment lawyer: working time, classification, rest and record-keeping points.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state whether standby counts as working time, who is exempt from overtime, or minimum rest periods as fact; mark them "confirm locally".
- Do not invent market rates for allowances; base figures on the user's budget and pay data, or leave them as variables.
- Show the working for every cost.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state and risks
## Design options
Table: Element | Option | Pros | Cons.
## Recommended scheme
## Cost
## Policy wording
## Questions for an employment lawyer
Numbered.
</output_format>
