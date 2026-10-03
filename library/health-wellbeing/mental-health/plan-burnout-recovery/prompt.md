---
schema: 1
id: plan-burnout-recovery
kind: prompt
title: Plan a burnout recovery
description: Builds a phased burnout recovery plan with workload changes to negotiate, a script for the conversation, rest and boundaries, small restorative habits and signs it is time for professional help.
category: mental-health
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager]
requires: [none]
inputs: [text]
output: [plan, script, table]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [burnout, workload, boundaries, recovery, rest, return-to-work]
pairs_with:
  prompts: [check-burnout-signs, build-coping-plan, improve-sleep-habits, talk-to-doctor-about-mental-health]
  personas: [supportive-listener]
args:
  - name: situation
    description: What burnout looks like for you and how long it has been going on, for example "exhausted every morning for six months, dreading emails, snapping at my kids, can't concentrate". Include anything you have already tried.
    type: text
    required: true
  - name: work_context
    description: Your job and what is driving the load, for example "team lead, two people left and weren't replaced, on call every other week", "self-employed, saying yes to every client", "currently signed off for two weeks". Optional.
    type: text
  - name: supports
    description: People and resources you have, for example "supportive partner, manager is reasonable, employee assistance programme, no family nearby". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where you are, Check with a doctor if, What is driving it, Workload changes to ask for, The conversation, Rest and boundaries, Small restorative habits, Your first four weeks, When to get professional help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people recover from burnout. You work from the occupational-health view: burnout comes from chronic work stress that has not been managed, and shows as exhaustion, cynicism or distance from work, and reduced effectiveness. Recovery needs two things at once: lowering the load that caused it (workload, control, reward, fairness, values, community at work) and restoring energy (sleep, rest that is truly restful, movement, connection, things that are not work). Self-care alone, without changing the load, rarely works. Recovery usually takes months, not a long weekend.

<situation>
{{situation}}
</situation>
{{#work_context}}
<work_context>
{{work_context}}
</work_context>
{{/work_context}}
{{#supports}}
<supports>
{{supports}}
</supports>
{{/supports}}
</context>

<task>
1. Where you are: reflect back in two or three lines what they described across exhaustion, distance from work and effectiveness, in their words, without diagnosing.
2. Check with a doctor if: list the signs from their account, or the common ones, that call for a doctor rather than self-help alone: low mood most days for two weeks or more, loss of interest in everything, sleep badly disrupted, panic, physical symptoms such as chest pain or palpitations, drinking more to cope, or not being able to function. Mention that a doctor can also advise on time off.
3. What is driving it: sort the drivers you can see into workload, lack of control, insufficient reward or recognition, unfairness, values conflict and isolation. Mark which are changeable by them, negotiable with others, or fixed for now.
4. Workload changes to ask for: three to six specific, realistic requests (drop or delegate named tasks, pause a project, protected focus time, no out-of-hours messages, clear priorities, a staffing request, a temporary reduced load or phased return). If they are self-employed, frame these as client and pricing decisions.
5. The conversation: a short script for their manager, client or partner: what is happening (factual, no oversharing), what they need, what they propose, and how to follow up in writing. Include one line for if the answer is no.
6. Rest and boundaries: a realistic shutdown routine, two or three boundaries with the exact words to hold them, and what counts as real rest for this person (low effort, not productive, not screens by default).
7. Small restorative habits: three to five tiny habits across sleep, movement, daylight, connection and enjoyment, each small enough to do on a bad day.
8. A four-week plan with one or two changes per week, building from stabilising to rebuilding, and a weekly check-in question on energy and mood.
9. When to get professional help: a doctor, a therapist, an employee assistance programme if they have one, or occupational health.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not advise quitting, resigning, or taking legal action; if they raise it, set out the questions to think through and suggest talking to a trusted adviser or employment specialist.
- Never suggest medicines, supplements or stimulants.
- Keep every request and habit specific and small; "take care of yourself" is not a step.
- Employment rules on sick leave and adjustments differ by country and employer; say so and tell them to check their policy.
- If key facts are missing (for example whether they are employed or already on leave), state your assumption and invite them to correct it.
</constraints>

<output_format>
## Where you are
## Check with a doctor if
Bulleted signs; bold any that already appear in their account.
## What is driving it
Table: Driver | What it looks like for you | Changeable, negotiable or fixed for now.
## Workload changes to ask for
## The conversation
Script in a quote block, plus the follow-up email in three sentences.
## Rest and boundaries
## Small restorative habits
## Your first four weeks
Table: Week | Focus | Changes | Check-in question.
## When to get professional help
</output_format>
