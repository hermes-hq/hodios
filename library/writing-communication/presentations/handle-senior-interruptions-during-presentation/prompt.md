---
schema: 1
id: handle-senior-interruptions-during-presentation
kind: prompt
title: Handle senior interruptions during a presentation
description: Prepares responses for when executives interrupt, jump to the end, challenge a number or derail a presentation, and how to recover the time and still land the ask.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [manager, product-manager, engineering-manager, consultant]
requires: [none]
inputs: [text, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [executive-audience, interruptions, bottom-line-up-front, time-recovery, composure]
pairs_with:
  prompts: [drill-presentation-qa, build-decision-request-deck, plan-backup-slides, prepare-for-tough-questions]
  personas: [presentation-designer]
args:
  - name: presentation
    description: What you are presenting, the ask, the slide titles and the time slot.
    type: text
    required: true
  - name: audience
    description: The executives in the room and what you know of their style, such as impatient, detail-focused or likely to go off topic.
    type: text
    required: true
  - name: worries
    description: The interruptions you fear most, such as being asked for the answer on slide one or a challenge to a specific number. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Restructure for interruption, Likely interruptions and responses, Recovering time, Landing the ask, Rehearsal drill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare people for executive meetings, where interruptions are normal rather than rude. Senior people interrupt to get to the decision faster ("what do you want from us?"), to test a number, to share context the presenter lacks, or because the topic connects to something else on their mind. Presenters who treat this as derailment and push back to slide three lose the room; presenters who follow every tangent lose the ask. What works: put the answer and the ask first so a jump to the end costs nothing; know the two or three numbers that will be challenged and their source; answer the question asked in one or two sentences, then offer the path ("the detail is on page 7, shall I go there or carry on?"); park true tangents visibly with an owner; and keep a five-minute version ready so the ask lands even when the slot shrinks. A challenged number you cannot defend on the spot gets a calm "I will confirm and come back today", never a guess.

Presentation: {{presentation}}
Audience: {{audience}}
{{#worries}}Worries: {{worries}}{{/worries}}
</context>

<task>
1. Suggest changes to the deck's structure so it survives interruption: the answer and ask up front, the evidence ordered by importance, backup slides for the likely deep dives.
2. List the likely interruptions for this audience and content (jump to the ask, challenge a number, "we tried this before", a tangent, a disagreement between two executives, a request for a different option) and write a short response for each, in natural spoken language.
3. Plan how to recover time: what to skip if half the slot goes, a two-minute and a five-minute version, and how to say it.
4. Plan how to land the ask even after a derailed discussion, including how to close if no decision is made.
5. Give a rehearsal drill: how a colleague can play the interrupting executive, and what to practise.
</task>

<constraints>
- Responses must be respectful and brief; no scripts that lecture or deflect senior people.
- Do not invent answers to content questions; where a fact is needed, mark it "[your figure]" or plan a follow-up.
- Keep the ask unchanged unless the discussion shows it should change; say how to recognise that.
</constraints>

<output_format>
## Restructure for interruption
Bullets.

## Likely interruptions and responses
A table: interruption, what is behind it, response.

## Recovering time
The cut plan and the short versions.

## Landing the ask
Bullets and closing lines.

## Rehearsal drill
Steps.
</output_format>
