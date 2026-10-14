---
schema: 1
id: handle-employee-burnout
kind: prompt
title: Respond to signs of burnout in a report
description: Helps a manager spot likely burnout in a report and respond with a supportive conversation, concrete workload changes, support routes and follow-up, while fixing the team causes.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
advice_risk: [mental-health]
requires: [none]
inputs: [notes]
output: [plan, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [burnout, workload, employee-wellbeing, sustainable-pace, manager-support]
pairs_with:
  prompts: [rebalance-team-workload, re-engage-disengaged-employee, plan-return-from-leave]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: situation
    description: What you have noticed (working hours, messages late at night, missed leave, irritability, mistakes, withdrawal) with examples, their workload and deadlines, recent changes, and what support your organisation has (assistance programme, occupational health, leave).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the signs suggest, The conversation, Immediate workload changes, Support routes, Fixing the causes, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers respond when a report shows signs of burnout. Burnout is mostly driven by the work: sustained overload, lack of control, unclear or conflicting demands, little recognition, unfairness, or values conflict. Common signs at work are long hours and messages at odd times, skipped leave, more mistakes, cynicism or irritability, withdrawal from colleagues, and lower quality from someone who used to be strong. Managers often respond with advice to "take care of yourself" or a wellness webinar while leaving the workload untouched, which signals that the problem is the person. The manager's real levers are the work itself: removing or delaying tasks, changing deadlines, protecting time off, clarifying priorities, and fixing the team-level causes so the next person does not burn out too. The manager is not a clinician and should point to medical and assistance routes without diagnosing.

<situation>
{{situation}}
</situation>
</context>

<task>
1. What the signs suggest: list the observed signs and the work factors that may be driving them. Say what is observation and what is assumption.
2. The conversation: a private, unhurried opening that names what you have noticed with care, questions about workload and how they are doing, how to listen without fixing too fast, and lines for "I'm fine", tears or relief.
3. Immediate workload changes: a table of specific tasks or commitments to remove, delay, delegate or simplify in the next two weeks, with who takes them and who needs to be told. Include protecting evenings and booking leave.
4. Support routes: the assistance programme, occupational health, a doctor, leave options and adjustments, phrased as options, plus when to involve HR.
5. Fixing the causes: team or system causes from the input (staffing, unrealistic deadlines, on-call load, single points of failure) and one or two changes the manager will push for.
6. Follow-up: check-in rhythm for the next weeks, what to watch for, and what to do if things get worse or the person goes off sick.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose burnout, depression or anxiety; describe signs and suggest professional support.
- The response must include concrete workload changes, not only self-care advice.
- Keep what the person shares confidential, telling others only what is needed to reassign work.
- Do not make this a performance conversation, even if quality has dropped.
</constraints>

<output_format>
## What the signs suggest
## The conversation
## Immediate workload changes
Table: Task or commitment | Action | Who takes it | Who to tell.
## Support routes
## Fixing the causes
## Follow-up
</output_format>
