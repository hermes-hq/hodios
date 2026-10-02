---
schema: 1
id: write-data-request-brief
kind: prompt
title: Write a data request brief
description: Turns a vague stakeholder ask into a clear data request with the decision, exact metric definitions, filters, time range, format and deadline, plus open questions. Use when a data ask arrives vague.
category: data-exploration
version: 1.0.1
status: incubating
stage: [plan]
role: [data-analyst, product-manager, manager, marketer]
inputs: [text, message]
output: [plan, questions, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [data-requests, requirements, stakeholder-requests, metric-definitions]
pairs_with:
  prompts: [write-analysis-plan, define-metric, answer-question-with-sql]
  workflows: [analysis-project-track]
  personas: [data-analyst]
args:
  - name: ask
    description: The request as it was made, pasted or paraphrased (a Slack message, an email, a meeting note).
    type: text
    required: true
  - name: context
    description: Who is asking and why, any deadline or meeting it feeds, and what data or dashboards exist already.
    type: text
output_contract:
  format: markdown
  sections: [Brief, Questions to confirm, Reply message]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Description says when to use it."}
---
<context>
You sit between business teams and the data team. "Can you pull the numbers on churn for last quarter?" can mean twenty different queries, and the analyst usually guesses one, delivers it a week later, and starts again. A good brief fixes the ambiguity in five minutes: it names the decision, pins down every definition, and lists exactly what will be delivered and when.
</context>

<task>
Turn this ask into a data request brief.

<ask>
{{ask}}
</ask>

<context>
{{context}}
</context>

1. Infer the decision or use behind the ask (a board slide, a pricing decision, a campaign review). If it is not stated, propose the most likely one and mark it "to confirm".
2. Rewrite the ask as precise questions, each answerable with one table or chart.
3. For every metric, write a definition: formula, unit, what is included and excluded (test accounts, refunds, internal users, free plans), grain, and time zone. Where a common term is ambiguous ("active users", "revenue", "churn", "conversion"), give the two or three plausible definitions and recommend one.
4. Fix the population and filters, time range (with exact dates, and whether the current incomplete period is included), comparison (previous period, last year, target), and breakdowns.
5. Specify the deliverable: format (number in a message, table, chart, dashboard, spreadsheet), level of detail, and who receives it.
6. Set the deadline and priority, and the smallest useful version that could be delivered sooner.
7. List the questions that must be confirmed before work starts, at most five, ordered by how much they change the result.
8. Write a short reply message to the requester that confirms the brief and asks those questions.
</task>

<constraints>
- Mark every inference "to confirm"; do not present guesses as agreed.
- Do not produce any numbers or results.
- Keep the brief to what fits on one screen. Use the requester's vocabulary and avoid jargon in the reply message.
- If the ask contains requests for personal data about individuals (for example a list of named customers), note whether aggregate data would serve the purpose and flag data-access approval if needed.
</constraints>

<output_format>
## Brief
A table: field | value. Fields: Requester, Decision or use, Questions, Metric definitions, Population and filters, Time range, Comparison, Breakdowns, Deliverable, Deadline and priority, Smallest useful version, Known caveats.

## Questions to confirm
A numbered list, at most five.

## Reply message
A short message ready to send to the requester.
</output_format>
