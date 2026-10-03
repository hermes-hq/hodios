---
schema: 1
id: plan-group-project
kind: prompt
title: Plan a student group project
description: Sets up a student group project with roles, a team agreement, milestones planned back from the deadline, a shared tracker and a fair process for a member who does not contribute.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [spec, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [group-work, team-agreement, backward-planning, free-riders, project-tracker]
pairs_with:
  prompts: [create-study-plan]
  personas: [study-coach]
args:
  - name: assignment_brief
    description: The assignment brief as given by the instructor, including deliverables, word or slide limits, marking criteria and whether the mark is shared or individual.
    type: text
    required: true
  - name: team_size
    description: How many students are in the group, including you.
    type: number
    required: true
  - name: deadline
    description: The submission deadline with date and time, plus today's date so the weeks can be counted (for example "12 December 17:00; today is 3 November").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What the brief actually asks for, Roles, Team agreement, Milestones, Tracker, If someone does not contribute, First meeting agenda]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help students run group projects the way experienced project leads run small teams. Group projects usually fail in predictable ways: nobody owns integration, work starts late because the deadline feels far away, the last week becomes an all-nighter stitching together sections in four different styles, and one person does nothing while the others quietly resent it. Each failure has a cheap fix that has to be agreed in week one, before anyone is annoyed: named owners, an internal deadline well before the real one, a single shared tracker, and a written agreement about what happens when someone goes quiet.

<assignment_brief>
{{assignment_brief}}
</assignment_brief>

Team size: {{team_size}}. Deadline: {{deadline}}.
</context>

<task>
1. Break the brief into deliverables and the marking criteria that apply to each. Note anything that is graded individually (peer assessment, individual reflections, a viva) because it changes how work should be split. List anything the brief leaves unclear as questions for the instructor.
2. Propose roles for {{team_size}} people. Every student owns a content area, and the cross-cutting jobs are assigned on top: coordinator (runs meetings, keeps the tracker current), editor/integrator (one voice, formatting, references), quality checker (checks against the rubric before each milestone). Rotate or combine these for small teams; say which combination you chose and why. Avoid splits where one person only formats while others think.
3. Draft a one-page team agreement the group can edit and sign: meeting rhythm and channel, response time expectations, how decisions are made when people disagree, quality standard ("done" means checked against the rubric), how and where files are stored and named, and the non-contribution process from step 6.
4. Plan milestones backwards from {{deadline}}: final submission, a buffer of 2 to 4 days, internal hand-in of the complete integrated draft, full rough drafts per section, outlines and research, and kickoff. Give each milestone a date, an owner and a concrete deliverable. If the time available is too short for this sequence, compress it and say what risk that creates. If the deadline does not let you count the days (no current date given), ask for today's date before giving exact dates and use "week 1, week 2" meanwhile.
5. Design a shared tracker as a table the group can paste into any spreadsheet or board: Task | Owner | Due | Status (not started / in progress / review / done) | Depends on | Notes. Fill it with the first two weeks of real tasks.
6. Write the escalation ladder for a member who does not contribute, from kind to formal: a private check-in that asks what is going on (illness, overload and confusion are common and fixable), a clear restatement of the task and a new date, a group conversation recorded in the meeting notes, and finally contacting the instructor with the tracker and notes as evidence. Include a short, neutral message the coordinator can send at the first step.
7. Write a 30-minute agenda for the first meeting that ends with roles accepted, the agreement signed and everyone's first task dated.
</task>

<constraints>
- Use only what the brief says about deliverables, criteria and rules; do not invent marking weights or instructor policies. Where a policy matters (peer assessment, how to report non-contribution), tell the group to check the course guidance.
- Keep the plan realistic for students with other classes: no milestone that needs more than a few focused hours per person per week unless the brief demands it, and say if it does.
- Keep the tone collaborative. The non-contribution process protects everyone, including the person who is struggling; never write accusatory messages.
- Do not do the assignment's academic work (no section drafts, no answers); this is planning only.
</constraints>

<output_format>
## What the brief actually asks for
Bullets: deliverables, marking criteria per deliverable, individual components, open questions for the instructor.
## Roles
Table: Person | Content area | Cross-cutting role | Why this split.
## Team agreement
A short, editable agreement with headed clauses and a line for each member to sign.
## Milestones
Table: Date | Milestone | Owner | Deliverable, ordered from kickoff to submission, with the buffer marked.
## Tracker
The tracker table with the first two weeks of tasks.
## If someone does not contribute
The numbered ladder, plus the first-step message.
## First meeting agenda
Timed bullets totalling 30 minutes.
</output_format>
