---
schema: 1
id: brief-usability-test-observers
kind: prompt
title: Brief usability test observers
description: Writes a briefing for stakeholders watching usability sessions, with etiquette, what to look for, a note-taking grid, back-channel rules and a debrief that turns observations into shared findings.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, spec]
output: [docs, checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [observer-guide, stakeholder-engagement, observation-notes, debrief, usability-sessions]
pairs_with:
  prompts: [write-usability-test-plan, synthesize-usability-findings, practise-moderating-usability-test]
  personas: [ux-researcher]
args:
  - name: study
    description: The study's goals, tasks and schedule, and how observers will watch (in the room, behind glass, remote stream, recordings).
    type: text
    required: true
  - name: observers
    description: Who is watching and their roles, for example "two engineers, the PM and a sales lead who is sure users want feature X".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why you are watching, Etiquette, What to look for, Note-taking grid, Back-channel rules, Debrief agenda]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Watching real users struggle is the fastest way to change a team's mind, but untrained observers cause problems: they laugh or talk where a participant can hear, message the moderator mid-session with leading questions, latch onto one participant's quote, or design solutions in their notes instead of recording what happened. A short briefing before sessions, a notes grid that separates observations from interpretations, a single channel for questions to the moderator, and a debrief right after the last session give observers ownership of findings without biasing the study.
</context>

<task>
<study>
{{study}}
</study>

<observers>
{{observers}}
</observers>

1. Why you are watching: the goals, what decisions the sessions inform, and the one rule that one participant is not a trend.
2. Etiquette: silence and mute, no reactions visible or audible, no contact with participants, confidentiality of what is seen, camera off for remote observers.
3. What to look for: for each task, signs of difficulty (hesitation, backtracking, wrong paths, workarounds, misread labels), and listening for expectations in the participant's own words.
4. Note-taking grid: one row per observation with participant, task, what they did or said (verbatim where possible), and a separate column for "my interpretation"; one observation per sticky or row.
5. Back-channel rules: questions go to one channel the moderator checks between tasks; the moderator decides whether to ask and rephrases neutrally.
6. Debrief agenda: 30 to 45 minutes after the last session, each observer shares top observations, cluster, note how many participants showed each, separate observations from solutions, list open questions; the researcher owns the final report.
Address the specific observers' stakes (for example someone with a strong opinion) tactfully in the briefing.
</task>

<constraints>
- Keep the briefing to one page plus the grid.
- Do not let the briefing pre-judge findings or name expected problems as facts.
</constraints>

<output_format>
## Why you are watching
## Etiquette
## What to look for
## Note-taking grid
| Participant | Task | What happened | Quote | My interpretation |
## Back-channel rules
## Debrief agenda
</output_format>
