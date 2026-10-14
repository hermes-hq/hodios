---
schema: 1
id: report-statistical-results
kind: prompt
title: Report statistical results in APA or journal format
description: Turns statistical software output into correctly formatted result sentences with test statistic, degrees of freedom, exact p, effect size and confidence interval, in APA or a journal's style.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [build]
role: [student, researcher, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [article, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
subject: [statistics]
tags: [apa-style, effect-size, confidence-intervals, statistical-reporting, spss-output]
pairs_with:
  prompts: [write-results-section, build-manuscript-tables]
  personas: [statistician]
args:
  - name: output
    description: The raw output from SPSS, R, JASP, Stata, jamovi or similar, pasted as text, and what each analysis was testing.
    type: text
    required: true
  - name: style
    description: Optional. The style to follow, for example "APA 7", "AMA", or the journal's statistics instructions. APA 7 is used if empty.
    type: string
output_contract:
  format: markdown
  sections: [Result sentences, Values extracted, Problems in the output, Style notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students and researchers lose marks and reviewer goodwill on reporting details: reading the wrong row of an SPSS table (Levene's test instead of the t test, the uncorrected instead of the Welch line), reporting "p = .000" (it should be p < .001), leaving out degrees of freedom or effect sizes, mixing up the chi-square N and df, or reporting standardised and unstandardised coefficients interchangeably. APA 7 conventions: italicise statistical symbols; report exact p to two or three decimals except p < .001; no leading zero for values that cannot exceed 1 (p, r, beta in some contexts) but a leading zero for others; give the effect size with a confidence interval where possible; report means with SDs. Other styles differ (AMA uses P and different decimal rules), so the style must be stated.
</context>

<task>
Turn this output into result sentences{{#style}} following {{style}}{{/style}}.
<output>
{{output}}
</output>

1. Identify each analysis in the output and which table rows contain the values to report (for example the Welch row if variances are unequal, the corrected chi-square only when appropriate, the omnibus F before post hoc tests). Say which row you used and why.
2. Extract the values: descriptive statistics, test statistic, degrees of freedom, p, effect size and confidence interval.
3. Write one or two plain sentences per analysis stating the direction and size of the effect in the variable's units, then the statistics in the required format. Use italics with Markdown asterisks for statistical symbols.
4. If an effect size or confidence interval is missing but can be computed from the given values (for example Cohen's d from means and SDs, or eta squared from F and df), compute it, show the formula used, and label it as computed. If it cannot be computed, mark [MISSING: ...].
5. List problems in the output: values that disagree, a wrong test for the design, assumptions flagged by the output, or values that look like typos.
</task>

<constraints>
- Do not change or round reported values except to apply the style's decimal rules; say when you rounded.
- Never write "p = .000"; never describe p between .05 and .10 as a trend or as marginally significant.
- Do not interpret beyond the result (no "this proves" or theoretical explanation).
- If the output is ambiguous about which test was run, ask rather than guess, and give both readings.
</constraints>

<output_format>
## Result sentences
Ready-to-paste sentences, one paragraph per analysis.
## Values extracted
Table: analysis, statistic, df, p, effect size, CI, source row.
## Problems in the output
Bullets, or "None found".
## Style notes
The conventions applied and any choices made.
</output_format>
