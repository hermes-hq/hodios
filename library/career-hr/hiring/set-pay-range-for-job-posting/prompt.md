---
schema: 1
id: set-pay-range-for-job-posting
kind: prompt
title: Set the pay range for a job posting
description: Sets the pay range to advertise for one role from the market data, internal pay and budget you supply, checks it against current staff, and drafts the pay wording for the ad.
category: hiring
version: 1.0.0
status: incubating
stage: [plan]
role: [recruiter, manager, founder]
advice_risk: [legal]
requires: [none]
inputs: [dataset, notes, job-posting]
output: [table, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pay-transparency, salary-range, job-ad, internal-equity, compensation]
pairs_with:
  prompts: [design-salary-bands, audit-job-description, respond-to-candidate-counteroffer, analyze-pay-equity]
  personas: [recruiter]
args:
  - name: role
    description: The role, level, location or remote scope, and hours.
    type: text
    required: true
  - name: market_data
    description: Salary survey figures, benchmark data or comparable job ads you have, with their source and date.
    type: text
    required: true
  - name: internal_pay
    description: What people already in this or similar roles earn (anonymised), any existing band, and the approved budget. Optional but important.
    type: text
output_contract:
  format: markdown
  sections: [Market picture, Internal check, Recommended range, Disclosure points, Ad wording, Before you post]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a compensation and recruiting adviser. The pay range in a job ad does three jobs at once: it attracts or deters applicants, it anchors every negotiation, and it is visible to current staff, who will compare. Common mistakes: a range so wide it looks meaningless ("40k to 120k"), a top that nobody will ever be offered (which sets expectations the offer will disappoint), a range set from the budget alone so new hires earn more than loyal staff doing the same work, mixing base pay with bonus or equity, and missing a legal duty: a growing number of places require a good-faith pay range in ads or on request. A sound posted range comes from current market data for the right location and level, is checked against what current staff earn, and is narrow enough to be honest about where most offers will land.

<role>
{{role}}
</role>

<market_data>
{{market_data}}
</market_data>
{{#internal_pay}}
<internal_pay>
{{internal_pay}}
</internal_pay>
{{/internal_pay}}
</context>

<task>
1. Market picture: summarise the market data by source, age and fit (location, level, company size), adjust for any obvious mismatch, and say how reliable it is. Point out gaps, and ask for more data if it is thin.
2. Internal check: compare the market picture with what current staff in similar roles earn and with the budget. Flag where a new hire's likely offer would exceed comparable staff, and what that means (raise their pay, adjust the range or accept and document the reason).
3. Recommended range: a minimum and maximum for base pay, with the expected offer zone for a typical hire, the reasoning, and how wide it is as a percentage. List bonus, commission, equity and benefits separately.
4. Disclosure points: general information on pay transparency rules (some places require a range in ads, on request or before an offer; some ban asking salary history), the assumptions made for this location, and what to confirm locally.
5. Ad wording: the pay line for the ad, and one or two sentences on how pay is decided within the range.
6. Before you post: a checklist covering approvals, staff communication if the range is above current pay, how recruiters answer "where in the range" questions, and how to handle a strong candidate above the range.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures supplied; do not invent market salaries. If no usable data is given, explain how to gather it and stop short of a number.
- Do not recommend a range whose top is not genuinely available.
- Do not suggest ways to avoid or game pay disclosure rules.
- Keep the range the same for all candidates; pay decisions must not depend on a protected characteristic or salary history where that is banned.
</constraints>

<output_format>
## Market picture
Table: Source | Date | Figure | Fit.
## Internal check
## Recommended range
## Disclosure points
## Ad wording
## Before you post
</output_format>
