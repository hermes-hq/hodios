---
schema: 1
id: create-data-collection-form
kind: prompt
title: Design a clean data collection form
description: Designs a form or sheet that collects data cleanly at the source, with field types, validation, IDs, required fields and a test entry. Use before launching a form whose answers you will analyse.
category: data-exploration
version: 1.0.0
status: incubating
stage: [design, build]
role: [data-analyst, operations-manager, researcher, teacher]
inputs: [text]
output: [table, checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [data-collection, form-design, data-quality, validation, data-minimization]
pairs_with:
  prompts: [set-up-data-validation, write-survey-questionnaire, clean-messy-spreadsheet]
args:
  - name: purpose
    description: What the data is for, who fills it in (staff, customers, volunteers, students), on what device, how often, and what analysis or report it feeds.
    type: text
    required: true
  - name: fields
    description: The information you want to capture, in rough form (for example "name, site, date of visit, what was wrong, photo, how urgent").
    type: text
    required: true
  - name: tool
    description: Where the form will be built.
    type: enum
    enum: [google-forms, microsoft-forms, spreadsheet, other]
    default: google-forms
output_contract:
  format: markdown
  sections: [Data plan, Field specification, Structure and branching, Record IDs, Response sheet, Setup steps, Test entries, Privacy notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design data collection forms for people who will later have to analyse the answers. Most messy datasets were made messy at the form: free text where a list would do, one field holding two facts, dates typed any way, no record ID to join on, optional fields that should have been required, and answer options that change halfway through. You fix those at the source, ask only for what the purpose needs, and test the form with realistic and awkward entries before anyone uses it.
</context>

<task>
Design a form in {{tool}} for this purpose.

<purpose>
{{purpose}}
</purpose>

<fields>
{{fields}}
</fields>

1. Data plan: name the questions the data must answer and the unit of one response (one visit, one incident, one person per term). Drop any requested field that does not serve a stated question, and say why; add any missing field the analysis needs (for example a date, a location or a category to group by).
2. For each field, specify: the question text in plain words; the column name for analysis (short, lowercase, no spaces); the type (short answer, paragraph, number, date, time, dropdown, multiple choice, checkboxes, linear scale, file upload); required or optional; validation (number ranges, text length, a pattern for codes or emails, date limits); help text for anything ambiguous; and the options for choice fields.
3. Design choices that keep data clean:
   - Use choice fields wherever answers come from a known set, with mutually exclusive, exhaustive options and an "Other (please specify)" only when needed.
   - One fact per field: split combined questions, and record units in the question, not in the answer.
   - Dates and times from date or time pickers, never free text.
   - Scales labelled at both ends, the same direction throughout.
   - Required only where the analysis cannot work without it; too many required fields produce invented answers.
4. Structure: sections in the order people experience the event, and branching so people only see questions that apply to them.
5. Record IDs: how each response gets a unique ID (the form tool's timestamp plus a row number, a prefilled ID in a personalised link, or a formula in the response sheet), and how records link to other data (a staff ID, site code or order number chosen from a list rather than typed).
6. Response sheet: one row per response, one column per field, in form order, with column names fixed; analysis happens on a separate sheet that references the responses, so nobody edits the raw responses.
7. Test entries: four or five filled-in test responses, including one that should be rejected by validation and one edge case, with what the resulting row should look like.
8. Setup steps for {{tool}}: in Google Forms, response validation per question, section-based branching ("Go to section based on answer") and linking to a Google Sheet; in Microsoft Forms, number and date restrictions, branching and the linked Excel workbook (validation there is more limited, so say what to check after collection); in a spreadsheet, data validation and protected header rows; for other tools, the generic equivalents.
</task>

<constraints>
- Collect the minimum personal data the purpose needs. If a field collects health, children's, or other sensitive data, flag it and suggest a lawful-basis and consent check with whoever handles data protection.
- Add a short statement at the top of the form saying what the data is for, who sees it, and how long it is kept, using placeholders for details you do not know.
- Use only features the chosen tool has; when unsure whether a feature exists in their version, say so and give a fallback.
- Write question text that a tired person on a phone can answer in seconds: short, one question at a time, no jargon.
- If the purpose is unclear enough that you cannot decide what to collect, ask one short question before designing.
</constraints>

<output_format>
## Data plan
The questions the data answers and the unit of a response.

## Field specification
Table: # | Question text | Column name | Type | Required | Validation | Help text | Options.

## Structure and branching
Sections and branching rules.

## Record IDs
How IDs are created and how records link to other data.

## Response sheet
Column layout and the rule that raw responses are not edited.

## Setup steps
Numbered steps for {{tool}}.

## Test entries
Table: Test | Entered values | Expected result.

## Privacy notes
The statement for the top of the form and any sensitive fields flagged.
</output_format>
