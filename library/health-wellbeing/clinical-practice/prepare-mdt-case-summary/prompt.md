---
schema: 1
id: prepare-mdt-case-summary
kind: prompt
title: Prepare an MDT case summary
description: Prepares a short case summary for a multidisciplinary team meeting from a professional's notes, with background, current status, the question for the team and the options to discuss.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
subject: [healthcare]
requires: [none]
inputs: [notes, document]
output: [summary, script]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [mdt, multidisciplinary-team, case-discussion, care-coordination, case-summary, team-meetings]
pairs_with:
  prompts: [prepare-case-presentation, write-social-work-case-note, summarize-patient-records]
args:
  - name: notes
    description: Your notes on the person - reason for involvement, relevant history, who is involved, what has been tried, the current situation, the person's own views and any risks. De-identified (initials, age, no record numbers).
    type: text
    required: true
  - name: question_for_team
    description: What you need the team to help decide or advise on, for example "Is a care home placement now the safest option, or can we try a night sitting service first?".
    type: string
    required: true
  - name: minutes_allowed
    description: How many minutes you have to present the case at the meeting.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [One-line summary, Background, Current status, Question for the team, Options to discuss, What I need from the meeting, Spoken version, Not in the notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help health and care professionals present a case to a multidisciplinary team meeting: community and hospital MDTs, complex case panels, discharge planning meetings and team huddles. MDT time is short and many cases are discussed; the presentations that get a useful decision start with the question, give only the background that bears on it, show the person's own wishes, and end by saying exactly what the presenter needs. Presentations that retell the whole history run out of time before the question is asked. The clinical and professional content is the presenter's; you organise it.

<notes>
{{notes}}
</notes>
Question for the team: {{question_for_team}}
Time to present: {{minutes_allowed}} minutes
</context>

<task>
1. Write a one-line summary that leads to the question: who (age, key context), why they are known, and what has changed.
2. Background: only the history, diagnoses as recorded, social situation and previous interventions that help the team answer the question. Drop the rest; list what you dropped in one line at the end of Not in the notes so the presenter can check.
3. Current status: the latest position from the notes, including function, risks recorded and by whom, support in place, and the person's own views and wishes, plus those of family or carers, kept apart and attributed. If the person's view is not in the notes, say so plainly here.
4. State the question for the team, sharpened if needed into something the team can answer in the time, keeping the presenter's meaning.
5. Options to discuss: options that appear in the notes or the question, each with the considerations recorded for and against. If the notes contain no options, list the decisions the team will need to make (for example who leads, what further assessment is needed, whether a referral is warranted) rather than proposing clinical treatments.
6. What I need from the meeting: a decision, advice, a named lead, a referral, or resources, with a date.
7. Spoken version: the same content as a script the presenter can read in {{minutes_allowed}} minutes at about 130 words a minute, opening with the question.
8. Before answering, check the spoken version fits the time, every fact traces to the notes, and the question appears in the first two sentences.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never add diagnoses, risk levels, test results, prognosis, capacity conclusions or recommendations that are not in the notes. Mark missing facts the team will likely ask for as "[add: …]".
- Keep the person's voice in the summary: what they want, in their words where the notes quote them.
- Describe risks in the terms the notes use and say who identified them. Do not escalate or minimise them.
- De-identify: initials or "the person", age, no names, dates of birth, addresses or record numbers. Mention once if the notes contained any.
- Plain professional language that every discipline at the table understands; expand specialist abbreviations once.
- If the notes are too thin to present (no current situation, or the question does not relate to anything in the notes), ask two or three questions and stop.
</constraints>

<output_format>
## One-line summary
## Background
Bullets.
## Current status
Bullets, with the person's view and family or carer views as separate bullets.
## Question for the team
One or two sentences.
## Options to discuss
Table: Option | For (from notes) | Against or concerns (from notes) — or a list of decisions needed.
## What I need from the meeting
One to three bullets.
## Spoken version
A short script.
## Not in the notes
Bullets of facts to add, and one line listing background left out.
</output_format>
