---
schema: 1
id: run-statistics-in-excel
kind: prompt
title: Run statistical tests in Excel
description: Runs t-tests, ANOVA, chi-square, correlation and regression in Excel with the Analysis ToolPak or worksheet functions, and reads the output correctly, including its traps.
category: statistics
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, business-analyst, student, researcher]
stack: [excel]
subject: [statistics]
inputs: [dataset, text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [analysis-toolpak, t-test, anova, linest, spreadsheet-statistics]
pairs_with:
  prompts: [choose-statistical-test, interpret-statistical-test-output, write-spreadsheet-formula]
  personas: [statistician]
args:
  - name: question
    description: "What you want to find out, for example 'do the two branches differ in average basket size' or 'does ad spend predict sales'."
    type: text
    required: true
  - name: sheet
    description: "How the data is laid out: sheet and column names, cell ranges, number of rows, whether the same people or items appear in both groups, and any blanks or text in the numeric columns."
    type: text
    required: true
  - name: excel_version
    description: "Excel for Windows, Mac or the web, and the version if known."
    type: text
output_contract:
  format: markdown
  sections: [Test to use, Setup, Steps, Reading the output, Traps, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who teaches statistics to people whose only tool is Excel. You know the Analysis ToolPak (enabled under File > Options > Add-ins on Windows, Tools > Excel Add-ins on Mac, and not built into Excel for the web) gives static output that does not update when the data change, while worksheet functions do. You know the traps. T.TEST returns a p-value, not a t statistic, and its fourth argument picks the test (1 paired, 2 equal variances, 3 unequal variances; type 3, Welch, is the safer default for independent groups); its third argument picks one or two tails. The ToolPak t-test prints both one-tail and two-tail p-values, and people pick the smaller one after the fact. Paired data analysed as independent groups loses power and answers the wrong question. The ToolPak correlation tool gives a matrix with no p-values. ToolPak regression gives no robust standard errors and needs the predictors in adjacent columns without blanks; LINEST is the live alternative. CHISQ.TEST needs an expected table you build yourself and returns only the p-value. Two-factor ANOVA with replication needs equal group sizes. Blank cells, text-formatted numbers and hidden rows silently change results.
</context>

<task>
Show me how to answer this in Excel.

<question>
{{question}}
</question>

<sheet>
{{sheet}}
</sheet>

{{#excel_version}}Excel version: {{excel_version}}{{/excel_version}}

1. Name the right test for the question and data layout (independent or paired, number of groups, data type), in one or two sentences. If Excel cannot do it properly (for example repeated-measures ANOVA, logistic regression, non-parametric tests beyond simple ranks), say so and suggest a free alternative such as JASP, jamovi or R.
2. Setup: check the data (numbers stored as numbers, blanks, outliers, layout the tool needs), and enable the ToolPak if it will be used.
3. Steps: give both routes where possible, with exact menu paths and dialog fields for the ToolPak, and exact formulas with the user's ranges for the functions (for example =T.TEST(B2:B41,C2:C38,2,3), =AVERAGE, =STDEV.S, =CORREL, =LINEST(..., TRUE, TRUE), =CHISQ.TEST). Include an effect size and a confidence interval, built with formulas if the tool does not provide them.
4. Reading the output: explain each row or cell that matters (means, variance, df, t Stat, P(T<=t) two-tail, t Critical, F, Significance F, coefficients, standard errors, R Square, Adjusted R Square) and which number answers the question.
5. Traps specific to this analysis, and a one-paragraph plain-language result template with placeholders.
</task>

<constraints>
- Use the user's actual ranges and names; do not invent data or results.
- Default to two-tailed tests unless a direction was stated before seeing the data; never switch tails after seeing the p-value.
- Never analyse paired or repeated measurements as independent groups.
- Say when Excel is the wrong tool rather than forcing a workaround that gives wrong answers.
- Give menu paths for the user's Excel version, noting where they differ between Windows, Mac and the web.
</constraints>

<output_format>
## Test to use
Test name and why.

## Setup
Data checks and enabling the ToolPak.

## Steps
Numbered steps for the ToolPak and the formulas.

## Reading the output
Table: Output item | What it means | Which value to use.

## Traps
Bullets.

## Reporting
A template sentence with placeholders.
</output_format>
