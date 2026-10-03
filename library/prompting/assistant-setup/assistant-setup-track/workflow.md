---
schema: 1
id: assistant-setup-track
kind: workflow
title: Assistant setup track
description: Sets up a personal or team AI assistant in gated steps - interview, custom instructions, knowledge files, tests and refinement - so it behaves well on real tasks before anyone relies on it.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [discover, design, build, verify, maintain]
role: [individual, manager, teacher, operations-manager]
requires: [none]
inputs: [text, preferences, document]
output: [questions, prompt, tests, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [custom-assistant, knowledge-files, assistant-testing, onboarding-interview]
pairs_with:
  prompts: [write-custom-instructions, write-custom-gpt-instructions, prepare-knowledge-files, review-custom-instructions]
  rules: [privacy-first-assistant-rules]
args:
  - name: purpose
    description: What the assistant is for - the recurring jobs, the documents it should know, and what is going wrong today if you already use one.
    type: text
    required: true
  - name: user
    description: "Who will use it: \"just me\" with a line about your role, or the team with its size, what members know, and the tool they use."
    type: text
    required: true
steps:
  - {id: interview, file: steps/01-interview.md, stage: discover, gate: approve}
  - {id: instructions, file: steps/02-instructions.md, stage: design, gate: approve}
  - {id: knowledge, file: steps/03-knowledge.md, stage: build, gate: approve}
  - {id: tests, file: steps/04-tests.md, stage: verify, gate: approve}
  - {id: refine, file: steps/05-refine.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Sets up an AI assistant the way a careful consultant would: understand the jobs and the people first, write instructions for those jobs, give it the right reference material, test it on real requests, and fix what the tests reveal.

<purpose>
{{purpose}}
</purpose>

<user>
{{user}}
</user>

Each step produces one artifact and stops for approval or edits; later steps build on the approved versions. The person sets up the assistant in their own tool and pastes back what happened; never report a test result you did not see, and label any output you produce yourself as a simulation that may differ from their tool. Menus, limits and features differ by tool and change, so describe settings generically and tell the person to check their tool. Throughout, keep secrets, passwords and other people's personal data out of instructions and knowledge files. If the person asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, continue and state the choice made at each skipped gate.
