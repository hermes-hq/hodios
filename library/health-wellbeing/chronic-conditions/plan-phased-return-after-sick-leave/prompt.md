---
schema: 1
id: plan-phased-return-after-sick-leave
kind: prompt
title: Plan a phased return after sick leave
description: Plans a gradual return to work after sick leave for a long-term condition, with a week-by-week hours and duties proposal, review points, a setback plan and points for the return-to-work meeting.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [return-to-work, sick-leave, occupational-health, graded-return, workplace-meetings]
pairs_with:
  prompts: [structure-workday-around-condition, plan-activity-pacing, decide-whether-to-disclose-condition]
args:
  - name: situation
    description: Your condition, how long you have been off, how you are now (energy, symptoms, what a normal day looks like), and what your doctor or occupational health has said about returning, in their words.
    type: text
    required: true
  - name: job
    description: Your job and usual hours, the hardest parts of it, your commute, what your employer has offered so far, and your country if you want points to check about pay and rules.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What your clinicians have said, Before you go back, Your proposed plan, Review points, If you have a setback, For the return-to-work meeting, Check locally]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with long-term conditions plan going back to work after sick leave so the return lasts. Returns fail in recognisable ways: straight back to full hours on a Monday, an inbox of backlog on day one, no agreed review date, the phased plan quietly dropped after a week because the team is busy, or pushing through early signs of a setback. Phased returns often build up hours and duties over several weeks, start with days spread through the week rather than back to back, begin with familiar lower-pressure tasks, and include review meetings. The length and shape depend on the condition and the clinician's or occupational health advice. Pay during a phased return, sick pay rules and legal protections differ by country, contract and employer policy, so they are checks, not assumptions.

<situation>
{{situation}}
</situation>

<job>
{{job}}
</job>
</context>

<task>
1. What your clinicians have said: copy any fitness-for-work advice, recommended adjustments or limits. Mark gaps "[ask your doctor or occupational health]".
2. Before you go back: practical preparation in the last week or two (a trial commute, a sleep and wake routine at work times, a catch-up call with the manager about what has changed, agreeing how backlog will be handled).
3. Your proposed plan: a week-by-week table of days, hours and duties, within any clinician advice, starting conservatively and with the last weeks flexible.
4. Review points: when to review, what to look at (symptoms, recovery time after workdays, sleep), and the signals to hold or slow the plan.
5. If you have a setback: what to do (pause increases, step back a stage, contact the doctor), and wording to tell the manager.
6. For the return-to-work meeting: an agenda and what to ask for, including a named contact, a written plan and agreement on what colleagues are told.
7. Check locally: questions about pay during the phased return, sick pay, occupational health access, and legal protections for disabled workers where they live, without stating rules.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not set hours or duties that go beyond what their clinician or occupational health advised; if no advice was given, keep it conservative and suggest asking.
- Do not state employment law, sick pay or benefit rules as fact for any country.
- Do not pressure toward full hours as the only good outcome; a long-term reduction can be the right result.
- Neutral on disclosure: include only what they choose to tell the employer.
</constraints>

<output_format>
## What your clinicians have said
## Before you go back
## Your proposed plan
Table: Week | Days | Hours | Duties.
## Review points
## If you have a setback
## For the return-to-work meeting
## Check locally
</output_format>
