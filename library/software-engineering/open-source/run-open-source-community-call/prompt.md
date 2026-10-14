---
schema: 1
id: run-open-source-community-call
kind: prompt
title: Run a recurring open-source community call
description: Sets up a recurring community or contributor call for an open-source project, with a clear purpose, a time-zone rotation, an agenda template, notes and recording rules, and decisions posted back.
category: open-source
version: 1.0.0
status: incubating
stage: [operate]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [text]
output: [plan, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [community-meetings, time-zones, meeting-notes, facilitation, contributor-engagement]
pairs_with:
  prompts: [choose-community-channels, write-project-governance, plan-contribution-sprint]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, where contributors and users are located, how decisions are made today, what the call should do (contributor sync, user Q&A, working group), and who will host it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Purpose and format, Schedule, Agenda template, Running the call, Notes and recording, Decisions and follow-up, When to change or stop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Community calls help open-source projects when they make work visible and unblock people, and hurt when decisions get made by whoever was awake at that hour. The common failures: a fixed time that suits one region and quietly excludes everyone else; an agenda decided in the first five minutes; long status updates nobody needed live; decisions made on the call and never written where absent people can see them; recordings published without telling participants; and a call that continues with three attendees out of habit. Healthy calls have a single stated purpose, a public agenda document people add to before the call, a rotating time if contributors span many time zones, a facilitator and a note-taker, and a rule that the call can discuss but significant decisions are confirmed in the issue tracker or discussion thread asynchronously. A code of conduct applies to calls too, and someone must be able to remove a disruptive participant.

Project:
<project>
{{project}}
</project>
</context>

<task>
1. Purpose and format: one sentence on what the call is for and what it is not for, the length, frequency, and whether it is open to anyone or to contributors.
2. Schedule: pick a time or a rotation based on where people are, show it in UTC and in the main regions' local times, and say how to handle daylight-saving changes.
3. Agenda template: a document structure people add to before the call (announcements, items for discussion with owner and desired outcome, help wanted, new-attendee welcome), with a cut-off for adding items.
4. Running the call: the facilitator's script for opening, time-boxing items, drawing in quiet participants and newcomers, and moving long debates to an issue; how the code of conduct applies and who can remove someone.
5. Notes and recording: who takes notes, the template, where they are published and how fast, and recording rules (announce, consent, where stored, or no recording).
6. Decisions and follow-up: how points discussed on the call are confirmed in the tracker with a comment period for people who were absent, and how action items are tracked.
7. When to change or stop: signs the call is not working and what to try.
</task>

<constraints>
- Do not let the call become the only decision venue; asynchronous confirmation is required for significant decisions.
- Do not invent attendee numbers or locations; use what was given.
- Keep the agenda template short enough to fill in one minute.
- If the project has one or two active people, say whether a call is worth it yet or an async update would serve better.
</constraints>

<output_format>
Use the contract's section headings in order. Schedule as a table: Slot | UTC | Local times for the main regions. Agenda template and notes template in fenced markdown blocks.
</output_format>
