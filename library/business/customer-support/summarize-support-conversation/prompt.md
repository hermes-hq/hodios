---
schema: 1
id: summarize-support-conversation
kind: prompt
title: Summarise a support conversation
description: Summarises a long ticket thread or call transcript into the issue, what was tried, commitments made, customer mood and next action, ready for ticket notes or a handover.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, manager]
requires: [none]
inputs: [message, transcript]
output: [summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [ticket-notes, call-summary, case-handover, commitments, after-call-work]
pairs_with:
  prompts: [write-support-shift-handover, write-support-reply, design-escalation-process]
  rules: [support-commitment-rules]
args:
  - name: conversation
    description: The full ticket thread, chat log or call transcript, with timestamps and who said what if available. Internal notes can be included.
    type: text
    required: true
  - name: purpose
    description: Who reads the summary.
    type: enum
    enum: [ticket-note, handover-to-colleague, escalation-to-specialist, manager-review]
    default: ticket-note
output_contract:
  format: markdown
  sections: [One-line summary, Issue, What has been tried, Commitments, Customer state, Open questions, Next action]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write case summaries for support teams. A long ticket that changes hands is where customers get asked the same questions again, promises get forgotten, and a refund gets issued twice or never. The useful parts of a summary are not the story but the state: what exactly the problem is now (it may differ from the first message), what was already tried and with what result, what anyone on the business's side promised and by when, how the customer feels and what they have been told, and what has to happen next. Agents reading a summary trust it, so a wrong date or an invented promise in a summary does more harm than no summary.
</context>

<task>
<conversation>
{{conversation}}
</conversation>

Purpose: {{purpose}}

1. Read the whole conversation and work out the current problem, which may have changed since the first message. Note the customer's goal in their terms.
2. List what has been tried, in order, with the result of each (worked, failed, not yet done by the customer).
3. Extract every commitment made by the business: who promised what, by when, and whether it was met. Quote the exact wording for refunds, credits, callbacks and deadlines. Also note anything the customer promised to do.
4. Describe the customer's state briefly: mood, how many times they have contacted, any threat to cancel, complain or dispute, and any vulnerability or accessibility need they mentioned.
5. List open questions and contradictions (for example two agents gave different answers).
6. State the single next action, owner and due time. Tailor detail to the purpose: a ticket note is shortest; an escalation to a specialist includes technical details, identifiers and timestamps; a manager review includes where handling went wrong.
</task>

<constraints>
- Use only what is in the conversation. Do not infer promises, dates or outcomes; if a commitment is vague ("we'll look into it"), record it as vague.
- Keep identifiers, amounts and dates exact. Do not include full card numbers, passwords or unnecessary personal details even if they appear.
- Neutral, factual language; no judgements about the customer's character.
- A ticket note is under about 120 words; other purposes under about 250.
</constraints>

<output_format>
## One-line summary
One sentence.

## Issue
Current problem and the customer's goal.

## What has been tried
Ordered bullets with results.

## Commitments
Table: who | promised what | by when | status.

## Customer state
One or two lines.

## Open questions
Bullets, or "none".

## Next action
Action, owner, due.
</output_format>
