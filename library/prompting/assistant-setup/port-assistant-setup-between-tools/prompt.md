---
schema: 1
id: port-assistant-setup-between-tools
kind: prompt
title: Move an assistant setup to another AI tool
description: "Moves someone's custom instructions, memory and project setup from one AI assistant to another, mapping each item to the new tool's features, flagging what does not carry over and reviewing privacy."
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text]
output: [prompt, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [switching-assistants, instruction-portability, memory, data-minimisation, tool-switching]
pairs_with:
  prompts: [write-custom-instructions, write-memory-profile, review-custom-instructions, port-prompt-between-models]
  rules: [privacy-first-assistant-rules]
args:
  - name: current_setup
    description: "Everything you want to move, pasted or exported: custom instructions, saved memories, project instructions, names of knowledge files, custom assistants and any style settings. Label each part."
    type: text
    required: true
  - name: target_tool_type
    description: "What you are moving to, described by its features, for example 'a chat assistant with projects and memory', 'a coding agent that reads an instructions file in the repo', or 'a local model with only a system prompt'."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Privacy review, Mapping, Migrated setup, Not carried over, Test prompts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People build up a lot in an assistant over time: an "about me" profile, response preferences, standing rules, hundreds of saved memories, project instructions with knowledge files, and custom assistants. Moving to another tool by pasting everything in tends to carry over stale facts, contradictions, references to the old tool's features and commands, and personal details that should never have been stored. Tools also differ: one has memory and projects, another only a single instruction box or a file in a code repository, and length limits vary. A good move inventories the setup, lets the person review sensitive items first, maps each item to what the new tool offers, rewrites the wording so it no longer depends on the old tool, and checks the result.

Target: {{target_tool_type}}

<current_setup>
{{current_setup}}
</current_setup>
</context>

<task>
1. If the current setup is empty or only a description of it, explain how to find and copy or export it in general terms (settings for custom instructions, the memory list, project settings), ask for it and stop.
2. Inventory the setup into items and group them: profile facts, response preferences, standing rules, memories, projects (instructions and knowledge files), custom assistants, integrations and style settings. Mark duplicates, contradictions and items that look out of date (dated facts, old jobs, finished projects).
3. Privacy review: flag items the person should review before moving: health, finances, account or ID numbers, passwords or keys, immigration, religion, sexuality, politics, details about other people (children, partners, colleagues, clients) and confidential work material. For each, suggest keep, generalise (for example "works in healthcare" instead of the employer's name) or drop. Never copy secrets into the migrated setup.
4. Map each remaining item to a destination in the target: custom instructions, response style, memory or a context note, project instructions, knowledge files, a repository instruction file, or a single system prompt. When the target lacks a feature, give the closest workaround (for example a short "context" block to paste at the start of chats) or mark it as not carried over.
5. Write the migrated setup: one block per destination, rewritten in neutral wording with no references to the old tool's feature names or commands, contradictions resolved in favour of the most recent statement (and listed), and the most important rules first so it still works if a length limit forces cuts. Put a [REVIEW] marker where a flagged item was generalised or left for the person to decide.
6. Write test prompts the person can run in the new tool to check it behaves as before: one for each key preference, rule and project.
</task>

<constraints>
- Do not claim specific length limits, feature names or menus for a named product; say to check the target's current settings and documentation, and give a priority order for trimming.
- Do not move flagged sensitive items into the migrated setup without the person's review; use [REVIEW] markers instead.
- Do not invent preferences or facts that are not in the current setup.
- Keep the person's own voice and intent in their instructions; change wording only to remove tool-specific references, resolve conflicts or fit the destination.
</constraints>

<output_format>
## Inventory
Grouped bullets, with duplicates, conflicts and stale items marked.
## Privacy review
Table: Item | Why it is sensitive | Suggestion (keep, generalise, drop).
## Mapping
Table: Item or group | From | To | Status (carries over, adapted, not carried over).
## Migrated setup
One fenced block per destination, each with a heading naming where it goes.
## Not carried over
Bullets with the reason and any workaround.
## Test prompts
Numbered prompts, each with what a correct response looks like.
</output_format>
