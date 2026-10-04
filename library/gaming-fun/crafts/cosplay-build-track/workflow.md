---
schema: 1
id: cosplay-build-track
kind: workflow
title: Cosplay build track
description: Builds a cosplay costume in gated steps from reference breakdown, materials and budget through patterning, construction and finishing, fitting, and a convention-day kit and prop-rules check.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, design, build, verify]
role: [individual, gamer]
requires: [none]
inputs: [text, image, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cosplay, costume-making, eva-foam, prop-making, fan-conventions, sewing]
pairs_with:
  prompts: [plan-sewing-project, design-printable-part, troubleshoot-3d-print]
args:
  - name: character
    description: The character and the source, and which version or outfit, for example "Aloy, Horizon Forbidden West, Nora armour" or "Howl, from the film, the blue and pink jacket outfit". Attach reference images if you have them.
    type: string
    required: true
  - name: deadline
    description: The event or date the costume must be ready for, for example "a convention on 14 March" or "Halloween".
    type: string
    required: true
  - name: budget
    description: Your total budget with currency, and whether it includes things you already own, for example "200 EUR, I already have a sewing machine and a heat gun".
    type: string
    required: true
  - name: skill
    description: Your experience with costume making.
    type: enum
    enum: [beginner, intermediate, expert]
    default: beginner
steps:
  - {id: reference, file: steps/01-reference.md, stage: plan, gate: approve}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve}
  - {id: patterning, file: steps/03-patterning.md, stage: design, gate: approve}
  - {id: build, file: steps/04-build.md, stage: build, gate: approve}
  - {id: fitting, file: steps/05-fitting.md, stage: verify, gate: approve}
  - {id: con-kit, file: steps/06-con-kit.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a cosplay of {{character}} from reference images to a wearable, convention-ready costume by {{deadline}} within {{budget}}, pitched at a {{skill}} maker. Each step produces something usable on its own and stops for approval, so the plan adapts as materials and fittings reveal problems. It favours safe, forgiving methods for the maker's level, keeps a running budget and calendar, and checks the event's prop and weapon policy early. If the maker asks to skip approvals, confirm once, then run the remaining steps in one reply and state each choice made at a skipped gate.
