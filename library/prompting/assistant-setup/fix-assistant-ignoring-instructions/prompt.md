---
schema: 1
id: fix-assistant-ignoring-instructions
kind: prompt
title: Fix an assistant that ignores your instructions
description: Finds why a chat assistant keeps ignoring a standing instruction by checking every layer - custom instructions, memory, project instructions and the chat - and fixes it with a test.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [explanation, rewrite, tests]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [instruction-debugging, instruction-conflicts, saved-memory, personalisation]
pairs_with:
  prompts: [review-custom-instructions, audit-assistant-memory, diagnose-prompt-failures]
args:
  - name: problem
    description: What the assistant keeps doing, what you want instead, and one or two example replies if you have them.
    type: text
    required: true
  - name: setup
    description: "Optional but useful: your custom instructions, saved memories, project instructions and any style or personality setting, pasted as they are."
    type: text
  - name: tool
    description: "Optional: which assistant and model you use, and whether this happens in a project or in normal chats."
    type: string
output_contract:
  format: markdown
  sections: [Expected and actual, Layers involved, Likely causes, Fixes, Not fixable by instructions, Test in a fresh chat]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an assistant keeps doing something you told it not to, the cause is usually in how its instruction layers stack: account-wide custom instructions, saved memories, project instructions and files, a style or personality setting, the current chat, and the model's own defaults. Typical causes are a conflict between layers (memory says "likes detailed explanations" while instructions say "be brief"), a vague or negative rule ("don't be wordy") that is weaker than a concrete positive one ("answer in at most five sentences unless I ask for more"), an instruction buried in a long block, a request in the chat that overrides it, a long chat where the instruction has faded, project instructions that only apply inside that project, changes that only take effect in new chats, or a model switch. Some behaviour, such as safety refusals or tool limits, cannot be changed by instructions at all.

<problem>
{{problem}}
</problem>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}
{{#tool}}
Tool: {{tool}}
{{/tool}}
</context>

<task>
1. Restate expected and actual behaviour in one line each. If the problem is too vague to act on and no setup is given, ask for one example reply and the current instructions, then stop.
2. List each layer present in the setup and quote what it says about this behaviour, including indirect conflicts.
3. Rank the likely causes, most likely first, each with the evidence for it. If the setup was not given, rank the general causes by how common they are and say what to check.
4. Give fixes: rewritten instructions that are concrete, positive and observable; what to move, delete or merge; where the instruction should live; and to start a new chat after changing settings.
5. Say plainly if the behaviour cannot be changed by instructions, and give the best workaround (a short reminder in the message, a different setting, a different tool).
6. Give three test prompts to run in a fresh chat, with what a pass looks like.
</task>

<constraints>
- Quote the user's setup accurately; do not invent what it says.
- Do not state a specific tool's settings or menu names as fact unless the user gave them.
- Keep rewritten lines short; do not grow the instructions to fix one behaviour.
- Do not suggest ways to get around safety behaviour.
</constraints>

<output_format>
## Expected and actual
Two lines.
## Layers involved
A table: layer, what it says, conflict or not.
## Likely causes
Numbered, most likely first.
## Fixes
Rewritten lines in a fenced block, then bullets for moves and deletions.
## Not fixable by instructions
One or two bullets, or "Nothing here".
## Test in a fresh chat
Three bullets: prompt and pass condition.
</output_format>
