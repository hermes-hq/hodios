---
schema: 1
id: write-workshop-report
kind: prompt
title: Write a workshop report
description: Turns workshop outputs such as sticky notes, flipcharts, votes and facilitator notes into a report of themes, decisions, open questions and next steps for participants and sponsors.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [consultant, project-manager, product-manager, manager]
requires: [none]
inputs: [notes, image, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [workshop-outputs, facilitation, affinity-mapping, synthesis, next-steps]
pairs_with:
  prompts: [summarize-meeting-transcript, write-executive-summary, write-meeting-recap-email]
args:
  - name: workshop_outputs
    description: The raw outputs, such as transcribed sticky notes, flipchart text, dot-vote counts, breakout notes and facilitator notes. Photos of boards can be attached.
    type: text
    required: true
  - name: workshop_basics
    description: The workshop's purpose, date, participants (roles and number), and the agenda or exercises run.
    type: text
    required: true
  - name: audience
    description: Who gets the report.
    type: enum
    enum: [participants, sponsor, both]
    default: both
output_contract:
  format: markdown
  sections: [Workshop report, Raw output appendix, Facilitator checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Workshop energy fades within days unless a report turns the wall of sticky notes into a shared record. Facilitators know the traps: reporting every note verbatim (unreadable), or summarising so hard that participants no longer recognise their own words; mixing what the group decided with what one loud voice said; dropping minority views; and presenting the facilitator's own interpretation as the group's conclusion. A good report states the purpose, groups outputs into themes with counts, quotes a few notes in participants' words, separates decisions from ideas and from open questions, shows votes as numbers, and ends with owned next steps. Raw outputs go in an appendix so nothing is lost.
</context>

<task>
Write a workshop report for {{audience}}.

<workshop_basics>
{{workshop_basics}}
</workshop_basics>

<workshop_outputs>
{{workshop_outputs}}
</workshop_outputs>

1. If the outputs contain nothing to synthesise, ask in one short message and stop.
2. If photos of boards are attached, transcribe only what is legible; mark unreadable notes `[illegible]` and do not guess them.
3. Summary for the sponsor: purpose, what was achieved against it, the top three themes, decisions made, and the most important next step.
4. Per exercise or session: what was asked, the themes (each with a name, a one-line description, the number of notes in it, and one or two notes quoted verbatim), and vote results as counts.
5. Separate clearly: decisions the group made (with how, such as a vote or consensus), ideas and proposals not yet decided, open questions, and disagreements or minority views worth keeping.
6. Next steps: each with owner and date if the outputs give them, otherwise `[owner?]` and `[date?]`.
7. Put the full raw output in an appendix, lightly cleaned (spelling only), grouped by exercise.
8. List the places where you grouped notes by judgement so the facilitator can check them.
</task>

<constraints>
- Use only the outputs. Never invent notes, votes, decisions or owners.
- Keep participants' words when quoting; do not polish them into corporate language.
- Do not attribute notes to named individuals unless the outputs already do and the audience is internal.
- Report body under about 1,000 words; the appendix can be longer.
</constraints>

<output_format>
## Workshop report
Header (title, date, participants, purpose); Summary; Sessions (themes table: Theme · Description · Notes · Example quote); Decisions; Ideas to explore; Open questions; Differing views; Next steps (table: Action · Owner · Due).
## Raw output appendix
Grouped by exercise.
## Facilitator checks
Groupings made by judgement, illegible items and missing owners.
</output_format>
