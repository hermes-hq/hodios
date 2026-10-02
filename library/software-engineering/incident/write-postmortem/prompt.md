---
schema: 1
id: write-postmortem
kind: prompt
title: Write a blameless postmortem
description: Turns incident notes, chat logs and timelines into a blameless postmortem with impact, timeline, contributing factors and owned action items. Use after an incident is resolved.
category: incident
version: 1.0.0
status: experimental
stage: [operate, learn]
role: [sre, engineering-manager, software-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [notes, transcript, logs]
output: [report, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [postmortem, blameless, retrospective]
pairs_with:
  prompts: [triage-production-alert, write-incident-update]
args:
  - name: incident_notes
    description: Everything you have about the incident, such as the incident channel export, timeline notes, alerts, graphs described in words, and the fix.
    type: text
    required: true
  - name: audience
    description: internal keeps full technical detail; public writes a customer-facing version without internal names or systems.
    type: enum
    enum: [internal, public]
    default: internal
output_contract:
  format: markdown
  sections: [Summary, Impact, Timeline, Contributing factors, What went well, What was hard, Action items, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A postmortem exists so the same incident does not happen again and the next one is handled faster. That only works when people can describe what they did without fear, so the document explains how the system and its processes allowed a reasonable action to cause harm. "Human error" is where the analysis starts, not where it ends.
</context>

<task>
Write a {{audience}} postmortem from these notes:
{{incident_notes}}

1. Build the timeline first, in UTC, from the notes only. Mark the key moments: start of impact, detection, response start, mitigation, resolution. Compute time to detect, time to mitigate and total duration from them.
2. Quantify the impact from the notes: users or requests affected, error rates, data lost or delayed, money or SLA effects. Use the notes' numbers only.
3. Explain the contributing factors as a chain: the trigger, the conditions that let it cause harm, and why detection or mitigation took as long as it did. There is usually more than one factor; list each.
4. Note what went well, what was hard, and where the team got lucky.
5. Propose action items, at most seven, each tied to a contributing factor and typed as prevent, detect or mitigate. Each must be specific enough that someone could tell when it is done.
6. For a public audience, drop internal names, hostnames, tools and people. Keep the impact, the cause in plain words, and the commitments.
</task>

<constraints>
- Never invent a timestamp, number or event. Write `[unknown]` and add the gap to Open questions.
- Blameless language: describe actions, decisions and system conditions, not people's character or competence. Refer to people by role ("the on-call engineer"), never by name.
- Do not name a single root cause when the notes show several factors.
- No vague action items such as "be more careful" or "improve monitoring". Name the alert, test, limit or process change.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: what happened, the impact, and how it was resolved.

## Impact
Bullets with numbers, duration, and who was affected. Then time to detect, time to mitigate and total duration.

## Timeline
| Time (UTC) | Event |
Key moments in bold.

## Contributing factors
Numbered, starting with the trigger.

## What went well
Bullets.

## What was hard
Bullets, including where the team got lucky.

## Action items
| # | Action | Type (prevent / detect / mitigate) | Factor | Priority | Owner |
Leave Owner as `TBD`.

## Open questions
Gaps in the notes that the team should fill in. "None" if empty.
</output_format>
