---
schema: 1
id: write-project-kickoff-email
kind: prompt
title: Write a project kickoff email
description: Writes the email that starts a project for everyone involved - goal, scope in and out, who does what, key dates, how the team will communicate and what each person must do this week.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [project-manager, manager, consultant, operations-manager]
requires: [none]
inputs: [notes, text, document]
output: [message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [project-kickoff, roles, timeline, ways-of-working, stakeholders]
pairs_with:
  prompts: [write-project-kickoff-brief, build-project-kickoff-deck, write-status-report]
  workflows: [project-kickoff-track]
args:
  - name: project
    description: The project in your own words - why it exists, the goal and how success will be judged, what is in and out of scope, and the budget if relevant.
    type: text
    required: true
  - name: people
    description: Who is involved and in what role - sponsor, lead, team members, people consulted, approvers.
    type: text
    required: true
  - name: dates
    description: Key dates and milestones, and the kickoff meeting if there is one.
    type: text
  - name: working_rhythm
    description: How the team will work - where updates go, meeting cadence, where documents live, how decisions get made.
    type: text
output_contract:
  format: markdown
  sections: [Gaps, Email, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The kickoff email is the reference people come back to for weeks: why are we doing this, what am I responsible for, when is it due, where do I find things. Most kickoff emails fail as references because they are a wall of enthusiasm with the goal stated vaguely, scope not bounded ("what's out" missing), roles implied rather than named, and no specific first actions, so the project starts with a week of drift. The useful version is skimmable, states a measurable goal, lists in and out of scope (the "out" list prevents most later arguments), names each person's role and first action with a date, gives the few key dates, and sets the working rhythm. Anything still undecided is better listed openly as an open question with an owner than glossed over. It works for any project, from an office move to a software release; for large engineering projects it usually sits on top of a longer written brief, and links to it.
</context>

<task>
Write a project kickoff email.

<project>
{{project}}
</project>

<people>
{{people}}
</people>
{{#dates}}
<dates>
{{dates}}
</dates>
{{/dates}}
{{#working_rhythm}}
<working_rhythm>
{{working_rhythm}}
</working_rhythm>
{{/working_rhythm}}

1. Gaps: check the inputs for a measurable goal, scope out, a named decision-maker, dates and first actions. List what is missing. If the goal cannot be stated at all, ask and stop.
2. Write the email:
   - Subject: "Kickoff: [project], [goal in a few words], due [date]".
   - Opening: the goal and why it matters, in two sentences.
   - **Success looks like:** one to three measurable outcomes from the input, or `[need: …]`.
   - **In scope / Out of scope:** short lists.
   - **Who does what:** each person with their role and a first action with a date. Name the decision-maker.
   - **Key dates:** milestones and the next meeting.
   - **How we'll work:** where updates go, meeting cadence, where documents live, how to raise blockers.
   - **Open questions:** each with an owner.
   - Close with the one thing everyone should do by the end of the week (read, confirm role, add availability).
3. Under Notes, suggest who should review the email before it goes (the sponsor), and to pin it or link it from the project space.
</task>

<constraints>
- Under about 320 words in the body; link to longer documents rather than including them.
- Never invent goals, numbers, dates, people or roles; use `[need: …]`.
- No hype ("exciting journey", "game-changing"); plain and specific.
- If two people appear to own the same thing, or nobody owns the decision, flag it under Gaps.
</constraints>

<output_format>
## Gaps
Bullets of missing or conflicting information.
## Email
Subject line, then the body with the sections above.
## Notes
Bullets.
</output_format>
