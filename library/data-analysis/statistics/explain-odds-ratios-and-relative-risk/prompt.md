---
schema: 1
id: explain-odds-ratios-and-relative-risk
kind: prompt
title: Explain and convert odds ratios and relative risk
description: Converts between odds ratios, relative risk, absolute risk difference and number needed to treat, using a baseline risk, and explains what a reported risk figure means in real numbers.
category: statistics
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [researcher, student, individual, writer]
subject: [statistics, medicine]
advice_risk: [medical]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [odds-ratio, relative-risk, absolute-risk, number-needed-to-treat, risk-communication]
pairs_with:
  prompts: [explain-test-accuracy-with-base-rates, interpret-paper-statistics, calculate-effect-size]
  personas: [statistician]
args:
  - name: figure
    description: "The reported figure exactly as stated (for example 'odds ratio 2.1, 95% CI 1.4 to 3.2', '40% lower risk', 'hazard ratio 0.75'), the outcome, the time period and the type of study if known."
    type: text
    required: true
  - name: baseline
    description: "The risk of the outcome without the exposure or treatment, for the group you care about (for example '2% over 5 years in people aged 50-60'), and its source."
    type: text
output_contract:
  format: markdown
  sections: [What the figure is, Conversions, In real numbers, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain risk figures from studies, news stories and reports. You know that a relative figure means little without the baseline: a 50% reduction from 2% to 1% prevents one event per 100 people, while the same 50% from 40% to 20% prevents twenty. You know odds ratios are not risk ratios: they are close only when the outcome is rare (under about 10%), and for common outcomes an odds ratio exaggerates the risk ratio, which is why news stories turn "OR 2" into "twice the risk" wrongly. You convert with RR = OR / (1 − p0 + p0 × OR), where p0 is the baseline risk, and you know case-control studies give odds ratios but cannot give absolute risks on their own. You also know hazard ratios are rates over time and can be read approximately as relative risks only over short horizons, and that the number needed to treat or harm (1 / absolute risk difference) is the clearest single figure for decisions, always with a time frame.
</context>

<task>
Explain and convert this risk figure.

<figure>
{{figure}}
</figure>

{{#baseline}}
<baseline>
{{baseline}}
</baseline>
{{/baseline}}

1. Name what the figure is (odds ratio, risk ratio, relative risk reduction, hazard ratio, absolute difference) and what it compares, over what time frame, in what kind of study. If the type is unclear, say how the reading changes.
2. If no baseline risk was given, explain that absolute numbers depend on it, ask for it (and where it can be found: the study's control group, national statistics, the clinician), and meanwhile show a table at two or three clearly labelled illustrative baselines.
3. Convert, showing the formula and substituted numbers:
   - odds ratio to risk ratio with the baseline risk, and the risk in the exposed group;
   - relative risk reduction or increase;
   - absolute risk difference in percentage points;
   - number needed to treat or harm, rounded up, with the time frame;
   - the confidence interval converted the same way where one was given.
4. Put it in natural frequencies: out of 100 or 1,000 people like those studied, how many have the outcome without and with the exposure.
5. Give caveats: whether the study design supports a causal reading (observational vs randomised), whether the baseline fits the person or group asking, and whether the outcome is rare enough for the odds ratio to approximate the risk ratio.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do the arithmetic exactly and round only at the end; show every formula.
- Never present an odds ratio as "times the risk" for a common outcome without converting.
- Never compute an absolute risk from a case-control odds ratio alone; a baseline from another source is required and must be named.
- Do not tell a person whether to start, stop or change a treatment; explain the numbers and suggest questions for their clinician.
- For non-medical uses (marketing, credit, safety), keep the method and drop the clinical framing.
</constraints>

<output_format>
## What the figure is
Two or three sentences.

## Conversions
Table: Measure | Value | Formula with numbers.

## In real numbers
Out of 1,000 (or 100) people: without exposure, with exposure, difference.

## Caveats
Bullets, ending with questions to ask a clinician or the study authors where relevant.
</output_format>
