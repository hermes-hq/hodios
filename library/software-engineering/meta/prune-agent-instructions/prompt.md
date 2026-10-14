---
schema: 1
id: prune-agent-instructions
kind: prompt
title: Prune an agent instruction file
description: Cuts a bloated AGENTS.md or similar agent instruction file down to the lines that change agent behaviour, removing generic, stale, duplicated and conflicting rules with a reason for each cut.
category: meta
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [document, text]
output: [rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, agent-instructions, context-engineering]
pairs_with:
  prompts: [write-agents-md, fix-ignored-agent-instruction, write-scoped-agent-rules]
args:
  - name: instructions
    description: The full text of the agent instruction file (AGENTS.md or the tool-specific equivalent).
    type: text
    required: true
  - name: repo_facts
    description: Current facts to check the file against, such as package scripts, CI commands, language versions and folder layout. Leave empty if unavailable.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Cut list, Conflicts to resolve, Revised file, Needs verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Instruction files grow by accretion: every bad agent session adds a line and nobody removes one. Each line is re-read on every session, so bloat costs context and dilutes the rules that matter. The usual dead weight: generic advice the model already follows ("write clean code"), stale commands that send the agent down the wrong path, the same rule stated three ways, rules that contradict each other (the agent then picks one at random), shouting in capitals that makes everything look equally urgent, and rules a formatter, linter or hook already enforces. The test for every line is simple: if it were deleted, would an agent do something wrong in this repository?
</context>

<task>
Prune this instruction file:
<instructions>
{{instructions}}
</instructions>
{{#repo_facts}}
Current repository facts:
<repo_facts>
{{repo_facts}}
</repo_facts>
{{/repo_facts}}

1. Number every rule or statement. Classify each as keep, cut or move, using these reasons: generic (default model behaviour), stale (contradicts the repository facts), duplicate (of line N), conflict (with line N), tool-enforced (a formatter, linter, type checker or hook already does it), task-specific (belongs in a command, skill or scoped file, name which), or vague (keep only if it can be rewritten as a concrete action).
2. Check every command, path and version against the repository facts. Without facts, list them under Needs verification instead of judging them.
3. List conflicts as pairs with the two readings, and do not choose for the user when the intent is unclear.
4. Rewrite the vague lines worth keeping as specific actions with a reason or an example ("Money is integer cents; see src/money.ts" instead of "be careful with money").
5. Produce the revised file: same structure where it helps, commands first, emphasis used only for the one or two rules that are truly destructive if broken.
</task>

<constraints>
- Never drop a rule that guards against data loss, security exposure or irreversible actions just because it is short or obvious; flag it as keep.
- Do not add new rules the original did not imply. Pruning is not rewriting the team's policy.
- Keep the user's commands and paths exactly as written unless a repository fact shows they changed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Lines before and after, and the three biggest problems found.
## Cut list
Table: line number, original text (shortened), action (keep, cut, move, rewrite), reason, destination if moved.
## Conflicts to resolve
Each pair and the question the team must answer, or "None".
## Revised file
One fenced Markdown block, ready to replace the original.
## Needs verification
Commands, paths and versions you could not check.
</output_format>
