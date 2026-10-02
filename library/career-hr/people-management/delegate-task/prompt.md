---
schema: 1
id: delegate-task
kind: prompt
title: Delegate a task well
description: Plans how to delegate a task - who should take it, the level of autonomy, a brief with outcome and constraints, and check-in points. Use when you are holding on to work someone else could own.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, tech-lead, founder]
requires: [none]
inputs: [text, notes]
output: [plan, message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [delegation, autonomy-levels, task-brief, check-ins, growing-people]
pairs_with:
  prompts: [plan-one-on-one]
  personas: [leadership-coach]
args:
  - name: task
    description: What needs doing, why it matters, the deadline, what good looks like, constraints (budget, stakeholders, standards), and why you have been holding on to it.
    type: text
    required: true
  - name: team
    description: The people who could take it - their current workload, strengths, experience with similar work, and what each wants to grow in. Initials or roles are fine.
    type: text
output_contract:
  format: markdown
  sections: [Should you delegate this, Who should take it, Autonomy level, The brief, Check-ins, What you will stop doing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers who keep too much work for themselves. Common reasons sound sensible: "it's faster if I do it", "they'll get it wrong", "they're too busy", "it's too important". The cost is a bottlenecked manager and a team that does not grow. Delegation fails when it is dumped instead of handed over: no clear outcome, unclear authority, no context, no agreed check-ins, or the manager taking the work back at the first wobble. Good delegation matches the task to someone's growth, agrees how much autonomy they have, briefs the outcome rather than the method, and builds in check-ins that support without micromanaging.

<task_to_delegate>
{{task}}
</task_to_delegate>
{{#team}}
<team>
{{team}}
</team>
{{/team}}
</context>

<task>
1. Should you delegate this: say whether this task is a good candidate and why. Tasks to keep are usually those only the manager can do (confidential people matters, decisions that need their authority, some first conversations with senior stakeholders). Name the real reason the manager has been holding on, from what they wrote, and the cost of continuing.
2. Who should take it: compare the candidates on capacity, relevant skills, and growth value; recommend one, with a reason, and what would have to come off their plate to make room. If no team details were given, describe the profile to look for and ask.
3. Autonomy level: choose one level and explain it: (1) do exactly as briefed, (2) research and recommend, I decide, (3) decide and tell me before acting, (4) act and tell me after, (5) fully own it. Say how the level can rise as trust builds.
4. The brief: write the handover the manager can say or send: the outcome and why it matters, what done looks like, deadline and milestones, constraints and non-negotiables, the decisions they can make alone and the ones to bring back, resources and people to involve, known risks, and an invitation to ask questions and propose a different approach.
5. Check-ins: the specific points to check in (tied to milestones, not a fixed daily status), what to ask at each, and the signals that would justify stepping in versus letting them learn from a mistake.
6. What you will stop doing: two or three behaviours the manager commits to avoid (rewriting their work, being copied on everything, answering questions the delegate can answer) and how to give credit visibly when the task lands.
</task>

<constraints>
- Use only facts given about the task and people. Do not assume skills or workload; mark unknowns and ask.
- Match the autonomy level to the person's experience with this kind of work, not to their seniority in general.
- Keep the brief short enough to read in two minutes.
- If the task is risky (legal, financial, safety, a person's job), recommend a lower autonomy level with more check-ins, not keeping the work by default.
</constraints>

<output_format>
## Should you delegate this
## Who should take it
Table: Person | Capacity | Fit | Growth value, then the recommendation.
## Autonomy level
## The brief
Ready to send.
## Check-ins
Table: When | What to ask | Step in if.
## What you will stop doing
</output_format>
