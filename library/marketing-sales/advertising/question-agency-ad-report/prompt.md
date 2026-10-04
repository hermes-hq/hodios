---
schema: 1
id: question-agency-ad-report
kind: prompt
title: Question an agency ad report
description: Reads a monthly ads report from an agency or freelancer, flags vanity metrics and missing numbers such as leads to sales, cost per job and brand versus non-brand, and writes polite questions to ask.
category: advertising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, manager]
requires: [none]
inputs: [document, text]
output: [report, questions, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [agency-reporting, vanity-metrics, cost-per-job, brand-search, client-side, renewal]
pairs_with:
  prompts: [vet-paid-ads-agency, calculate-break-even-roas, analyze-ad-performance]
  personas: [local-ads-advisor]
args:
  - name: report
    description: The agency's report or dashboard summary, pasted as text (numbers, charts described, commentary), with the month it covers, plus the fee you pay and your ad spend.
    type: text
    required: true
  - name: business_goal
    description: What you hired them to achieve in your own words, for example "more kitchen-fitting jobs in Leeds at under 150 GBP per job" or "online sales at a profit".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Plain-language read, What the report shows well, Gaps and red flags, Questions to ask, Message to the agency]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user owns a small business and pays an agency or freelancer to run their ads. Each month a report arrives full of impressions, clicks, CTR and "conversions", and the owner cannot tell whether the money made money. Reports mislead without anyone lying: conversions that include page views or calls of a few seconds; brand searches (people already looking for the business) mixed with new-customer searches so results look cheaper; platform-claimed sales that the shop's own records do not show; month-on-month comparisons that ignore seasonality; and no link from leads to paid jobs. A good client-side review is polite, specific and asks for the numbers that tie spend to the business goal.
</context>

<task>
<report>
{{report}}
</report>

Business goal: {{business_goal}}

1. If the report has no spend, no results figures, or the fee and spend are unknown, ask for them in one message and stop.
2. Plain-language read: restate what the report claims in three to five sentences without jargon, and the total cost (ad spend plus fee) for the month.
3. Translate to the goal: from the report's own numbers, cost per lead or sale including the fee; if the owner knows how many leads became jobs or how many sales the shop recorded, cost per job or the gap between reported and real sales. Show the arithmetic; mark [NEEDED] what the owner must look up.
4. What the report shows well: genuine strengths (clear spend, tracked calls, honest commentary).
5. Gaps and red flags, each with why it matters: vanity metrics without outcomes; unclear conversion definitions; brand and non-brand not split; no search terms or waste review; no lead quality or sales feedback; results compared with no seasonal baseline; changes made without tests; account access or ownership unclear; fee rising faster than results.
6. Questions to ask: eight to twelve, specific and answerable, ordered by importance, each tied to a gap (for example "What counts as a conversion, and how many of last month's 46 were calls over 60 seconds?").
7. Message to the agency: a short, friendly email that thanks them, asks the top five questions and requests the extra numbers in future reports, without accusing them.
</task>

<constraints>
- Do not accuse the agency of bad faith; separate "missing" from "wrong".
- Use only numbers in the report or given by the owner; never invent benchmarks for CTR, CPC or conversion rates.
- If the numbers show results are good for the goal, say so plainly.
- Do not advise ending a contract or withholding payment; suggest getting answers first and checking the contract terms.
</constraints>

<output_format>
## Plain-language read
Short paragraph and total monthly cost.

## What the report shows well
Bullets.

## Gaps and red flags
A table: Issue | Where in the report | Why it matters | What to ask for.

## Questions to ask
Numbered list.

## Message to the agency
A ready-to-send email, under 200 words.
</output_format>
