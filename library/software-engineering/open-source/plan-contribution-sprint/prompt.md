---
schema: 1
id: plan-contribution-sprint
kind: prompt
title: Plan a contribution sprint
description: Plans an in-person or online contribution sprint for an open-source project, with readiness checks, a curated issue list, a schedule, a mentor guide, same-day review and follow-up.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, developer-advocate]
requires: [none]
inputs: [text]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
depth: specific
tags: [sprints, hackathon, newcomer-onboarding, sprint-mentors, events]
pairs_with:
  prompts: [write-good-first-issues, write-contributing-guide, audit-contributor-funnel]
  personas: [open-source-maintainer]
args:
  - name: event
    description: In person (for example a conference sprint day) or online, date and length, expected attendees and their likely experience, and the venue or tools.
    type: text
    required: true
  - name: project
    description: What the project is, its stack, how long a fresh setup takes and where it breaks, open work suitable for newcomers, and how many maintainers will be present.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Goals, Readiness checklist, Issue list, Schedule, Mentor guide, After the sprint]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sprints succeed or fail on preparation. The first hour is lost to setup unless a fresh environment works in about fifteen minutes on attendees' machines or in a ready-made container or cloud environment. Attendees need a curated list of issues sized for a few hours, labelled by skill, with enough of them that two people do not collide. Mentors (about one per five newcomers is a common target) should unblock, not code for people. Pull requests should be reviewed during the event, because merges on the day are what bring people back. Counting pull requests encourages trivial changes; returning contributors a month later is the measure that matters. Online events add time zones and the need for a single chat channel with visible help queues.

Event:
<event>
{{event}}
</event>

Project:
<project>
{{project}}
</project>
</context>

<task>
1. Set two or three goals for the sprint, including one about returning contributors, and how each will be measured.
2. Write the readiness checklist for the weeks before: fix setup until it works in about fifteen minutes on each common operating system or provide a container, a sprint guide page, labels, a test run with someone new, review capacity booked, and code of conduct and contact person for the event.
3. Plan the issue list: how many issues for the expected attendance, the mix by size and skill (docs, tests, small fixes, one or two larger items for experienced people), how to claim one, and a template for each issue's description.
4. Write the schedule by the hour (or by session for online), with setup, a short project intro, working blocks, review windows and a closing round.
5. Write the mentor guide: how to unblock without taking over, when to escalate, how to review on the day, and how to thank people.
6. After the sprint: merging what is left within a week, a thank-you post, inviting active attendees to the next step (triage role, community call), and measuring the goals after a month.
</task>

<constraints>
- Do not plan more issues or mentoring than the stated maintainers can review during or shortly after the event; reduce scope instead.
- Avoid encouraging trivial or spam pull requests; say how to keep issue quality high.
- Do not invent the project's setup steps or commands; mark them as placeholders to fill in.
</constraints>

<output_format>
Use the contract's section headings in order. Readiness as a checklist with weeks-before markers. Schedule as a table: Time | Activity | Who leads.
</output_format>
