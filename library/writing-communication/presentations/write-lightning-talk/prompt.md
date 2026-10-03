---
schema: 1
id: write-lightning-talk
kind: prompt
title: Write a lightning talk
description: Writes a five-minute lightning talk or a timed PechaKucha or Ignite script around one idea, with slide-by-slide words, visuals and a closing line, for meetups and internal demos.
category: presentations
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, developer-advocate, individual, student]
requires: [none]
inputs: [topic, notes]
output: [script, outline]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lightning-talk, pechakucha, ignite, meetup-talk, timed-slides]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, plan-slide-visuals]
  personas: [speaking-coach]
args:
  - name: topic_and_point
    description: What the talk is about, the one point you want people to leave with if you know it, and your material (story, example, data, demo) plus who the audience is.
    type: text
    required: true
  - name: format
    description: lightning-5min is free-paced, 5 minutes; pechakucha-20x20 is 20 slides auto-advancing every 20 seconds; ignite-20x15 is 20 slides auto-advancing every 15 seconds.
    type: enum
    enum: [lightning-5min, pechakucha-20x20, ignite-20x15]
    default: lightning-5min
output_contract:
  format: markdown
  sections: [The one idea, Shape, Script, Closing line, Rehearsal notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Short formats punish the habits of long talks. There is no time for an agenda, a bio slide or three points; a lightning talk has room for one idea, one story or example that makes it concrete, and one line people remember. Auto-advancing formats add a second constraint: each slide gets the same fixed time, so every slide's words must fit it, and the slides should be images that the words explain, not text to read. Speakers run over most often by squeezing in "one more thing" and by unrehearsed transitions.
</context>

<task>
Write a talk in the {{format}} format.

<topic_and_point>
{{topic_and_point}}
</topic_and_point>

Timing by format, at about 130 spoken words a minute:
- lightning-5min: 5:00 total, about 600 to 650 words, 6 to 12 slides at the speaker's pace.
- pechakucha-20x20: 20 slides × 20 seconds = 6:40, about 40 to 45 words per slide.
- ignite-20x15: 20 slides × 15 seconds = 5:00, about 30 to 33 words per slide.

1. If there is no material to build from (no story, example, data or experience), ask for one and stop.
2. State the one idea in a single sentence. If the material holds several ideas, choose the strongest for this audience and list what you cut.
3. Choose a shape: problem → turn → payoff, before → after, a single story with a lesson, or a myth and its correction. Say which and why.
4. Write the script slide by slide: the visual for each slide (an image, a single number, a short phrase or a demo frame) and the exact words to say, within that format's word budget.
5. Write a closing line that restates the idea in a memorable form, and the last slide.
6. Add rehearsal notes: where timing is tight, which slides are buffers, and what to do if a slide advances before you finish.
</task>

<constraints>
- One idea. No agenda slide, no "about me" slide longer than one sentence of spoken words, no "any questions?" slide in auto-advancing formats.
- Spoken language: short sentences, concrete nouns, and transitions that hand off to the next slide ("Which is exactly what broke on Tuesday.").
- In PechaKucha and Ignite, every slide's word count must fall within its budget; show the count.
- Slides carry at most a few words; the speaker carries the meaning.
- Use only facts, numbers and stories from the material. Mark anything the talk needs but lacks as `[NEEDED: …]`.
- A live demo inside five minutes needs a recorded fallback; say so if a demo is planned.
</constraints>

<output_format>
## The one idea
One sentence, then "Cut:" with anything left out.
## Shape
One or two lines.
## Script
A table: Slide | Visual | Words (with word count in brackets).
## Closing line
The last sentence, word for word.
## Rehearsal notes
Three to five bullets, including total word count against the time budget.
</output_format>
