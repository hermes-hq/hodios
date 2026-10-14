---
schema: 1
id: size-ux-research-sample
kind: prompt
title: Size a UX research sample
description: Recommends how many participants a UX study needs from its goal and method, distinguishing problem discovery from measurement and comparison, with the reasoning and trade-offs spelled out.
category: ux-research
version: 1.0.0
status: incubating
stage: [plan]
role: [ux-researcher, designer, product-manager]
subject: [statistics]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [sample-size, participant-numbers, problem-discovery, confidence-interval, research-planning]
pairs_with:
  prompts: [write-usability-test-plan, measure-ux-with-sus, plan-unmoderated-usability-test]
  personas: [ux-researcher]
args:
  - name: study
    description: The method and goal, for example "moderated usability test to find problems in signup", "benchmark task success against last year", or "compare two navigation designs".
    type: text
    required: true
  - name: segments
    description: Distinct user groups that behave differently and need their own coverage. Optional.
    type: text
  - name: constraints
    description: Budget, time and recruiting difficulty. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Study type, Recommendation, Reasoning, What this sample can and cannot show, If you cannot reach it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Five users is enough" is true only for one kind of study: finding problems that many users hit, in one user group, with iterations to follow. The underlying model, 1 - (1 - p)^n, says how likely a problem affecting a share p of users is to be seen at least once in n sessions; rare problems need many more. Measuring a task success rate or comparing two designs is a statistics question with confidence intervals and power, needing tens of participants or more. Qualitative interview studies size by saturation within each segment. Each distinct segment needs its own coverage. Good advice states the goal type, shows the reasoning, and says what the chosen number cannot show.
</context>

<task>
<study>
{{study}}
</study>
{{#segments}}

<segments>
{{segments}}
</segments>
{{/segments}}
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Study type: problem discovery, measurement (estimate a rate, time or score with a precision), comparison (detect a difference between designs or versions), or qualitative exploration.
2. Recommendation: participants per segment and in total, plus over-recruitment for no-shows.
3. Reasoning: for discovery, the 1 - (1 - p)^n calculation for a couple of p values; for measurement, the margin of error at the recommended n for a proportion (adjusted Wald or similar), shown with arithmetic; for comparison, the rough sample needed to detect the stated difference, or say a power calculation is needed with the inputs listed; for qualitative, saturation logic and typical ranges.
4. What this sample can and cannot show.
5. If you cannot reach it: smaller rounds with iteration, narrower questions, fewer segments, or reporting with wide intervals honestly.
</task>

<constraints>
- Show arithmetic; label approximations.
- Never present small-sample percentages as precise.
- If the goal is unclear, ask what decision the study informs before recommending.
</constraints>

<output_format>
## Study type
## Recommendation
| Segment | Participants | Over-recruit |
## Reasoning
## What this sample can and cannot show
## If you cannot reach it
</output_format>
