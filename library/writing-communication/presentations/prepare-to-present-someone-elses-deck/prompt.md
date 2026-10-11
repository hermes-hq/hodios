---
schema: 1
id: prepare-to-present-someone-elses-deck
kind: prompt
title: Prepare to present someone else's deck
description: Prepares you to present a deck you did not build, often at short notice, with what to learn first, what to cut or reword, questions for the author and how to own the material honestly.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [manager, consultant, sales-rep, individual]
requires: [none]
inputs: [text, document]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [stand-in-presenter, deck-handover, short-notice, speaker-notes, rehearsal]
pairs_with:
  prompts: [write-speaker-notes, drill-presentation-qa, shorten-presentation-for-time, summarize-slide-deck]
  personas: [presentation-designer]
args:
  - name: deck
    description: The deck's slide titles, text and any speaker notes.
    type: text
    required: true
  - name: situation
    description: Why you are presenting it, who the audience is, how long you have, when it is, and whether you can reach the author.
    type: text
    required: true
  - name: your_background
    description: How well you know the subject. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The deck in one minute, Learn first, Questions for the author, Cut or reword, Your opening and handovers, Prep plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare stand-in presenters. Presenting a colleague's deck goes wrong when the stand-in reads slides they do not understand, defends numbers they cannot explain, or pretends the work is theirs and gets caught on detail. Experienced stand-ins first extract the deck's one message and ask, then learn the few slides the audience will probe (numbers, recommendations, anything controversial), cut or move slides they cannot present credibly, and say plainly whose work it is ("Priya's team did this analysis; I'll take you through it and get you answers on anything I can't cover"). That framing protects credibility and makes "I'll come back to you" an acceptable answer. Talking to the author for even fifteen minutes is the highest-value step: where the numbers came from, what was contentious, what the audience already knows.

<deck>
{{deck}}
</deck>
Situation: {{situation}}
{{#your_background}}Your background: {{your_background}}{{/your_background}}
</context>

<task>
1. Summarise the deck's message, the ask and the structure in a few lines.
2. Pick the slides to learn first: those with numbers, recommendations or likely challenge. For each, say what you must be able to explain in your own words.
3. Write the questions to ask the author, ranked, for a 15-minute call or a message if they are unreachable.
4. Identify slides to cut, move to backup or reword because they depend on the author's personal knowledge or are too detailed for the time.
5. Write an honest opening that credits the author and sets expectations, and a line for questions you cannot answer.
6. Write a short line for each slide transition, in plain speech, so you are not reading bullets.
7. Give a prep plan fitted to the time available, with a rehearsal of the first two minutes and the hardest slide.
</task>

<constraints>
- Do not invent explanations for numbers or claims the deck does not explain; list them as questions for the author.
- Do not suggest presenting the work as your own.
- Keep the deck's facts and conclusions; changes are cuts, order and wording, not substance.
</constraints>

<output_format>
## The deck in one minute
Message, ask, structure.

## Learn first
Slides and what to be able to explain.

## Questions for the author
Ranked list.

## Cut or reword
Bullets with reasons.

## Your opening and handovers
Opening lines, a line for unknown answers, and transition lines per slide.

## Prep plan
A time-boxed plan.
</output_format>
