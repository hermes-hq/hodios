---
schema: 1
id: manage-work-anxiety
kind: prompt
title: Manage everyday work anxiety
description: Maps everyday anxiety at work, such as dreading emails, meetings or your manager, shows what keeps it going and builds practical coping steps, a week of small experiments and a conversation plan.
category: mental-health
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, script]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [work-anxiety, workplace-wellbeing, anxiety-skills, speaking-up, email-anxiety]
pairs_with:
  prompts: [manage-impostor-feelings, check-burnout-signs, set-up-worry-time, manage-event-anxiety]
  personas: [supportive-listener]
args:
  - name: situations
    description: When work anxiety shows up and what you do, for example "dread opening Slack every morning", "reread every email five times before sending", "go quiet in meetings then replay them", "stomach knots before 1:1s with my manager".
    type: text
    required: true
  - name: context
    description: Anything about the job that matters, for example "new role, three months in", "remote team", "manager gives little feedback", "big restructure". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your work anxiety map, What keeps it going, Practical steps, Your week, Talking to your manager, When it is more than anxiety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone with everyday anxiety at work: the background dread that comes with emails, chat notifications, meetings, feedback, deadlines or a particular manager. It usually runs on a cycle: a trigger, an anxious prediction ("They're annoyed with me", "I'll say something stupid"), body symptoms, and a coping behaviour that brings short relief but keeps the anxiety going. Common workplace versions are over-preparing, rereading and over-editing messages, checking email late at night, avoiding speaking in meetings, putting off a dreaded task, seeking reassurance from colleagues, and replaying conversations afterwards. Practical approaches from cognitive behavioural therapy break the cycle by spotting the predictions, testing them with small experiments, setting limits on checking and preparation, and turning vague dread into concrete next actions. Often a short, clear conversation with a manager about priorities and feedback removes a lot of uncertainty. Sometimes anxiety is a reasonable response to a genuinely bad situation, such as bullying, unmanageable workload or job insecurity, and then the fix is in the situation, not only in the person.

Situations: {{situations}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Your work anxiety map: a table built from {{situations}}: trigger, anxious prediction, body signs, what I do, and what it costs.
2. What keeps it going: explain the cycle in four or five sentences using one of their examples, and why relief from avoidance or checking makes the next time harder.
3. Practical steps: specific techniques matched to each situation they listed, for example: checking email at set times and turning off notifications after hours; a "good enough" rule for messages (read once, send); speaking once early in each meeting; a two-minute start on the dreaded task; writing the worst-case prediction and checking afterwards what actually happened; a short wind-down ritual at the end of the workday; and a calming technique for before meetings.
4. Your week: a five-day plan with one or two small experiments per day, each with a prediction and a result column.
5. Talking to your manager: whether and how to raise it, focused on what would help them work well rather than a diagnosis (clearer priorities, regular check-ins, written expectations, earlier notice of meetings). A short script, and a note that disclosure of any health condition is their choice, and that workplace adjustments or an employee assistance programme may be available to check.
6. When it is more than anxiety: signs that the situation itself is the problem (bullying, harassment, impossible workload, threats to their job) with next steps such as keeping notes, talking to HR, a union or an employment adviser; and signs that anxiety needs professional help (panic attacks, dread spreading beyond work, sleep loss, time off sick, low mood).
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose an anxiety disorder; use "work anxiety" and their words.
- Do not assume the manager or colleagues are at fault, and do not assume the person is overreacting; work from what they describe.
- Do not advise quitting or staying; if they raise it, help them think about it without deciding for them.
- Keep experiments small and realistic for a working week.
</constraints>

<output_format>
## Your work anxiety map
Table: Trigger | Anxious prediction | Body signs | What I do | What it costs.
## What keeps it going
## Practical steps
## Your week
Table: Day | Experiment | My prediction | What happened.
## Talking to your manager
## When it is more than anxiety
</output_format>
