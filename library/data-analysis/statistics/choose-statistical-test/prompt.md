---
schema: 1
id: choose-statistical-test
kind: prompt
title: Choose a statistical test
description: Picks the right statistical test for a research question and data shape, explains its assumptions and how to check them, and gives code to run it. Use before testing a difference or relationship.
category: statistics
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, researcher, student, data-scientist]
subject: [statistics]
inputs: [text, dataset]
output: [explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hypothesis-testing, assumptions, effect-size]
pairs_with:
  prompts: [calculate-sample-size, check-analysis-for-pitfalls]
args:
  - name: question
    description: The research question in plain words (for example "do customers on plan B spend more than on plan A?").
    type: text
    required: true
  - name: data_description
    description: The variables involved and their types, how many observations per group, whether observations are paired or repeated, how the data was collected, and a sample if possible.
    type: text
    required: true
  - name: tool
    description: Tool for the code that runs the test.
    type: enum
    enum: [python, r, spreadsheet]
    default: python
output_contract:
  format: markdown
  sections: [Recommended test, Why this test, Assumptions and checks, Code, Reporting the result, If assumptions fail]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician advising an analyst. The right test follows from the question and the design, not from what is familiar: the type of outcome, the number of groups, whether observations are independent, paired or clustered, and whether the question is about a difference, an association or a prediction. The most damaging errors are design errors, such as treating repeated measurements of the same people as independent, which no choice of test can fix afterwards.
</context>

<task>
Recommend a statistical test.

<question>
{{question}}
</question>

<data_description>
{{data_description}}
</data_description>

1. Restate the question as a hypothesis: the outcome variable and its type (continuous, ordinal, binary, count, time-to-event), the explanatory variable and its type, the number of groups, and the null and alternative hypotheses, one- or two-sided with the reason.
2. Identify the design: independent groups, paired or repeated measures, clustered data (for example users within teams), or observational vs randomised. If a design fact that changes the test is missing (most often: paired or not), ask about it and stop, unless one reading is clearly implied.
3. Choose the test, and the effect size and confidence interval to report with it. Typical mapping: two independent means, Welch's t-test; paired means, paired t-test; skewed or ordinal two-group, Mann-Whitney U or Wilcoxon signed-rank; three or more groups, one-way ANOVA (Welch) or Kruskal-Wallis with planned or corrected post-hoc comparisons; two categorical variables, chi-square test of independence or Fisher's exact test with small expected counts; two proportions, a two-proportion z-test; association between continuous variables, Pearson or Spearman; adjusting for other variables, a regression of the right family; clustered or repeated data, mixed-effects models or cluster-robust errors.
4. List the assumptions of that test and how to check each with this data, preferring plots and design reasoning over formal pre-tests.
5. Write {{tool}} code that runs the checks and the test and prints the statistic, p-value, effect size and confidence interval.
</task>

<constraints>
- Prefer estimation over a bare verdict: always report an effect size with a confidence interval alongside any p-value.
- Do not recommend a normality pre-test as the gate for choosing a test; with large samples it rejects trivially and with small ones it has no power. Use the design, plots and robust defaults (for example Welch's t-test rather than Student's).
- If several outcomes or comparisons are planned, say so and recommend a correction (Holm or Benjamini-Hochberg) or a single pre-registered primary comparison.
- If the data is observational, say that the test can show association, not cause.
- Python: use scipy.stats and statsmodels; R: base stats plus well-known packages only; spreadsheet: built-in functions (T.TEST, CHISQ.TEST, CORREL) and say what they cannot do.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommended test
One line: the test, plus the effect size measure to report.

## Why this test
Three to five bullets tracing outcome type, groups, design and hypothesis to the choice.

## Assumptions and checks
A table: assumption | how to check here | what to do if it fails.

## Code
One code block in {{tool}}.

## Reporting the result
A fill-in sentence in the form a reader expects (for example "Plan B users spent 4.2 more on average (95% CI 1.1 to 7.3; Welch's t(182) = 2.7, p = 0.008)").

## If assumptions fail
The fallback test or model in one or two lines.
</output_format>
