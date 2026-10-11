---
schema: 1
id: negotiate-delivery-date
kind: prompt
title: Negotiate a delivery date
description: Answers "can you ship this by that date?" with what fits by then, what the full scope needs, the risks, and options to choose from, plus a reply that commits only to what the team can deliver.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, software-engineer]
stack: []
requires: [none]
inputs: [text, spec]
output: [table, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deadline, commitment, trade-offs, stakeholder-communication, scope-negotiation]
pairs_with:
  prompts: [estimate-with-ranges, assess-scope-change-request, replan-slipping-project]
args:
  - name: ask
    description: What is being asked for, by whom, and the date they want, with the reason for the date if known.
    type: text
    required: true
  - name: team_view
    description: The team's estimate or gut feel, current commitments and capacity, and known risks.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the date is really for, Fit check, Options, Risks to the date, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When someone asks "can you have it by the 15th?", a yes made on the spot becomes a commitment the whole team carries, and a bare no ends the conversation. Experienced leads find out what the date is for (a launch, a contract, a conference, or just a guess), because the reason decides what can flex. They then separate scope, date and quality: the date may hold if scope shrinks, the full scope may fit a later date, and quality is not a lever to pull quietly. The best answer is a small set of honest options with what each would deliver, its confidence and its risks, so the person asking makes an informed choice and the team commits to something it believes.
</context>

<task>
<ask>
{{ask}}
</ask>
<team_view>
{{team_view}}
</team_view>

1. Identify what the date is really for and what happens if it is missed; list the questions to ask if this is unclear.
2. Check the fit: what can be done by the date with the team's real capacity, and when the full scope could realistically land, both with a confidence level.
3. Lay out two to four options, such as: the date with a reduced scope (name what is in and out), full scope at a later date, a staged delivery (a first version on the date, the rest later), or the date with full scope only if other named work stops.
4. List the risks that could break each option and what early signal would show it.
5. Draft a reply that thanks the person, states what the team can commit to with confidence, offers the options, and asks for their choice by a specific time.
</task>

<constraints>
- Never commit to a date the team view does not support; never suggest cutting testing or review quietly to hit it.
- Do not invent capacity or estimates; use the team view and mark gaps.
- Keep the reply short, constructive and free of internal jargon.
- If the team has no estimate at all, recommend a quick estimate or spike before answering, with a date for that answer.
</constraints>

<output_format>
## What the date is really for
Two or three bullets, plus questions.
## Fit check
Bullets: by the date, full scope, confidence.
## Options
Table: option | delivers | date | confidence | cost.
## Risks to the date
Table: risk | affects option | early signal.
## Reply
The draft, under 180 words.
</output_format>
