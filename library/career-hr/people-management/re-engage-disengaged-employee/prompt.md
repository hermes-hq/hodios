---
schema: 1
id: re-engage-disengaged-employee
kind: prompt
title: Re-engage a disengaged employee
description: Plans how a manager approaches a report who has started doing the minimum - finding the cause, an honest conversation, agreed changes on both sides and a fair line if nothing changes.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes]
output: [plan, questions, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [disengagement, quiet-quitting, motivation, retention, root-cause]
pairs_with:
  prompts: [run-stay-interview, handle-employee-burnout, address-underperformance-early]
  personas: [leadership-coach]
args:
  - name: situation
    description: What has changed and since when (specific behaviours, not impressions), what they were like before, recent events (missed promotion, reorg, new manager, workload, pay), and whether their work still meets expectations.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What you are actually seeing, Possible causes, The conversation, What you can change, Agreement and follow-up, If nothing changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help managers respond to a report who has pulled back: fewer ideas, camera off, no longer volunteering, doing exactly the job and no more. Disengagement is usually a response to something: a missed promotion or raise, a decision they disagreed with, loss of interesting work, a manager change, feeling unrecognised, workload or burnout, or something outside work. It is also important to separate disengagement from underperformance: someone doing their job well but no longer going beyond it is not a performance problem, and treating it as one makes things worse. A manager can only find the cause by asking, and must be ready to hear that the cause is the manager or the company. Real re-engagement comes from changing something (scope, recognition, autonomy, workload, a path), not from a pep talk.

<situation>
{{situation}}
</situation>
</context>

<task>
1. What you are actually seeing: list the observable behaviours from the input and sort them into "below expectations" and "less discretionary effort". Say plainly whether this is a performance issue or not.
2. Possible causes: ranked likely causes from the recent events given, each with a signal that would confirm it. Include burnout and personal circumstances as possibilities to offer, not diagnose.
3. The conversation: an opening that names what you have noticed without accusation, eight open questions, how to respond if they say the problem is you or the company, and how to respond if they say they are fine.
4. What you can change: a table of levers matched to causes (scope, project choice, recognition, autonomy, workload, development, flexibility, pay review route), marked as within the manager's control or needing approval.
5. Agreement and follow-up: what both sides commit to, a check-in date, and how to notice progress.
6. If nothing changes: if work is meeting expectations, accept the person's choice to do their job without more and adjust your expectations; if work is below expectations, move to an early performance conversation. Say how to tell which applies.
</task>

<constraints>
- Use only the facts given; mark gaps [X].
- Do not treat doing the job as written as a performance issue.
- Do not diagnose burnout, depression or other conditions; offer support routes such as an employee assistance programme if the person raises wellbeing.
- No promises of pay, promotion or role changes the manager cannot approve.
</constraints>

<output_format>
## What you are actually seeing
## Possible causes
## The conversation
## What you can change
Table: Lever | Cause it addresses | Your control or needs approval.
## Agreement and follow-up
## If nothing changes
</output_format>
