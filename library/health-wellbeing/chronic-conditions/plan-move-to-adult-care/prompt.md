---
schema: 1
id: plan-move-to-adult-care
kind: prompt
title: Plan the move to adult care
description: Plans a young person's move from children's to adult health services for a long-term condition, with a skills checklist, practice steps, who does what and questions for both teams.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [transition-to-adult-services, young-people, independence, self-advocacy, teenagers]
pairs_with:
  prompts: [set-up-medication-routine, coordinate-care-across-specialists, request-study-adjustments]
args:
  - name: young_person
    description: The young person's age, condition, which teams look after them now, what they already do for themselves and what a parent still does, and any planned changes (leaving home, university, a job).
    type: text
    required: true
  - name: transfer
    description: What the team has said about when and how the move to adult services will happen, and your country if you know. Optional.
    type: text
  - name: written_for
    description: Who the plan is written for.
    type: enum
    enum: [young-person, parent, both]
    default: both
output_contract:
  format: markdown
  sections: [How adult care is different, Skills checklist, Practice plan, Handing over, Questions for the teams, If things slip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help young people with long-term conditions and their parents get ready for the move from children's to adult health services. Transition is a known risk point: young people miss appointments, run out of medicines or drop out of follow-up in the year or two around transfer, often at the same time as exams, leaving home or a first job. Adult services usually expect the patient to book and attend alone, speak for themselves, order their own prescriptions and know their own history, and they may split care that one children's team used to hold. Good transition starts years before transfer, in small steps: being seen alone for part of each appointment, naming their own medicines and doses, ordering a repeat prescription, knowing their warning signs and who to call. Confidentiality also changes: from a certain age (which varies by country) clinicians may speak to the young person without the parent and need their consent to share.

<young_person>
{{young_person}}
</young_person>
{{#transfer}}
<transfer>
{{transfer}}
</transfer>
{{/transfer}}
Written for: {{written_for}}
</context>

<task>
1. How adult care is different: five or six specific differences that will affect this young person, stated as things to check with their own teams rather than as fixed rules.
2. Skills checklist: a table of self-management skills (knowing the condition in two sentences, medicines and doses, ordering repeats, booking and rescheduling, warning signs and what to do, carrying an emergency summary, speaking to a clinician alone, managing the condition with alcohol, sport, driving or travel as relevant), each marked "can do", "with help", or "not yet" from what was described.
3. Practice plan: a month-by-month plan from now to transfer that hands over one skill at a time, with the parent stepping back gradually.
4. Handing over: who holds what (records, contact numbers, prescriptions, a transfer summary), and what to do if they move area for study or work.
5. Questions for the teams: for the children's team and for the adult team's first visit.
6. If things slip: what to do if a prescription runs out, a letter does not arrive or the first adult appointment is missed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not change or explain doses; medicine details come from the team and labels.
- Respect the young person's growing privacy and voice; if written for a parent, frame steps as handing over, not supervising, and say when the young person should decide.
- Do not state transfer ages, consent ages or service rules as fact for their country; frame them as things to ask.
- Keep the young person's section in plain, direct language they would actually read.
</constraints>

<output_format>
## How adult care is different
## Skills checklist
Table: Skill | Now | Next step.
## Practice plan
## Handing over
## Questions for the teams
## If things slip
</output_format>
