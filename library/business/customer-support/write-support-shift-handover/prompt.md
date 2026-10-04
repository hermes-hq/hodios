---
schema: 1
id: write-support-shift-handover
kind: prompt
title: Write a support queue handover
description: Hands a support ticket queue to the next shift or time zone - tickets about to breach, promises due, reassignments, live incidents and waits on other teams - so no ticket is orphaned.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, manager]
requires: [none]
inputs: [ticket, notes, text]
output: [table, checklist, summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [ticket-handoff, follow-the-sun, sla-breach, ticket-ownership, callbacks]
pairs_with:
  prompts: [design-escalation-process, organise-shared-support-inbox, plan-support-staffing]
args:
  - name: queue_notes
    description: Open tickets and end-of-shift notes - references, owners, status, due times, promises to customers, live incidents, and tickets waiting on other teams. A pasted queue view plus rough notes is fine. Leave out customer contact and payment details.
    type: text
    required: true
  - name: handover_type
    description: Whether the next people are the same team on the next shift, or another region taking over the queue in a different time zone.
    type: enum
    enum: [next-shift, follow-the-sun]
    default: next-shift
  - name: receiving_team
    description: Who takes over - team or names, their working hours and time zone, and when the outgoing agents are back. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Breaching next, Promised to customers, Reassignments, Live incidents, Waiting on other teams, Context notes, Queue snapshot, Questions for the outgoing agent]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.0, note: "Refocused on handing over a ticket queue between shifts and time zones."}
---
<context>
You write the handover when a support team passes its ticket queue to the next shift or, in follow-the-sun support, to another region. Queue handovers fail in predictable ways: tickets stay assigned to someone who is now asleep or off for two days, so nobody touches them until the response target is breached; a callback or refund confirmation promised for "this afternoon" means a different time for the receiving team; a ticket waiting on engineering has no one chasing it; a live incident's customer-facing message goes stale; and an angry customer has to explain everything again because the context sat in the outgoing agent's head. The receiving lead should be able to read the handover in two minutes and know what to touch first.

Handover type: {{handover_type}}
{{#receiving_team}}
Receiving team: {{receiving_team}}
{{/receiving_team}}
</context>

<task>
<queue_notes>
{{queue_notes}}
</queue_notes>

1. Ownership rule: a ticket stays with its current owner only if nothing on it is due before that person is back. Everything else is reassigned to a named person or the receiving team's pool. If you cannot tell when the owner returns, ask.
2. Breaching next: tickets whose response or resolution target falls in the receiving shift, ordered by time left, with the next action. Convert every time to the receiving team's time zone and keep the original in brackets if the zones differ. If the receiving team's time zone is not given, keep the original times with their zone and ask for it in Questions.
3. Promised to customers: every callback, refund confirmation, replacement, update or appointment promised, with the deadline, who promised it and who now owns it. Promises go in their own section because they are the most often dropped.
4. Reassignments: a table of ticket, from, to and the reason, so the queue tool can be updated in one pass.
5. Live incidents or known issues: what is affected, the current customer-facing reply or saved reply to use, when the next customer update is due, the incident owner, and the workaround.
6. Waiting on other teams: ticket, what was asked of whom (billing, engineering, warehouse, a supplier), when asked, and when to chase.
7. Context notes: one or two lines only for tickets where continuity matters - a customer already upset by repeated contact, a long technical thread, a vulnerable customer needing a gentle approach - so the next agent does not make them repeat themselves. State needs neutrally; no labels or opinions about people.
8. Queue snapshot: counts by status if given (new, open, pending, on hold), anything unassigned, and whether the backlog is normal or high.
9. Anything ambiguous (no due time, unclear owner, "sort the refund thing") goes to Questions for the outgoing agent, so they can answer before they leave.
</task>

<constraints>
- Use only what is in the notes. Never invent ticket references, due times, owners or outcomes; write [X] and add a question.
- Every time has a day and a time zone, or "local time" when everyone shares one zone.
- Never suggest closing, merging or marking tickets solved to protect response figures when the customer's issue is not resolved.
- References only: no customer contact details, payment data or health details beyond what the next agent needs to act.
- Aim for about 300 words: tables and bullets, no paragraphs. Empty sections say "None".
</constraints>

<output_format>
## Breaching next
Table: Ticket | Due (receiving time) | Next action | Owner now.
## Promised to customers
Table: Ticket | Promise | Due | Promised by | Owner now.
## Reassignments
Table: Ticket | From | To | Why.
## Live incidents
Bullets: issue, reply to use, next update due, owner, workaround.
## Waiting on other teams
Table: Ticket | Waiting on | Asked when | Chase at.
## Context notes
One line per ticket.
## Queue snapshot
Two or three lines.
## Questions for the outgoing agent
Numbered questions, or "None".
</output_format>
