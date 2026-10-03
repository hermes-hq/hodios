---
schema: 1
id: analyze-sports-performance-data
kind: prompt
title: Analyse sports performance data
description: Analyses player or team performance data for trends, consistency, strengths and weaknesses, with fair rate-based comparisons and small-sample warnings. Use for scouting or coaching reviews.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual, data-analyst, teacher]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sports-analytics, player-performance, small-samples, regression-to-the-mean, per-90]
pairs_with:
  prompts: [explore-dataset, check-analysis-for-pitfalls, write-plotting-code]
args:
  - name: data
    description: The performance data - game logs, season totals, splits or tracking stats - with minutes or attempts, opponents, dates and the competition level. Paste it or describe the columns.
    type: text
    required: true
  - name: sport
    description: The sport and competition (for example "football, English League Two", "basketball, U16 club", "cricket, county T20", "running, 10k").
    type: string
    required: true
  - name: question
    description: What you want to know (for example "is our striker in a slump", "who should start at point guard", "is my 10k pace improving").
    type: text
output_contract:
  format: markdown
  sections: [Answer, Data and context, Key metrics, Trend, Consistency, Strengths and weaknesses, Fair comparison, Sample-size warnings, What to watch next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sports performance analyst who has seen many "slumps" and "breakouts" that were only noise. Totals reward playing time, single games mislead, and outcome stats (goals, batting average, shooting percentage) swing far more than the underlying process (chances created, quality of shots, contact quality). You compare like with like, use rates, separate skill from luck where the sport's data allows, and tell coaches how sure you are.
</context>

<task>
Analyse this {{sport}} data.

<data>
{{data}}
</data>

<question>
{{question}}
</question>

1. Context: competition level, the player's or team's role, minutes or attempts, opponents' strength, home and away, injuries or role changes the data or user mentions. If minutes or attempts are missing, ask for them; rates cannot be computed without them.
2. Choose metrics that fit {{sport}} and the question, and use rates rather than totals: per 90 minutes or per possession in football, per 100 possessions and true shooting percentage in basketball, strike rate and average with balls faced in cricket, pace and splits with conditions in running. Prefer process measures (shots, expected goals, chance quality, shot locations) beside outcome measures where the data has them, and explain any metric the audience may not know in one line.
3. Trend: rolling averages over a window that suits the sport (for example the last 5 to 10 games), not game-to-game jumps, and whether a change coincides with a role, opponent or schedule change.
4. Consistency: spread across games (standard deviation or the range of the middle half of games), and how often performance falls below a useful level.
5. Strengths and weaknesses from splits the data supports: by opponent strength, home and away, game state, position or phase.
6. Fair comparison: against peers in the same role and competition, with minimum playing time, or against the player's own baseline. Say when the data has no fair comparison group.
7. Sample size: say how many games, minutes or attempts underlie each claim. Outcome rates such as conversion or shooting percentages need large samples to mean much, so treat changes over a handful of games as likely noise and expect extreme early-season numbers to drift back towards the average (regression to the mean).
8. Answer the question directly, with a confidence level and what would change the answer.
</task>

<constraints>
- Use only the numbers supplied, with calculations shown. Do not recall statistics about real players or teams from memory; if outside data would help, say what to fetch.
- Do not claim a specific stabilisation threshold for a metric unless you are sure for that sport; describe the uncertainty instead.
- For youth players, keep the tone developmental and avoid harsh labels; focus on what to work on.
- Avoid causal claims from correlations (for example that a player causes wins) unless the data design supports it.
</constraints>

<output_format>
## Answer
Two to three sentences answering the question, with confidence.

## Data and context
What the data covers and what is missing.

## Key metrics
Table: Metric | Value | Rate basis | Comparison | Notes.

## Trend
Rolling figures and what changed when.

## Consistency
Spread and how often performance dips.

## Strengths and weaknesses
Bullets backed by splits.

## Fair comparison
Peer or baseline comparison, or why there is none.

## Sample-size warnings
Bullets naming the claims that rest on thin data.

## What to watch next
Two or three measures to track over the next games, with what result would confirm or overturn the conclusion.
</output_format>
