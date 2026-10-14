---
schema: 1
id: consolidate-agent-instruction-files
kind: prompt
title: Consolidate agent instruction files
description: Merges a repository's scattered instruction files for different coding agents into one canonical source with thin per-tool files, resolved conflicts and a guard against drift.
category: meta
version: 1.0.0
status: incubating
stage: [maintain]
role: [tech-lead, software-engineer, maintainer]
requires: [none]
inputs: [document, text]
output: [docs, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, agent-instructions, single-source-of-truth]
pairs_with:
  prompts: [write-agents-md, prune-agent-instructions, write-scoped-agent-rules]
args:
  - name: files
    description: Each instruction file's path and full contents, for example AGENTS.md, CLAUDE.md, GEMINI.md, .cursor/rules files, .github/copilot-instructions.md.
    type: text
    required: true
  - name: tools
    description: The coding agent tools people on the team actually use, and their operating systems if symlinks are an option.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, Conflicts, Canonical file, Per-tool files, Drift guard]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams that use more than one coding agent end up with one instruction file per tool, each edited by whoever used that tool last. They drift: one says npm, another pnpm; one forbids touching migrations, the others never heard of it. AGENTS.md is read natively by a growing number of tools, and others can import it, include it or read it through a symlink. Symlinks are the simplest pointer but break on some Windows checkouts and are not followed by every tool. Some tool files carry features that do not port (glob frontmatter, scoped rules), and those belong in thin tool-specific files that point to the canonical one. Which tool reads which file changes over time, so the plan must say what to confirm in each tool's current documentation.
</context>

<task>
Consolidate these files:
<files>
{{files}}
</files>
{{#tools}}Tools and platforms in use: {{tools}}{{/tools}}

1. Inventory each file: path, the tool that reads it, rule count, and tool-specific features it uses (frontmatter, globs, imports).
2. Merge the rules into one list, removing duplicates. Mark where each rule came from.
3. List every conflict (different commands, versions, contradictory boundaries) with both versions. Where the repository evidence in the files settles it, say which wins and why; otherwise ask.
4. Write the canonical file (AGENTS.md unless the team's tools rule it out), ordered: commands, layout, conventions, boundaries.
5. For each other tool, write the thinnest file that gets the canonical content in front of it: a symlink, an import or include line, or a short file that says to read AGENTS.md plus only the tool-specific features that cannot live there. Note the trade-off where a symlink is proposed and team members use Windows.
6. Propose a drift guard: who owns the canonical file, a rule that tool files must not hold policy, and a cheap CI check (for example failing when a tool file grows beyond its pointer lines or differs from the canonical content it should mirror).
</task>

<constraints>
- Do not drop a rule silently. Every input rule is either in the canonical file, in a tool file, listed as a conflict or listed as removed with a reason.
- Do not claim a tool reads a file or supports an import syntax unless the input shows it; mark such claims "check against the tool's documentation".
- Keep commands and paths exactly as written in the inputs.
{{> output/uncertainty}}
</constraints>

<output_format>
## Inventory
Table: path, tool, rules, tool-specific features.
## Conflicts
Table: topic, version A (file), version B (file), resolution or question.
## Canonical file
One fenced block.
## Per-tool files
Each as a fenced block with its path, or the symlink command, with the trade-off noted.
## Drift guard
Owner, rule and the check, in a few bullets.
</output_format>
