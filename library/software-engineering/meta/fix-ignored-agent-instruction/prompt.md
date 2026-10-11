---
schema: 1
id: fix-ignored-agent-instruction
kind: prompt
title: Fix an instruction an agent keeps ignoring
description: Diagnoses why a coding agent keeps ignoring a rule in its instruction file, from burial and conflicts to vagueness or lost context, and fixes it with a rewrite, a move or an enforced check.
category: meta
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [text, document]
output: [rewrite, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, agent-instructions, instruction-following]
pairs_with:
  prompts: [prune-agent-instructions, design-coding-agent-hooks, review-agent-transcript, write-scoped-agent-rules]
args:
  - name: rule
    description: The instruction the agent ignores, word for word, and the file it lives in.
    type: text
    required: true
  - name: behaviour
    description: What the agent does instead, with one or two concrete examples, and when it happens (start of session, after a long session, in certain folders).
    type: text
    required: true
  - name: instructions_file
    description: The full instruction file, so conflicts and position can be checked. Optional but strongly recommended.
    type: text
output_contract:
  format: markdown
  sections: [Likely causes, Fix, Rewritten rule, Enforcement, How to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When an agent ignores a written rule, adding capitals or "IMPORTANT" rarely helps. The common causes are different and need different fixes. The rule is buried in a long file among generic lines. Another line, or the existing code, says the opposite, and the agent copies the pattern it sees in the code. The rule is vague ("be careful with migrations") or only negative ("don't use moment") with no alternative to do instead. The file is not loaded at all: wrong file name for the tool, a scoped file whose path or glob does not match, or the agent working from another directory. In long sessions the rule was summarised away when context was compacted. Or the user's own prompt contradicts it. A rule that must never be broken is better enforced by something deterministic (a lint rule, a hook, a permission deny, a CI check) than by asking.
</context>

<task>
Diagnose and fix this ignored rule.
<rule>
{{rule}}
</rule>
<behaviour>
{{behaviour}}
</behaviour>
{{#instructions_file}}
<instructions_file>
{{instructions_file}}
</instructions_file>
{{/instructions_file}}

1. Check each cause against the evidence: position and file length, conflicts with other lines (quote them), conflict with existing code patterns the behaviour suggests, vagueness, negative-only wording, loading (file name, scope, working directory), timing (only after long sessions points to compaction), and prompt contradiction. Rank the likely causes; say what evidence would confirm each.
2. Give the fix for the top causes: move the rule up or into the right scoped file, resolve the conflict, rewrite it, or fix the file name or scope.
3. Rewrite the rule as a specific positive instruction with the reason and an example path or snippet ("Use date-fns for dates; moment is being removed (see src/lib/dates.ts)").
4. Decide whether it should be enforced rather than asked: if breaking it causes damage or it is mechanical, propose the deterministic check (lint rule, hook that blocks the action, permission deny, CI step) and what it should catch.
5. Give a quick way to confirm the fix: a fresh session with a prompt that would tempt the old behaviour.
</task>

<constraints>
- Do not recommend more emphasis (capitals, repetition, threats) as the fix.
- Without the instruction file, say which causes you could not check.
- Do not invent tool-specific file names or loading rules; mark them "check against the tool's documentation".
</constraints>

<output_format>
## Likely causes
Ranked list, each with evidence and what would confirm it.
## Fix
Concrete changes to files, placement or scope.
## Rewritten rule
A fenced block with the new wording.
## Enforcement
The deterministic check to add, or why asking is enough.
## How to confirm
The test prompt and the expected behaviour.
</output_format>
