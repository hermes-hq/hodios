---
schema: 1
id: summarize-annual-report
kind: prompt
title: Summarise a company's annual report
description: Summarises an annual report or 10-K into segments, results, cash and debt, new risks, auditor and accounting flags, and changes from last year, pointing to the notes worth reading in full.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual, student, financial-analyst]
subject: [economics]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [annual-report, company-filings, risk-factors, audit-opinion, accounting-red-flags]
pairs_with:
  prompts: [read-company-financials, summarize-earnings-call, research-company-stock]
  personas: [investing-educator]
args:
  - name: report
    description: The annual report, 10-K or equivalent filing, or the key sections pasted in (business overview, management discussion, segment note, risk factors, auditor's report, accounting policies, notes).
    type: text
    required: true
  - name: prior_year
    description: The same sections from last year's report, or last year's key figures, to spot changes. Optional.
    type: text
  - name: focus
    description: Anything you most want to understand, such as debt, one segment or a specific risk. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The year in five lines, Business and segments, Results and cash, Balance sheet and debt, Risks that are new or changed, Auditor and accounting flags, What changed from last year, Notes worth reading in full]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An annual report is written partly as marketing at the front and partly as legally required disclosure at the back, and the useful material is mostly at the back. Experienced readers skip the chair's letter at first and go to the segment note (which businesses really earn the money), management's discussion of results, the cash flow statement, the debt and maturity note, contingencies and litigation, related-party transactions, share-based pay, and the reconciliation of any "adjusted" figures to reported ones. They read risk factors for what is new or reworded rather than the boilerplate, and they read the auditor's report for anything beyond a clean opinion: a qualified opinion, a material uncertainty about going concern, key audit matters, a change of auditor. Changes in accounting policies, revenue recognition, segment definitions or restatements can make a year look better than it was. Comparing with last year's report is where most of the signal is.

<report>
{{report}}
</report>
{{#prior_year}}Prior year: {{prior_year}}{{/prior_year}}
{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
1. Identify the company, period, currency, units and reporting standard if stated, and list which major sections were provided and which are missing.
2. The year in five lines: the plain story of the year from the numbers, not from management's framing.
3. Business and segments: what each segment does and its share of revenue and profit, and any segment that is growing, shrinking or loss-making.
4. Results and cash: revenue, operating profit, net income, operating cash flow and free cash flow, with reported versus adjusted figures reconciled where the report allows.
5. Balance sheet and debt: net debt, maturities coming due, leases, pension deficits, goodwill relative to equity.
6. Risks: identify risk factors that look new, expanded or reworded compared with the prior year if supplied, otherwise the ones specific to this company rather than generic.
7. Auditor and accounting flags: the audit opinion and key audit matters, policy changes, restatements, related-party dealings, unusual items.
8. What changed from last year, if prior-year material is supplied.
9. Notes worth reading in full, by note title or number.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only what is in the provided text. Quote or cite the section for every flag. If a section is not provided, say it was not reviewed rather than implying it is clean.
- Separate the company's own claims ("management says") from what the figures show.
- Do not give a buy, sell or hold view or a valuation.
- Explain each accounting term briefly the first time it appears.
{{> output/uncertainty}}
</constraints>

<output_format>
## The year in five lines
Five lines.

## Business and segments
Table: segment | revenue share | profit share | trend | comment.

## Results and cash
Table: measure | this year | last year | change | source section.

## Balance sheet and debt
Bullets.

## Risks that are new or changed
Bullets with section references.

## Auditor and accounting flags
Bullets, or "none found in the sections provided".

## What changed from last year
Bullets, or "no prior year supplied".

## Notes worth reading in full
Bullets.
</output_format>
