---
schema: 1
id: run-cue-to-cue-tech
kind: prompt
title: Run a cue-to-cue tech rehearsal
description: Plans a technical rehearsal for a show, with a cue-to-cue running order, jumps between cues, holds and safety calls, a timed schedule, who is needed when and what to do when it runs late.
category: performing-arts
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [artist, project-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [technical-rehearsal, stage-management, cue-to-cue, tech-week, show-calling]
pairs_with:
  prompts: [write-cue-sheet, plan-rehearsal-schedule, write-show-report]
args:
  - name: cues
    description: The cue list or calling script (lighting, sound, flies, video, scene changes) with page numbers, or the script with cue notes.
    type: text
    required: true
  - name: time_and_team
    description: Time available for tech, the crew and operators, whether performers are called, and the venue's rules (hours, breaks, safety briefing). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Priorities, Cue-to-cue running order, Schedule, Calls and roles, Safety, If it runs late]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stage manager running a technical rehearsal. A cue-to-cue skips the acting between cues: the company jumps from the line before one cue (the "standby" point) to the cue itself, runs it, and jumps again, so all cues are checked in the time available. Time goes to the hard parts: scene changes, cues that overlap or are tied to action, flying, effects, quick changes and anything involving safety. Simple cues in long dialogue scenes take seconds. Holds are called clearly ("Hold, please") and only the stage manager restarts; safety holds stop everything. Performers in tech are asked to walk and mark positions rather than act, and are given an order of work so they are not waiting for hours. Tech almost always runs long, so the plan decides in advance what to cut or cue on paper if time runs out, and when the first full dress must start.

Cues: {{cues}}
{{#time_and_team}}Time and team: {{time_and_team}}{{/time_and_team}}
</context>

<task>
1. Priorities: the cue sequences that need the most time and why (changes, overlaps, effects, flying, safety), ranked.
2. Cue-to-cue running order: each stop with the page and the line or action to start from, the cues it covers, what is being checked, and the estimated time. Group simple cues that can be run fast.
3. Schedule: a timed plan with a safety briefing at the start, breaks per venue rules, and a fixed point by which the full run or dress must start.
4. Calls and roles: who is needed when (performers by section, crew, operators), with an order of work so people are not idle.
5. Safety: hold and restart calls, rules for working in blackout, flying and effects checks, and who can stop the rehearsal.
6. If it runs late: what to cut or check on paper first, what never to cut (anything safety-related, scene changes with people moving in the dark), and how to communicate the change.
</task>

<constraints>
- Use only the cues given; mark any cue that looks missing or ambiguous "[check]".
- Never cut safety checks to save time.
- Respect venue rules and working-hour limits; do not assume them, ask or mark them to confirm.
- Estimate times and mark them as estimates.
</constraints>

<output_format>
## Priorities
## Cue-to-cue running order
A table: Stop | Start from | Cues | Check | Est. time.
## Schedule
## Calls and roles
## Safety
## If it runs late
</output_format>
