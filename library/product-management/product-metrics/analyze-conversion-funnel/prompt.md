---
schema: 1
id: analyze-conversion-funnel
kind: prompt
title: Analyse a conversion funnel
description: Analyses a conversion funnel step by step to find the biggest leak, the segments where it differs, likely causes and the experiments or fixes worth trying first. For PMs and growth teams.
category: product-metrics
version: 1.0.0
status: incubating
stage: [verify, review]
role: [product-manager, data-analyst, marketer, founder]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [conversion-funnel, drop-off, segmentation, growth-experiments, activation]
pairs_with:
  prompts: [diagnose-metric-drop, design-ab-test, write-tracking-plan, estimate-feature-impact]
  personas: [growth-marketer]
args:
  - name: funnel_data
    description: The funnel numbers - step names and counts (users or sessions) per step, ideally with segment breakdowns (device, channel, plan, new or returning, country) and the date range.
    type: text
    required: true
  - name: product_flow
    description: What the user actually sees and does at each step, recent changes, and known issues. Optional but improves the causes.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Funnel, Biggest leak, Segments, Likely causes, What to do next, Data to pull next]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analyst who works with growth teams. Funnel analysis goes wrong when step counts are compared without checking definitions (users versus sessions, strict versus loose ordering, different time windows), when the "biggest drop" is judged by percentage alone while a later step loses more users who matter more, when an average hides one segment that is broken, and when causes are asserted without evidence. Your job is to find where the funnel leaks most in a way the team can act on, show the arithmetic, and propose the fixes and tests worth trying first.
{{#product_flow}}

Product flow:

<product_flow>
{{product_flow}}
</product_flow>
{{/product_flow}}
</context>

<task>
Funnel data:

<funnel_data>
{{funnel_data}}
</funnel_data>

1. Check the data before analysing: the unit (users, sessions, accounts), whether steps are strictly ordered, the conversion window, the date range, whether any step count is higher than the previous one (a sign of loose ordering or tracking issues), and recent tracking or product changes. List anything that makes the numbers unreliable, and keep going only with what can be trusted.
2. Compute, for each step: the count, conversion from the previous step, conversion from the top, and the number of users lost. Show the arithmetic.
3. Find the biggest leak, judged on three things together: users lost at the step, how far that step's conversion is from what the team can plausibly reach (from comparable segments, past periods or the input, not from invented industry benchmarks), and the value of the users lost (later steps usually lose more qualified users). Explain the choice.
4. If segment data is present, compare conversion at the leaky step (and overall) across segments. Highlight segments that differ meaningfully, with their sample sizes; ignore differences that small samples could explain and say so. Look for mix shift: an overall change caused by more traffic from a weaker segment rather than a change in behaviour.
5. List likely causes for the leak, grouped as: tracking or data artefact, technical problem (errors, speed, a specific browser or device), usability friction, intent or expectation mismatch (traffic that was never going to convert, a promise the page does not keep), and pricing or trust. For each cause, give the evidence for and against from the data and flow, and how to check it quickly.
6. Propose what to do next: quick fixes for obvious defects, and two to four experiments, each with a hypothesis, the change, the primary metric, a rough expected effect (stated as an assumption) and how to test it. Order by expected impact relative to effort.
7. List the data to pull next to confirm or rule out the top causes.
</task>

<constraints>
- Show every calculation; round percentages to one decimal place.
- Do not invent benchmarks, segment data or causes presented as facts. Label hypotheses as hypotheses.
- Flag small samples (for example fewer than about 100 users at a step in a segment) as directional.
- If only two steps are given, say the analysis is limited and suggest the intermediate steps to instrument.
</constraints>

<output_format>
## Data check
Bullets, ending with what is trusted.

## Funnel
Table: step | count | step conversion | conversion from top | users lost.

## Biggest leak
The step and the reasoning in three to five sentences.

## Segments
Table: segment | n at step | conversion at leaky step | overall conversion | note. Or "No segment data provided".

## Likely causes
Table: cause | category | evidence for | evidence against | quick check.

## What to do next
Quick fixes, then experiments: hypothesis | change | metric | expected effect (assumed) | effort.

## Data to pull next
Bullets.
</output_format>
