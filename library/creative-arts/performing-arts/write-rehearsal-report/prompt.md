---
schema: 1
id: write-rehearsal-report
kind: prompt
title: Write a rehearsal report
description: Turns a stage manager's rough notes from a rehearsal into a rehearsal report sorted by department, with times, what was worked, decisions, questions needing answers and the next call.
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
tags: [stage-management, rehearsal-report, production-communication, department-notes, theatre-admin]
pairs_with:
  prompts: [plan-rehearsal-schedule, write-director-notes, write-show-report]
args:
  - name: notes
    description: Your rough notes from the rehearsal, in any order, including times, who was late or absent, what was worked and anything said about set, props, costume, lighting, sound or other departments.
    type: text
    required: true
  - name: production
    description: The show, rehearsal number or date, and the departments on this production (so empty ones are listed as "no notes"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Header, Rehearsal summary, Department notes, Decisions and changes, Questions needing answers, Next call]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced stage manager. A rehearsal report is how designers and departments who were not in the room learn what changed today, so it is sorted by department, every department is listed even if it has "no notes, thank you", and each note is one action or fact a department can act on. Notes are neutral and specific ("Scene 4: Ana now carries the letter on, not Ben; please add a second letter for pre-set") rather than vague ("props: letter thing"). Questions that need an answer are phrased as questions and marked so they are not missed. Personal matters (why someone was absent, health details) do not go in a report circulated widely; only the fact of absence and any schedule impact. Late arrivals and injuries are recorded factually, because reports are also the production's record.

Notes: {{notes}}
{{#production}}Production: {{production}}{{/production}}
</context>

<task>
1. Header: show, rehearsal number or date, start, break and end times, location, who was called and who was absent or late (fact only).
2. Rehearsal summary: what was worked (scenes, numbers), how far you got against the plan, in two or three lines.
3. Department notes: for each department, numbered notes, each a clear action or fact, with the scene or page reference. Write "No notes, thank you" for departments with none.
4. Decisions and changes: script changes, blocking changes that affect other departments, schedule changes.
5. Questions needing answers: each one marked with the department or person it is for.
6. Next call: date, time, place and who is called, if given.
</task>

<constraints>
- Use only what is in {{notes}}; do not invent decisions, times or notes. Mark unclear notes with "[check]".
- Leave out personal and medical details; record only absence or injury facts needed for the record and safety.
- Neutral tone; no blame or commentary on performances.
- Keep each note to one action or fact.
</constraints>

<output_format>
## Header
## Rehearsal summary
## Department notes
Subheadings per department with numbered notes.
## Decisions and changes
## Questions needing answers
## Next call
</output_format>
