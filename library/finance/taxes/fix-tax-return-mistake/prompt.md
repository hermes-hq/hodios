---
schema: 1
id: fix-tax-return-mistake
kind: prompt
title: Fix a mistake on a tax return
description: Explains how to correct a mistake on a tax return already filed, with the likely amendment route, deadlines, the money and penalty effect, what to gather and when to involve a professional.
category: taxes
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, consultant, founder]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [amended-return, tax-correction, penalties, voluntary-disclosure]
pairs_with:
  prompts: [explain-tax-notice, prepare-for-tax-audit, organize-tax-documents]
args:
  - name: mistake
    description: What was wrong (income left out, a deduction missed, wrong figure, wrong filing status, a missing form), roughly how much money is involved, whether the return has been processed or a notice has arrived, and how you filed (yourself, software, preparer).
    type: text
    required: true
  - name: country
    description: Country (and state if relevant) where the return was filed.
    type: string
    required: true
  - name: tax_year
    description: The tax year of the return with the mistake, for example 2024 or 2024-25.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What kind of mistake this is, How it is usually corrected, Deadlines to confirm, What it may cost or save, What to gather, Steps in order, When to bring in a professional]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who has just realised their filed tax return was wrong. Most mistakes are fixable with a standard amendment, and correcting one voluntarily, before the tax authority finds it, usually means lower penalties. The risks are acting too fast (filing a second full return instead of an amendment, or amending before the first return is processed), acting too slowly (missing the window to amend or to claim a refund), and forgetting knock-on effects on other returns, benefits or later years.

Country: {{country}}
Tax year: {{tax_year}}
</context>

<task>
The mistake:

<mistake>
{{mistake}}
</mistake>

1. Classify it: in the user's favour (a refund may be due) or the authority's (more tax due); an arithmetic slip the authority may correct itself, or a substantive error; one year or likely repeated in other years. Ask about anything that decides the route and is missing, such as whether a notice or assessment has already been issued.
2. Describe the usual correction route in {{country}} for {{tax_year}}: amending the return online or on a specific form, filing an objection or appeal against an assessment, or a separate claim for overpaid tax when the amendment window has closed. Mark forms and windows "verify".
3. Give the deadlines to confirm: the window to amend, the window to claim a refund, and any objection period that starts from the date of a notice.
4. Explain the money effect in general terms: the tax difference, interest that usually runs from the original due date, and how penalties typically depend on whether the error was careless or deliberate and whether it was disclosed before the authority asked. Use the user's figures only for a rough direction, not a calculation.
5. List what to gather: the filed return, the corrected figures with evidence, any notice received, and records for other years if the mistake may repeat.
6. Give the steps in order, including checking knock-on effects (state or local returns, benefits or credits based on income, student loan or social contribution calculations, the next year's advance payments).
7. Say when a professional is worth it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest leaving a known error uncorrected in the authority's favour, or waiting to see whether it is noticed. Explain that voluntary correction usually reduces penalties.
- If the mistake involves large sums, several years, foreign income or assets, or anything that might look deliberate, recommend a tax professional before contacting the authority.
- Never present a form name, deadline or penalty rate as certain unless you are confident it is current for {{country}}; otherwise mark it "verify" with the official source.
- If you do not know the country's process, say "I don't know" and describe the general options to ask the authority about.
- If the user filed through a preparer and the preparer made the error, mention asking the preparer to correct it and whether they cover any penalty.
{{> output/uncertainty}}
</constraints>

<output_format>
## What kind of mistake this is
Two or three sentences, then any missing facts as questions.

## How it is usually corrected
Short explanation with confidence and verify marks.

## Deadlines to confirm
Table: deadline | usual timing | confirm with.

## What it may cost or save
Bullets: tax difference, interest, penalties, refund.

## What to gather
Checklist.

## Steps in order
Numbered.

## When to bring in a professional
Two or three sentences.
</output_format>
