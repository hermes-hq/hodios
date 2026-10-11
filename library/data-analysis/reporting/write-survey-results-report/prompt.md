---
schema: 1
id: write-survey-results-report
kind: prompt
title: Write a survey results report
description: Turns finished survey analysis into a readable report with key findings, a section per theme, the right chart per question, base sizes everywhere and honest limits on what the sample supports.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [researcher, data-analyst, manager, ux-researcher]
inputs: [dataset, document, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [survey-reporting, base-sizes, likert, questionnaire, findings]
pairs_with:
  prompts: [analyze-survey-results, write-insight-report, write-data-methodology-note, make-report-accessible]
args:
  - name: survey_results
    description: "The analysed results: question wording, response options, counts and percentages per question, base size per question, cross-tabs by group with any significance tests run, and themes coded from open answers with counts."
    type: text
    required: true
  - name: survey_method
    description: "Who was invited and how, number invited and completed, dates, sampling method (random, panel, open link, all staff or customers), any weighting, and the purpose of the survey."
    type: text
    required: true
  - name: audience
    description: Who reads the report (leadership, staff, customers, public) and the decisions it informs. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Summary, About the survey, Key findings, Findings by theme, Recommendations, Limitations, Question list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A survey report turns tables into a story people can act on, without claiming more than the data can bear. Experienced survey researchers follow a few rules. Every percentage carries its base (n), and bases differ between questions because of routing and skips. Percentages on small bases (commonly under 30 to 50) are shown as counts or not shown, and subgroup differences are only called differences when a test supports them. A margin of error applies only to probability samples; an open-link or volunteer survey has no margin of error, and its results describe respondents, not the whole population. Response rate and who responded matter as much as the answers. Multi-select questions add up to more than 100%, which readers must be told. Agreement scales are summarised as top-two-box (agree plus strongly agree) with the full distribution available, and the question wording is quoted where it shapes the answer. Chart choice follows the question: horizontal bars sorted by size for categorical answers, stacked diverging bars for agreement scales, and no pie charts for multi-select. Open-ended themes are reported with counts and representative, non-identifying quotes. Survey results show association, not cause.

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
<survey_method>
{{survey_method}}
</survey_method>

<survey_results>
{{survey_results}}
</survey_results>

1. Write the "About the survey" section: purpose, who was invited, completions, response rate, dates, sampling method, weighting, and what population the results can and cannot describe.
2. Pick five to seven key findings, each a plain sentence with the figure and base, ordered by importance to the audience's decisions.
3. Group questions into themes and write each theme section with the findings, the recommended chart per question and why, and subgroup differences only where tested.
4. Report open-ended themes with counts and short non-identifying quotes.
5. Draft recommendations that follow from the findings, marked as suggestions for the owners to decide.
6. Write the limitations plainly and list the questions with exact wording and base sizes.
</task>

<constraints>
- Show the base for every percentage; replace percentages on bases under 30 with counts and say so.
- Give a margin of error only for probability samples, and say why none is given otherwise.
- Do not describe a subgroup difference as real unless a test result was supplied; otherwise call it "a difference among respondents that may not hold more widely".
- Do not use causal language for survey associations.
- Do not quote open answers that could identify a respondent, and suppress groups small enough to identify people.
- Do not add findings that are not in the results supplied.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences for a reader who reads nothing else.

## About the survey
Short paragraph and a small table: Invited | Completed | Response rate | Dates | Method.

## Key findings
Numbered findings, each with figure and base.

## Findings by theme
One subsection per theme: findings, chart recommendation per question, tested subgroup differences.

## Recommendations
Numbered suggestions linked to findings.

## Limitations
Bullets.

## Question list
Table: Question | Exact wording | Base.
</output_format>
