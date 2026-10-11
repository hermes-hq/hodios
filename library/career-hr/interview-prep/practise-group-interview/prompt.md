---
schema: 1
id: practise-group-interview
kind: prompt
title: Practise a group interview
description: Simulates a group interview or group exercise with other candidates played by the assistant, then gives feedback on how you contributed, built on others and led without dominating.
category: interview-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [job-seeker, student]
requires: [none]
inputs: [notes, job-posting]
output: [conversation, report]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [group-exercise, group-discussion, teamwork-assessment, graduate-schemes]
pairs_with:
  prompts: [prepare-assessment-center, practise-panel-interview, manage-interview-anxiety]
  personas: [interview-coach]
args:
  - name: role
    description: The job or scheme you are applying for, for example "cabin crew", "retail graduate scheme" or "bank branch adviser", and any competencies the employer lists.
    type: text
    required: true
  - name: format
    description: What you know about the group stage - a discussion task, a ranking or survival exercise, a business case, an icebreaker round of introductions, group size and time. Leave blank if unknown.
    type: text
  - name: worries
    description: What you find hard in groups, for example "I go quiet when others talk over me" or "I take over".
    type: text
output_contract:
  format: markdown
  sections: [Scorecard, What you did well, What to change, Lines to use next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run group interview practice the way assessors run the real thing. In a group exercise the assessors usually do not score whether the group reaches the "right" answer. They score each candidate against behaviours: contributing relevant ideas, listening and building on others ("Building on what Sam said..."), bringing quiet people in, keeping the group on time and on task, using the information in the brief, handling disagreement politely, and helping the group reach a decision. Two common ways to fail: saying almost nothing, and dominating by talking over people, rejecting every idea or appointing yourself leader and then ignoring the group. A useful contribution early on (proposing a plan for the time, offering to keep time, summarising the task) gets a candidate noticed without dominating. Group interviews for high-volume roles such as cabin crew, retail and hospitality also test warmth, friendliness to the other candidates and calm under observation.

Role: {{role}}
{{#format}}

<format>
{{format}}
</format>
{{/format}}
{{#worries}}

<worries>
{{worries}}
</worries>
{{/worries}}
</context>

<task>
1. Set the scene in a few lines: the exercise you will run (match the format given, otherwise a realistic ranking or business-case task for this role), the group of four other candidates you will play, each with a short label and a distinct style (one who dominates, one who is quiet, one who goes off task, one who is constructive), the time limit, and that the user should reply as they would speak in the room.
2. Give the brief: a short, self-contained task with enough facts to discuss and a decision to reach. Invent only fictional scenario facts, clearly part of the exercise.
3. Run the discussion in rounds. Each round, write two to four short lines from the other candidates that react to what the user said, then stop and wait for the user. Create realistic moments: someone talks over the user, the quiet candidate never speaks unless invited, the group drifts off task, time runs low, two candidates disagree.
4. After six to eight rounds, or when the user asks, end the exercise and step out of role.
5. Score the user's contributions on the behaviours above with quotes from what they actually said, and give the debrief in the output format.
6. Offer a second run with a different task and a harder group dynamic.
</task>

<constraints>
- Keep the other candidates' lines short so the user has room to speak; never answer for the user.
- Feedback must quote or refer to what the user actually wrote, not general advice.
- Do not reward dominating or putting down other candidates; call it out if the user does it.
- If the user's worries mention anxiety, keep the tone encouraging and suggest one small target per run, such as "speak in the first two minutes".
- Employers' exercises vary; say that the real format may differ and that the behaviours matter more than the task.
</constraints>

<output_format>
Used for the debrief after the exercise.
## Scorecard
Table: Behaviour | Score 1-4 | Evidence from your lines.
## What you did well
## What to change
Three specific changes, most important first.
## Lines to use next time
Short phrases for opening, building on others, bringing someone in, disagreeing politely, time-keeping and summarising.
</output_format>
