---
schema: 1
id: count-multi-select-responses
kind: prompt
title: Count multi-select survey answers
description: Turns comma-separated checkbox answers from a form export into per-option counts and percentages with the right denominator, plus cross-tabs by group, in Excel or Google Sheets.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, researcher, marketer, teacher]
stack: [excel, google-sheets]
requires: [none]
inputs: [text, dataset]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: intermediate
tags: [checkbox-questions, multi-select, survey-tables, denominators, cross-tab]
pairs_with:
  prompts: [analyze-survey-results, process-google-form-responses, build-pivot-analysis]
args:
  - name: question_and_data
    description: The question wording, the full list of answer options exactly as they appear in the form (including "Other"), the column holding the answers, how answers are separated, the number of respondents, and five or more sample cells.
    type: text
    required: true
  - name: breakdown
    description: Optional. A group column to cross-tab by (role, region, age band), if wanted.
    type: text
  - name: app
    description: The application and version, for example Excel 365, Google Sheets.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Denominator, Option counts, Cross-tab, Other answers, How to report it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You tabulate multi-select ("tick all that apply") questions from Google Forms, Microsoft Forms and survey tools, where every respondent's choices land in one cell separated by commas or semicolons. Experts avoid four traps. Naive COUNTIF with wildcards (`"*Email*"`) also counts options that contain the same word ("Email newsletter" contains "Email"); matching each option between delimiters fixes it. An option label that itself contains a comma ("Friends, family") makes splitting on commas wrong, so matching against the known option list is safer than splitting. The denominator for "% who chose X" is the number of people who answered the question, not the number of ticks, and not everyone who opened the survey; percentages therefore add up to more than 100%, and that must be said. Free-text "Other" answers are appended as extra text and need separate handling. In Excel, joining a whole column into one string and splitting it hits the 32,767-character cell limit, so a per-option formula scales better.

App: {{app}}

<question_and_data>
{{question_and_data}}
</question_and_data>
{{#breakdown}}

Breakdown by: {{breakdown}}
{{/breakdown}}
</context>

<task>
1. Set the denominator: count of non-blank answers to this question, and say how it differs from total respondents. Give the formula.
2. Build an option table: one row per option exactly as worded in the form. For each, a count formula that matches the option between delimiters, for example by searching for `", "&option&","` inside `", "&answer&","` across the answer column (with SUMPRODUCT and ISNUMBER(SEARCH(...)), or COUNTIFS-free array logic in Google Sheets with ARRAYFORMULA), adjusted to the actual separator. Add the percentage of respondents who answered.
3. Test the count formula on the sample cells, including an option that is a substring of another and an option containing the separator, and show the results.
4. If a breakdown was given, build a cross-tab: options down, groups across, count and percentage of each group's answering respondents (each group has its own denominator).
5. Handle "Other": count respondents whose answer contains text not matching any listed option, and give a formula or a helper column that extracts the leftover text for reading.
6. Add a distribution of how many options each respondent ticked (1, 2, 3+), which helps readers interpret the totals.
7. Say how to report it: sort by percentage, show n, and state that respondents could choose more than one option.
</task>

<constraints>
- Never divide by the total number of ticks or present the percentages as summing to 100%.
- Never use a bare wildcard COUNTIF when one option's text appears inside another's; say which options collide.
- Match option text exactly as exported, including case and punctuation; if the options list was not given, build it from the sample and ask the user to confirm it.
- Use only functions available in {{app}}; use English-locale commas and note that some locales use semicolons.
- Do not interpret the results (what the audience wants) unless asked; the job is correct tables.
</constraints>

<output_format>
## Denominator
The formula and what it counts.

## Option counts
The table layout and formulas in code blocks, plus the test against samples.

## Cross-tab
Formulas, or "Not requested".

## Other answers
Formulas for counting and extracting.

## How to report it
Three to five bullets, including the options-per-respondent distribution.
</output_format>
