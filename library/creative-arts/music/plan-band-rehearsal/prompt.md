---
schema: 1
id: plan-band-rehearsal
kind: prompt
title: Plan a band rehearsal
description: Plans a time-boxed band rehearsal from the songs, their readiness and the next gig, with a minute-by-minute agenda, section drills, run-throughs and homework for each player.
category: music
version: 1.0.0
status: incubating
stage: [plan]
role: [artist]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [rehearsal, band, gig-preparation, ensemble-playing]
pairs_with:
  prompts: [plan-live-set, plan-song-arrangement]
  personas: [music-producer]
args:
  - name: songs_status
    description: 'Each song with its state, e.g. "Song A: tight", "Song B: ending is a mess", "Song C: new, only two of us know it", plus any known problem spots.'
    type: text
    required: true
  - name: session
    description: The rehearsal length and line-up, e.g. "3 hours in a hired room, drums, bass, two guitars, vocals".
    type: string
    required: true
  - name: goal
    description: What the next deadline is, e.g. "gig in 10 days, 40-minute set" or "recording next month".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Triage, Agenda, Drills, Roles, Homework, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a band leader and musical director. Rehearsal time in a paid room is the most expensive time a band has, and most of it leaks away to setting up, noodling, discussing, and running whole songs over and over when the problem is eight bars long. Effective rehearsals start with a short warm-up song the band knows, fix problems in isolation (just the ending, just the bridge transition, at a slower tempo with a click), then put the fix back into a full run. They schedule the hardest new material while everyone is fresh, end with a performance-style run of the set in order, and record that run on a phone to review later. Individual parts (learning chords, lyrics, a solo) are homework, not rehearsal work.

<songs>
{{songs_status}}
</songs>
Session: {{session}}
Goal: {{goal}}
</context>

<task>
1. **Triage.** Sort the songs into ready, needs targeted work, and not ready. For the goal, say which songs must be ready and whether any should be dropped or saved for later; say so plainly if the plan cannot be met in the time.
2. **Agenda.** A minute-by-minute plan for {{session}}: setup and line check (allow 15 to 20 minutes), a warm-up song, focused blocks for the problem spots, new material while energy is high, a short break, and a final run in set order with a phone recording. Leave about 10 percent buffer.
3. **Drills.** For each problem spot: what exactly to loop (bars or section), the tempo to start at, the count-in or cue, who leads it, and when it counts as fixed (for example "three clean runs at full tempo").
4. **Roles.** Who calls the count-ins, endings and cues; who keeps the timer and the notes.
5. **Homework.** Per player, what to learn or fix before the next session, so rehearsal time is not spent on individual parts.
6. **Review.** What to listen for on the recording and how to turn it into next rehearsal's agenda.
</task>

<constraints>
- Keep the agenda within the session length; show the total.
- Do not assume gear, a click or in-ear monitors the band did not mention; offer them as options.
- Keep discussion time short and scheduled; suggest parking arguments about arrangements for a set slot.
</constraints>

<output_format>
## Triage
## Agenda
Table: Time | Block | What | Who.
## Drills
## Roles
## Homework
## Review
</output_format>
