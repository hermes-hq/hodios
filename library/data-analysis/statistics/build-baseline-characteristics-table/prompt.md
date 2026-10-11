---
schema: 1
id: build-baseline-characteristics-table
kind: prompt
title: Build a baseline characteristics table
description: Builds the statistical content of a Table 1 comparing groups, picking the right summary for each variable and using standardised differences rather than p-values to show balance.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, data-analyst, data-scientist, student]
subject: [statistics, medicine]
inputs: [dataset, text]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [table-one, descriptive-statistics, standardised-mean-difference, group-comparison, covariate-balance]
pairs_with:
  prompts: [build-manuscript-tables, report-statistical-results, estimate-causal-effect]
  personas: [statistician]
args:
  - name: study
    description: "The design (randomised trial, cohort, case-control, survey, A/B test), the groups being compared and how people got into each group."
    type: text
    required: true
  - name: variables
    description: "The baseline variables with type (continuous, binary, categorical, ordinal), units, any known skew, missing data counts, and either the raw data description or summaries per group."
    type: text
    required: true
  - name: tool
    description: "The tool you will use to produce the table (R tableone or gtsummary, Python tableone, Stata table1_mc, SPSS, Excel)."
    type: text
output_contract:
  format: markdown
  sections: [Table plan, Table, Balance, Notes, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a biostatistician who builds the first table of trial and cohort reports. Table 1 describes who was studied; it is not a hypothesis test. In a randomised trial, any baseline difference is by definition due to chance, so significance tests of baseline variables are meaningless and reporting guidelines for trials (such as CONSORT) advise against them. In observational studies p-values depend on sample size, so a large cohort shows "significant" trivial differences and a small one hides big ones. Standardised mean differences (SMD) measure imbalance on a scale that does not depend on n; an absolute SMD above about 0.1 is a common flag. Skewed variables (length of stay, costs, biomarker levels) need the median and interquartile range, not mean and SD. Percentages need their denominators when data are missing, and missing values deserve their own row rather than silent exclusion. Too many decimals and categories make the table unreadable.
</context>

<task>
Build a baseline characteristics table.

<study>
{{study}}
</study>

<variables>
{{variables}}
</variables>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Plan each row: the summary for each variable type (mean (SD) for roughly symmetric continuous variables, median [IQR] for skewed ones, n (%) for binary and categorical, with every level of a categorical variable shown), units, decimal places (usually one for percentages and continuous summaries), and a missing-data row where any data are missing.
2. Decide the columns: one per group, an overall column if useful, and the n per group in the header. Order rows by theme (demographics, clinical or behavioural factors, then measures at baseline of the outcome).
3. Fill the table from the summaries given. Compute standardised differences where the data allow: continuous SMD = (mean₁ − mean₂) / √((SD₁² + SD₂²)/2); binary SMD = (p₁ − p₂) / √((p₁(1−p₁) + p₂(1−p₂))/2). Show the working for at least one row.
4. Describe balance: which variables have an absolute SMD above 0.1, and what that means for the design (chance in a trial, confounding to address in an observational study). Do not add p-values for a trial; for observational data, explain why SMDs are preferred if the user asks for p-values.
5. Write footnotes: what the summaries are, how missing data are shown, how SMD is defined.
6. Give code for the chosen tool that produces the table with the right summaries, nonnormal variables declared, missing rows and SMDs.
</task>

<constraints>
- Use only the numbers given; mark cells that need the data as placeholders rather than inventing values.
- Never add significance tests of baseline differences in a randomised trial.
- Do not summarise clearly skewed variables with mean and SD alone.
- Always show percentages with denominators clear when data are missing.
- Do not interpret imbalance in an observational study as an effect of group membership.
</constraints>

<output_format>
## Table plan
Variable | Type | Summary used | Decimals.

## Table
The Table 1 in markdown, with group n in headers and an SMD column.

## Balance
Variables with |SMD| > 0.1 and what that means for this design.

## Notes
Footnotes for the table.

## Code
One code block.
</output_format>
