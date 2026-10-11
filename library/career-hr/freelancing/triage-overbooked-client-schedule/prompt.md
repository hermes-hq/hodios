---
schema: 1
id: triage-overbooked-client-schedule
kind: prompt
title: Triage an overbooked client schedule
description: Gets an overbooked freelancer out of clashing deadlines by sizing the gap, ranking commitments, choosing what to renegotiate, subcontract, cut or decline, and writing the client messages.
category: freelancing
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [consultant, designer, writer, software-engineer]
requires: [none]
inputs: [text, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [overcommitted, deadline-clash, capacity-planning, renegotiate-deadline, workload]
pairs_with:
  prompts: [brief-freelance-subcontractor, quote-rush-job, build-freelance-pipeline-routine, plan-freelance-time-off]
  personas: [freelance-business-advisor]
args:
  - name: commitments
    description: Every live project and promise for the next few weeks - client, deliverable, deadline, hours left, whether the deadline is hard (launch, event, print date) or soft, value, and how important the client is.
    type: text
    required: true
  - name: capacity
    description: Hours you can realistically work per week in this period, fixed time off, and options you have (a trusted subcontractor, work you could simplify, new inquiries you could turn down).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The gap, Ranking, Plan, Messages, Prevent the next pile-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer who has promised more than they can deliver. What experienced freelancers know: the instinct to work every night and tell nobody is the worst option, because quality drops on every project at once and the deadline that slips is discovered late. Clients forgive an early, specific request for a new date far more than a late miss. Deadlines differ: some are hard (a launch, a print slot, an event) and many are internal and soft, which the client will say if asked. The levers are few and concrete: move a soft deadline, deliver a smaller first version, bring in a subcontractor with the client's agreement, pause new work, or step back from a project with a clean handover.

<commitments>
{{commitments}}
</commitments>

<capacity>
{{capacity}}
</capacity>
</context>

<task>
1. The gap: total hours promised against realistic hours available, week by week. Say how far over the freelancer is.
2. Ranking: each commitment by deadline hardness, consequence of slipping, client importance and value. Missing facts marked.
3. Plan: for each commitment, one action (keep as is, ask for a new date, deliver a smaller first version, subcontract with permission, decline or hand back), and the resulting weekly load. The plan must fit the available hours; if it cannot, say which extra action closes the gap.
4. Messages: a short, specific message for each client who needs one, sent as early as possible: what changes, the new date or scope, and what stays the same. No excuses and no blame.
5. Prevent the next pile-up: a capacity rule (for example a weekly hour ceiling and a buffer) and when to quote later start dates.
</task>

<constraints>
- Never plan around missing a hard deadline without telling that client in advance.
- No invented excuses (illness, emergencies) in client messages; the honest reason can be brief.
- Do not schedule beyond the hours the freelancer says they can work.
- Subcontracting needs the client's permission where the contract or confidentiality requires it; say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## The gap
Table: Week | Hours promised | Hours available | Over by.

## Ranking
Table: Commitment | Deadline type | Consequence | Client importance.

## Plan
Table: Commitment | Action | New date or scope, then the revised weekly load.

## Messages
One per affected client, ready to send.

## Prevent the next pile-up
Bullets.
</output_format>
