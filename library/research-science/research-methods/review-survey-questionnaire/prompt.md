---
schema: 1
id: review-survey-questionnaire
kind: prompt
title: Review a survey questionnaire
description: Reviews an existing questionnaire item by item for leading, double-barrelled, ambiguous or loaded wording, poor response scales, order effects and flow, and proposes fixed wording.
category: research-methods
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, student]
requires: [none]
inputs: [document, text]
output: [report, table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [questionnaire-design, survey-research, question-wording, response-scales, survey-bias]
pairs_with:
  prompts: [write-survey-questionnaire, plan-cognitive-interviews, survey-study-track]
  personas: [research-methodologist]
args:
  - name: questionnaire
    description: The full questionnaire text with response options and any skip logic.
    type: text
    required: true
  - name: aim
    description: The survey's aim, target population and mode (online, phone, paper, face to face).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overall assessment, Item review, Structure and flow, Priority fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most survey error introduced by wording is invisible in the data: respondents answer the question they think was asked. Reviewers who know survey methodology check each item for double-barrelled content (two questions in one), leading or loaded wording, presumptions ("How often do you exercise?" before asking whether they do), vague quantifiers and terms, undefined reference periods, jargon above the population's reading level, negatives and double negatives, and sensitive questions asked without normalising. They check response options for overlap, gaps, missing "not applicable" or "don't know" where genuine, unbalanced or unlabelled scales, and agree-disagree batteries that invite acquiescence. They look at structure: order and context effects, sensitive or demographic items placed early, long grids that cause straightlining, skip logic errors, and whether each item maps to the stated aim. Items that map to nothing should go.
</context>

<task>
Review this questionnaire:
<questionnaire>
{{questionnaire}}
</questionnaire>
Aim, population and mode: {{aim}}

1. Map each item to the aim, or mark it as not serving it.
2. Review each item for wording problems (double-barrelled, leading, loaded, presumptive, vague, undefined period, jargon, negatives, sensitive without framing) and response-option problems (overlap, gaps, imbalance, missing options, wrong scale type, unnecessary midpoint or forced choice). Name the specific problem; do not just say "unclear".
3. Propose revised wording and response options for each problem item, keeping the measured construct the same.
4. Flag items that look like parts of a validated scale and warn that changing them breaks comparability; suggest checking the source instead of rewording.
5. Review structure and flow: order and context effects, placement of sensitive and demographic items, grids and burden, skip logic, estimated completion time for the mode, and the introduction and consent text.
6. Rank the top fixes by impact on data quality.
</task>

<constraints>
- Quote each item exactly before critiquing it.
- Do not add new topics beyond the aim; suggest at most a few missing items that the aim clearly needs.
- Do not reword items that come from a validated instrument; flag them instead.
- Fit language to the stated population's reading level.
</constraints>

<output_format>
## Overall assessment
Three to five sentences.
## Item review
A table: item number | original wording | problem | revised wording and options.
## Structure and flow
Bullets on order, burden, skip logic, intro and timing.
## Priority fixes
A ranked list of the five most important changes.
</output_format>
