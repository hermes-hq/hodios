---
schema: 1
id: plan-finances-after-job-loss
kind: prompt
title: Plan your finances after losing a job
description: Plans the money side of losing a job - a first-week checklist, benefit and severance questions, a lean budget, which bills and debts to call, and how long savings will last.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [job-loss, redundancy, unemployment-benefits, severance, runway, lean-budget]
pairs_with:
  prompts: [recover-from-layoff, build-tight-budget, review-severance-agreement, negotiate-with-creditor]
  personas: [personal-finance-coach]
args:
  - name: savings
    description: Cash you can reach without penalties (current and savings accounts), with the currency. Mention separately any retirement or investment money, but it is not counted as runway.
    type: string
    required: true
  - name: monthly_costs
    description: Your usual monthly spending, ideally split into essentials (housing, utilities, food, insurance, minimum debt payments, transport) and the rest. A single total also works.
    type: string
    required: true
  - name: severance
    description: Severance, notice pay, holiday pay or final salary still to come, with amounts and dates if known.
    type: string
    default: none
  - name: country
    description: Country and region, since unemployment benefits, health cover and severance rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [This week, Money still owed to you, Benefits and cover to check, Your lean budget, Runway, Bills and debts to call, Do not do yet, Review points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people steady their finances in the first weeks after losing a job. The early mistakes are predictable and expensive: waiting to claim benefits because it feels temporary (many systems pay from the claim date, not the job loss date), signing a severance agreement without checking it, letting health or income cover lapse, keeping full spending going for months, cashing out retirement savings, and missing payments instead of calling lenders before a payment is due. A clear runway figure - how many months the cash will last on a lean budget - calms the decisions that follow. This prompt is the money side; the job search and career side are a different job.

Savings available: {{savings}}
Usual monthly costs: {{monthly_costs}}
Severance and money still to come: {{severance}}
Country: {{country}}
</context>

<task>
1. Write a "This week" checklist, most urgent first: apply for unemployment or jobseeker benefits now (in many places backdating is limited), check the final pay and severance paperwork, check health insurance and other employer cover end dates and continuation options, collect key documents (contract, termination letter, payslips, benefit IDs), and pause non-essential spending.
2. List the money still owed: final salary, notice pay, untaken holiday, severance, expense claims, bonuses or commission earned, and pension or share plan rights, as questions to confirm with the employer in writing. If the person has not signed a severance agreement yet, say to have it reviewed before signing and that advice is sometimes paid for by the employer.
3. List the benefits and cover to check in {{country}} by type, marked "to verify": unemployment insurance or jobseeker benefits, help with housing costs, health cover options, help with childcare or family costs, and reduced rates for utilities, phone or transport.
4. Build a lean budget: keep essentials, cut or pause the rest, and show the new monthly total next to the old one. If the costs were not split, show the method and ask for the split.
5. Calculate the runway: (savings plus severance still to come) divided by (lean monthly costs minus any expected benefit income), in months, shown with the arithmetic. Give a second figure on the old spending level so the difference is visible. If income is uncertain, show a range.
6. List the bills and debts to call before the next due date, priority first (housing, energy, council or property tax, secured loans, then unsecured credit), what to ask for (payment holidays, reduced payments, hardship plans), and whether any payment protection insurance on loans or cards might cover job loss.
7. List what not to do yet: cashing out retirement accounts, taking new high-cost credit, cancelling insurance that would be costly to restart, and big commitments.
8. Set review points: when to update the budget (after the first benefit decision, at month two, when severance lands), and the runway level at which to escalate (for example, under three months: free debt advice and a harder look at housing costs).
9. Check before answering: every figure in the runway comes from the inputs and the arithmetic is shown and correct.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state benefit amounts, eligibility rules, time limits or severance entitlements as facts. Describe what usually exists and say where to verify (the official benefits service, the employer, an employment adviser or union).
- Do not recommend touching retirement savings. If the person raises it, explain the costs and penalties to check and suggest speaking to a regulated adviser first.
- Round to whole currency units.
- Keep the tone steady and practical. Job loss is stressful; acknowledge it once, then focus on actions.
- If the person mentions feeling hopeless or unsafe, respond with care and point to local crisis or support services before the money steps.
</constraints>

<output_format>
## This week
Checklist, most urgent first.

## Money still owed to you
Bullets phrased as questions to confirm in writing.

## Benefits and cover to check
Table: support type | what to check | where.

## Your lean budget
Table: category | before | lean.

## Runway
The arithmetic and the result in months, at lean and old spending.

## Bills and debts to call
Ordered list with what to ask for.

## Do not do yet
Bullets.

## Review points
Dated or triggered checkpoints.
</output_format>
