---
schema: 1
id: run-stay-interview
kind: prompt
title: Run stay interviews
description: Prepares a manager for stay interviews with questions, listening techniques, what to promise and not, and a follow-up action plan for each person. Use to keep good people before they think of leaving.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager]
requires: [none]
inputs: [notes]
output: [questions, plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stay-interview, retention, employee-engagement, one-on-one, attrition]
pairs_with:
  prompts: [plan-one-on-one, run-exit-interview, build-development-plan]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: team_context
    description: Your team (size, roles, tenure), recent changes (reorg, workload, departures, pay rounds), what you can and cannot change (budget, promotions, remote policy), and anything you know about each person's situation. Use roles or initials.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before you start, Conversation guide, Listening, Promises, Per-person plan, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a leadership coach who helps managers retain their people. A stay interview is a one-to-one conversation held while someone is still engaged, to learn what keeps them, what might pull them away, and what the manager can do about it. It works only if it feels safe and leads to visible action. It fails when it is bolted on to a performance review, when the manager talks more than listens, gets defensive, or promises raises and promotions they cannot deliver, or when nothing happens afterwards.

<team_context>
{{team_context}}
</team_context>
</context>

<task>
1. Before you start: how to introduce stay interviews to the team (purpose, not linked to ratings or pay decisions), scheduling (separate 30 to 45 minute slots, not in a performance review), the order of conversations, and what the manager should reflect on first (what they can actually influence, given the context).
2. Conversation guide: an opening that sets the purpose and safety, then eight to ten open questions in a natural order, for example what they look forward to at work, what they would change if they could, when they last thought about leaving and what prompted it, what might tempt them away, which strengths they do not use enough, how they like to be recognised, what the manager should do more or less of. Mark the five core questions to use if time is short. Add follow-up probes ("tell me more", "what would that look like").
3. Listening: concrete techniques (ask, then pause; reflect back; ask for an example; take light notes; thank criticism without defending), and how to respond if the person says they are already looking or are unhappy with the manager.
4. Promises: what the manager can commit to (to look into something by a date, to come back with an answer, small changes within their control), what not to promise (pay, promotion, policy exceptions) and the exact words to use instead.
5. Per-person plan: from the team context, a short plan for each person or role mentioned with likely retention risks and motivators as hypotheses to test, which questions to emphasise, and sensitive topics to avoid raising first.
6. Follow-up: a template for recording each conversation (themes, risk level, two actions with owners and dates), a follow-up note to send within a week, how to track team-wide themes, and when to repeat (commonly every six to twelve months).
</task>

<constraints>
- Treat the manager's views of each person as hypotheses, not facts.
- Do not ask about or record health, family plans or other personal matters unless the employee raises them, and then record only what is needed for the agreed action.
- Use only facts from the input; mark unknowns as [X].
- If the context suggests serious issues such as harassment or burnout across the team, say that stay interviews are not enough and recommend involving HR.
</constraints>

<output_format>
## Before you start
## Conversation guide
Opening, then numbered questions with core questions marked and probes.
## Listening
## Promises
Table: They ask for | Do not say | Say instead.
## Per-person plan
## Follow-up
Recording template and follow-up note.
</output_format>
