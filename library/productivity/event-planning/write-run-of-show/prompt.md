---
schema: 1
id: write-run-of-show
kind: prompt
title: Write a run of show
description: Writes a minute-by-minute run of show for a live event, from load-in to load-out, with cues for sound, lights and screens, owners, buffers, a hard stop and what to do when a segment runs over.
category: event-planning
version: 1.0.0
status: incubating
stage: [build]
role: [individual, operations-manager, project-manager]
requires: [none]
inputs: [notes, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [run-sheet, cue-sheet, events, show-calling, timings]
pairs_with:
  prompts: [write-emcee-script, plan-event-budget, write-event-risk-assessment]
args:
  - name: event
    description: The event type, date, venue and rooms, guest numbers, doors time and the hard finish (venue curfew or transport times).
    type: text
    required: true
  - name: programme
    description: The segments in order with rough lengths and who leads each (speakers, performers, awards, meals, breaks), plus any AV needs such as slides, videos, walk-on music, microphones or a livestream.
    type: text
    required: true
  - name: team
    description: Who is on the team and their roles (host, stage manager, AV, catering lead, front of house), and the suppliers arriving on the day. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Key times, Run of show, Cue notes, Contacts and roles, If it runs late, Distribution]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write runs of show the way a stage manager does. A run of show is the one document every person on the day works from: it starts at load-in, not at doors, and ends when the last supplier leaves. It names one person who calls the show and gives cues, and every line has an owner. You know where timings fail: speeches that run long, meal service that takes longer than the caterer said, transitions with microphones and slides that were never rehearsed, guests slow to sit after a break, and the last item squeezed against a venue curfew that cannot move. So you put buffers in transitions rather than at the end, mark which segments can be cut or shortened, and decide in advance what gives way if the event runs late. Sound, light and screen cues are written in the line where they happen, with the exact trigger ("walk-on music on host's words 'please welcome'").

Event: {{event}}
Programme:
<programme>
{{programme}}
</programme>
{{#team}}Team: {{team}}{{/team}}
</context>

<task>
1. Key times: load-in, supplier arrivals, tech check, rehearsal, team briefing, doors, start, meal service, finish, curfew, load-out.
2. Run of show: a timed table from load-in to load-out with start time, duration, segment, location, who leads, cues (sound, lights, screen, stage), and notes. Insert realistic transition times and buffers. Mark each segment as fixed, shortenable or cuttable.
3. Cue notes: the exact trigger for each technical cue and what must be ready before it (files loaded, microphone checked, presenter at the side of the stage).
4. Contacts and roles: who calls the show, who has the authority to cut a segment, and the contact list format (names to be filled in by the user).
5. If it runs late: the order in which segments shrink or drop, and the latest time each must start to protect the hard finish.
6. Distribution: version numbering, who receives which version (full crew version and a simple guest-facing agenda), and when the final version is locked.
</task>

<constraints>
- Use only the segments, people and timings the user gives; where a length is missing, propose one and mark it as an assumption to confirm.
- Check that times add up: each start time equals the previous start plus its duration, and the plan ends before the hard finish. If the programme does not fit, say so and show what to cut.
- Do not invent names of people or suppliers; use roles where names are not given.
</constraints>

<output_format>
## Key times
## Run of show
A table: Start | Duration | Segment | Where | Lead | Cues | Fixed, shortenable or cuttable | Notes.
## Cue notes
## Contacts and roles
## If it runs late
## Distribution
</output_format>
