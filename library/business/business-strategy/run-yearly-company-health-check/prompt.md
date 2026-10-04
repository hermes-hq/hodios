---
schema: 1
id: run-yearly-company-health-check
kind: prompt
title: Run an annual business health check
description: Runs a yearly health check for a small business across customers, money, people, operations, risk and the owner's own load, scoring each with evidence and choosing the top three fixes.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, operations-manager]
requires: [none]
inputs: [text, dataset, notes]
output: [checklist, report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [business-review, scorecard, year-end, owner-wellbeing, risk-review, top-three-fixes]
pairs_with:
  prompts: [write-one-page-strategy-for-owners, reduce-owner-dependence, forecast-cash-flow]
  personas: [small-business-advisor]
  workflows: [owner-strategy-refresh-track]
args:
  - name: business
    description: What the business does, size (sales, staff, sites), how the year went in your words, and anything keeping you awake.
    type: text
    required: true
  - name: figures
    description: Key figures for this year and last - sales, gross margin, profit, cash at year end, debtor days, customer counts or repeat rate, staff turnover, hours you worked. Optional; gaps are marked.
    type: text
output_contract:
  format: markdown
  sections: [Overall reading, Scorecard, Strengths to protect, Top three fixes, Evidence to gather, Next review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run an annual health check for a small business, the way a good adviser would at a year-end meeting. Owners tend to judge the year on sales alone and miss slower problems: margin eroding while sales grow, cash tied up in unpaid invoices, one customer or one key person carrying the business, stale insurance and contracts, and an owner working unsustainable hours. A useful check covers six areas, scores each against evidence rather than feeling, and ends in no more than three fixes so something actually changes.
</context>

<task>
<business>
{{business}}
</business>

{{#figures}}
<figures>
{{figures}}
</figures>
{{/figures}}

1. Score six areas from 1 (serious concern) to 5 (strong), each with two to four checks and the evidence used:
   - Customers: repeat rate or retention trend, concentration (largest customer's share of sales), reviews and complaints, where new customers came from.
   - Money: sales and gross margin trend, profit, cash at year end in months of costs, debtor days, debt and overdraft use, prices last reviewed.
   - People: staff turnover, key roles with no cover, training, morale signs, pay compared with what it takes to hire.
   - Operations: capacity used, quality or rework, suppliers' reliability and dependence, systems and records the business runs on.
   - Risk and compliance: insurance renewed and adequate, contracts and leases with dates, data protection, health and safety, licences, succession for key roles. List as items to check; do not state legal requirements.
   - Owner load: hours worked, holidays taken, tasks only the owner can do, the owner's own pay.
2. Where evidence is missing, score "unknown" rather than guessing, and add it to Evidence to gather.
3. Strengths to protect: two or three things working well that changes must not damage.
4. Top three fixes: choose by impact and urgency (cash and concentration risks usually first), each with the first step, owner, cost or effort, and a measure for next year.
5. Next review: what to check monthly and the date of the next annual check.
</task>

<constraints>
- Use only the figures given. Label any rule of thumb (for example months of cash held) as a guide that varies by business.
- No more than three fixes, even if many problems appear; list the rest briefly as "later".
- Be candid but non-judgemental, especially about owner load; if the owner describes exhaustion or serious stress, suggest support from a doctor or a trusted adviser as part of the plan.
- Legal, tax and insurance matters go to an accountant, solicitor or broker as checks.
- If the business description is missing, ask for it and stop.
{{> guardrails/crisis-safety}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Overall reading
Three sentences: the headline, the biggest risk, the biggest opportunity.
## Scorecard
Table: Area | Score (1-5 or unknown) | Evidence | Concern.
## Strengths to protect
Bullets.
## Top three fixes
Table: Fix | First step | Owner | Effort | Measure next year. Then "Later:" with up to five items.
## Evidence to gather
Checklist.
## Next review
Monthly checks and the next annual date.
</output_format>
