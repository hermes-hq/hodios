---
schema: 1
id: design-agent-memory-notes
kind: prompt
title: Design agent memory notes
description: Designs how a coding agent keeps durable notes across sessions, covering what is worth recording, where notes live, their format, who may write them and when they are pruned.
category: meta
version: 1.0.0
status: incubating
stage: [design]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [text, file]
output: [plan, docs, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, agent-memory, context-engineering, knowledge-capture]
pairs_with:
  prompts: [manage-agent-context-for-long-task, write-agent-handoff, write-agents-md, prune-agent-instructions]
args:
  - name: situation
    description: How you use agents (one person or a team, long projects or short tasks), what keeps getting re-explained or rediscovered each session, and which agent and memory features you have.
    type: text
    required: true
  - name: existing
    description: Any notes, memory files or instruction files in use today, with paths or excerpts.
    type: text
output_contract:
  format: markdown
  sections: [What to remember, Where it lives, Format, Write rules, Pruning, Instruction lines]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents start every session blank except for what is loaded from files. Without durable notes, each session rediscovers the same gotchas, re-asks the same questions and repeats a fix that was already rejected. With badly designed notes, the memory file grows into a log nobody prunes, fills with unverified guesses the agent wrote about itself, contradicts the instruction file and eats context every session. The useful split: stable rules and commands belong in the committed instruction file; decisions with their reasons belong in decision records or a short decisions file; task progress belongs in a per-task file that is deleted when the task ends; personal preferences belong in the user's own memory, not the repository. Notes should be short, dated, factual and written only after something was verified. Some agents have built-in memory features; those still need the same rules about what goes in.
</context>

<task>
Design the memory setup for this situation.
<situation>
{{situation}}
</situation>
{{#existing}}
<existing>
{{existing}}
</existing>
{{/existing}}

1. What to remember: list the categories worth keeping for this situation (commands and environment quirks, decisions and rejected approaches with reasons, recurring gotchas, task progress, personal preferences) and what must never be stored (secrets, customer data, unverified guesses).
2. Where it lives: assign each category to a place (instruction file, decisions file, per-task progress file, personal memory) with committed or not, and why.
3. Format: a template for each file with a dated entry example, kept to one or two lines per entry.
4. Write rules: when the agent may add an entry (after verification, at the end of a task, on user request), when it must ask first, and that it must never edit the instruction file without the user's approval.
5. Pruning: size limits per file, when progress files are deleted, how stale entries are found (a date check, contradiction with code), and who reviews.
6. Instruction lines: the exact lines to add to the agent instruction file so the agent reads and writes the notes correctly.
7. If existing notes were given, say what to move, merge or delete.
</task>

<constraints>
- Keep the always-loaded part small; anything only needed sometimes should be in a file the agent opens on demand.
- Do not recommend storing secrets or personal data in committed files.
- If you are unsure how a named agent's built-in memory works, say so and design around plain files.
</constraints>

<output_format>
## What to remember
Table: category, keep (yes, no), example.
## Where it lives
Table: category, file or feature, committed (yes, no), loaded (always, on demand).
## Format
One fenced template per file.
## Write rules
Bullets.
## Pruning
Bullets with limits.
## Instruction lines
Fenced block.
</output_format>
