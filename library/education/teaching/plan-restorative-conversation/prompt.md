---
schema: 1
id: plan-restorative-conversation
kind: prompt
title: Plan a restorative conversation
description: Plans a restorative conversation after a behaviour incident, with a suitability check, preparation meetings, restorative questions, ground rules, an agreement and follow-up.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [restorative-practice, behaviour, conflict-resolution, pastoral-care, repair]
pairs_with:
  prompts: [write-behaviour-incident-record, plan-student-behavior-support, write-parent-email]
args:
  - name: incident_summary
    description: What happened, who was involved (initials or roles, e.g. "pupil A.", "Ms K., maths teacher"), what each person has said so far, and any history between them.
    type: text
    required: true
  - name: age
    description: Age or year group of the pupils involved, e.g. "Year 8" or "10 and 11".
    type: string
    required: true
  - name: format
    description: quick (a short corridor or end-of-lesson chat), meeting (a planned meeting with a facilitator) or class-circle (when a whole class or group is affected).
    type: enum
    enum: [quick, meeting, class-circle]
    default: meeting
output_contract:
  format: markdown
  sections: [Is this suitable, Preparation, The conversation, Agreement, Follow-up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher, head of year or pastoral lead wants to repair harm after an incident between pupils or between a pupil and a member of staff. Restorative conversations work when everyone takes part voluntarily, the person who caused harm accepts some responsibility, each person has been prepared separately first, and the facilitator asks questions instead of lecturing. They backfire when used to force an apology, when they put a pupil who has been bullied in a room with someone who holds power over them, or when they replace dealing with a safeguarding concern.

Age: {{age}}. Format: {{format}}.
</context>

<task>
<incident_summary>
{{incident_summary}}
</incident_summary>

1. Suitability check: answer yes, no or unclear for each: does the person who caused harm accept some responsibility; do all parties agree to take part; is the harmed person safe and not under pressure; is there a power imbalance, repeated bullying, or discriminatory abuse that needs another route first; is there any safeguarding concern. If any answer points away from a restorative meeting, say so and give the alternative (separate conversations, the anti-bullying or safeguarding procedure, or a later meeting).
2. Preparation: a short separate conversation with each party using the same questions, what to explain about the process, and how to check they are ready. Decide who facilitates (a trained, neutral adult; not the staff member involved if a member of staff was harmed).
3. Ground rules: three or four, agreed at the start (one person speaks at a time, respectful words, anyone can ask for a break).
4. The conversation: an opening script, then restorative questions. To the person who caused harm: What happened? What were you thinking at the time? What have you thought since? Who has been affected and how? What do you need to do to make things right? To the person harmed: What did you think when it happened? How has this affected you and others? What has been the hardest thing? What do you need to happen now? Adjust the wording for {{age}}. Add how to handle denial, blame or tears.
5. Agreement: specific, realistic actions both parties suggest, written in their words, with a review date. An apology counts only if it is offered, not demanded.
6. Follow-up: check-ins with each party after a few days and two weeks, who tells families and what, and what to record.
</task>

<constraints>
- Use initials or roles only.
- Do not decide guilt or sanctions; restorative work can sit alongside the school's behaviour policy.
- If the summary mentions harm at home, a disclosure, sexual harm, self-harm or a threat, stop planning the meeting and say to report it today to the designated safeguarding lead, following the school's procedure.
{{> guardrails/crisis-safety}}
- If key facts are missing (who was harmed, whether they want to meet), list them as questions before the plan.
</constraints>

<output_format>
## Is this suitable
Table: Check | Answer | Note. Then a one-line recommendation.

## Preparation
Bullets per party, and who facilitates.

## The conversation
Opening script, ground rules, questions in order, and what to do if it goes wrong. For quick format, fit it on one card.

## Agreement
A short template with blanks.

## Follow-up
Dated checklist.
</output_format>
