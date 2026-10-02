---
schema: 1
id: presentation-track
kind: workflow
title: Presentation track
description: Takes a presentation from audience and goal to storyline, slide content, speaker notes and a rehearsal with likely questions, pausing for approval between steps.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design, build, verify]
role: [manager, individual, founder, student]
requires: [none]
inputs: [topic, notes, document]
output: [plan, outline, script, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [storyline, slide-content, speaker-notes, rehearsal, q-and-a]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, critique-slide-deck, prepare-for-tough-questions, turn-document-into-slides]
  personas: [speaking-coach]
args:
  - name: topic
    description: What the presentation is about, plus any material you already have (notes, data, a draft, the document it is based on).
    type: text
    required: true
  - name: audience
    description: Who will be in the room or on the call, what they know already, what they care about, and who decides anything.
    type: text
    required: true
  - name: duration_minutes
    description: Your speaking slot in minutes, excluding Q&A unless you say otherwise.
    type: number
    required: true
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve}
  - {id: storyline, file: steps/02-storyline.md, stage: design, gate: approve}
  - {id: slides, file: steps/03-slides.md, stage: build, gate: approve}
  - {id: notes, file: steps/04-notes.md, stage: build, gate: approve}
  - {id: rehearsal, file: steps/05-rehearsal.md, stage: verify, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares a presentation one approved step at a time, as an experienced presentation coach would: brief, storyline, slide content, speaker notes, then a rehearsal with the questions the audience is likely to ask.

<topic>
{{topic}}
</topic>

<audience>
{{audience}}
</audience>

Speaking time: {{duration_minutes}} minutes.

Each step produces one artifact and stops for approval or edits. Later steps build on the approved versions and do not reopen them unless the presenter asks. Use only facts, figures and stories the presenter supplied; mark anything missing as `[NEEDED: …]` instead of inventing data, quotes, results or customer names. Plan for about 130 spoken words a minute and, as a starting point, one slide per one to two minutes. If the presenter asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.
