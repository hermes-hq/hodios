---
schema: 1
id: write-customer-experience-report
kind: prompt
title: Write a quarterly customer experience report
description: Writes a quarterly customer experience report with NPS, CSAT and effort trends, the margin of error, themes from comments, actions taken and what changes next quarter.
category: reporting
version: 1.0.0
status: incubating
stage: [build, review]
role: [business-analyst, data-analyst, operations-manager, product-manager]
inputs: [dataset, text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [net-promoter-score, csat, customer-effort, survey-scores, quarterly-report]
pairs_with:
  prompts: [explain-nps-change, design-nps-program, write-monthly-business-review]
args:
  - name: scores
    description: "Survey results for the quarter and earlier quarters: NPS, CSAT or effort scores with response counts, ideally split by segment, channel or journey stage, and the survey type (after an interaction or a periodic relationship survey)."
    type: text
    required: true
  - name: comments
    description: Customer comments from the surveys, a sample of them, or an existing theme count. Optional.
    type: text
  - name: actions
    description: Actions taken since the last report and their status, plus operational context (releases, outages, price changes, staffing). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Scorecard, Trends and segments, What customers said, Actions taken, Next quarter, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A customer experience report earns trust when it treats survey scores as estimates, not facts. NPS is the share of promoters (9-10) minus the share of detractors (0-6), so it runs from -100 to 100 and moves in points, not percent. It is noisy: with 200 responses and an NPS near 30, the 95% margin of error is roughly plus or minus 10 to 12 points, so a 5-point quarterly swing is usually noise. The standard error is sqrt((p_promoters + p_detractors - (p_promoters - p_detractors)^2) / n). CSAT is best reported as the top-two-box share (4 or 5 on a 5-point scale), not an average. Transactional surveys (after a support contact or delivery) and relationship surveys (periodic, about the whole brand) measure different things and must not be blended into one trend. A score can also move because the mix moved: more responses from a low-scoring segment or channel, a changed survey trigger, or a falling response rate that leaves only the very happy and the very angry. Comments explain the scores only when they are coded consistently, counted by theme and split by promoters and detractors. The report closes the loop: what was done about last quarter's themes, and whether it worked.
</context>

<task>
<scores>
{{scores}}
</scores>
{{#comments}}

<comments>
{{comments}}
</comments>
{{/comments}}
{{#actions}}

<actions>
{{actions}}
</actions>
{{/actions}}

1. Check what each score is: survey type, scale, trigger, response counts and response rates. If NPS, CSAT or effort scores are mixed across survey types, report them separately.
2. Build the scorecard: each score this quarter, last quarter and the same quarter last year where given, the change (in points for NPS and percentage points for shares), the response count, and for NPS the approximate 95% margin of error from the formula above. Mark a change as real only when it exceeds the margin of error of the difference, about the square root of the sum of the two quarters' squared margins (roughly 1.4 times one quarter's margin when sample sizes are similar).
3. Break the main scores down by segment, channel or journey stage where data allows. Check for mix shifts: if the share of responses from a segment changed a lot, say how much of the overall movement it could explain.
4. Code the comments into a short list of themes (at most eight), count the share of comments per theme, split by promoters and detractors (or satisfied and dissatisfied), and pick one or two short anonymised quotes per main theme. If only a sample was given, say the counts come from the sample.
5. Report actions taken since last quarter: each with the theme it addressed, status and any measured effect on scores or operational metrics. Say "effect not yet measurable" when it is.
6. Propose next quarter's priorities from the largest detractor themes and the open actions, each with an owner role and a measure of success.
7. Write the summary last: three bullets on the headline score movement and whether it is real, the main driver, and the main action.
</task>

<constraints>
- Use only the figures and comments given. Do not invent scores, benchmarks, causes or quotes; mark any industry comparison as unavailable unless a source is given.
- Never call a change an improvement or decline when it is inside the margin of error; say "within normal variation".
- Do not average NPS across segments; recompute it from pooled promoter and detractor counts or weight by responses.
- Remove names, account numbers, emails and other identifying details from quotes.
- If response counts are missing, say the margin of error cannot be estimated and treat all movements as unconfirmed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three bullets.

## Scorecard
Table: score | survey type | this quarter | last quarter | same quarter last year | change | responses | margin of error | real or noise.

## Trends and segments
Short paragraphs with a table of the main breakdown, and a line on any mix shift.

## What customers said
Table: theme | share of comments | promoters vs detractors | example quote. Then two or three sentences.

## Actions taken
Table: action | theme | status | effect.

## Next quarter
Table: priority | theme | owner role | success measure.

## Data notes
Definitions, response rates, survey changes and limits.
</output_format>
