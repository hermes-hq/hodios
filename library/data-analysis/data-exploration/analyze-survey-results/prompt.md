---
schema: 1
id: analyze-survey-results
kind: prompt
title: Analyse survey results
description: Analyses quantitative survey responses with cleaning, tabulation, cross-tabs and optional weighting, and states the caveats about sample and response bias. Use before reporting survey numbers.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, data-analyst, ux-researcher, marketer]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [surveys, cross-tabs, weighting, response-bias]
pairs_with:
  prompts: [classify-text-records, calculate-sample-size, write-insight-report]
args:
  - name: responses
    description: The response data (CSV or a summary), how it was collected, who was invited, how many responded, and any known population figures for weighting.
    type: text
    required: true
  - name: questions
    description: The questionnaire, with each question's wording, answer options and whether it was single choice, multiple choice, scale or open text.
    type: text
    required: true
  - name: key_question
    description: The one thing you most need to learn from the survey. Leave empty to cover all questions evenly.
    type: text
output_contract:
  format: markdown
  sections: [Who answered, Cleaning, Results, Cross-tabs, Weighting, Caveats, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a survey researcher. Survey numbers look precise and often are not: the people who answered may differ from the people you care about, question wording shapes answers, small subgroups produce noisy percentages, and multiple-choice questions do not sum to 100%. Your analysis reports what the respondents said, accurately, and says clearly how far that generalises.
</context>

<task>
Analyse this survey.

<questions>
{{questions}}
</questions>

<responses>
{{responses}}
</responses>

<key_question>
{{key_question}}
</key_question>

1. Describe who answered: number of responses, completion rate, response rate if the invited count is known, and how respondents compare to the target population on any known characteristics.
2. Clean: remove test and duplicate responses, flag speeders and straight-liners if timing or grid data exists, and decide how to treat partial responses. Report every exclusion with counts.
3. Tabulate each closed question: counts and percentages with the base (n) shown, "don't know" and no-answer kept visible. For multiple-choice questions, use respondents as the base and say that totals exceed 100%. For scales, show the full distribution and top-2-box; give a mean only alongside the distribution.
4. Cross-tabulate the key question (or the most decision-relevant one) by the two or three most relevant segments. Give 95% margins of error for the main percentages and flag any cell with fewer than 30 respondents. Only call a difference real if a test (chi-square or a two-proportion z-test) supports it, and say which test.
5. Weighting: if population figures are given, propose simple post-stratification or raking on one or two variables, show weighted and unweighted results side by side, and report the effective sample size. If none are given, say the results are unweighted and what that means.
6. Write pandas code that reproduces the cleaning, tables, cross-tabs and weights from the raw file.
</task>

<constraints>
- Every percentage shows its base. Never report a percentage without n.
- Report what respondents said ("42% of respondents said…"), not what "customers" or "users" think, unless the sample was random from that population and the response rate supports it.
- Do not compute statistics for open-text answers; say they need coding (for example with a classification step) and summarise themes only if the text is included.
- If the responses or questionnaire are missing, or answers cannot be matched to questions, ask for them and stop.
- Margins of error assume a random sample; for opt-in samples, say they are a rough guide only.
</constraints>

<output_format>
## Who answered
Short paragraph with the counts and the comparison to the population.

## Cleaning
A table: rule | responses removed or flagged.

## Results
One small table per closed question: answer | n | % (base). Key question first.

## Cross-tabs
Tables with n per cell, margins of error, and a line on which differences are significant.

## Weighting
Weighted vs unweighted for the key results, or a statement that results are unweighted.

## Caveats
Ranked bullets: coverage, non-response, wording or order effects, small subgroups.

## Code
One code block.
</output_format>
