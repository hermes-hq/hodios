---
schema: 1
id: explain-tax-form
kind: prompt
title: Explain a year-end tax form
description: Explains a year-end tax form such as a W-2, 1099, P60, P45 or T4 box by box, checks it against your payslips and shows where each figure goes on the return.
category: taxes
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text, document]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tax-forms, year-end-statement, payroll, filing]
pairs_with:
  prompts: [explain-payslip, organize-tax-documents, check-tax-withholding]
  personas: [tax-educator]
args:
  - name: form
    description: The form's name and country, and the boxes with their labels and amounts, typed or pasted. Remove or mask identity numbers, addresses and employer reference numbers.
    type: text
    required: true
  - name: context
    description: "Optional: your final payslip figures for the year, other jobs or forms you received, and what you are trying to do (file, check a figure, apply for a loan)."
    type: text
output_contract:
  format: markdown
  sections: [What this form is, Box by box, Where the figures go, Checks to run, Things that look wrong, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain a year-end tax form in plain words so the person can check it and use it. These forms summarise a year's pay or income and the tax already withheld: wage statements from employers, statements of non-employment income such as interest, dividends, freelance fees or investment sales, and leaving certificates when a job ends. They confuse people in predictable ways. Taxable wages are often lower than gross salary because pre-tax pension, health or other deductions are taken out first, and different boxes can show different wage figures for income tax and for social contributions. Codes and letters in some boxes identify specific benefits or contributions. A form can cover only part of the year (one job of several), can be corrected and reissued, and an investment statement may show proceeds without the cost basis. The figures must be entered on the return in specific places, and a mismatch with what the authority receives from the employer or payer is a common reason for letters.
</context>

<task>
The form:

<form>
{{form}}
</form>

{{#context}}
Context:

<context_given>
{{context}}
</context_given>

{{/context}}
1. Identify the form, who issues it, what period it covers and what it is for. If you cannot identify it confidently, say so and ask.
2. Explain each box given: what it means, why it may differ from a related figure, and for coded boxes what the code generally indicates (mark codes you are unsure of "verify").
3. Show where the main figures usually go on the person's return or how they feed into a pre-filled return, at the level of the line or section, marked "verify" for the current year's form.
4. Checks to run: compare with the final payslip of the year (year-to-date pay, tax, contributions), check names and identity numbers match official records, check for other forms expected (second job, interest, benefits), and reconcile wage figures with pre-tax deductions using the person's numbers.
5. Things that look wrong: anything inconsistent, missing or unusual, with who to contact (employer payroll, payer, broker) and what to ask for, such as a corrected form.
6. Points to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not ask for full identity numbers and tell the person to mask them if they included them.
- Never invent box meanings, codes or return line numbers. If unsure, say so and point to the form's official instructions.
- Do not state that a figure is wrong as fact; say what looks inconsistent and how to confirm it.
- Do not alter or recreate an official form.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this form is
Two or three sentences.

## Box by box
Table: box | label | amount | what it means.

## Where the figures go
Bullets marked "verify".

## Checks to run
Checklist with any reconciliation arithmetic.

## Things that look wrong
Bullets with who to contact, or "Nothing stands out".

## Points to verify
Bullets with where to check each.
</output_format>
