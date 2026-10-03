---
schema: 1
id: tax-season-track
kind: workflow
title: Tax season track
description: Takes a household or freelancer through tax season - document gathering, income and deduction questions, a preparer brief and a post-filing checklist - pausing for approval between steps.
category: taxes
version: 1.0.0
status: incubating
stage: [discover, plan, review, ship]
role: [individual, parent, consultant, content-creator]
requires: [none]
inputs: [text, document]
output: [checklist, table, questions, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tax-return, tax-preparer, self-employed, filing-deadline, record-keeping]
pairs_with:
  prompts: [organize-tax-documents, explain-payslip, plan-freelance-tax-set-aside, track-business-expenses, explain-tax-notice]
  personas: [tax-educator]
args:
  - name: situation
    description: Who is filing (single, couple, family), income sources (salary, freelance, rental, investments, pensions, benefits, foreign income), life events this year (move, marriage, baby, new job, property sale), and whether you use a preparer or file yourself.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you file, and the tax year.
    type: string
    required: true
steps:
  - {id: documents, file: steps/01-documents.md, stage: discover, gate: approve, artifact: "tax-season/01-documents.md"}
  - {id: income-and-deductions, file: steps/02-income-and-deductions.md, stage: review, gate: approve, artifact: "tax-season/02-income-and-deductions.md"}
  - {id: preparer-brief, file: steps/03-preparer-brief.md, stage: plan, gate: approve, artifact: "tax-season/03-preparer-brief.md"}
  - {id: post-filing, file: steps/04-post-filing.md, stage: ship, gate: none, artifact: "tax-season/04-post-filing.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes this household or freelancer through tax season the way a well-run preparer's intake process does: collect the right documents early, surface every income source and possible deduction as a question rather than a guess, hand the preparer (or the person filing themselves) a clean brief, then close the year properly so next year is easier. Each step writes one artifact and stops for approval; later steps reuse confirmed answers instead of asking again.

<situation>
{{situation}}
</situation>

Country and tax year: {{country}}

{{> guardrails/professional-limits}}

Rules for every step:
- This track organises and explains. It does not compute the final liability, choose a filing position or fill in a return. Decisions go on the list for the preparer or tax adviser.
- Use only facts the person gave or confirmed. Missing items are marked [X] with where to find them; never assume an income source, deduction or figure.
- Mark every deadline, threshold, allowance and form name as "verify" unless you are confident it is current for {{country}} and that tax year; if you do not know the system well, say "I don't know" for that part and keep it general.
- Tell the person to remove identity numbers, tax reference numbers, account numbers and passwords before sharing documents.
- Never help hide income, invent or inflate expenses, or alter records. If asked, decline and steer back to an honest return.
- If the person mentions unfiled past years, a tax debt they cannot pay, an audit, or foreign income or residence changes, flag it in the step where it appears and recommend a tax professional early.
- Keep a running list of open questions and items for the preparer, carried into step 3.
