---
schema: 1
id: address-negative-attitude
kind: prompt
title: Address persistent negativity in a report
description: Prepares a manager to address persistent negativity or cynicism by naming observable behaviours, hearing the grievance behind it and agreeing what changes.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, founder]
requires: [none]
inputs: [notes]
output: [script, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [negativity, team-morale, behaviour-feedback, hard-conversations, legitimate-concerns]
pairs_with:
  prompts: [handle-defensive-employee, address-high-performer-behaviour, give-feedback-sbi]
  personas: [leadership-coach]
args:
  - name: situation
    description: What the person says or does (specific examples with dates, where and who was present), its effect on the team or customers, how long it has been going on, and any changes or grievances that might be behind it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [From attitude to behaviour, What might be behind it, The conversation, Separating concern from conduct, Agreement, If it continues]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers dealing with a report whose negativity is affecting the team: eye-rolling in meetings, "this will never work" on every idea, cynical comments to new joiners, complaining about decisions to colleagues rather than raising them. "Bad attitude" cannot be managed or defended as a criticism; the manager has to name specific behaviours and their effect. Negativity is often a signal: a legitimate concern that was ignored, a loss of status, burnout, or disagreement with a direction. Some of it is useful dissent that the team needs. The skill is separating the content (concerns worth hearing, which should go through proper channels) from the conduct (undermining, public cynicism, discouraging others), welcoming the first and setting a clear standard for the second.

<situation>
{{situation}}
</situation>
</context>

<task>
1. From attitude to behaviour: turn each complaint about attitude in the input into an observable behaviour with its impact. Point out anything too vague to raise and what to observe instead.
2. What might be behind it: likely drivers from the context (an ignored concern, a change they disagreed with, workload, a missed opportunity), and how to listen for them.
3. The conversation: opening lines, two or three behaviours to raise with examples, questions that surface the underlying concern, and how to acknowledge valid points.
4. Separating concern from conduct: how to say "your concern about X is worth hearing, and here is how to raise it" alongside "the way it is being expressed is affecting the team, and this needs to change", with a concrete example of the expected behaviour.
5. Agreement: one or two specific commitments from each side (for example the manager takes the concern to a decision-maker; the person raises disagreement in the meeting or one-on-one rather than to colleagues), and a check-in.
6. If it continues: how to record further examples, when this becomes a conduct matter under the company's policy, and when to involve HR.
</task>

<constraints>
- Use only the facts given; never invent examples. Mark gaps [X].
- Do not label the person ("negative", "toxic", "bad attitude") in anything said to them.
- Do not treat respectful disagreement or raising concerns through proper channels as a problem.
- If the negativity relates to a complaint about discrimination, safety or wrongdoing, treat that as a concern to escalate, not as an attitude issue.
</constraints>

<output_format>
## From attitude to behaviour
Table: What you called attitude | Observable behaviour | Impact.
## What might be behind it
## The conversation
## Separating concern from conduct
## Agreement
## If it continues
</output_format>
