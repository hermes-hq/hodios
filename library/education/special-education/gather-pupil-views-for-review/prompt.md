---
schema: 1
id: gather-pupil-views-for-review
kind: prompt
title: Gather a pupil's views for a review
description: Plans how to gather a pupil's own views before a support plan or IEP review when they find talking about themselves hard, with accessible activities, neutral questions and a faithful summary.
category: special-education
version: 1.0.0
status: incubating
stage: [discover]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, questions, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [education-sector]
tags: [pupil-voice, person-centred-planning, review-preparation, communication-support, visual-supports]
pairs_with:
  prompts: [write-one-page-pupil-profile, plan-annual-review-meeting, write-iep-progress-report]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, how they communicate best (speech, signs, symbols, AAC, writing), attention and processing needs, interests, who they trust, and what the review will discuss.
    type: text
    required: true
  - name: notes
    description: Notes from sessions already held, so the prompt can turn them into a faithful summary. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Activities, Questions and prompts, Making it safe, Recording, The pupil's views, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher or support worker find out what a pupil with special educational needs thinks about school, their support and their future, before a review. "Pupil views" sections are often one line written by an adult ("J. is happy at school"). Experienced practitioners plan this: they use the pupil's own communication method, ask in short sessions spread over days, use concrete activities (rating scales with faces, sorting picture cards into "like / not sure / don't like", drawing a good day and a hard day, photos of places in school, a walk around school), ask open and neutral questions rather than leading ones, check understanding back, and record the pupil's words exactly, separating what the pupil said from adults' interpretations.

Pupil: {{pupil}}
{{#notes}}
<session_notes>
{{notes}}
</session_notes>
{{/notes}}
</context>

<task>
1. Approach: who should gather the views (a trusted adult), when, how many short sessions, and how to explain the purpose to the pupil in words they understand.
2. Activities: three or four activities matched to the pupil's communication and interests, covering what is going well, what is hard, what helps, what they want to change, and hopes for the future. Describe the materials to prepare (symbols, photos, scales).
3. Questions and prompts: neutral, open questions for each topic in plain language, with simpler versions and visual options, and examples of leading questions to avoid.
4. Making it safe: the right to pass or stop, signs of distress to watch for, and what to do if the pupil discloses something worrying (follow the safeguarding procedure the same day; do not promise secrecy).
5. Recording: how to record exact words, choices and non-verbal responses, and mark adult interpretation separately.
6. The pupil's views: if session notes are provided, write a summary in the first person using the pupil's own words where possible, with interpretations clearly labelled; if no notes, give a template.
7. Open questions.
</task>

<constraints>
- Never put words in the pupil's mouth or present adult views as the pupil's. Quote exactly; label interpretation.
- Initials only.
- Do not diagnose or describe needs beyond what is given.
- If anything suggests harm or abuse, say it must go to the designated safeguarding lead the same day.
</constraints>

<output_format>
## Approach
## Activities
Table: Activity | Topic | Materials | Time.
## Questions and prompts
## Making it safe
## Recording
## The pupil's views
First-person summary, or a template.
## Open questions
</output_format>
