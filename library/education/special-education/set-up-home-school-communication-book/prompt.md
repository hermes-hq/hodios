---
schema: 1
id: set-up-home-school-communication-book
kind: prompt
title: Set up a home-school communication book
description: Sets up a daily home-school communication system for a pupil who cannot easily report their own day, with a short format, sentence starters, a pupil-friendly page and rules that keep it useful.
category: special-education
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
subject: [education-sector]
tags: [home-school-link, family-partnership, daily-diary, communication-support, routines]
pairs_with:
  prompts: [write-one-page-pupil-profile, plan-aided-language-modelling]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, how they communicate, what the family most wants to know each day (food, toileting, mood, sleep, medication given, what they did), what school needs from home, and current problems with communication.
    type: text
    required: true
  - name: format
    description: Paper book, shared app or email. Optional; if empty, recommend one.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and ground rules, Daily page for school, Daily page for home, Pupil's own page, Sentence starters, What goes elsewhere, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help school staff and families set up a daily communication book for a pupil who cannot easily say what happened at school or at home, for example a non-speaking child or a child with a significant learning disability. Books often go wrong in two ways: they become a running list of incidents that leaves families dreading the bag, or they shrink to "good day" and tell nobody anything. Experienced teachers keep the daily entry short and structured (two minutes to write), lead with something positive and specific, include practical information both sides need, give the pupil a part to share (a photo, a symbol, an object of reference) so it becomes a conversation starter, and move anything serious to a phone call or meeting.

Pupil: {{pupil}}
{{#format}}Format: {{format}}{{/format}}
</context>

<task>
1. Purpose and ground rules: what the book is for, how often each side writes, who writes at school, how quickly concerns are answered, and what never goes in the book.
2. Daily page for school: a short template with tick boxes or quick fields for the practical items the family wants (food, drink, toileting, sleep or rest, mood, any medication given by school as recorded in the school's medical records), plus "Today I..." with one specific highlight and a space for one thing to try at home.
3. Daily page for home: a matching short template - sleep, breakfast, mood on arrival, anything new or worrying, something the pupil enjoyed that staff can ask about.
4. Pupil's own page: a way for the pupil to share their day using their communication method (photos, symbols to circle, a "today I" visual, an object), so families can talk about it with them.
5. Sentence starters: ten specific positive starters and five neutral ways to raise a small concern constructively.
6. What goes elsewhere: incidents, injuries, medication changes, safeguarding concerns and complaints, with the right channel for each.
7. Review: when to check with the family that the book is working.
</task>

<constraints>
- Initials only in templates.
- Never record safeguarding concerns, detailed incident reports or other pupils' names in the book; route them through school procedures.
- Do not give medical advice; medication and health information follows the school's health care plan.
- Keep it short enough to complete in two minutes.
- If the family's first language is not the school's, suggest translated or symbol-based fields.
</constraints>

<output_format>
## Purpose and ground rules
## Daily page for school
A template.
## Daily page for home
A template.
## Pupil's own page
## Sentence starters
## What goes elsewhere
Table: Matter | Channel.
## Review
</output_format>
