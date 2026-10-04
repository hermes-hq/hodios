---
schema: 1
id: audio-documentary-track
kind: workflow
title: Audio documentary track
description: Takes a short audio documentary from question to release in gated steps covering story, reporting plan, tape logs and selects, script, an accuracy and ethics edit review, and release notes.
category: podcasting
version: 1.0.0
status: incubating
stage: [discover, plan, build, review, ship]
role: [content-creator, writer, student]
requires: [none]
inputs: [topic, notes, transcript]
output: [plan, script, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [documentary, narrative-audio, tape-log, script-for-the-ear, editorial-ethics, community-radio]
pairs_with:
  prompts: [outline-narrative-podcast, build-episode-research-brief, fact-check-episode-claims, handle-sensitive-story-episode, write-show-notes]
  personas: [audio-story-editor]
args:
  - name: idea
    description: The story idea, why it interests you, who you can reach, any tape or sources you already have, where it will be published, and the country.
    type: text
    required: true
  - name: length_minutes
    description: Target length of the finished piece in minutes.
    type: number
    default: 20
steps:
  - {id: story, file: steps/01-story.md, stage: discover, gate: approve, artifact: "documentary/01-story.md"}
  - {id: reporting, file: steps/02-reporting-plan.md, stage: plan, gate: approve, artifact: "documentary/02-reporting-plan.md"}
  - {id: selects, file: steps/03-logs-and-selects.md, stage: build, gate: approve, artifact: "documentary/03-selects.md"}
  - {id: script, file: steps/04-script.md, stage: build, gate: approve, artifact: "documentary/04-script.md"}
  - {id: edit-review, file: steps/05-edit-review.md, stage: review, gate: approve, artifact: "documentary/05-edit-review.md"}
  - {id: release, file: steps/06-release.md, stage: ship, gate: none, artifact: "documentary/06-release.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one short audio documentary from an idea to release the way a narrative audio editor would: find the question, plan the reporting, log the real tape, script for the ear, review for accuracy and ethics, then publish. Each step writes one artifact and stops for approval; later steps build on approved versions. Steps 3 onward need real tape or transcripts from the producer.

<idea>
{{idea}}
</idea>

Target length: about {{length_minutes}} minutes.

Rules for every step:
- Use only what the producer supplied or confirmed. Ask for missing essentials and mark gaps as [X].
- Never invent quotes, scenes, sounds, facts or sources. Quotes are verbatim from logs or transcripts; trims never change meaning.
- Get consent that matches use; take extra care with minors, people in crisis and anyone who could be harmed by being identified.
- Flag legal risk (accusations, privacy, protected identities, court cases) for a media lawyer in the country of publication.
{{> guardrails/professional-limits}}
- If a contributor or the producer says they are in danger or crisis, pause the work and point them to local emergency services or a crisis line in their country.
- End each artifact with open questions.
