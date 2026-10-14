---
schema: 1
id: write-weekly-note-from-dailies
kind: prompt
title: Write a weekly note from daily notes
description: Rolls a week of daily notes into one weekly note - highlights, decisions, open loops, ideas worth keeping and links back to the days - so the dailies can be left behind.
category: note-taking
version: 1.0.0
status: incubating
stage: [review]
role: [individual, manager, researcher, writer]
requires: [none]
inputs: [notes]
output: [summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [daily-notes, weekly-note, journal-rollup, open-loops, periodic-notes]
pairs_with:
  prompts: [design-daily-note-template, process-notes-inbox, write-note-for-future-self, set-up-work-logbook]
args:
  - name: dailies
    description: The week's daily notes pasted in order, each starting with its date.
    type: text
    required: true
  - name: focus
    description: Optional - what the weekly note is for, for example "work, to feed my monthly report", "personal journal", "PhD progress for my supervisor".
    type: string
  - name: link_style
    description: Optional - how to link back to days, for example "[[2026-10-06]] wiki links" or "plain dates".
    type: string
output_contract:
  format: markdown
  sections: [Week of, Highlights, Decisions, Open loops, Worth keeping, Patterns, Next week]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Daily notes are good for capture and bad for retrieval: a month later nobody rereads thirty day pages. A weekly note is the layer that makes them useful. Its job is to pull out what will matter later (decisions and their reasons, things finished, problems hit, ideas, people met) and, more importantly, to catch open loops: tasks mentioned and never closed, questions asked and never answered, promises made to others. A weak roll-up just summarises each day in turn. A useful one is organised by kind of thing, links each item back to its day, and is honest about what did not get done.

{{#focus}}
Focus: {{focus}}
{{/focus}}
{{#link_style}}
Link style: {{link_style}}
{{/link_style}}

Daily notes:
{{dailies}}
</context>

<task>
1. Read all days and note the date range.
2. Pull highlights: things finished or that went well, three to six items.
3. Pull decisions with the reason given, if any.
4. Find open loops: unchecked tasks, "need to", "follow up", "ask X", unanswered questions and promises to others. Check later days to see if any were closed; only list ones still open.
5. Pull ideas, insights and references worth keeping as their own notes, and suggest a title for each.
6. Note patterns across the week only if the notes clearly show them (for example energy, recurring blockers), worded as observations.
7. Link every item back to its day in the requested style (default: the date in brackets).
8. Suggest up to three priorities for next week, drawn only from the open loops and stated goals.
</task>

<constraints>
- Use only what is in the notes; do not invent outcomes, reasons or follow-ups.
- Do not list an open loop that a later day shows as done.
- Keep personal or health details as written; do not diagnose or interpret moods beyond the words used.
- Keep it short enough to read in two minutes.
</constraints>

<output_format>
## Week of
The date range covered.
## Highlights
## Decisions
## Open loops
Checkbox list with source date.
## Worth keeping
## Patterns
## Next week
</output_format>
