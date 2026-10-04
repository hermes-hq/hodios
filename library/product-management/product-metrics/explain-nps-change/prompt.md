---
schema: 1
id: explain-nps-change
kind: prompt
title: Explain a change in NPS
description: Explains whether a change in NPS or CSAT between two periods is real, checking margin of error, response rates, segment mix and survey changes before pointing to the reasons behind it.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, operate]
role: [product-manager, founder, manager, data-analyst]
subject: [statistics]
requires: [none]
inputs: [text, dataset]
output: [report, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [net-promoter-score, csat, margin-of-error, mix-shift, statistical-significance, score-reporting]
pairs_with:
  prompts: [design-nps-program, diagnose-metric-drop, check-feedback-sampling-bias]
args:
  - name: scores_and_counts
    description: For each period, the number of promoters, passives and detractors (or the full 0-10 distribution, or CSAT counts per score), ideally split by segment, plus surveys sent if known.
    type: text
    required: true
  - name: context_notes
    description: Optional. Anything that changed between periods (survey wording, timing, channel, who was sampled, releases, price changes, incidents) and any comment themes you have.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, The numbers, Is it real, What moved, Reasons behind it, How to report it, Next checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether a score change deserves a reaction before they report it. NPS swings of 5-10 points are often noise at typical sample sizes, because NPS is a difference of two proportions and has a wide margin of error. Real-looking changes also come from things that are not customer sentiment: a different mix of segments answering, a lower response rate, or a survey that moved from after support to after purchase.

The answer should leave the reader with one sentence they can safely say in a meeting.
</context>

<task>
<scores>
{{scores_and_counts}}
</scores>

{{#context_notes}}
<context_notes>
{{context_notes}}
</context_notes>
{{/context_notes}}

1. Recompute each period's score from the counts and show the arithmetic. NPS = % promoters (9-10) - % detractors (0-6). For CSAT, state the definition used (share of 4-5 on a 5-point scale, unless they say otherwise).
2. Margin of error. For NPS with promoter share p, detractor share d and n responses: standard error = sqrt((p + d - (p - d)^2) / n); 95% margin = 1.96 x SE, in points. For a CSAT share: SE = sqrt(s(1 - s) / n). For the change between two independent periods: SE of the difference = sqrt(SE1^2 + SE2^2). Show the numbers. Say whether the change is larger than its 95% margin.
3. Response rate: if surveys sent are given, compare response rates. A fall of more than a few points means the respondents may be a different crowd; say which way that usually biases (fewer neutral customers answer, so scores polarise).
4. Mix shift: if segments are given, recompute period 2 using period 1's segment weights. If the reweighted change is much smaller, the movement came from who answered, not how they feel.
5. Survey changes: check the context notes for changes to wording, scale, trigger, channel, timing, sampling or incentives. Any of these breaks comparability; say so plainly.
6. Only if a real change remains: point to the segments and comment themes that explain it, with counts. If no comments are given, say which ones to read and how to code them.
7. Write the sentence to report and what not to claim.
</task>

<constraints>
- Use only the figures provided; show every calculation so it can be checked. If counts are missing and only the headline score is given, explain that the change cannot be tested without response counts, ask for them, and stop after showing what is needed.
- Do not attribute the change to a release, price change or incident just because it happened at the same time; label such links as hypotheses and say how to check them.
- Segment results with fewer than about 50 responses are directional only.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One of: real change, probably noise, not comparable. One sentence why.

## The numbers
Table: period | n | promoters % | passives % | detractors % | score | 95% margin. Response rates if known.

## Is it real
The difference, its margin, and the arithmetic in three to five lines.

## What moved
Mix-shift result and any survey changes, each with its effect on the conclusion.

## Reasons behind it
Segments and themes with counts, or "Not applicable: change is within noise".

## How to report it
The exact sentence to say, plus one line on what not to claim.

## Next checks
Up to four bullets.
</output_format>
