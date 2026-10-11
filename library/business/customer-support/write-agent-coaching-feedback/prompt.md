---
schema: 1
id: write-agent-coaching-feedback
kind: prompt
title: Write coaching feedback for a support agent
description: Turns QA scores and ticket examples into coaching feedback for one support agent - what went well, one or two focus areas with examples, practice and a one-to-one plan.
category: customer-support
version: 1.0.0
status: incubating
stage: [review]
role: [manager, operations-manager, support-agent]
requires: [none]
inputs: [ticket, notes, text]
output: [docs, plan, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [agent-coaching, quality-assurance, one-to-one, performance-feedback, ticket-examples]
pairs_with:
  prompts: [qa-review-support-tickets, build-support-qa-scorecard, critique-draft-support-reply]
  personas: [support-team-lead]
args:
  - name: agent_evidence
    description: "QA scores for the agent over a period, the ticket excerpts behind them, and any other evidence (customer comments, reopen rate). Use a first name or code, not full personal details."
    type: text
    required: true
  - name: agent_context
    description: "How long they have been in the role, what they are working on, anything that affects them (new channel, heavy queue), and how they usually take feedback. Optional."
    type: text
  - name: format
    description: "How the feedback will be given."
    type: enum
    enum: [one-to-one-notes, written-message]
    default: one-to-one-notes
output_contract:
  format: markdown
  sections: [Summary for the agent, What went well, Focus areas, Practice, One-to-one plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support team leads coach agents from QA evidence. Coaching works when it is specific, small and owned by the agent: one or two behaviours, each shown with a real ticket, with a concrete alternative and a way to practise. It fails when it reads out a score, lists ten things, uses vague labels ("be more empathetic"), or praises in general terms that the agent cannot repeat. Strengths deserve the same precision as gaps, because named behaviours get repeated. Pick focus areas by impact on customers (wrong answers and missed ownership before wording), and check first whether a low score is caused by a tool, policy or knowledge gap that coaching cannot fix.
</context>

<task>
Write coaching feedback for this agent.

<agent_evidence>
{{agent_evidence}}
</agent_evidence>
{{#agent_context}}
<agent_context>
{{agent_context}}
</agent_context>
{{/agent_context}}

Format: {{format}}

1. Read the evidence and find the patterns, not single slips. Separate behaviours the agent controls from problems caused by tools, policy or missing knowledge; list the latter for the team lead to fix.
2. Name two or three strengths as specific behaviours with a quoted ticket example each.
3. Choose one or two focus areas with the most impact on customers. For each: the behaviour, a quoted example, why it matters to the customer, and a rewritten version of that reply or step showing the alternative.
4. Suggest practice: a short exercise per focus area (rewrite three past replies, shadow a colleague on this ticket type, use a checklist for a week).
5. Plan the one-to-one: opening question to get the agent's view first, the order to cover points, questions that let the agent find the fix, the agreed action, and how progress will be checked (for example five tickets of this type reviewed in two weeks).
6. If the format is a written message, write it as a short, warm, direct message instead of meeting notes, with the same content.
</task>

<constraints>
- No more than two focus areas, even if the evidence shows more; list the rest for later.
- Use observable behaviour and quotes, never character judgements.
- Do not invent ticket content or scores beyond what is given.
- Do not frame this as a disciplinary step; if the evidence suggests a serious conduct or compliance issue, say it needs a separate process with HR, and stop there.
</constraints>

<output_format>
## Summary for the agent
Three sentences.
## What went well
## Focus areas
For each: Behaviour, Example (quoted), Why it matters, Try this instead.
## Practice
## One-to-one plan
Plus "Not for the agent" notes: system or policy fixes for the lead, and points saved for later.
</output_format>
