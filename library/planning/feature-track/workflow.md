---
schema: 1
id: feature-track
kind: workflow
title: Feature track
description: Takes a feature from open questions to a reviewed implementation in six gated steps, saving each step's artifact to the repo. Use for any change bigger than a quick fix.
category: planning
version: 1.0.0
status: incubating
stage: [discover, design, plan, build]
requires: [repo-read, file-write]
inputs: [spec, ticket, text]
output: [questions, plan, code]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
tags: [spec-driven, requirements]
args:
  - name: feature
    description: Short kebab-case feature name; used for the artifact folder.
    type: string
    required: true
steps:
  - {id: questions, file: steps/01-questions.md, stage: discover, gate: approve, artifact: ".hermes/features/{{feature}}/questions.md"}
  - {id: research, file: steps/02-research.md, stage: discover, gate: approve, artifact: ".hermes/features/{{feature}}/research.md"}
  - {id: design, file: steps/03-design.md, stage: design, gate: approve, artifact: ".hermes/features/{{feature}}/design.md"}
  - {id: structure, file: steps/04-structure.md, stage: design, gate: approve, artifact: ".hermes/features/{{feature}}/structure.md"}
  - {id: plan, file: steps/05-plan.md, stage: plan, gate: approve, artifact: ".hermes/features/{{feature}}/plan.md"}
  - {id: implement, file: steps/06-implement.md, stage: build, gate: none}
authorship: human
---
Builds the feature "{{feature}}" in small, reviewable steps. Each step writes one artifact and stops for approval before the next one starts, so the human stays in control of scope and design while the agent does the legwork. Later steps read the earlier artifacts instead of re-asking.
