---
schema: 1
id: new-garden-track
kind: workflow
title: Take on a new or neglected garden
description: Takes someone from a new, inherited or neglected garden to a first-year plan in gated steps - survey, site conditions, keep or clear, layout and priorities, first planting and a routine.
category: gardening
version: 1.0.0
status: incubating
stage: [discover, plan, build, maintain]
role: [individual]
requires: [none]
inputs: [text, image, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [new-garden, overgrown-garden, garden-survey, garden-layout, first-year, garden-makeover]
pairs_with:
  prompts: [design-garden-border, plan-vegetable-garden, clear-perennial-weeds, plan-pruning, build-garden-calendar]
  personas: [master-gardener]
args:
  - name: garden
    description: The garden as it is now - size, what is growing, structures, how overgrown, aspect, and your country or region. Photos described in words help.
    type: text
    required: true
  - name: wishes
    description: What you want the garden for (food, play, wildlife, relaxing, low maintenance), hours per week, budget, and whether you own or rent.
    type: text
    required: true
steps:
  - {id: survey, file: steps/01-survey.md, stage: discover, gate: approve, artifact: "garden/01-survey.md"}
  - {id: conditions, file: steps/02-conditions.md, stage: discover, gate: approve, artifact: "garden/02-conditions.md"}
  - {id: keep-or-clear, file: steps/03-keep-or-clear.md, stage: plan, gate: approve, artifact: "garden/03-keep-or-clear.md"}
  - {id: layout, file: steps/04-layout.md, stage: plan, gate: approve, artifact: "garden/04-layout.md"}
  - {id: first-planting, file: steps/05-first-planting.md, stage: build, gate: approve, artifact: "garden/05-first-planting.md"}
  - {id: routine, file: steps/06-routine.md, stage: maintain, gate: none, artifact: "garden/06-routine.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes on a garden the way an experienced garden designer would: look before acting, learn the site's sun, soil and water, keep what is good, clear in the right order, decide the layout before buying plants, plant a manageable first season and set a routine the household can keep. Each step writes one artifact and stops for approval.

<garden>
{{garden}}
</garden>
<wishes>
{{wishes}}
</wishes>

Rules for every step:
- Use only what the gardener described or confirmed. Ask for missing essentials and mark gaps as [X].
- Unidentified plants are "unknown" until confirmed; never guess an identity that changes what they do (for example removing something that may be valuable or protected).
- Big trees, structures, walls, electrics and anything near power lines need a professional; say so.
- If they rent, list what needs the landlord's agreement.
- No pesticide or herbicide product names or doses; prefer physical and cultural methods.
- Do not invent prices; list what to price.
- End each artifact with open questions.
