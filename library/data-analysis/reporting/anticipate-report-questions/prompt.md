---
schema: 1
id: anticipate-report-questions
kind: prompt
title: Anticipate questions on a report
description: Predicts the questions leadership or a client will ask about a report before the meeting, and prepares short answers, the backup cuts to have ready and the honest "we do not know yet" lines.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, business-analyst, financial-analyst, manager]
inputs: [document, text]
output: [questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [meeting-prep, backup-slides, stakeholder-questions, review-meeting]
pairs_with:
  prompts: [write-monthly-business-review, write-insight-report, check-report-figures]
args:
  - name: report
    description: The report, deck or summary that will be presented, with its key numbers.
    type: text
    required: true
  - name: audience
    description: "Who will be in the room, what each of them cares about or is measured on, and any history (questions they asked last time, sensitivities)."
    type: text
    required: true
  - name: data_available
    description: Data and cuts the presenter can still pull before the meeting. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Likely questions, Backup cuts to prepare, Weak spots, Answers to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Experienced analysts prepare for the questions more than for the presentation, because the meeting is decided in the questions. The predictable ones follow patterns: "why" behind any big movement, "compared with what" (plan, last year, peers), "is that real or a data issue" for any surprising number, "what does it mean for my area" from each person in the room, "what are we doing about it", and the question aimed at the weakest point in the analysis (a small sample, a short period, a definition change). Good preparation pairs each likely question with a one or two sentence answer, the backup cut that proves it, and an honest line for questions the data cannot yet answer, which keeps the presenter from improvising numbers.
</context>

<task>
<report>
{{report}}
</report>

<audience>
{{audience}}
</audience>
{{#data_available}}

<data_available>
{{data_available}}
</data_available>
{{/data_available}}

1. Read the report as each audience member would: what jumps out, what affects them, what looks odd.
2. List the likely questions, grouped by who would ask, ranked by likelihood and by damage if answered badly.
3. For each question, draft a short answer from the report's content only. Where the report does not contain the answer, say so and write the honest holding line ("we have not cut it that way yet; we will send it by Thursday").
4. List the backup cuts or slides worth preparing (segment splits, longer trends, definitions, sample sizes), each tied to the questions it answers, and note which can be built from the data available.
5. Identify the report's weak spots a sharp reader will probe and how to acknowledge each one up front.
6. List answers to avoid: speculation stated as fact, blaming another team, numbers quoted from memory.
</task>

<constraints>
- Draft answers only from the report and the data described; never invent a figure to make an answer sound complete.
- Keep each answer to two sentences that can be said aloud.
- Flag any question that touches a person's performance or confidential matters and suggest it is taken offline.
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely questions
Table: # | Who | Question | Short answer | Evidence or backup.

## Backup cuts to prepare
Numbered list: cut, questions it answers, can it be built now.

## Weak spots
Bullets: weakness, how to acknowledge it.

## Answers to avoid
Bullets.
</output_format>
