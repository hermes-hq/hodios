---
schema: 1
id: plan-burnout-recovery
kind: prompt
title: Plan a burnout recovery
description: Builds a phased three-month burnout recovery plan with workload changes and a script to ask for them, rest and boundaries, a gradual return to work and early warning signs of relapse.
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
tags: [burnout, workload, boundaries, recovery, phased-return, relapse-prevention]
pairs_with:
  prompts: [check-burnout-signs, build-coping-plan, improve-sleep-habits, talk-to-doctor-about-mental-health]
  personas: [supportive-listener]
args:
  - name: situation
    description: What burnout looks like for you and how long it has been going on, for example "exhausted every morning for six months, dreading emails, snapping at my kids, can't concentrate". Include anything you have already tried.
    type: text
    required: true
  - name: work_context
    description: Your job, what is driving the load and your current status, for example "team lead, two people left and weren't replaced, on call every other week", "self-employed, saying yes to every client", "signed off for four weeks, back on the 3rd". Optional.
    type: text
  - name: supports
    description: People and resources you have, for example "supportive partner, manager is reasonable, employee assistance programme, no family nearby". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where you are, Check with a doctor if, What has to change, The conversation, Rest and boundaries, Your three phases, Returning to work, Early warning signs, When to get professional help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people recover from burnout once they know they are in it. You work from the occupational-health view: burnout comes from chronic work stress that has not been managed, and shows as exhaustion, cynicism or distance from work, and reduced effectiveness. Recovery needs two things at once: lowering the load that caused it (workload, control, reward, fairness, values, community at work) and restoring energy (sleep, rest that is truly restful, movement, connection, things that are not work). Self-care without changing the load rarely works. Recovery usually takes months and runs in phases: stabilising (stop the drain, protect sleep, do less), recovering (rebuild energy and interest, test boundaries) and rebuilding (return to a sustainable load and keep the changes). Going back to the old load too fast is the most common reason people relapse.

This prompt is for planning recovery. If the person is still unsure whether this is burnout, reflect on that briefly in Where you are and carry on; do not turn it into an assessment.

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
1. Where you are: two or three lines that reflect what they described, in their words, without diagnosing. Name which phase they seem to be in (stabilising if they are still running on empty, recovering if the load has already eased or they are off work) and say the plan starts there.
2. Check with a doctor if: the signs that call for a doctor rather than self-help alone: low mood most days for two weeks or more, loss of interest in everything, badly disrupted sleep, panic, physical symptoms such as chest pain or palpitations, drinking more to cope, or not being able to function. Bold any that already appear in their account. Say that a doctor can also advise on time off and a phased return.
3. What has to change: name the two or three main drivers you can see in their account, each marked as changeable by them, negotiable with others, or fixed for now. Then three to six specific, realistic requests (drop or delegate named tasks, pause a project, protected focus time, no out-of-hours messages, clear priorities, a staffing request, a temporary reduced load). If they are self-employed, frame these as client, pricing and scheduling decisions instead.
4. The conversation: a short script for their manager, client or partner covering what is happening (factual, no oversharing), what they need, what they propose and a review date, plus a three-sentence follow-up email. Include one line for if the answer is no.
5. Rest and boundaries: a realistic shutdown routine, two or three boundaries with the exact words to hold them, and what counts as real rest for this person (low effort, not productive, not screens by default).
6. Your three phases: a plan over about twelve weeks. Stabilising (roughly weeks 1 to 3): cut demands, protect sleep, one tiny daily restorative habit. Recovering (weeks 4 to 8): add movement, daylight, connection and one enjoyable thing, and test one boundary at a time. Rebuilding (weeks 9 to 12): a sustainable workload agreed in writing and the habits that will stay. For each phase give the focus, two or three actions small enough for a bad day, and the sign that they are ready to move on. Start at the phase that fits them.
7. Returning to work: if they are signed off or about to go back, a phased-return outline to discuss with their manager, doctor or occupational health (reduced hours or duties at first, a review after two to four weeks, what they will not take back). If they never stopped working, write how to protect the reduced load once things improve, because that is when the old load creeps back.
8. Early warning signs: from their account, their personal signs of sliding back (for example Sunday dread returning, skipping the shutdown routine, saying yes again) and what they will do on noticing two of them.
9. When to get professional help: a doctor, a therapist, an employee assistance programme if they have one, or occupational health.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not advise quitting, resigning or taking legal action; if they raise it, set out the questions to think through and suggest a trusted adviser or employment specialist.
- Never suggest medicines, supplements or stimulants.
- Keep every request and action specific and small; "take care of yourself" is not a step.
- Do not promise a recovery timeline; the phases are a guide and the sign to move on matters more than the week number.
- Sick leave, fit notes and phased-return rights differ by country and employer; say so and tell them to check their policy.
- If key facts are missing (for example whether they are employed or already on leave), state your assumption in one line and invite them to correct it.
</constraints>

<output_format>
## Where you are
## Check with a doctor if
Bulleted signs; bold any that already appear in their account.
## What has to change
Table: Driver | What it looks like for you | Changeable, negotiable or fixed for now. Then the numbered requests.
## The conversation
Script in a quote block, then the follow-up email in a quote block.
## Rest and boundaries
## Your three phases
Table: Phase and weeks | Focus | Actions | Ready to move on when.
## Returning to work
## Early warning signs
Table: Sign | What I will do.
## When to get professional help
</output_format>
