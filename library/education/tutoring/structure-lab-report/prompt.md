---
schema: 1
id: structure-lab-report
kind: prompt
title: Structure a lab report from your data
description: Scaffolds a school or first-year lab report from the student's own data, with section-by-section prompts, what each section must contain and checks on units and error analysis.
category: tutoring
version: 1.0.0
status: incubating
stage: [plan, build]
role: [student]
subject: [physics, chemistry, biology]
requires: [none]
inputs: [dataset, text]
output: [outline, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [lab-report, scientific-method, uncertainty, error-analysis, data-presentation, significant-figures]
pairs_with:
  prompts: [give-lab-report-feedback, prepare-ib-internal-assessment]
  personas: [science-tutor]
  rules: [academic-integrity-rules]
args:
  - name: experiment
    description: The aim, the method as carried out (including any changes from the handout), the equipment and its resolution.
    type: text
    required: true
  - name: data
    description: The raw results as recorded, with units and any repeats, pasted as text or a table.
    type: text
    required: true
  - name: level
    description: Sets what the report is expected to include, especially for uncertainty and statistics.
    type: enum
    enum: [high-school, first-year-university]
    default: high-school
output_contract:
  format: markdown
  sections: [Your experiment in one line, Data check, Section by section, Calculations to show, Before you hand it in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students usually have the data but not the structure: they do not know what goes in which section, they present raw numbers without units or uncertainties, they draw a conclusion the data cannot support, and they write "human error" as the evaluation. A good scaffold tells them exactly what each section must contain for their experiment, checks their data before they build on it, and asks the questions that make them think, while leaving every sentence to them.
</context>

<task>
Build a lab report scaffold at `{{level}}` level for this experiment and data.

<experiment>
{{experiment}}
</experiment>

<data>
{{data}}
</data>

1. **Your experiment in one line.** State the research question, the independent and dependent variables and the main controlled variables as you read them. If any cannot be identified, ask; do not guess.
2. **Data check.** Before scaffolding, check the data: units present, consistent decimal places matching the instrument's resolution, repeats and their spread, obvious anomalies (name them, and ask whether something went wrong in that trial, without deleting them), and whether there is enough data for the analysis expected at this level. List problems in order of importance.
3. **Section by section.** For each section (title, introduction and hypothesis, variables, method, risk assessment, results, analysis, conclusion, evaluation, references), give: what it must contain for this specific experiment, two or three questions the student should answer in their own words to write it, and common mistakes to avoid. In results, specify the tables (raw and processed, with headings that include units and uncertainty) and the graph (which variable on which axis, error bars if expected, line or curve of best fit and whether it should pass through the origin). In evaluation, prompt for specific systematic and random errors from their method, their likely direction and size, and realistic improvements.
4. **Calculations to show.** List the calculations this data needs (means, ranges, uncertainties, percentage error against an accepted value, gradients, any statistics expected at this level) and what one worked sample calculation must show. Explain the method; let the student do the arithmetic on their numbers.
5. **Before you hand it in.** A checklist specific to this report.
</task>

<constraints>
- Do not write any section or sentence of the report, do not produce finished processed tables or conclusions, and never alter, smooth or invent data.
- You may demonstrate a technique, such as uncertainty propagation or a sample calculation, on invented numbers from a different experiment.
- Calibrate to `{{level}}`: do not require statistical tests or full propagation where the level does not expect them; mark extras as "good practice, beyond the level".
- If the method described is unsafe, flag it first.
</constraints>

<output_format>
Use the section headings from the output contract. Data check as a numbered list of problems. Section by section as a table: Section | Must contain for this experiment | Questions to answer | Avoid. Before you hand it in as a checklist.
</output_format>
