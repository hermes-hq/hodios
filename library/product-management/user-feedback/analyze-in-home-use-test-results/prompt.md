---
schema: 1
id: analyze-in-home-use-test-results
kind: prompt
title: Analyse in-home use test results
description: Analyses an in-home use test of a consumer product - diaries, questionnaires and check-in notes - against an action standard, with novelty decay, attribute diagnostics and safety signals.
category: user-feedback
version: 1.0.0
status: incubating
stage: [review, verify]
role: [product-manager, researcher, founder]
subject: [retail, ecommerce]
requires: [none]
inputs: [dataset, notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [home-use-test, consumer-testing, just-about-right, penalty-analysis, novelty-effect, usage-diary]
pairs_with:
  prompts: [check-feedback-sampling-bias, define-physical-product-kpis]
args:
  - name: test_data
    description: The results - per-participant questionnaire scores at each checkpoint, usage diary entries, check-in call notes and any reported reactions or problems. A pasted table or rough notes are fine; remove names.
    type: text
    required: true
  - name: test_design
    description: The product, the test cells (for example new recipe vs current), number placed, length of the test, the scales used (5-point, 9-point hedonic, just-about-right) and the questionnaire timing.
    type: text
    required: true
  - name: action_standard
    description: Optional. The pass rule agreed before the test (for example "overall liking at least 7.0 on 9 points and not below current product"). Without one, results are reported against the comparison cell.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Sample and compliance, Scores against the action standard, Usage over time, Attribute diagnostics, Safety and adverse reactions, What participants said, Recommendation, Limits and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read the results of an in-home use test (food, drink, cosmetics, cleaning products, small appliances, baby or pet products) for a product team deciding whether to launch, fix or drop. In-home tests show what lab tests miss: real use over days, by real households, in real conditions. They also have traps: first impressions fade (novelty), participants report more use than their diaries show, people who stopped using the product drop out quietly, and with 30-60 participants per cell, small differences are noise.

Read reactions and safety problems first and separately from liking: one skin reaction or one appliance overheating matters more than a good average score.
</context>

<task>
<test_design>
{{test_design}}
</test_design>

<test_data>
{{test_data}}
</test_data>

{{#action_standard}}
<action_standard>
{{action_standard}}
</action_standard>
{{/action_standard}}

1. Safety first: list every reported reaction, injury, malfunction or misuse, with participant id, timing and description. Do not average these away.
2. Sample and compliance: placed, completed, dropped out (and why, if known), and who used the product as instructed (diary-based). Report results for completers and note how drop-outs could change them.
3. Scores: for each key measure (overall liking, purchase intent, the product's main promise), give mean, top-two-box share and n per cell at each checkpoint. Compare with the action standard or the comparison cell. With fewer than about 30 per cell, call differences directional; with more, say whether the gap is larger than about two standard errors.
4. Usage over time: compare first and final checkpoints. A fall of more than about half a point on a 9-point scale, or falling diary usage, suggests novelty wearing off. Compare stated usage with diary usage.
5. Attribute diagnostics: for just-about-right scales, give the share too little, about right and too much. Where 20% or more are on one side, compute the penalty: mean overall liking of the "just right" group minus that of the off-side group. Flag attributes with both a large off-side share and a penalty of about 0.5 points or more on a 9-point scale as the fixes most worth making.
6. Comments: code check-in notes and open answers into themes with counts and short quotes, separating product, packaging, instructions and use context.
7. Recommend: launch, fix and retest, or stop, tied to the action standard, with the specific fixes from step 5 and 6.
</task>

<constraints>
- Use only the data given; show how each figure was calculated. If per-participant data is missing and only averages are given, say which analyses cannot be done (top-two-box, penalties, drop-out effects).
- Never call a product safe. Any adverse reaction or safety-related malfunction is escalated to the person responsible for product safety and, where relevant, a qualified safety assessor; regulatory reporting duties differ by country and product type, so say to check them.
- Do not change the action standard after seeing the results; if none was agreed, say so and report against the comparison cell.
- If the test design (scales, cells, n) is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Three bullets: pass or fail against the standard, the biggest strength, the biggest fix.

## Sample and compliance
Table: cell | placed | completed | dropped out | used as instructed.

## Scores against the action standard
Table: measure | cell | checkpoint | mean | top-two-box % | n | vs standard or comparison.

## Usage over time
Short paragraph and table of early versus final scores and diary usage.

## Attribute diagnostics
Table: attribute | too little % | about right % | too much % | penalty | action.

## Safety and adverse reactions
Table: participant | when | what | follow-up needed. "None reported" if none.

## What participants said
Themes with counts and short quotes.

## Recommendation
Launch, fix and retest, or stop, with reasons and fixes.

## Limits and questions
Bullets.
</output_format>
