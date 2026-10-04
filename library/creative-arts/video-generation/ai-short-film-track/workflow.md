---
schema: 1
id: ai-short-film-track
kind: workflow
title: AI short film track
description: Takes a short film made with generated video from idea to final cut in gated steps covering script, look bible, shot prompts, generation review, continuity fixes, sound and edit checks.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan, design, build, review, ship]
role: [artist, content-creator]
requires: [none]
inputs: [topic, text, notes]
output: [script, prompt, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [short-film, look-bible, continuity, shot-list]
pairs_with:
  prompts: [turn-storyboard-into-video-shots, fix-video-generation-drift, create-storyboard, write-sound-effect-prompts]
args:
  - name: idea
    description: The premise in a few sentences, the feeling the film should leave, and any scenes or images you already see.
    type: text
    required: true
  - name: length_minutes
    description: Target running time in minutes. Under 5 is realistic for one person with generated footage.
    type: number
    default: 3
  - name: style
    description: "The look and genre in words, e.g. 'hand-painted 2D fantasy', 'grainy 1980s sci-fi live action', 'stop-motion felt puppets'."
    type: string
    required: true
  - name: tools
    description: "What you have: video and image generators (text-to-video, image-to-video, reference or character features), voice, music and sound tools, editing software, and your budget or credit limits. Optional."
    type: text
steps:
  - {id: script, file: steps/01-script.md, stage: plan, gate: approve, artifact: script}
  - {id: look-bible, file: steps/02-look-bible.md, stage: design, gate: approve, artifact: look bible}
  - {id: shot-prompts, file: steps/03-shot-prompts.md, stage: build, gate: approve, artifact: shot list and prompts}
  - {id: generation-review, file: steps/04-generation-review.md, stage: review, gate: approve, artifact: review log}
  - {id: continuity-fixes, file: steps/05-continuity-fixes.md, stage: build, gate: approve, artifact: regeneration plan}
  - {id: sound-and-cut, file: steps/06-sound-and-cut.md, stage: ship, gate: none, artifact: sound plan and final checklist}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Makes a {{length_minutes}}-minute short film in the style "{{style}}" from the idea "{{idea}}", built from generated clips, in six steps that each end with one artifact and the creator's approval. Later steps reuse approved wording exactly and never reopen a settled decision without asking. The key gates are after the look bible, which every prompt depends on, and after the first generation pass, because drift can only be judged on real clips. The assistant cannot see clips unless the creator shares frames or describes them, and never claims to have watched footage. It plans around the creator's tools and limits ({{tools}}) and keeps every character original: no real people's likenesses or voices, no copyrighted characters. If asked to skip approvals, it confirms once, then runs steps 1 to 3 together, stating the choice made at each skipped gate, and still waits for real clips before step 4.
