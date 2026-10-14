---
schema: 1
id: run-lean-coffee
kind: prompt
title: Run a Lean Coffee session
description: Plans and scripts an agenda-less Lean Coffee meeting where participants propose and vote on topics, with timeboxes, the thumbs vote to continue, remote setup and how to capture outcomes.
category: meetings
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, engineering-manager, teacher, individual]
requires: [none]
inputs: [topic]
output: [plan, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [lean-coffee, facilitation, agenda-less, community-of-practice]
pairs_with:
  prompts: [write-meeting-agenda, run-retrospective, run-open-space-session]
args:
  - name: group
    description: Who is coming and why (for example "12 engineers from different teams, monthly community of practice", "parents' group").
    type: text
    required: true
  - name: minutes
    description: Total length of the session in minutes.
    type: number
    default: 60
  - name: format
    description: in-person, remote or hybrid.
    type: enum
    enum: [in-person, remote, hybrid]
    default: in-person
output_contract:
  format: markdown
  sections: [Is Lean Coffee right here, Setup, Run sheet, Facilitator script, Capturing outcomes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced facilitator who uses Lean Coffee, a structured but agenda-less meeting format. Participants write topics, briefly pitch them, dot-vote, then discuss in vote order in short timeboxes (often 5-8 minutes), with a quick thumbs vote at the end of each box to continue for a shorter extension or move on. It works when the group shares an interest but no fixed agenda: communities of practice, peer groups, open team sessions. It works badly when a decision must be made by a deadline, when one person holds all the power, or when topics are confidential. Common failure modes: too many timeboxes planned so the end is rushed, loud people's topics dominate the vote, and nothing is recorded so the session feels like chat.

Group: {{group}}
Length: {{minutes}} minutes
Format: {{format}}
</context>

<task>
1. Say in two or three lines whether Lean Coffee suits this group, and what to do instead if it does not.
2. List the setup for the chosen format: for in-person, sticky notes, three columns (To discuss, Discussing, Discussed), a timer, dot stickers; for remote, a shared board with the same columns, a voting feature or emoji votes, and a visible timer; for hybrid, one shared digital board everyone uses, including people in the room.
3. Build a run sheet that fits the minutes: intro and rules, topic writing, one-sentence pitches, voting (state how many votes each), timeboxed discussion rounds, and a closing round. Work out how many discussion boxes realistically fit and say it.
4. Write a short facilitator script: opening, rules, how to call the timebox and the thumbs vote (up = keep going one extension, sideways = fine either way, down = move on), and how to merge similar topics.
5. Give moves for typical problems: a dominant voice, a topic that turns into a complaint session, a topic that needs a decision the group cannot make here.
6. Describe how to capture outcomes per topic in one line (insight, action with owner if any, or "parked") and how to share them afterwards.
</task>

<constraints>
- Fit the timings to the stated minutes; never plan more discussion boxes than fit after intro, voting and closing.
- Keep the method standard; do not invent named variants or claim research about its effectiveness.
- Actions only come from volunteers; the facilitator does not assign them.
- Keep the script short enough to read aloud in under two minutes.
</constraints>

<output_format>
## Is Lean Coffee right here
Two or three lines.

## Setup
Bullets for the chosen format.

## Run sheet
Table: Time | Segment | What happens.

## Facilitator script
Short spoken lines, plus problem moves.

## Capturing outcomes
A one-line-per-topic template and how to share it.
</output_format>
