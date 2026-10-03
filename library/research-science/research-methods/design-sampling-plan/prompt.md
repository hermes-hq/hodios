---
schema: 1
id: design-sampling-plan
kind: prompt
title: Design a sampling plan
description: Designs a sampling plan from the target population and study goal, covering the sampling frame, method, sample size with assumptions, recruitment and how each source of bias is reduced.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student, data-scientist, ux-researcher]
subject: [statistics]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sampling, sample-size, sampling-frame, participant-recruitment, selection-bias, nonresponse]
pairs_with:
  prompts: [design-research-study, write-survey-questionnaire, plan-pilot-study, write-preregistration]
  personas: [research-methodologist]
args:
  - name: population
    description: Who or what you want to draw conclusions about, and any lists, registers or access points you know of, for example "registered nurses in Ontario; the college of nurses has a member register".
    type: text
    required: true
  - name: study_goal
    description: What the study must deliver - an estimate (with the precision you need), a comparison between groups (with the smallest difference that matters), a model, or qualitative understanding - plus budget, timeline and mode of data collection.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Clarifications, Target and frame, Sampling method, Sample size, Recruitment, Bias and mitigation, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Who ends up in a sample decides what a study can claim. A good sampling plan starts from the inference the study needs (estimate a prevalence, compare groups, explore experiences) and works back to the target population, a frame that covers it, a selection method, a size justified by precision or power or by saturation logic, and a recruitment process that keeps response high and even across groups. It names coverage, selection and nonresponse error and does something about each. Plans fail when convenience samples are described as representative, when sample size is a round number with no reasoning, or when the expected response rate is ignored.
</context>

<task>
Design a sampling plan.
<population>
{{population}}
</population>
<study_goal>
{{study_goal}}
</study_goal>

1. If the goal does not say which inference is needed (estimate, comparison, association, or qualitative understanding), or a number that sample size depends on is missing, list what is missing and give the default you will assume for each.
2. Define the target population precisely (inclusion and exclusion, time, place), the accessible population and the sampling frame. Describe coverage gaps between them and who is likely to be missed.
3. Recommend a sampling method and justify it against the alternatives: simple random, systematic, stratified (proportionate or disproportionate, with the strata), cluster or multistage, probability proportional to size, or for qualitative and hard-to-reach groups purposive, quota, snowball or respondent-driven sampling. Say what each choice allows the study to claim.
4. Calculate or justify the sample size:
   - Estimates: margin of error, confidence level, expected proportion or SD, finite population correction if relevant, design effect for clustering.
   - Comparisons: effect size that matters, alpha, power, allocation ratio, and the test the calculation assumes.
   - Qualitative: an initial number with information-power or saturation reasoning, and the rule for stopping.
   Show the formula and the numbers, then inflate for the expected response or eligibility rate.
5. Plan recruitment: contact mode and sequence, reminders, incentives, consent, and how to monitor response by subgroup during fieldwork.
6. For each bias (coverage, selection, nonresponse, attrition, self-selection), give the mitigation and the analysis that addresses what remains (weighting, comparison with frame characteristics, sensitivity analysis).
</task>

<constraints>
- Show every calculation step and every assumption; never present a sample size without the inputs that produced it.
- Do not invent population sizes, response rates or variances; use stated values, or a labelled assumption with a range and a note on where to find the real figure.
- Do not call a non-probability sample representative, and state what generalisation each method supports.
- Flag ethical or access issues (gatekeepers, vulnerable groups, data protection for the frame).
</constraints>

<output_format>
## Clarifications
Missing inputs and the defaults assumed.
## Target and frame
Target, accessible population and frame, with coverage gaps.
## Sampling method
The recommendation, a comparison table (method | allows | cost | fits?), and how units are selected step by step.
## Sample size
The calculation in a code block, the final number, and a small table showing how it changes if the key assumption is off.
## Recruitment
Steps, contact schedule and monitoring.
## Bias and mitigation
A table: bias | where it comes from | mitigation | analysis.
## Assumptions to confirm
A checklist.
</output_format>
