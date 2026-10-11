---
schema: 1
id: organise-assistant-projects
kind: prompt
title: Organise your assistant into projects
description: Plans how to split a cluttered AI assistant into projects or spaces, decides where each piece of context belongs, keeps clients and personal life apart and cleans up old chats.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, consultant]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [projects, context-boundaries, chat-clean-up, client-confidentiality]
pairs_with:
  prompts: [build-project-instructions, write-memory-profile, write-custom-instructions]
args:
  - name: usage
    description: What you use the assistant for, roughly how often, and what is messy now (hundreds of chats, instructions that fit only some work, mixing clients).
    type: text
    required: true
  - name: tool
    description: "Optional: your assistant and whether it has projects, folders, spaces or custom assistants, and whether memory is shared across them."
    type: text
  - name: boundaries
    description: "Optional: anything that must stay separate, such as client confidentiality, a shared family account or a work account."
    type: text
output_contract:
  format: markdown
  sections: [Proposed projects, Where each piece of context goes, Boundaries, Clean-up plan, Upkeep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Heavy users end up with hundreds of untitled chats, account-wide instructions that suit one area of life but get in the way everywhere else, and context bleeding between clients. Most assistants offer some way to group work, under names like projects, folders, spaces or custom assistants, with their own instructions and files. A simple placement rule helps: account-wide instructions hold what is true in every chat; memory holds durable personal facts; a project holds the instructions and files for one area; a single chat holds one-off details; some things belong nowhere. Split into a new project only when instructions, files or confidentiality differ; too many projects become their own overhead. Memory may be shared across projects in some tools, which matters for client work.

<usage>
{{usage}}
</usage>
{{#tool}}
<tool>
{{tool}}
</tool>
{{/tool}}
{{#boundaries}}
<boundaries>
{{boundaries}}
</boundaries>
{{/boundaries}}
</context>

<task>
1. Group the user's uses into areas and propose projects, usually three to eight. For each: a clear name, its purpose, what its instructions should cover, which files to add, and who else has access, if anyone.
2. Make a placement table for every piece of context the user mentioned: account-wide instructions, memory, a named project, a single chat, or nowhere, with a reason.
3. Set boundaries: one project per client where confidentiality applies, nothing client-specific in account-wide instructions or memory, and a check on whether the tool's memory is shared across projects. If it is or might be, say what to keep out of memory.
4. Write a clean-up plan for existing chats: what to move, archive or delete, a naming pattern for new chats, and a time limit (for example one session of thirty minutes, oldest last).
5. Write an upkeep routine: monthly five-minute tidy, and when to create or retire a project.
</task>

<constraints>
- Do not claim the tool has a feature the user has not confirmed; describe the structure so it works with projects, folders or plain naming.
- Fewer, clearer projects beat many; justify every split.
- Do not recommend putting secrets, passwords or other people's personal data in project files.
</constraints>

<output_format>
## Proposed projects
A table: project, purpose, instructions cover, files, access.
## Where each piece of context goes
A table: item, place, reason.
## Boundaries
Bullets.
## Clean-up plan
Numbered steps, with the naming pattern.
## Upkeep
Two to four bullets.
</output_format>
