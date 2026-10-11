---
schema: 1
id: clear-support-ticket-backlog
kind: prompt
title: Clear a support ticket backlog
description: Plans clearing a support backlog spike - triage by risk and age, safe bulk replies, temporary capacity, honest customer updates and how to stop the backlog growing back.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, operations-manager, support-agent, founder]
requires: [none]
inputs: [dataset, text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ticket-backlog, queue-recovery, triage, bulk-replies, capacity-planning]
pairs_with:
  prompts: [plan-support-staffing, write-service-disruption-notices, classify-incoming-customer-messages, analyze-support-tickets]
  personas: [support-team-lead]
args:
  - name: backlog_data
    description: "Open tickets now and normal level, age profile (how many older than 1, 3, 7 days), breakdown by contact reason, channel and priority, and daily inflow versus tickets solved per day."
    type: text
    required: true
  - name: capacity
    description: "Team size and hours, who could help temporarily (other teams, overtime, contractors), and tools available such as bulk reply or auto-replies. Optional."
    type: text
  - name: cause
    description: "What caused the spike if known: a launch, outage, shipping delay, seasonal peak, staff absence. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Situation, Triage order, Bulk handling, Capacity plan, Customer communication, Stopping regrowth, Daily tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support leads recover from backlog spikes. A backlog only shrinks when solved per day exceeds new tickets per day, and every chaser email a waiting customer sends adds to inflow, so the first moves are to cut avoidable inflow (a clear status message, an honest auto-reply with a realistic wait) and to find clusters that can be answered together. Working strictly oldest-first lets new urgent issues rot; working newest-first abandons the oldest customers; a risk-based order (safety, money, access, deadlines) with an age floor works better. Bulk replies save hours on a shared cause but anger customers when sent to tickets that asked something else, so each cluster needs a quick check. Merging duplicates from the same customer is often the fastest single gain. Burnout from long backlog weeks is a real risk; the plan needs an end date.
</context>

<task>
Plan clearing this backlog.

<backlog_data>
{{backlog_data}}
</backlog_data>
{{#capacity}}
<capacity>
{{capacity}}
</capacity>
{{/capacity}}
{{#cause}}
<cause>
{{cause}}
</cause>
{{/cause}}

1. Size the situation: the gap between inflow and solved per day, and how many days to clear at current pace and with the plan. Show the arithmetic. If the inflow is still above capacity, say the backlog will keep growing until that changes.
2. Set the triage order: what goes first (safety, money taken wrongly, locked-out accounts, hard deadlines, vulnerable customers), then an age rule, then the rest. Say how to find these tickets (contact reason, keywords, priority field).
3. Plan bulk handling: clusters with one shared answer, the check before sending (sample ten per cluster), the bulk reply text pattern with a personal slot, merging duplicate tickets from the same customer, and tickets safe to close (resolved by events, such as a fixed outage) with a reopen-friendly message.
4. Plan temporary capacity: who does what (experienced agents on complex tickets, helpers on simple clusters with a short brief and macro set), overtime limits, and what to pause (non-urgent projects, internal meetings).
5. Write customer communication: the auto-reply with an honest expected wait, a status note for the website or app if the cause is shared, and an apology line for agents to use on old tickets.
6. Stop regrowth: fix or escalate the cause, help-centre or product changes for the top clusters, and a staffing or alert trigger so a growing queue is noticed early next time.
7. Daily tracking: open count, oldest ticket age, inflow, solved, reopen rate (to catch rushed replies), and an end date for the push.
</task>

<constraints>
- Show calculations from the numbers given; do not invent volumes or rates. If key numbers are missing, give the plan with placeholders and list what to measure.
- Never recommend closing unanswered tickets without a reply, or bulk replies that pretend to be personal.
- Auto-replies must state a realistic wait, not a promise the team cannot keep.
- Keep overtime within normal legal and contract limits; mark [CHECK local working-time rules].
</constraints>

<output_format>
## Situation
## Triage order
## Bulk handling
## Capacity plan
## Customer communication
## Stopping regrowth
## Daily tracking
Table: Measure | Today | Target | End date.
</output_format>
