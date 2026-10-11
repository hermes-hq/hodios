---
schema: 1
id: build-lessons-learned-presentation
kind: prompt
title: Build a lessons-learned presentation
description: Builds a short lessons-learned presentation after a project, with what happened, what worked, what did not and why, and the specific changes the team will adopt, without blame.
category: presentations
version: 1.0.0
status: incubating
stage: [review, build]
role: [project-manager, manager, engineering-manager, consultant]
requires: [none]
inputs: [notes, document]
output: [outline, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lessons-learned, project-review, blameless, slide-outline, continuous-improvement]
pairs_with:
  prompts: [write-project-retrospective-writeup, run-retrospective, outline-presentation, write-speaker-notes]
  personas: [presentation-designer]
args:
  - name: project
    description: What the project was, its goals, the timeline and outcome, and the notes, retro output or data you have.
    type: text
    required: true
  - name: audience
    description: Who you present to, such as the team, leadership, other project teams or the client.
    type: text
    required: true
  - name: minutes
    description: The time slot in minutes.
    type: number
    default: 20
output_contract:
  format: markdown
  sections: [Storyline, Slides, Lessons and changes, Sensitive points, Speaker notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build lessons-learned presentations. Most of them fail the same way: a long list of "communication could be better" points that nobody owns, a timeline that reads as blame, and no change the next project will actually feel. A useful session states the goal and the outcome against it plainly, picks the three to five lessons that would change the next project's result, explains each with the cause (process, information, constraints, decisions made with what was known then) rather than the person, and ends with specific changes that have an owner and a place they will live (a template, a checklist, a kickoff agenda). What went well deserves real time, because repeating it is cheaper than fixing failures. Leadership audiences want the business impact and the asks; peer project teams want reusable practice.

Project and material:
{{project}}

Audience: {{audience}}
Time: {{minutes}} minutes
</context>

<task>
1. Summarise the project's goal, the outcome against it (scope, time, cost, quality, as far as the material allows) and two or three key moments on a short timeline.
2. Pull the candidate lessons from the material and keep the three to five with the most effect on outcomes. Merge vague ones into specific ones.
3. For each lesson write: what happened, why (the system cause), the impact, and the change adopted or proposed, with an owner role and where it will live.
4. Include what worked and should be repeated, with evidence.
5. Lay out the slides to fit the time: title, outcome at a glance, timeline, what worked, one slide per lesson, changes we are adopting, asks of the audience if any.
6. Flag sensitive points (named individuals, client faults, contractual issues) and suggest neutral wording.
7. Write short speaker notes for each slide.
</task>

<constraints>
- Blameless wording: describe decisions and conditions, not people's failings. Do not name individuals in a negative context.
- Use only facts and numbers in the material; mark gaps as "to confirm".
- Every lesson ends in a concrete change, or is stated as an open question with an owner to investigate.
- If the audience includes the client, keep internal commercial matters out and say so.
</constraints>

<output_format>
## Storyline
Three to five sentences.

## Slides
Numbered slides, each with an assertion title and its content.

## Lessons and changes
A table: lesson, cause, impact, change, owner role, where it lives.

## Sensitive points
Bullets with suggested wording, or "None found".

## Speaker notes
Notes per slide.
</output_format>
