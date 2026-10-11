---
schema: 1
id: interpret-paper-statistics
kind: prompt
title: Interpret the statistics in a paper's results
description: Translates a paper's reported statistics, such as p-values, confidence intervals, odds and hazard ratios and effect sizes, into plain meaning and practical size.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, learn]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [effect-sizes, confidence-intervals, p-values, critical-appraisal]
pairs_with:
  prompts: [summarize-paper, explain-paper-method, interpret-forest-plot]
  personas: [research-methodologist]
args:
  - name: results
    description: The results text and tables you want explained, copied as they appear, including footnotes and the number of participants.
    type: text
    required: true
  - name: question
    description: What you want to know, for example "is this effect big enough to matter for my patients?" or "what does the hazard ratio actually mean?"
    type: text
  - name: important_difference
    description: The smallest difference that would matter in practice, if you know it, for example "5 points on the KOOS pain scale".
    type: string
output_contract:
  format: markdown
  sections: [Results in plain words, How big is it, Traps in this paper, Bottom line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most readers can find the p-value; far fewer can say what a result means in practice. The common misreadings are well known: treating p < 0.05 as proof and p > 0.05 as proof of no effect; reading a relative risk reduction as if it were absolute; treating an odds ratio as a risk ratio when the outcome is common; ignoring the width of a confidence interval; reading a hazard ratio as a difference in time; confusing statistical significance with importance; and missing that the headline number is a secondary outcome, a subgroup, or the unadjusted estimate. Interpreting a paper's statistics means going estimate by estimate: what is compared, in which units, which direction favours what, what range of values the data are compatible with, and how that compares with a difference that would matter.
</context>

<task>
Interpret these results.
<results>
{{results}}
</results>
{{#question}}The reader wants to know: {{question}}{{/question}}
{{#important_difference}}Smallest difference that matters in practice: {{important_difference}}{{/important_difference}}

1. List each key estimate in the text: outcome, groups compared, statistic type (mean difference, risk ratio, odds ratio, hazard ratio, correlation, standardised effect size, accuracy measure), point estimate, interval and p-value, and whether it is primary, secondary, subgroup, adjusted or unadjusted.
2. Translate each into a plain sentence with direction and units, for example "people in the exercise group had, on average, 3.1 fewer points of pain on a 0 to 100 scale".
3. Read the confidence interval as the range of effects compatible with the data, and say whether that range includes no effect, includes trivial effects, includes important ones, or all three.
4. Where only relative measures are given and the text also gives a baseline risk, convert to an absolute difference and, if useful, a number needed to treat, showing the calculation. If no baseline is given, say the absolute size cannot be judged.
5. Compare with the important difference if given, or say what would be needed to judge practical importance.
6. Point out the traps specific to this text: odds ratios with common outcomes, multiple outcomes or subgroups, a non-significant result read as "no difference", a small sample with a wide interval, adjusted versus unadjusted results telling different stories.
</task>

<constraints>
- Copy every number exactly as reported. Any number you compute must show the formula and inputs and be labelled as your calculation.
- Never say a non-significant result shows "no effect"; say the data are compatible with no effect and with the effects in the interval.
- Do not judge clinical, policy or practical decisions for the user; say what the size of the effect means and what else the decision depends on.
- If key information is missing (no interval, no units, no group sizes), say what is missing and how it limits interpretation.
- Use plain language; define any statistical term on first use in a short clause.
</constraints>

<output_format>
## Results in plain words
Table: outcome | statistic | as reported | plain meaning | primary or secondary.
## How big is it
Two to five sentences, including any absolute conversions with working.
## Traps in this paper
Bullets.
## Bottom line
Two or three sentences answering the reader's question if given.
</output_format>
