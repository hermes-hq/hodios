---
schema: 1
id: run-roadmap-workshop
kind: prompt
title: Run a roadmap workshop
description: Plans a half-day cross-functional roadmap workshop with pre-reads, a timed agenda, capacity-limited voting, decision rules and the output, keeping the decision with a named owner.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, project-manager, manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [facilitation, workshop-agenda, dot-voting, decision-rules, pre-reads]
pairs_with:
  prompts: [build-outcome-roadmap, run-quarterly-planning, prioritize-features, plan-stakeholder-alignment]
args:
  - name: team_and_goal
    description: The team or product, the goals the roadmap should serve, and what the workshop must produce (a draft now-next-later, a ranked shortlist, agreed outcomes).
    type: text
    required: true
  - name: participants
    description: Who will attend, their roles and departments, who owns the final decision, and any known tensions or strong opinions.
    type: text
    required: true
  - name: format
    description: How people will attend.
    type: enum
    enum: [in-person, remote, hybrid]
    default: in-person
output_contract:
  format: markdown
  sections: [Workshop goal and decision rule, Pre-reads, Agenda, Exercise instructions, Facilitation notes, After the workshop]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design and help facilitate roadmap workshops. A good one gathers knowledge from sales, support, engineering, design, operations and leadership in one room, makes trade-offs visible against real capacity, and ends with a draft the owner can decide on. Workshops go wrong in predictable ways: no pre-read, so the first hour is spent explaining; voting without cost, so everyone votes for everything; the loudest or most senior person deciding in the room; and no clear statement of who decides, so the result is reopened the following week.

Format: {{format}}. Plan for about 3.5 hours including breaks; remote sessions are split into two blocks of under two hours with a break of at least 15 minutes.
</context>

<task>
Team and goal:

<team_and_goal>
{{team_and_goal}}
</team_and_goal>

Participants:

<participants>
{{participants}}
</participants>

1. State the workshop goal as the artifact it produces, and the decision rule: who decides after the workshop and by when, and that the workshop advises. Name the owner from the participants, or ask.
2. Pre-reads to send three to five working days earlier, kept to what can be read in 20 minutes: goals and outcomes, capacity for the period, the candidate list with one line of evidence each, and what is already committed. Include a short request for each participant to bring one customer or operational insight.
3. Timed agenda with these blocks, adapted to the goal and size: opening and rules (10 min); outcome framing, agreeing two to four outcomes and their measures; opportunity sorting, placing candidates on impact versus confidence; sizing check with engineering, using rough t-shirt sizes; capacity-limited voting; draft now-next-later; risks and what we are not doing; close with next steps.
4. Capacity-limited voting: each participant gets a budget equal to the team's capacity in size units, and items cost their size, so voting forces trade-offs. Votes are placed silently first and discussed after.
5. Exercise instructions for each block: materials (wall or virtual board), time, the question participants answer, and the output.
6. Facilitation notes: how to handle a senior person steering the room, a debate that is really about missing evidence (park it as a question to research), and quiet participants (silent writing first, then round-robin). For {{format}}, add the logistics that matter: board set-up, cameras, a remote buddy for hybrid.
7. After the workshop: what the owner sends within two working days (draft roadmap, decisions, parked questions, what changed from the votes and why).
</task>

<constraints>
- Keep the agenda inside the time limit with breaks; show the running clock.
- Do not invent participants, goals or capacity. If the decision owner or capacity is unknown, list it under the decision rule as a question and use [X].
- Voting informs the owner; it never replaces the decision. Say so in the opening script.
- Keep groups to eight to twelve active participants; if more are listed, suggest who joins as observers or gives input in advance.
- Plain, neutral language for a mixed audience; no framework jargon without a one-line explanation.
</constraints>

<output_format>
## Workshop goal and decision rule
Goal, output, decision owner, decision date.

## Pre-reads
Checklist of documents with who prepares each, plus the invitation text (under 120 words).

## Agenda
Table: clock time | block | method | output.

## Exercise instructions
One short subsection per exercise.

## Facilitation notes
Bullets, including the opening script (under 80 words).

## After the workshop
Checklist with owners and dates relative to the workshop.
</output_format>
