---
schema: 1
id: assess-flexible-working-request
kind: prompt
title: Assess a flexible working request
description: Helps HR and a manager decide an employee's flexible working request on its merits - the business impact, alternatives, a trial period, consistency - and draft the outcome letter.
category: hr-operations
version: 1.0.0
status: incubating
stage: [review]
role: [operations-manager, manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [document, text]
output: [report, message, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [flexible-working, part-time-request, hybrid-work, trial-period, outcome-letter]
pairs_with:
  prompts: [write-workplace-policy, plan-workplace-adjustments-as-manager, answer-employee-hr-question]
  personas: [hr-business-partner]
args:
  - name: request
    description: The employee's request (role, no name needed) - what pattern they want (hours, days, location, compressed week, job share), from when, and the reasons they gave if any.
    type: text
    required: true
  - name: role_context
    description: What the role involves, team cover, customer or shift needs, the manager's concerns, and how similar requests in the team were decided.
    type: text
    required: true
  - name: company
    description: Country or state, the company's flexible working policy if any, and the deadlines it sets for a decision. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Process check, Impact assessment, Options, Recommendation, Outcome letter, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help HR and a manager decide a flexible working request fairly. What experienced HR practitioners know: many countries give employees a right to request flexible working and require employers to consider it seriously, respond within set deadlines, and refuse only for business reasons, sometimes from a set list. The request should be judged on what the role needs, not on the employee's reasons for asking or a manager's general preference for presence. Most good outcomes are a "yes, but" (a different pattern, a trial period with review criteria) rather than yes or no. Inconsistency is the main risk: granting similar requests to some people and not others, or refusing in a way that disadvantages carers, disabled people or another protected group. If the request is linked to a disability or health condition, it may also be a reasonable adjustment request with different duties.

<request>
{{request}}
</request>

<role_context>
{{role_context}}
</role_context>
{{#company}}
<company>
{{company}}
</company>
{{/company}}
</context>

<task>
1. Process check: the country assumption, decision deadlines and meeting or appeal steps that may apply, as points to confirm locally; and whether the request may also be an adjustment request linked to health or disability.
2. Impact assessment: for each part of the request, the concrete effect on cover, customers, quality, cost and colleagues, with evidence, separating real constraints from preference.
3. Options: approve as asked; approve a modified pattern; a trial period with measurable review criteria and a date; refuse with a stated business reason. Note consistency with past decisions.
4. Recommendation: one option, with the reasoning a tribunal or reviewer would accept.
5. Outcome letter: clear, respectful; the decision, the pattern and start date or trial terms, the business reason if any part is refused, and how to appeal if the policy provides it.
6. Questions for an employment lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state statutory deadlines, eligibility rules or the list of refusal grounds as fact; mark them "confirm locally".
- Do not weigh the employee's personal reasons for asking (childcare, health, study) against them.
- Never recommend a refusal on grounds the evidence does not support; say what evidence would be needed.
- Use the role, not the person's name.
{{> output/uncertainty}}
</constraints>

<output_format>
## Process check
## Impact assessment
Table: Element requested | Impact | Evidence | Real constraint?
## Options
## Recommendation
## Outcome letter
Ready to adapt.
## Questions for an employment lawyer
Numbered.
</output_format>
