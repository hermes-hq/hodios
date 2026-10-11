---
schema: 1
id: plan-guided-rewatch
kind: prompt
title: Plan a guided rewatch or reread
description: Guides a rewatch or reread of something you have finished, episode by episode or part by part, pointing out the foreshadowing, clues and craft you could not see the first time.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [review, learn]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rewatch, reread, foreshadowing, close-reading, craft]
pairs_with:
  prompts: [explain-film-ending, test-fan-theory, discuss-book-as-reading-buddy]
  personas: [film-and-book-critic]
args:
  - name: work
    description: The film, series or book you have finished and want to revisit, for example "Better Call Saul" or "Atonement (novel)".
    type: string
    required: true
  - name: finished
    description: Confirm how far you have got, for example "watched all six seasons", so the guide knows what it may discuss.
    type: string
    required: true
  - name: focus
    description: What to look for, for example "foreshadowing", "a character's arc", "visual motifs", "how the twist is hidden", or "everything".
    type: text
    default: everything
  - name: watching_with
    description: Optional. Someone watching for the first time alongside you, which changes what can be said out loud.
    type: string
output_contract:
  format: markdown
  sections: [How to rewatch, Part by part, Things to track]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A second viewing or reading is a different experience: knowing the ending, you can watch how it was built. Good guides point to setups and payoffs, lines that change meaning, motifs in colour, framing or music, misdirection in how information is withheld, and performances that play two things at once. Not every work rewards this; some are built for surprise and add little the second time, and that is worth saying. If someone is experiencing it for the first time alongside the rewatcher, notes must split into what can be shared openly and what must stay private.

Work: {{work}}
Finished: {{finished}}
Focus: {{focus}}
{{#watching_with}}Watching with: {{watching_with}}{{/watching_with}}
</context>

<task>
1. Confirm they have finished the work. If they have not, say this guide contains full spoilers and suggest the spoiler-free recap instead, then stop.
2. If you do not know the work in enough detail to point to specific moments, say so and offer a general method for finding setups and payoffs instead.
3. How to rewatch: a pace (for example two episodes per sitting) and a simple note-taking habit for their focus.
4. Part by part: for the first unit (first episode, first act, first chapters), list three to six specific things to notice, each tied to what it sets up later. Then stop and ask them to say when they are ready for the next part. Continue part by part on request.
5. Things to track across the whole work: two to four motifs or threads, so they can spot them on their own.
6. If someone is watching with them for the first time, split every note into "can say out loud" (craft, performance) and "keep to yourself" (anything that hints at later events).
</task>

<constraints>
- Full spoilers are expected for the finished work only; never spoil sequels, later seasons or books they have not confirmed.
- Point to real moments; never invent scenes, lines or episode numbers. Mark uncertain placements "(check)".
- Do not quote long passages or dialogue.
- Distinguish confirmed intent (creators said so) from your reading.
</constraints>

<output_format>
## How to rewatch
Pace and note-taking habit.
## Part by part
The current part's notes as a numbered list, each "Notice → what it sets up". End by asking whether to continue.
## Things to track
Bullets, given with the first part only.
</output_format>
