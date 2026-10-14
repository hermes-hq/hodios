---
schema: 1
id: prepare-for-pay-transparency-rules
kind: prompt
title: Prepare for pay transparency rules
description: Builds a readiness plan for pay transparency obligations - ranges in job ads, documented pay criteria, gap reporting and employee pay information requests - with a gap check and owners.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, executive, founder]
advice_risk: [legal]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pay-transparency, pay-ranges, gender-pay-gap, pay-criteria, compliance-readiness]
pairs_with:
  prompts: [design-salary-bands, analyze-pay-equity, evaluate-job-for-grading, write-workplace-policy]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Countries, states or regions where you employ people or advertise roles, headcount in each, and whether you have employee representatives.
    type: text
    required: true
  - name: current_practice
    description: What exists today - salary bands or none, how pay is set and reviewed, whether job ads show pay, what pay data you hold and in which system, any past gap reporting.
    type: text
    required: true
  - name: known_rules
    description: The rules you already know apply, with their source and effective dates, if you have them (for example from a lawyer or an official guidance page). Optional; the plan will not invent them.
    type: text
output_contract:
  format: markdown
  sections: [Scope and assumptions, Obligation areas, Gap check, Readiness plan, Employee and manager communication, Questions for an employment lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help HR prepare for pay transparency the way an experienced reward and compliance lead would. Pay transparency rules now exist in many places and are spreading, but they differ a great deal: some require a pay range in job ads, some ban asking candidates for their pay history, some give employees the right to ask for pay information about comparable roles, some require gap reporting by gender above a size threshold, and some require joint pay assessments when a gap is unexplained. What experts know: the work is mostly internal before it is legal; organisations without a job architecture, written pay criteria and clean data cannot answer a pay information request or publish a defensible range; the first gap report often surprises leadership, so run it privately first; managers need to be ready for the conversations that published ranges start; and existing contracts with pay secrecy clauses may need review. Effective dates and thresholds change, so never rely on memory for them.

<organisation>
{{organisation}}
</organisation>

<current_practice>
{{current_practice}}
</current_practice>
{{#known_rules}}
<known_rules>
{{known_rules}}
</known_rules>
{{/known_rules}}
</context>

<task>
1. Scope and assumptions: list each jurisdiction in scope and state that the specific obligations, thresholds and dates must be confirmed for each. Use known rules only as the user gave them.
2. Obligation areas: for the common areas (pay in job ads, pay history questions, pay criteria and progression, employee information requests, gap reporting, joint pay assessment, pay secrecy clauses, record keeping), say what readiness looks like in practice, without asserting that each one applies.
3. Gap check: compare current practice with each area and rate readiness (ready, partial, missing) with the evidence.
4. Readiness plan: the work in sequence, usually job architecture and levels, written pay criteria, salary ranges, data clean-up, a private gap analysis, fixing unexplained gaps, contract and policy updates, a request-handling process with response times, and job ad templates. Give owners, effort and order.
5. Employee and manager communication: what to tell people and when, manager talking points for "why am I at this point in the range?", and how to handle requests.
6. Questions for an employment lawyer, per jurisdiction.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that a specific law, threshold, deadline or penalty applies; present them as items to confirm with the source and date.
- Do not suggest ways to avoid or delay obligations, such as splitting entities or removing pay data.
- Do not recommend lowering anyone's pay to close a gap.
- Use roles, not names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
## Obligation areas
Table: Area | What readiness means | Confirm locally.
## Gap check
Table: Area | Current state | Rating | Evidence.
## Readiness plan
Table: Step | Owner | Effort | Depends on.
## Employee and manager communication
## Questions for an employment lawyer
Numbered, grouped by jurisdiction.
</output_format>
