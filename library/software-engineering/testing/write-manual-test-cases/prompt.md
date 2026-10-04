---
schema: 1
id: write-manual-test-cases
kind: prompt
title: Write manual test cases
description: Writes manual test cases a non-developer can run, with preconditions, numbered steps, test data, expected results and priority, grouped into smoke and full passes. Use for UAT or before automation.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [qa-engineer, product-manager, support-agent, business-analyst]
requires: [none]
inputs: [spec, ticket, text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [user-acceptance-testing, test-cases, smoke-test, regression-pack]
pairs_with:
  prompts: [write-test-plan, write-exploratory-test-charters, write-gherkin-scenarios]
args:
  - name: feature_description
    description: What the feature does, the acceptance criteria or user stories, the user roles, and anything that changed. Screenshots described in words help.
    type: text
    required: true
  - name: format
    description: How to lay out the cases - a Markdown table, a numbered list per case, or CSV to import into a spreadsheet or test management tool.
    type: enum
    enum: [table, markdown-list, csv]
    default: table
output_contract:
  format: markdown
  sections: [Scope and assumptions, Test data, Smoke pass, Full pass, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The cases will be run by people who did not build the feature: manual testers, support staff or product owners doing user acceptance testing. They need to follow each case without guessing and to know for certain whether it passed. Common failures: steps that say "check it works", expected results that are vague ("page loads correctly"), several checks hidden in one case so a failure is hard to report, missing test data, and fifty equal-priority cases when the team only has time for ten.

Layout requested: {{format}}.
</context>

<task>
<feature>
{{feature_description}}
</feature>

1. Identify user roles, the main flows and the rules in the acceptance criteria. List assumptions you had to make.
2. Derive cases: each acceptance criterion's main path; then invalid input and error messages; boundaries (limits, dates, amounts, empty and maximum lengths); permissions per role; cancel, back and retry; and what happens to existing data. Merge cases that would test the same thing.
3. Write each case with:
   - ID (for example TC-01), a short title starting with a verb ("Reject a discount code that has expired").
   - Priority: P1 (must pass to release), P2 (important), P3 (nice to check).
   - Preconditions: account, role, starting page, data that must exist.
   - Steps: numbered, one action each, in plain words naming the exact button or field as it appears on screen.
   - Test data: exact values to enter.
   - Expected result: what the tester should see, specific enough to be true or false (the exact message, the new total, the status shown).
   - Result column left blank (Pass, Fail, Blocked) and a Notes column.
4. Group into a smoke pass (P1 only, about 15-30 minutes, run on every build) and a full pass (everything, ordered so setup is reused).
5. Describe the test data to prepare: accounts per role, records in particular states, and how to reset them. Synthetic only.
6. Lay out the cases in the requested layout: table uses the columns ID, Title, Priority, Preconditions, Steps, Test data, Expected result, Result, Notes, with steps as a numbered list inside the cell (`1. ... <br> 2. ...`); markdown-list gives each case a short heading and the same fields as labelled bullets; csv uses the same columns in that order, one fenced `csv` block per pass, with every cell quoted and steps separated by line breaks inside the quoted cell.
7. Keep it runnable: aim for 8-30 cases in total and a smoke pass of no more than 10. If the feature needs more, cover the highest-risk areas and list the areas left out under Scope and assumptions.

If the description does not say what the feature does or who uses it (for example only a feature name), do not write cases: ask for what it does, the user roles, the acceptance criteria and any messages or limits, and stop. If it says what the feature does but lacks acceptance criteria, write the cases you can, mark unclear expected results as [CONFIRM], and list the questions.
</task>

<constraints>
- One check per case; split cases that verify unrelated outcomes.
- No developer jargon in steps; name what the tester sees.
- Expected results must be observable on screen or in an email, export or report the tester can access.
- Do not invent rules, messages or limits; mark them [CONFIRM].
</constraints>

<output_format>
## Scope and assumptions
Bullets.
## Test data
Table: data item | state | how to create or reset.
## Smoke pass
The P1 cases in the requested layout.
## Full pass
All remaining cases in the requested layout.
## Questions
Bullets for anything marked [CONFIRM], or "None".
</output_format>
