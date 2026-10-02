---
schema: 1
id: write-monthly-business-review
kind: prompt
title: Write a monthly business review
description: Writes a monthly business review with headline results, performance against plan by area, drivers, outlook, risks and the decisions needed from leadership. Use as an analyst or operations leader.
category: reporting
version: 1.0.0
status: incubating
stage: [build, review]
role: [business-analyst, operations-manager, financial-analyst, executive]
inputs: [dataset, notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mbr, business-review, plan-vs-actual, executive-summary]
pairs_with:
  prompts: [write-weekly-metrics-update, build-kpi-tree, explain-budget-variance, decompose-revenue-change]
  personas: [data-analyst]
args:
  - name: metrics
    description: This month's results for each area (revenue, customers, operations, people, product), ideally with the previous month and the same month last year.
    type: text
    required: true
  - name: plan_targets
    description: The plan or targets for the month and the year to date, and the full-year plan if you want an outlook.
    type: text
  - name: context
    description: Known events and explanations from area owners (launches, outages, hires, price changes, one-offs), and decisions already pending.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Scorecard, Performance by area, Drivers, Outlook, Risks and opportunities, Decisions needed, Appendix]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write monthly business reviews for a leadership team that has thirty minutes to read them. An MBR is not a data dump: it says how the month went against plan, why, what it means for the quarter and the year, and what leadership must decide. Unlike a weekly update, it looks at trends rather than noise, separates one-offs from structural changes, and ends with decisions.
</context>

<task>
Write the monthly business review from this material.

<metrics>
{{metrics}}
</metrics>

<plan_targets>
{{plan_targets}}
</plan_targets>

<context>
{{context}}
</context>

1. Write the headline: three bullets at most covering overall performance against plan for the month and year to date, the biggest positive and the biggest concern.
2. Build the scorecard: for each key metric, the actual, the plan, the variance (absolute and percent, or percentage points for rates), the previous month, the same month last year where given, and a status (on track, watch, off track) using an explicit rule (for example within 2% of plan is on track, 2% to 5% short is watch, more than 5% short is off track; reverse the direction for costs and other lower-is-better metrics). State the rule.
3. Write performance by area: two to four sentences per area on what happened and how it compares with plan and trend.
4. Explain the drivers of the main variances, using the context given. Separate one-off effects (an outage, a large one-time deal, a timing shift between months) from structural ones (pricing, mix, conversion, capacity). Where the cause is not in the material, write "cause not confirmed" and name the owner or check that would confirm it.
5. Give the outlook: whether the quarter and the year are on track to plan, using a simple and stated method (year to date plus plan for the remaining months, or run rate), and the gap if any.
6. List risks and opportunities with their likely size and timing where the material supports it.
7. List decisions needed: each with the question, the options, the recommendation if the material supports one, the owner and the deadline.
8. Add an appendix of metric definitions and data notes.
</task>

<constraints>
- Use only the numbers given. Compute variances and percentages exactly and show the arithmetic basis in the scorecard; do not invent prior-period figures, targets or causes.
- If no plan or targets are given, compare with the previous month and last year, say that plan comparison is not possible, and do not invent a status rule based on plan.
- Treat small movements as noise unless the history shows they are unusual; say "within normal variation" when that is the honest reading.
- Use percentage points for changes in rates and say so.
- Keep the main body to about one page; push detail to the appendix.
- Write for executives: plain, direct, no jargon, no blame.
</constraints>

<output_format>
## Headline
At most three bullets.

## Scorecard
A table: metric | actual | plan | variance | variance % or pp | previous month | last year | status. State the status rule beneath it.

## Performance by area
## Drivers
A table: variance | driver | one-off or structural | confirmed or not | source.

## Outlook
## Risks and opportunities
## Decisions needed
A table: decision | options | recommendation | owner | deadline.

## Appendix
Definitions and data notes.
</output_format>
