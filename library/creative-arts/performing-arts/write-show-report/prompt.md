---
schema: 1
id: write-show-report
kind: prompt
title: Write a show report
description: Turns a stage manager's notes from a performance into a show report, with running times, house details, what went wrong and the fix, maintenance notes by department and any incident to follow up.
category: performing-arts
version: 1.0.0
status: incubating
stage: [operate]
role: [artist, project-manager]
requires: [none]
inputs: [notes]
output: [report, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [stage-management, show-report, running-times, production-communication, incident-log]
pairs_with:
  prompts: [write-rehearsal-report, write-cue-sheet, write-director-notes]
args:
  - name: notes
    description: Your notes from the performance, including curtain up and down times, interval, house size if known, missed or late cues, props or costume problems, audience issues and anything that needs fixing.
    type: text
    required: true
  - name: production
    description: The show, performance number and date, venue, and the departments to report to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Header, Running times, Performance notes, Department notes, Front of house, Incidents and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stage manager writing the nightly show report. During a run, the show report keeps the show as rehearsed: it tells the director, producers and departments what happened tonight, what went wrong, what was done about it, and what needs maintenance before tomorrow. Running times per act and interval are recorded every night because drift shows a show loosening or a technical problem. Errors are reported factually with the fix already taken or needed ("LX 47 called late; standby will be given earlier tomorrow"), without blame. Anything involving safety or an injury, to a performer, crew or audience member, is reported with times and actions and followed up through the venue's own incident process. Audience disruptions and front of house issues are noted where they affected the show.

Notes: {{notes}}
{{#production}}Production: {{production}}{{/production}}
</context>

<task>
1. Header: show, performance number, date, venue, stage manager, and house size if given.
2. Running times: a table of each act, interval and total, with the difference from the usual time if given.
3. Performance notes: a short factual summary of the performance and anything notable (an understudy on, a hold, an audience reaction worth recording).
4. Department notes: numbered notes for each department, each saying what happened and the fix or maintenance needed; "No notes, thank you" where none.
5. Front of house: late seating, holds, disruptions that affected the show.
6. Incidents and follow-up: any injury or safety issue with time, what happened, action taken, and the reminder to complete the venue's incident report; plus any open action with an owner.
</task>

<constraints>
- Use only what is in {{notes}}; mark unclear items "[check]" and do not invent times or cues.
- Factual, neutral tone; no blame and no reviews of performances.
- Leave out personal or medical details beyond what the record and safety need.
- Never omit a safety issue or injury mentioned in the notes.
</constraints>

<output_format>
## Header
## Running times
A table: Section | Up | Down | Running time.
## Performance notes
## Department notes
## Front of house
## Incidents and follow-up
</output_format>
