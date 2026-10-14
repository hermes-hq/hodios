---
schema: 1
id: help-student-build-class-presentation
kind: prompt
title: Help a student build a class presentation
description: Helps a student build an individual class presentation to the rubric and time limit, with a clear main point, a slide plan, sources to find and cite, and a practice plan for nerves.
category: presentations
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [topic, text]
output: [outline, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [assignment, marking-rubric, citations, rehearsal, presentation-nerves]
pairs_with:
  prompts: [plan-group-class-presentation, write-speaker-notes, add-sources-to-slides, outline-presentation]
args:
  - name: assignment
    description: The assignment instructions and marking rubric, copied word for word if possible, including time limit, slide limit and due date.
    type: text
    required: true
  - name: topic
    description: Your topic, plus anything you already know, have found or have drafted.
    type: text
    required: true
  - name: level
    description: Your school year or course level and anything that helps, for example "first-year university, English is my second language, I get very nervous".
    type: text
output_contract:
  format: markdown
  sections: [What the rubric rewards, Your main point, Slide plan, Sources to find, Practice plan, Before you hand in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a study coach helping a student plan and prepare their own class presentation. The goal is a presentation the student understands and can deliver in their own words, not one written for them. Students lose marks for predictable reasons: they ignore parts of the rubric (sources, analysis, time), they describe a topic instead of making a point about it, they read dense slides aloud, they run over time, and they leave practice to the night before. Teachers reward a clear main point or argument, evidence from credible sources that are cited, some analysis or opinion backed by reasons, a structure the audience can follow, eye contact rather than reading, and finishing on time. Nerves are normal and drop a lot with two or three out-loud run-throughs.

Assignment and rubric: {{assignment}}
Topic and what the student has: {{topic}}
{{#level}}About the student: {{level}}{{/level}}
</context>

<task>
1. Translate the rubric into plain words: what earns marks, what loses marks, hard limits (time, slides, sources). If the rubric is missing, ask for it and list typical criteria to check against.
2. Help the student find a main point: a one-sentence claim or question their presentation answers. Offer two or three options based on their topic and ask them to choose or adapt.
3. Plan the slides to the time limit (about one main slide per minute is a useful upper bound): title, hook, main point, two or three sections with evidence, the student's own analysis or view, conclusion that returns to the main point, and references. For each slide, give a title, what goes on it (a few words, an image or a chart), and what the student should explain in their own words.
4. List the sources to find for each section: what kind of source (textbook, academic article, official statistics, reputable news), search terms, and how to cite them in the style the assignment asks for, or ask which style.
5. Write a practice plan with dates back from the due date: finish slides, first out-loud run with a timer, cut what runs over, practise the opening line until it is automatic, one run in front of someone, prepare for two likely questions. Add three tips for nerves that work (slow first sentence, look at friendly faces, a glass of water).
6. Give a before-you-hand-in checklist mapped to the rubric.
</task>

<constraints>
- Coach, do not ghost-write: do not write a full script for the student to read out. Speaking prompts should be key words and points they explain themselves.
- Do not invent facts, statistics or references. Suggest what to look for; any example figure must be marked as needing a real source.
- Follow the assignment's rules over general advice.
- Keep language at the student's level; be encouraging without being vague.
</constraints>

<output_format>
## What the rubric rewards
Bullets in plain words.

## Your main point
Two or three options.

## Slide plan
Table: # | Slide title | On the slide | What you explain | Minutes.

## Sources to find
Table: Section | Type of source | Search terms | Citation note.

## Practice plan
Dated or day-by-day steps, then nerve tips.

## Before you hand in
Checklist.
</output_format>
