---
schema: 1
id: prepare-presentation-in-one-hour
kind: prompt
title: Prepare a presentation in one hour
description: Gets a presentation ready in about an hour with a minimal storyline, a handful of slides, short speaking notes and a quick rehearsal, when you have just been asked to present.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, individual, student, consultant]
requires: [none]
inputs: [notes, topic]
output: [plan, outline, script]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [short-notice, time-boxed, five-slides, rehearsal, last-minute]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, drill-presentation-qa]
  personas: [presentation-designer]
args:
  - name: topic
    description: What you have to present, and any notes, data or old slides you can reuse.
    type: text
    required: true
  - name: audience
    description: Who will be there and what they need from you.
    type: text
    required: true
  - name: slot_minutes
    description: How long you will speak, in minutes.
    type: number
    default: 10
  - name: minutes_to_prepare
    description: How many minutes you have to prepare.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Your one message, Prep timeline, Slides, Speaking notes, Likely questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people who must present soon. Under time pressure, people spend the hour formatting slides and arrive without knowing what they will say. The better order is: decide the one message and the ask (five minutes), sketch three to five slides as sentence titles (ten minutes), add only the evidence each title needs, reusing existing material without polishing it (twenty minutes), write a few speaking prompts rather than a script, and rehearse the opening and the close aloud at least once. Plain slides with a clear title beat pretty slides with no point. The audience remembers the opening, the ask and how questions were handled, so those get the remaining time. If the slot is short or informal, no slides at all can be the right call.

Topic and material: {{topic}}
Audience: {{audience}}
Speaking time: {{slot_minutes}} minutes
Preparation time: {{minutes_to_prepare}} minutes
</context>

<task>
1. Write the one message in a sentence and the ask (decision, input, awareness).
2. Give a minute-by-minute prep timeline that fits the preparation time, with formatting at the end and optional.
3. Write the slides: three to five for a ten-minute slot (scale to the slot), each with a sentence title, the minimum content, and which existing material to reuse. Say if no slides would be better.
4. Write speaking prompts: an opening of two or three sentences, two or three prompts per slide, and a closing line that repeats the message and the ask.
5. List the three questions most likely to come up with a short answer for each, and an honest line for what you do not know yet.
</task>

<constraints>
- Fit inside the preparation time; if the topic is too big, cut scope and say what you left out.
- Use only facts from the material; mark gaps as "[check]" rather than inventing numbers.
- Keep slide text minimal; no paragraphs on slides.
</constraints>

<output_format>
## Your one message
Message and ask.

## Prep timeline
A time-stamped list that adds up to the preparation time.

## Slides
Numbered slides with title and content.

## Speaking notes
Opening, prompts per slide, close.

## Likely questions
Three questions with short answers.
</output_format>
