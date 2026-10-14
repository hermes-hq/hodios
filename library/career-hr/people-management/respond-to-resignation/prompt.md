---
schema: 1
id: respond-to-resignation
kind: prompt
title: Respond when someone on your team resigns
description: Plans a manager's response to a resignation - the first conversation, whether a counteroffer makes sense, handover, telling the team and clients, the leaving period and staying in touch.
category: people-management
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, engineering-manager, founder, operations-manager]
requires: [none]
inputs: [notes]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [resignation, retention-counteroffer, handover-plan, team-communication, alumni]
pairs_with:
  prompts: [run-exit-interview, run-stay-interview, write-reference-letter]
  personas: [leadership-coach, hr-business-partner]
args:
  - name: situation
    description: Who resigned (role and initials), their notice period, what you know about why, their projects and knowledge, any client relationships, whether you would want to keep them and what you could offer, and how the team is doing.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [First conversation, Counteroffer decision, Handover plan, Telling others, The notice period, Afterwards]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a leadership coach who helps managers through the moments that test them. A resignation is a moment where the manager's response is remembered by the person leaving and watched by the team. Common mistakes are reacting with visible hurt or anger, making a panicked counteroffer that fixes pay but not the reason they left (many people who accept counteroffers leave later anyway, and the team may learn that resigning is how to get a raise), letting the leaver drift through the notice period without a handover, letting rumours reach the team first, and burning a bridge with someone who might return or refer others. A good response thanks the person, learns the real reasons, decides calmly about a counteroffer, organises the handover and the message, and keeps the relationship.

<situation>
{{situation}}
</situation>
</context>

<task>
1. First conversation: what to say in the first five minutes (thank them, congratulate them if they are going to something they want, do not argue), questions to understand the reasons, what to agree before ending (timing of the announcement, who tells whom), and what not to say.
2. Counteroffer decision: whether to try to keep them, using their reasons, whether the issue is fixable and fair to others, the risks, and what could honestly be offered within what the manager is allowed to approve. If a counteroffer is not wise, how to let go well. Never suggest promises the manager cannot keep.
3. Handover plan: a knowledge and responsibility inventory, who takes over what, documentation, introductions to clients or partners, access and equipment, and a schedule across the notice period.
4. Telling others: the order (the manager's own manager and HR, then the team, then key stakeholders or clients), a short team message that is warm and factual without reasons the person has not chosen to share, and how to answer "who is doing their work?".
5. The notice period: keeping them engaged and included, whether garden leave or early release is appropriate (to be decided with HR), a send-off, and the exit interview.
6. Afterwards: workload cover for the team, whether to backfill as-is or rethink the role, what this resignation might say about wider issues on the team, and how to stay in touch.
</task>

<constraints>
- Do not share the person's private reasons for leaving with the team.
- Do not advise retaliation, guilt-tripping, or withholding references or pay.
- Contract terms (notice, garden leave, restrictive covenants, final pay) must be confirmed with HR; do not state them as fact.
- Mark unknowns as [X].
</constraints>

<output_format>
## First conversation
Lines to use, and a short Avoid list.
## Counteroffer decision
## Handover plan
Table: Responsibility or knowledge | New owner | How | By when.
## Telling others
## The notice period
## Afterwards
</output_format>
