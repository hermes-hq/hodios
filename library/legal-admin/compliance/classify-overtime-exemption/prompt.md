---
schema: 1
id: classify-overtime-exemption
kind: prompt
title: Check who is entitled to overtime and minimum wage
description: Checks role by role whether staff are exempt from overtime and minimum wage rules or entitled to them, testing pay, duties and hours, with records to keep and back-pay exposure.
category: compliance
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, manager]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [overtime, minimum-wage, exempt-employees, wage-and-hour, working-time, back-pay]
pairs_with:
  prompts: [design-on-call-and-overtime-pay, set-up-first-payroll, check-first-hire-employer-obligations]
args:
  - name: roles
    description: "Each role - title, what the person really spends time doing, whether they manage others or make independent decisions, pay (salary or hourly, amount), usual and peak weekly hours, and unpaid time such as training, travel between sites or on-call. No names."
    type: text
    required: true
  - name: jurisdiction
    description: Country, and state, province or city where staff work, because wage and hour rules differ by place of work.
    type: string
    required: true
  - name: pay_practices
    description: How hours are recorded, how overtime is paid or compensated now, deductions from pay (uniforms, tills, breakages), and any collective agreement. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Role-by-role test, Minimum wage check, Records to keep, Exposure, Fixes, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an employer check whether each role is entitled to overtime pay and the minimum wage, before a complaint or audit finds out first. Job titles and paying a salary do not decide it. In the United States, federal law exempts some employees from overtime only if they meet a salary basis test, a minimum salary level and a duties test (executive, administrative, professional, certain computer roles, outside sales), and many states set higher salary levels, daily overtime or stricter duties tests; the federal salary level has changed and been litigated, so the current figure must be checked. Elsewhere, working time is usually governed by maximum average weekly hours, rest breaks and holiday rules, and overtime pay often comes from the contract or a collective agreement rather than statute. Minimum wage is often breached without anyone intending it: salaried staff working long weeks fall below the hourly minimum, unpaid trial shifts, training, travel between jobs, mandatory pre-shift time or on-call time at the workplace count as working time in many places, and deductions for uniforms or shortages can push pay below the minimum. Claims can go back several years and may add penalties or double damages, and the employer usually carries the burden of proof if hours were not recorded.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Roles:
<roles>
{{roles}}
</roles>
{{#pay_practices}}

Pay practices:
<practices>
{{pay_practices}}
</practices>
{{/pay_practices}}

1. Role-by-role test: for each role, apply the tests that typically apply in this jurisdiction, show the facts that point each way, and give a conclusion of likely exempt, likely entitled, or unclear. Treat duties actually performed as more important than the title or the contract wording.
2. Minimum wage check: for salaried and hourly roles, divide pay by all hours that likely count as working time, including the unpaid time described, and flag any role that may fall below the minimum. Show the calculation with the minimum wage as a figure the user supplies or a placeholder to confirm.
3. Records to keep: hours, breaks, pay calculations and how long to keep them, including for staff the employer believes are exempt.
4. Exposure: describe in plain words what back pay, interest, penalties or damages could look like for each problem role, without inventing figures, and what makes it worse (no time records, knowingly ignoring the issue).
5. Fixes: options such as reclassifying to hourly, raising salary above the threshold where the duties qualify, changing duties, recording time, paying for currently unpaid time, and how to correct the past (often with advice), in order of urgency.
6. Points to verify, and when to involve an employment lawyer or payroll adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state salary thresholds, minimum wage rates, overtime multipliers or limitation periods as fact unless the user supplied them; give the type of rule and mark it "confirm current figure for {{jurisdiction}}".
- Do not help design arrangements whose purpose is to avoid paying wages that are legally owed, such as off-the-clock work or relabelling staff as managers without changing their duties; say why and give the lawful alternative.
- If the facts suggest unpaid wages are already owed, say so plainly and recommend taking advice on correcting it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Role-by-role test
Table: role | tests applied | facts for exempt | facts against | likely result.

## Minimum wage check
Table: role | pay | hours counted | effective hourly pay | issue.

## Records to keep
Checklist.

## Exposure
Bulleted list per problem role.

## Fixes
Numbered list, most urgent first.

## Points to verify
Numbered list.
</output_format>
