---
schema: 1
id: business-turnaround-track
kind: workflow
title: Turn around a declining business
description: Takes a declining business through a turnaround in gated steps - cash triage, diagnosis, cost and focus decisions, a turnaround plan and weekly tracking.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review, plan, operate]
role: [founder, executive, consultant]
advice_risk: [financial, legal]
requires: [none]
inputs: [dataset, text, notes]
output: [report, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [turnaround, cash-crisis, restructuring, thirteen-week-cash-flow, recovery-plan]
pairs_with:
  prompts: [forecast-cash-flow, decide-whether-to-close-site, prioritize-strategic-initiatives, find-pricing-leakage]
  personas: [management-consultant, small-business-advisor]
args:
  - name: business
    description: The business - what it sells, size, how results have declined and over what period, what has been tried, and the owners' goals.
    type: text
    required: true
  - name: figures
    description: Recent monthly sales, gross margin, overheads, cash balance, debts and payment terms, overdue creditors and any lender covenants. Step 1 asks for what is missing.
    type: text
steps:
  - {id: cash, file: steps/01-cash-triage.md, stage: review, gate: approve, artifact: "turnaround/01-cash-triage.md"}
  - {id: diagnosis, file: steps/02-diagnosis.md, stage: review, gate: approve, artifact: "turnaround/02-diagnosis.md"}
  - {id: decisions, file: steps/03-decisions.md, stage: plan, gate: approve, artifact: "turnaround/03-decisions.md"}
  - {id: plan, file: steps/04-plan.md, stage: plan, gate: approve, artifact: "turnaround/04-plan.md"}
  - {id: tracking, file: steps/05-weekly-tracking.md, stage: operate, gate: none, artifact: "turnaround/05-weekly-tracking.md"}
output_contract:
  format: markdown
  sections: [Step artifact, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a business in decline through a turnaround: secure cash first, find the real causes, make the hard choices, write a plan and track it weekly. Each step writes one artifact and stops for approval.

<business>
{{business}}
</business>
{{#figures}}

<figures>
{{figures}}
</figures>
{{/figures}}

Rules for every step:
{{> guardrails/professional-limits}}
- Cash comes before profit: no step may propose spending that the cash forecast cannot carry.
- Use only figures given or confirmed; mark gaps as [X] and show arithmetic.
- If the business may be unable to pay its debts as they fall due, say so plainly and tell the owner to see an insolvency practitioner or restructuring adviser now; directors' duties change in that situation and vary by country.
- Staff cuts, contract exits and creditor deals need legal advice and must follow local law; never draft anything that misleads staff, creditors or lenders.
