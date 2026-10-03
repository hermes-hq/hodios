---
schema: 1
id: run-win-loss-analysis
kind: prompt
title: Run a win-loss analysis
description: Runs a win-loss analysis from deal records and buyer interviews, coding why deals were won or lost, finding patterns by segment and recommending what to change.
category: sales
version: 1.0.0
status: incubating
stage: [review]
role: [sales-rep, manager, product-manager, marketer]
requires: [none]
inputs: [dataset, transcript, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [win-loss-analysis, deal-review, competitive-intelligence, buyer-interviews, sales-enablement]
pairs_with:
  prompts: [analyze-competitors, synthesize-customer-interviews, review-sales-pipeline]
args:
  - name: deal_data
    description: Closed deals with outcome (won, lost, no decision), date, size, segment, source, competitor, stage reached, rep-entered loss or win reason and any notes. A CRM export or a pasted table.
    type: text
    required: true
  - name: interviews
    description: Notes or transcripts from conversations with buyers after the decision, ideally run by someone other than the rep. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Headline findings, Reasons coded, Patterns by segment, What buyers said, Recommendations, Next round]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a revenue analyst who runs win-loss programmes. The CRM's loss reason is the starting point, not the answer: reps over-report price and timing, under-report their own execution, and "no decision" is often the largest competitor of all. Buyer interviews reveal the real decision drivers, such as a weak champion, an unclear business case or a rival who understood the problem better. A useful analysis separates stated reasons from underlying ones, says how strong each pattern is given the sample, and ends with changes owners can act on.
</context>

<task>
Run a win-loss analysis.

<deal_data>
{{deal_data}}
</deal_data>

{{#interviews}}
<interviews>
{{interviews}}
</interviews>
{{/interviews}}

1. Check the data: number of deals by outcome, period covered, missing fields, and whether "no decision" is recorded separately. Say what the data can and cannot support.
2. Code each deal's decision drivers into a small set of themes (for example: problem fit, product gap, price or value, business case, champion and access to the decision maker, competitor strength, timing, implementation risk, sales process). Keep the rep-entered reason and your coded reason side by side, and mark where interviews contradict the CRM.
3. Count themes by outcome and look for patterns by segment, deal size, source, competitor and stage reached. Note where wins and losses differ most.
4. Summarise what buyers said, with short quotes from the interviews tagged by outcome.
5. Write three to five headline findings, each with the evidence, the number of deals behind it, and a confidence level (strong, moderate, weak) that reflects sample size.
6. Recommend changes, each with an owner (sales, product, marketing, pricing, leadership) and how to tell if it worked.
7. Suggest the next round: which deals to interview, and six to eight neutral interview questions.
</task>

<constraints>
- Do not treat rep-entered reasons as facts. Where interviews are missing, say the findings rest on rep reports and are weaker.
- Do not invent counts, percentages or quotes. Quotes come verbatim from the interviews.
- With fewer than about 15 deals, present patterns as hypotheses to test, not conclusions.
- Keep individual reps unnamed in findings; this is about patterns, not blame.
- If the data has no outcomes or reasons at all, say what to collect and stop.
</constraints>

<output_format>
## Data check
## Headline findings
Numbered, each with evidence, deal count and confidence.
## Reasons coded
A table: Deal | Outcome | CRM reason | Coded drivers | Interview confirms or contradicts.
## Patterns by segment
A table or short bullets comparing wins and losses.
## What buyers said
Quotes grouped by theme.
## Recommendations
A table: Change | Owner | Evidence | How we will know.
## Next round
Deals to interview and the question list.
</output_format>
