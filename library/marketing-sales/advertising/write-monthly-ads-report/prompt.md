---
schema: 1
id: write-monthly-ads-report
kind: prompt
title: Write a monthly paid ads report
description: Writes a client- or manager-facing monthly paid ads report tied to business outcomes, explaining results against target, what drove them, what was done and next month's tests.
category: advertising
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, consultant]
requires: [none]
inputs: [dataset, text]
output: [report, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [client-reporting, monthly-report, results-summary, stakeholder-update, agency]
pairs_with:
  prompts: [question-agency-ad-report, analyze-ad-performance, diagnose-cpa-spike, set-up-utm-naming-convention]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: results
    description: This month's and last month's numbers per platform or campaign (spend, results, cost per result, revenue or ROAS), the same month last year if available, and targets.
    type: text
    required: true
  - name: business_outcomes
    description: Numbers from the business side, such as orders and revenue in the shop backend, leads that became customers, cost per customer.
    type: text
    required: true
  - name: changes_and_events
    description: What you changed this month (tests, budgets, new campaigns) and outside events (promotions, stock-outs, site issues, seasonality).
    type: text
    required: true
  - name: audience
    description: Who reads it (client owner, marketing manager, finance) and how much detail they want. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Results against target, What drove it, What we did, Next month, Decisions needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user manages paid ads for a client or their own company and must write the monthly report. Most ads reports fail the reader: pages of impressions and clicks, platform-claimed conversions that do not match the shop or CRM, no explanation of why numbers moved, and no clear ask. What experts know: lead with the business outcome against target in one line; reconcile platform numbers with the business's own figures and say how they differ; separate brand from non-brand, and new from returning customers, where relevant, because that is where performance hides; explain movements with causes (decompose cost per result into cost per click and conversion rate), including bad news, plainly; list what was done and what was learned from tests; propose next month's tests with hypotheses; and end with decisions the reader must make. A good report is short enough to read in five minutes.
</context>

<task>
<results>
{{results}}
</results>
Business outcomes: {{business_outcomes}}
Changes and events: {{changes_and_events}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. Check the data: compute month-on-month and year-on-year changes, cost per result, and the gap between platform-reported and business-recorded results. If figures conflict or are missing, note it in the report rather than smoothing it over.
2. Headline: one or two sentences on the business outcome against target and the main reason.
3. Results against target: a compact table of the few KPIs that matter to this reader.
4. What drove it: explain the biggest movements with evidence (cost per click versus conversion rate, channel mix, brand versus non-brand, seasonality, the changes made). State uncertainty where the cause is not clear.
5. What we did: the changes and tests run, with outcomes and learnings.
6. Next month: 3 to 5 planned actions or tests, each with hypothesis and expected effect stated cautiously.
7. Decisions needed: budget, offer, creative, or tracking decisions the reader must make, with a recommendation each.
8. Adapt tone and detail to the audience; keep jargon out for owners and finance readers.
</task>

<constraints>
- Use only the supplied numbers; do not invent results, benchmarks or forecasts. Show the arithmetic for derived figures in a short appendix line.
- Report bad results honestly and without blame-shifting; pair them with a plan.
- Do not use platform-reported conversions as the headline when business-recorded results are available.
- Keep the main report under about one page.
</constraints>

<output_format>
## Headline
One or two sentences.

## Results against target
A table: KPI | Target | This month | Last month | Same month last year | Status.

## What drove it
Three to five bullets with evidence.

## What we did
Bullets: change or test, result, learning.

## Next month
A table: Action or test | Hypothesis | Expected effect.

## Decisions needed
Numbered list with recommendation for each.
</output_format>
