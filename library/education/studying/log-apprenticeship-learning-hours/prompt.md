---
schema: 1
id: log-apprenticeship-learning-hours
kind: prompt
title: Log off-the-job learning
description: Turns an apprentice's notes from the week into off-the-job training log entries naming the activity, the knowledge, skills and behaviours developed and the evidence, with hours tracked.
category: studying
version: 1.0.0
status: incubating
stage: [review]
role: [student, individual]
requires: [none]
inputs: [notes, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [apprenticeships, off-the-job-training, ksbs, learning-log]
pairs_with:
  prompts: [map-vocational-portfolio-evidence, write-reflective-account]
args:
  - name: week_notes
    description: What you did this week in your own words, day by day if possible, with rough times. Include training sessions, shadowing, college days, online modules, research and practice on new tasks.
    type: text
    required: true
  - name: standard_ksbs
    description: Optional list of the knowledge, skills and behaviours (KSBs) or learning outcomes from your apprenticeship standard or framework, with their codes (K1, S3, B2).
    type: text
  - name: hours_target
    description: Off-the-job hours you aim to log per week. Leave 0 if you do not know; mention any running total in your notes.
    type: number
    default: 0
output_contract:
  format: markdown
  sections: [Log entries, Check whether these count, KSB coverage this week, Hours progress, For your next review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many apprenticeships require a minimum amount of off-the-job training: learning new knowledge, skills and behaviours during paid hours, away from normal productive work. Apprentices often under-log it (forgetting shadowing, research or practising a new task) or log activities that may not count (doing their usual job, or things done unpaid in their own time). Weak entries say "did training". Strong entries name the activity, the time, what was learned, which knowledge, skills and behaviours (KSBs) it builds, and the evidence, written in first person.

Rules on what counts, and the hours required, differ by country, funding body, standard and training provider, and they change. Treat any rule below as a common pattern to confirm with the provider, not as fact.
{{#hours_target}}

Weekly hours target: {{hours_target}}.
{{/hours_target}}
</context>

<task>
<week_notes>
{{week_notes}}
</week_notes>
{{#standard_ksbs}}

<standard_ksbs>
{{standard_ksbs}}
</standard_ksbs>
{{/standard_ksbs}}

1. Pull out each learning activity with its date and time. Typical types: training course or college session, online module, shadowing, mentoring or coaching, practising a new task under supervision, research or reading for the role, industry visit, writing up assignments.
2. Separate what is likely off-the-job (new learning in paid hours) from what is likely normal work, and from what is commonly excluded in many schemes (for example progress reviews, learning done unpaid outside working hours, or in some schemes English and maths study). Put doubtful items under Check whether these count with the reason, rather than deciding.
3. For each likely entry, write a log line in first person: what I did, what I learned (one or two specifics), how I will use it, and the evidence (certificate, notes, photo, witness, work product).
4. Map entries to KSB codes if the standard was given; otherwise describe the skill in plain terms and mark the codes [add code].
5. Total the hours. If a weekly target was given, show this week against it, and the running total if the notes mention hours logged so far.
6. List KSBs or areas with no activity this week, and suggest one realistic learning activity to plan next week.
</task>

<constraints>
- Never inflate times or invent activities, evidence or learning; use only the notes. If a time is missing, mark [hours?].
- Do not state the off-the-job rules as fact; say "check with your training provider" for anything uncertain.
- Keep each log line under 60 words, in the apprentice's voice and plain language.
- If the notes are too brief to log (for example "work as usual"), ask what they did that was new this week, with three prompts (something you were shown, something you looked up, something you tried for the first time) and stop.
</constraints>

<output_format>
## Log entries
Table: Date | Activity | Type | Hours | What I learned and how I'll use it | KSBs | Evidence.

## Check whether these count
Bullets: activity, hours, why it might not count, what to ask. "None" if empty.

## KSB coverage this week
Bullets: KSBs covered, and gaps.

## Hours progress
This week's likely off-the-job total, plus progress against the target if given.

## For your next review
2 or 3 bullets: points to discuss with your mentor or tutor, and the activity to plan next week.
</output_format>
