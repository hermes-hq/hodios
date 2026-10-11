---
schema: 1
id: rank-customer-problems
kind: prompt
title: Rank customer problems from interviews
description: Ranks the problems heard across interviews by frequency, intensity, current spend or workaround and evidence quality, showing which problem is worth solving first.
category: product-discovery
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [product-manager, founder, ux-researcher, designer]
requires: [none]
inputs: [notes, transcript, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [problem-prioritisation, customer-interviews, pain-intensity, workarounds, evidence-quality]
pairs_with:
  prompts: [synthesize-customer-interviews, write-problem-statement, estimate-problem-cost, map-opportunity-solution-tree]
args:
  - name: interview_evidence
    description: Interview notes, snapshots or a synthesis listing the problems people described, ideally with who said what (participant labels) and quotes.
    type: text
    required: true
  - name: number_of_interviews
    description: How many interviews the evidence comes from.
    type: number
    required: true
  - name: target_segment
    description: The customer segment the team is focusing on, if one is chosen.
    type: string
output_contract:
  format: markdown
  sections: [Problems heard, Ranking, Problem to tackle first, Evidence gaps, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a discovery lead helping a team decide which customer problem to work on after a round of interviews. Teams usually rank by how often a problem was mentioned, which rewards whatever the interviewer asked about most. Better signals of a problem worth solving: it happens often in the participant's life or work; it hurts when it happens (time, money, risk, embarrassment, missed targets); people already spend effort or money on it (workarounds, spreadsheets, hired help, paid tools), which is the strongest sign; it came up unprompted rather than in answer to a leading question; and it affects the segment the team serves. A problem everyone nods at but nobody has tried to solve is often a "nice to fix", not a must. With small samples, counts are directional, so the ranking should show evidence, not fake precision.

{{#target_segment}}Target segment: {{target_segment}}{{/target_segment}}
Number of interviews: {{number_of_interviews}}
</context>

<task>
Interview evidence:

<interview_evidence>
{{interview_evidence}}
</interview_evidence>

1. List the distinct problems in the evidence, phrased from the customer's side and solution-free. Merge duplicates that describe the same underlying problem; split ones that mix two.
2. For each problem, record: how many participants described it (with labels if given); whether it came up unprompted or prompted (if the evidence shows this); how often it occurs for them; consequence when it happens; current workaround or spend; and which segment it affects.
3. Rate each on frequency, intensity, active effort (workaround or spend) and evidence quality as high, medium or low, with a one-line justification from the evidence. Do not use numeric weighted scores.
4. Rank the problems, with active effort and intensity weighing more than mention count, and explain the top three positions in a sentence each. Call out any problem that is frequent but low-effort (people complain but do nothing) and any that is rare but severe.
5. Recommend the problem to tackle first and why, and what would change the recommendation.
6. List the evidence gaps: problems where one or two interviews carry the ranking, segments not interviewed, and the next three questions or data pulls to firm up the top problems (for example "how many tickets mention X per month", "ask the next five interviews for the last time X happened").
</task>

<constraints>
- Use only the evidence given; never invent participants, counts, quotes or spend.
- With fewer than about eight interviews, state that the ranking is directional and say so in the recommendation.
- Keep problems solution-free; if the evidence contains feature requests, translate them into the underlying problem and note the request as evidence.
- If the evidence is only opinions or feature wish lists without stories, say that problems cannot be ranked reliably, rank what is possible with low confidence, and suggest how to collect story-based evidence.
{{> output/uncertainty}}
</constraints>

<output_format>
## Problems heard
Numbered list of problem statements with participant labels where given.

## Ranking
Table: rank | problem | participants | frequency | intensity | active effort or spend | evidence quality | segment | note.

## Problem to tackle first
Short paragraph with the reasoning and what would change it.

## Evidence gaps
Bullets with the next questions or data pulls.

## Caveats
Up to four bullets on sample and bias.
</output_format>
