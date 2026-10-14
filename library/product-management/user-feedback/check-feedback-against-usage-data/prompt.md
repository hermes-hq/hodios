---
schema: 1
id: check-feedback-against-usage-data
kind: prompt
title: Check feedback against usage data
description: Checks loud feedback against product usage data - who complains, how many users the issue reaches, whether behaviour matches what people say - and gives a verdict on how much weight it deserves.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [product-manager, data-analyst, ux-researcher]
requires: [none]
inputs: [text, dataset]
output: [report, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [product-analytics, behavioural-data, triangulation, evidence-weighting, reach]
pairs_with:
  prompts: [check-feedback-sampling-bias, analyze-user-feedback, triage-feature-requests]
args:
  - name: feedback
    description: The feedback or theme to check, with the number of mentions and who sent it if known.
    type: text
    required: true
  - name: usage_data
    description: Usage numbers you have or can pull (feature usage, funnels, segments, the complainers' activity), or a description of what your analytics can show. Optional.
    type: text
  - name: question
    description: The decision at stake, for example "rebuild the editor" or "bring back the old dashboard". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The claim to check, Data needed, Checks and results, What the data says, Verdict, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help product teams decide how much weight a piece of feedback deserves by checking it against what users actually do. Loud is not the same as many: a theme with 40 angry comments may come from 40 of 50,000 users, or from the 40 biggest accounts. People also say one thing and do another: users who say they hate a feature may use it daily because switching costs are high; users who ask for a capability may not use the version that already exists. Silence is not health either: users who hit a problem often leave without a word, which shows in funnels and retention, not in comments. The useful checks are reach (how many users touch the affected area), who the complainers are (segment, activity, value), behaviour on the affected path (drop-off, retries, workarounds), and whether the pattern holds for non-complainers too.

Feedback:

<feedback>
{{feedback}}
</feedback>
{{#usage_data}}

Usage data:

<usage_data>
{{usage_data}}
</usage_data>
{{/usage_data}}
{{#question}}

Decision at stake: {{question}}
{{/question}}
</context>

<task>
1. State the claim to check in testable form (for example "most active users find export unreliable") and the decision it would change.
2. List the data needed: reach of the affected feature or path, the complainers' segment, activity and value, the behaviour on the path, and a comparison group of non-complainers. For each, give a plain description of the query or report to run.
3. If usage data was given, run the checks: compare complainers with the user base, estimate reach, and compare what people said with what they did. Show the numbers and the arithmetic. If no data was given, describe what each possible result would mean instead of inventing figures.
4. Interpret the evidence: where feedback and behaviour agree, where they conflict and the likely reason (switching cost, a small but valuable segment, silent churn, a misread complaint), and what remains unknown.
5. Give a verdict: overweighted, fairly weighted or underweighted by the current conversation, with a confidence level and the one result that would change it.
6. Recommend next steps: the extra data or quick research needed, and what to do now in proportion to the evidence.
</task>

<constraints>
- Never invent usage figures; mark every number as given or as a placeholder.
- Small counts stay small: show raw counts next to percentages.
- Do not dismiss a complaint because few users raised it if it affects high-value accounts, safety, data loss or access.
- Correlation between complaining and churn is not proof of cause; say so where relevant.
</constraints>

<output_format>
## The claim to check
Two sentences.

## Data needed
A table: data | why | how to get it.

## Checks and results
Numbered checks with results or expected interpretations.

## What the data says
Short paragraphs.

## Verdict
One line plus confidence and what would change it.

## Next steps
Bullets.
</output_format>
