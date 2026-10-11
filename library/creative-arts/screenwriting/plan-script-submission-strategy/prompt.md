---
schema: 1
id: plan-script-submission-strategy
kind: prompt
title: Plan where to submit a script
description: Plans where to send a script (contests, fellowships, labs, festivals, queries) with a readiness check, fee budget, calendar and tracker. Use when a draft is ready to go out.
category: screenwriting
version: 1.0.0
status: incubating
stage: [ship, plan]
role: [writer]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [script-submission, screenwriting-contests, fellowships, query-strategy]
pairs_with:
  prompts: [write-logline-and-synopsis, write-fellowship-statement, review-first-ten-pages]
args:
  - name: script
    description: The script's format, genre, length, logline, draft number and who has read it.
    type: text
    required: true
  - name: goals
    description: What you want from submitting (representation, a sale, a fellowship, festival screening, feedback) and your country.
    type: text
    required: true
  - name: budget
    description: What you can spend on entry fees over the next year, in your currency.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Readiness check, Routes, Shortlist criteria, Plan and calendar, Tracking sheet, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Submitting is expensive and slow, and most writers spread entry fees across too many contests with an unready draft. Each route does a different job: a few prominent contests and fellowships can lead to representation or staffing; many small contests give little beyond a laurel; festivals matter for shorts that are already made; labs and writing programmes give development; direct queries to managers and producers cost nothing but need a strong logline and a track record or referral. Readiness comes first: a draft that has had notes from several readers and a rewrite. Writers should check each opportunity's eligibility, rights terms and reputation, avoid paying to be read by people with no industry track record, and track every submission so they never send the same draft twice to the same place.
</context>

<task>
Plan a submission strategy.

<script>
{{script}}
</script>

<goals>
{{goals}}
</goals>

Budget for fees: {{budget}}.

1. **Readiness check:** mark Ready or Not yet against: number of drafts, outside reads, a tested logline, format and page count, a clean first ten pages. If Not yet, say what to do first and still give the plan for later.
2. **Routes:** for each route (major contests and fellowships, smaller contests, labs and programmes, festivals for a made short, direct queries, peer and referral networks), whether it fits this script and goal, and why.
3. **Shortlist criteria:** how to choose specific opportunities: eligibility (country, residency, prior earnings), track record of alumni, who reads the finalists, rights or option clauses, fee versus value, and feedback options. Tell the writer to verify current deadlines and terms on the organisers' own sites; do not state any deadlines, fees or winners.
4. **Plan and calendar:** a twelve-month plan by quarter: how many entries in each route, how the budget splits, when to rewrite between rounds, and when to query.
5. **Tracking sheet:** column headings for a spreadsheet to log submissions and responses.
6. **Red flags:** signs of a predatory contest or service.
</task>

<constraints>
- Do not name specific contests, fellowships, festivals or companies, or quote their fees, deadlines or outcomes; give criteria and let the writer research.
- Keep within the budget given.
- Do not promise outcomes.
</constraints>

<output_format>
## Readiness check
## Routes
## Shortlist criteria
## Plan and calendar
## Tracking sheet
## Red flags
</output_format>
