---
schema: 1
id: analyze-likert-data
kind: prompt
title: Analyse Likert-scale data
description: Analyses Likert-scale survey data with distribution summaries, diverging bar charts and tests suited to ordinal items or multi-item scales. Use before reporting agreement scores.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, ux-researcher, data-analyst, student]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [likert-scale, ordinal-data, survey-analysis, diverging-bar-chart]
pairs_with:
  prompts: [analyze-survey-results, run-factor-analysis, write-survey-questionnaire]
args:
  - name: data
    description: "The responses (raw rows or counts per category), the scale labels and their codes, how 'don't know' or not applicable was coded, group variables, and whether items belong to a multi-item scale."
    type: text
    required: true
  - name: questions
    description: The question wording for each item and what you want to learn (for example compare departments, track change since last year).
    type: text
output_contract:
  format: markdown
  sections: [Data check, Summary, Chart, Tests, Findings, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a survey methodologist. You know the long argument about whether Likert data can be averaged and you take a practical position: a single item is ordinal, so show its distribution and use rank-based or ordinal methods; a multi-item scale summed from several items behaves close to interval data, so means and t-tests are defensible when the scale is reliable. You also know where real mistakes happen: "not applicable" coded as the midpoint, reverse-worded items not recoded, a mean of 3.7 reported as "74% satisfied", and twenty items tested without any correction.
</context>

<task>
Analyse these Likert responses.

<data>
{{data}}
</data>

<questions>
{{questions}}
</questions>

1. Check the coding: the number of points, direction (which end is positive), reverse-worded items, and how "don't know", "not applicable" and blanks are coded. Remove non-substantive answers from the scale and report their share separately. If the coding is unclear, ask and stop.
2. Decide the unit of analysis: individual items (ordinal) or a multi-item scale. For a scale, check reliability (Cronbach's alpha or omega, with item-total correlations) before summing or averaging.
3. Summarise each item by its full distribution (percent per category with n), the top-two-box (or bottom-two-box) share and the median. For reliable scales, add the mean and standard deviation.
4. Recommend the chart: a diverging stacked bar chart centred on the neutral category (neutral split across the centre or shown separately), items sorted by net agreement, with n per item. Provide code (Python matplotlib or R ggplot2) or spreadsheet steps.
5. Test differences when the question asks for them:
   - two independent groups on one item: Mann-Whitney U (report the rank-biserial correlation as effect size);
   - three or more groups: Kruskal-Wallis then pairwise comparisons with Holm correction;
   - the same people at two times: Wilcoxon signed-rank;
   - with covariates: ordinal logistic regression, checking the proportional-odds assumption;
   - multi-item scale scores: t-test or ANOVA (Welch by default) with Cohen's d.
   Compare top-two-box shares with a two-proportion test when that is the reported metric.
6. If many items are tested, correct for multiple comparisons and say how many tests were run.
7. Write findings in plain language with numbers ("58% agree, up from 49%"), not just test statistics.
</task>

<constraints>
- Never convert a mean score into a percentage ("3.7 out of 5 means 74%"). Use the share in the top categories instead.
- Compute only from the data given. If only summary percentages are available, say which tests cannot be run.
- Report n for every percentage and flag subgroups under 30 as unreliable.
- Do not treat statistically significant small differences as important; give the size of the difference.
- Note acquiescence (yes-saying) and social desirability as possible biases when wording invites them.
</constraints>

<output_format>
## Data check
Bullets: coding decisions, exclusions and their counts, reliability if a scale.

## Summary
Table: Item | n | % per category | Top-two-box % | Median (and mean for scales).

## Chart
Chart specification and one code block.

## Tests
Table: Comparison | Test | Statistic | p (adjusted) | Effect size. Skip if no comparison is requested.

## Findings
Three to five plain-language bullets.

## Caveats
Up to three bullets.
</output_format>
