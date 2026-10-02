---
schema: 1
id: write-speaker-notes
kind: prompt
title: Write speaker notes
description: Writes natural, speakable notes for each slide with a time budget, the one point to stress and a transition to the next slide, and checks the total fits the time slot.
category: presentations
version: 1.0.0
status: experimental
stage: [build]
role: [manager, consultant, teacher, researcher]
requires: [none]
inputs: [text, document]
output: [script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [speaker-notes, timing, transitions]
pairs_with:
  prompts: [outline-presentation, critique-slide-deck]
  personas: [speaking-coach]
args:
  - name: slides
    description: "The slide content in order, as text: titles, bullets, chart descriptions, and any notes you already have. Number the slides if you can."
    type: text
    required: true
  - name: minutes
    description: Total speaking time in minutes, excluding Q&A.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Speaker notes, Timing check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Speaker notes are for glancing at under pressure, not for reading aloud. The worst notes repeat the slide text, so the speaker reads the slide to an audience that has already read it. Good notes add what the slide does not say (the meaning of the chart, the example, the "so what"), use short spoken sentences, mark the one thing that must land, and carry a transition so the talk flows instead of restarting at every slide. Most people speak at about 130 to 150 words a minute in a presentation, slower with pauses.
</context>

<task>
Write speaker notes for these slides, for a {{minutes}}-minute talk:
<slides>
{{slides}}
</slides>

1. If the slides are empty or are only a topic, ask for the slide content and stop.
2. Budget the time: give each slide minutes in proportion to its weight (the key evidence slide gets more than the title slide), keep about 10% buffer, and track a running total.
3. For each slide write:
   - **Stress:** the one point the audience must take away, in one sentence.
   - **Notes:** what to say, in short spoken sentences and contractions, adding meaning beyond the slide text. Explain charts by their point ("Look at the right edge: that's the week we changed the price"). Mark [pause] where a point needs to land and [click] for builds or animations if the slide text implies them.
   - **Transition:** one sentence that links to the next slide's point.
4. Size each slide's notes to its time at about 130 words a minute. Notes for a slide with one minute should be under about 130 words.
5. Write the first and last slides more fully: the opening lines and the closing lines are worth having word for word.
</task>

<constraints>
- Use only content from the slides. Where a slide needs an example, story or number to make its point and none is given, write `[example needed: …]` instead of inventing one.
- Do not repeat the slide's bullets verbatim in the notes.
- Natural speech: no long subordinate clauses, no reading out of URLs or long numbers in full (round only if the slide already rounds).
- If the slides cannot fit the time (for example 30 dense slides in 10 minutes), say so in Timing check and suggest which slides to cut or merge.
</constraints>

<output_format>
## Speaker notes
For each slide: "### Slide N: <title> (m:ss, total m:ss)", then Stress, Notes and Transition.
## Timing check
Total words, estimated time at 130 words a minute, buffer left, and any slides to cut or merge.
## Gaps
Bullets: `[example needed]` items. "None" if none.
</output_format>
