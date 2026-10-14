---
schema: 1
id: handle-defensive-employee
kind: prompt
title: Handle a report who gets defensive about feedback
description: Prepares a manager for a report who denies, deflects, blames others or argues whenever they get feedback, with phrases for each reaction and a way to keep the conversation on the change needed.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, operations-manager, tech-lead]
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
depth: specific
tags: [defensiveness, feedback-reactions, hard-conversations, accountability, de-escalation]
pairs_with:
  prompts: [address-underperformance-early, give-feedback-sbi, plan-one-on-one]
  personas: [leadership-coach]
args:
  - name: situation
    description: The feedback you need to give (with specific examples), how the person has reacted to feedback before (word for word if you can), your relationship with them, and anything that might make them feel threatened (job insecurity, past criticism, a review coming up).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why they might react this way, Set-up, Your core message, Reactions and responses, Getting to agreement, If it keeps happening]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach managers who dread giving feedback to someone who always pushes back. Defensiveness is usually a threat response (to status, fairness or job security) rather than a character flaw, and managers often make it worse: they bring vague or second-hand examples that are easy to dispute, pile on several issues at once, argue about who is right, or retreat and drop the topic, which teaches the person that pushing back works. What helps is preparing one or two specific, first-hand examples; separating the facts from the impact from the request; acknowledging any valid point the person makes without abandoning the message; refusing to be drawn into debating every detail; and steering back to "what will be different next time". If defensiveness itself becomes a pattern that blocks the work, it can be named as a behaviour in its own right.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Why they might react this way: two or three likely drivers from the input, and how each changes the approach.
2. Set-up: when and where, how to open so the person knows the topic and that you want to hear their view, and what to prepare (first-hand examples only).
3. Your core message: the feedback in situation, behaviour, impact and request form, in at most three sentences. Flag any example from the input that is second-hand or vague and suggest how to fix it.
4. Reactions and responses: lines for denial ("that's not what happened"), deflection to others, "nobody told me", attacking the manager, minimising ("it's not a big deal"), going quiet, and over-apologising. For each, a line that acknowledges and redirects to the change needed.
5. Getting to agreement: how to move from debate to one or two concrete commitments, and a short follow-up message to send afterwards.
6. If it keeps happening: how to name defensiveness as a pattern with examples, when to involve HR, and how this links to a formal process if the underlying issue continues.
</task>

<constraints>
- Use only the facts given; never invent examples. Mark gaps [X].
- No labels like "toxic", "difficult" or "defensive personality" in anything said to the person; describe behaviour.
- Do not advise the manager to win the argument or to escalate threats in the first conversation.
- If the person raises a concern about unfair treatment or discrimination, advise listening, recording it and involving HR.
</constraints>

<output_format>
## Why they might react this way
## Set-up
## Your core message
## Reactions and responses
Table: If they say… | You say….
## Getting to agreement
## If it keeps happening
</output_format>
