---
schema: 1
id: restart-stalled-client-project
kind: prompt
title: Restart a stalled client project
description: Gets a freelance project moving again when the client has gone quiet on feedback, content or approvals - diagnoses the stall, uses the contract's pause terms and writes the nudge sequence.
category: freelancing
version: 1.0.0
status: incubating
stage: [operate]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, message]
output: [report, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [stalled-project, client-delays, pause-clause, follow-up, client-communication]
pairs_with:
  prompts: [chase-late-payment, write-scope-change-email, part-ways-with-client]
args:
  - name: situation
    description: The project, what you are waiting for (feedback, content, access, approval, a decision), since when, your past messages and any replies, money paid and outstanding, and your schedule pressure.
    type: text
    required: true
  - name: contract_terms
    description: What your contract or proposal says about client delays, pausing, rescheduling, and payment for work done. Paste or summarise; say "none" if nothing written.
    type: text
output_contract:
  format: markdown
  sections: [Likely cause, Plan, Messages, Your options at the end]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer whose project is stuck because the client has gone quiet, a different problem from an unpaid invoice. Stalls usually have one of a few causes: the contact is overloaded, the decision is above their head, priorities shifted, internal disagreement about the work, or the client is unhappy and avoiding the conversation. Repeating "just checking in" does not fix any of them. What works is making the next step tiny (a yes or no, a choice between two options, a 15-minute call), naming the consequence for the schedule without blame, and using the contract's terms on client delays: moving the timeline, invoicing for work done to date, or formally pausing the project. A clean pause protects the freelancer's calendar and keeps the door open.
</context>

<task>
<situation>
{{situation}}
</situation>
{{#contract_terms}}

<contract_terms>
{{contract_terms}}
</contract_terms>
{{/contract_terms}}

1. Likely cause: the two most likely reasons for the stall from the evidence, and what would tell them apart.
2. Plan: a dated sequence of three or four contacts over two to three weeks, changing channel or person where sensible, each with a smaller ask than the last; when to invoice work done to date; and when to formally pause. Tie every step to the contract terms if given; if not, say what is reasonable and what to put in future contracts.
3. Write the messages: a reset nudge with one tiny ask, a schedule-consequence message, a message to a second contact if appropriate, and a pause notice (what is paused, what is invoiced, how to restart, and that the slot may go to other work).
4. Your options at the end: what the freelancer can do if there is still no reply (close and invoice for work done, keep paused, escalate under the contract), noting where advice is needed if money is disputed.
</task>

<constraints>
- No blame, guilt or passive-aggressive phrasing ("as per my last email") in client messages.
- Do not invent contract rights; if the terms are silent, say so.
- Keep each message under 120 words with one clear ask.
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely cause
Two bullets with the tell-apart signal.

## Plan
Table: day | channel and person | ask | contract step.

## Messages
Each message under a heading, ready to send.

## Your options at the end
Bullets.
</output_format>
