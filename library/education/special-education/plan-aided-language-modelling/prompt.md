---
schema: 1
id: plan-aided-language-modelling
kind: prompt
title: Plan aided language modelling for an AAC user
description: Plans how adults model language on a pupil's AAC system across the school day, with target core words, routines to model in, prompting without pressure and simple data for the therapist.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [aac, core-vocabulary, communication-support, modelling, non-speaking]
pairs_with:
  prompts: [create-visual-timetable, plan-one-to-one-support-session]
  personas: [special-education-advisor]
args:
  - name: learner
    description: About the learner (initials only) - age, the AAC system they use (low-tech board, book, or speech-generating device app), how they communicate now, interests, and what the speech and language therapist has recommended.
    type: text
    required: true
  - name: day
    description: The learner's typical day or the routines where modelling could happen (arrival, snack, play, circle time, lessons, home time). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Target words, Modelling across the day, How to model, Prompting without pressure, Environment and access, What to record, Questions for the therapist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers, assistants and parents support a learner who uses augmentative and alternative communication (AAC). The most important practice is aided language modelling: adults point to symbols on the learner's own system while they speak, all day, without expecting a response, the same way children who speak are surrounded by spoken language for years before they talk. Common mistakes: the device stays in a bag or is only out for "AAC time", adults only model nouns ("biscuit") rather than flexible core words (more, stop, go, like, not, help, you, look), adults test the learner ("show me red") instead of communicating, or they demand a response before giving an item. Modelling one step beyond the learner's current level, accepting any attempt, and keeping the system always within reach are what experts do.

Learner: {{learner}}
{{#day}}Day: {{day}}{{/day}}
</context>

<task>
1. Starting point: summarise how the learner communicates now (gestures, sounds, symbols, words on the device) from the information given, and what the next step up looks like (for example from single words to two-word combinations).
2. Target words: eight to twelve core words to focus on for the next half term, chosen for how often they can be used across routines, plus a few fringe words tied to the learner's interests. Check they exist on the learner's system or note to ask the therapist.
3. Modelling across the day: a table of routines with two or three natural modelling opportunities each, using the target words (for example "more" and "finished" at snack, "go" and "stop" in play, "look" and "like" in a story).
4. How to model: practical guidance for adults - say and point, keep it short, model one step above the learner, pause and wait, model without expecting a response, narrate what the learner is doing, model different word functions (requesting, commenting, protesting, asking).
5. Prompting without pressure: what to do instead of demanding a response, how to respond to every attempt as meaningful, and how to avoid hand-over-hand prompting unless the therapist has advised it.
6. Environment and access: the device or board always within reach and charged, a backup low-tech board for water play, outdoors and when the device is unavailable, positioning for the learner's access method.
7. What to record: a simple tally of modelling and of the learner's spontaneous use, for one week a month.
8. Questions for the speech and language therapist.
</task>

<constraints>
- Work with the learner's existing system and the therapist's advice; do not recommend changing system, layout or access method, and do not assess the learner's language level beyond what is described.
- Never suggest withholding food, drink, comfort or breaks until the learner uses the device.
- Respect all forms of communication: speech attempts, signs, gestures and behaviour are communication too.
- Initials only.
</constraints>

<output_format>
## Starting point
## Target words
Table: Word | Why | Example use.
## Modelling across the day
Table: Routine | Modelling opportunity | Target words.
## How to model
## Prompting without pressure
## Environment and access
Checklist.
## What to record
## Questions for the therapist
</output_format>
