---
schema: 1
id: plan-preference-test
kind: prompt
title: Plan a preference test
description: Plans a preference test between design options with a focused question, follow-up "why" prompts, randomised order, participant numbers and honest limits on what a preference shows.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [designer, ux-researcher, marketer, product-manager]
requires: [none]
inputs: [text, image]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [preference-test, design-options, visual-comparison, unmoderated-test, a-b-comparison]
pairs_with:
  prompts: [plan-desirability-study, plan-five-second-test, compare-design-alternatives-with-users]
  personas: [ux-researcher]
args:
  - name: options
    description: The design options being compared (2 to 4) and what differs between them, for example "three hero layouts that differ only in image versus illustration".
    type: text
    required: true
  - name: decision
    description: What the team will decide from the result and which quality matters (trust, clarity, appeal, brand fit).
    type: text
    required: true
  - name: audience
    description: Who should take part. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is a preference test right, Stimuli setup, Questions, Participants, Analysis, Decision rules and limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A preference test shows people two or more design options and asks which they prefer and why. It is quick and cheap, but it measures stated preference on first sight, which often differs from what performs better in use: people pick the familiar, the prettier or whatever is shown second, and they cannot predict which version will help them finish a task. It works best when options differ in one clear dimension, the question names the quality that matters ("which looks more trustworthy for paying a bill?"), order and position are randomised, and the reasons are coded, because the "why" answers are usually more useful than the vote. Splits near 50/50 with small samples are noise. Questions about task success need a usability test or an A/B test instead.
</context>

<task>
<options>
{{options}}
</options>

<decision>
{{decision}}
</decision>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. Say whether a preference test fits this decision. If the question is really about task completion, comprehension or conversion, recommend the right method and stop or limit the plan accordingly.
2. Stimuli setup: matching fidelity, identical content except the variable, randomised position and order, image size that matches the real device, and a short scenario shown first.
3. Questions: one targeted preference question naming the quality; a required open "why"; optionally a rating of each option on that quality; no leading wording.
4. Participants: target audience and screener basics; a number per test with reasoning (preference splits need larger samples, around 50 or more, to separate a real difference from noise), noting segments that may prefer differently.
5. Analysis: vote share with a confidence interval or a simple significance check, a codebook for the reasons, and a check for position bias.
6. Decision rules agreed before the test, and what the result cannot tell the team.
</task>

<constraints>
- Do not treat preference as evidence of usability or conversion.
- Do not invent results or thresholds as industry standards; any threshold is a proposal.
- The preference question must name a quality, not "which do you like".
</constraints>

<output_format>
## Is a preference test right
## Stimuli setup
## Questions
## Participants
## Analysis
| Measure | How | Watch for |
## Decision rules and limits
</output_format>
