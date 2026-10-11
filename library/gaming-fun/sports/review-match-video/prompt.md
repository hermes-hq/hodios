---
schema: 1
id: review-match-video
kind: prompt
title: Review your own match video
description: Sets up a focused review of amateur match footage for a player or coach - one question, what to tag and count, clips to cut, and how to turn what you see into one practice focus.
category: sports
version: 1.0.0
status: incubating
stage: [review, learn]
role: [individual]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [video-analysis, match-review, performance-analysis, tagging, self-review, amateur-coach]
pairs_with:
  prompts: [run-match-debrief, break-down-sports-technique]
args:
  - name: sport
    description: Sport, level and your role, for example "amateur tennis singles, I'm the player", "U16 hockey, I'm the coach".
    type: string
    required: true
  - name: footage
    description: What footage you have - full match or highlights, camera angle (behind, sideline, high or low), quality and length.
    type: text
    required: true
  - name: question
    description: What you want to learn, for example "why I lose so many points on my second serve" or "how our press breaks down". If you are not sure, say what felt wrong.
    type: text
    required: true
  - name: notes
    description: Any observations you already have from the match or from watching some of it. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Focus, What to tag, Review method, What the angle can and cannot show, Turning it into practice, Notes so far]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help amateur players and coaches get value from match video, which is now easy to record and usually wasted. Watching a full match from start to finish mostly confirms what people already believe. Analysts instead start from one question, tag every instance of the relevant event (each second serve, each time the press is broken) with a few simple codes, count outcomes, and cut short clips of good and bad examples to compare. The camera angle limits what can be judged: a sideline view hides depth, a behind-the-baseline view hides height. The output should be one practice focus, not a list of twenty faults.

Sport: {{sport}}

Footage: {{footage}}

Question: {{question}}
{{#notes}}

Notes so far:
{{notes}}
{{/notes}}
</context>

<task>
1. Sharpen the question into one focus that the footage can answer, and say why it is the right one to start with.
2. Define what to tag: the event, three to five simple codes for what happened before it and the outcome, and a timestamp. Give a ready-to-use tally table.
3. Describe the review method: watch at normal speed once to tag, then slow motion only on tagged clips, cutting three good and three bad examples to compare side by side, with an estimate of the time it takes.
4. Say what this camera angle and quality can and cannot show for this question, and how to film next time to answer it better.
5. Explain how to turn the tallies and clips into one practice focus with a measurable target for the next match.
6. If notes are provided, give an early read of what they suggest and what the tagging would need to confirm.
</task>

<constraints>
- Do not claim to have watched the video; work only from the description and notes.
- Keep the method realistic for an amateur with a phone or laptop and free tools; do not require paid analysis software.
- One focus at a time; park other observations in a short list for later.
- If footage includes other people's children, remind the user to follow club rules on filming and sharing.
</constraints>

<output_format>
## Focus
## What to tag
Codes, then a tally table.
## Review method
## What the angle can and cannot show
## Turning it into practice
## Notes so far
Omit if no notes were given.
</output_format>
