---
schema: 1
id: check-feedback-sampling-bias
kind: prompt
title: Check feedback for sampling bias
description: Reviews a set of feedback and how it was collected for sampling bias, compares the sample with the real user base, and states which conclusions it can and cannot support.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review, discover]
role: [product-manager, ux-researcher, founder, researcher]
subject: [statistics]
requires: [none]
inputs: [text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sampling-bias, selection-bias, survivorship-bias, non-response, loud-minority, evidence-quality]
pairs_with:
  prompts: [analyze-user-feedback, write-voice-of-customer-report, audit-feature-voting-board]
  personas: [customer-insights-analyst]
args:
  - name: feedback_summary
    description: The findings you want to rely on (themes, counts, quotes or a draft conclusion) and the number of people behind them.
    type: text
    required: true
  - name: how_collected
    description: How the feedback was gathered - channels, dates, who was invited or able to respond, incentives, survey placement, how items were selected for the summary.
    type: text
    required: true
  - name: user_base
    description: Optional. Who your users or customers actually are, with any numbers (segments, plans, regions, tenure, active versus churned, accessibility needs, languages).
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Sample versus user base, Biases found, Conclusions it can support, Conclusions it cannot support, How to hear from missing groups, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check whether a body of feedback can carry the conclusion someone wants to draw from it. Feedback is almost never a random sample: it comes from people motivated enough, able enough and still around to give it. That does not make it useless; it limits what it can prove. A complaint theme from 40 power users is real evidence that a problem exists, and weak evidence of how common it is.

The biases to check: loud minority (a few prolific voices), power users and early adopters, survivorship (churned and never-activated users absent), channel bias (who uses that channel), response timing and trigger (surveyed after a success or a failure), recency (last month's incident dominates), incentive bias, selection by whoever summarised it, and the groups who never answer (non-native speakers, disabled users, people without time).
</context>

<task>
<feedback_summary>
{{feedback_summary}}
</feedback_summary>

<how_collected>
{{how_collected}}
</how_collected>

{{#user_base}}
<user_base>
{{user_base}}
</user_base>
{{/user_base}}

1. Describe the sample: how many people, how many items, from which channels and dates, and what share of the user base that is.
2. Compare the sample with the user base by every dimension available (segment, plan, tenure, region, device, activity level, churned or not). Where the user base is not described, list the comparisons to make and the data needed.
3. Check each bias in the list above. For each one found, give the evidence from the collection method, the likely direction (which views are over- or under-represented) and how much it matters for the conclusion at hand.
4. Sort conclusions into two lists. Can support: existence of a problem, the language users use, the range of reasons, severity for those affected. Cannot support without more data: how common something is, ranking of themes across the whole base, claims about segments absent from the sample, cause and effect.
5. Propose how to hear from the missing groups: targeted interviews, a sampled survey with quotas, behavioural data to test prevalence, exit surveys for churned users, assisted or translated channels. Give a minimum sample per group where you can (for prevalence estimates, about 100 per segment gives roughly plus or minus 10 points).
</task>

<constraints>
- Do not dismiss the feedback; say what it is good for.
- Do not invent user-base figures; where they are missing, write [X] and say where to find them.
- Label every judgement about bias size as an estimate.
- If the collection method is not described at all, ask how the feedback was gathered and stop: the check depends on it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Two sentences: whether the intended conclusion holds, and what it needs.

## Sample versus user base
Table: dimension | sample | user base | gap.

## Biases found
Table: bias | evidence | direction | impact on the conclusion (high, medium, low).

## Conclusions it can support
Bullets.

## Conclusions it cannot support
Bullets, each with the data that would settle it.

## How to hear from missing groups
Table: group | method | sample size | effort.

## Questions
Up to five.
</output_format>
