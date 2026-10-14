---
schema: 1
id: migrate-coding-agent-setup
kind: prompt
title: Migrate a repo's coding agent setup
description: Moves a repository's setup from one coding agent to another, mapping instruction files, scoped rules, commands, MCP servers, hooks and ignore files, and flagging what has no equivalent.
category: meta
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer, tech-lead]
requires: [none]
inputs: [config, file, text]
output: [table, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, tool-migration, agent-config, agent-instructions]
pairs_with:
  prompts: [consolidate-agent-instruction-files, write-agents-md, write-scoped-agent-rules, share-agent-config-across-team]
args:
  - name: from_tool
    description: The coding agent the repo is set up for today.
    type: string
    required: true
  - name: to_tool
    description: The coding agent you are moving to, or adding alongside.
    type: string
    required: true
  - name: current_setup
    description: The agent files in the repo with their paths and contents (instruction files, rule files, commands, MCP config, hooks, ignore files, settings). Redact secrets.
    type: text
    required: true
  - name: keep_both
    description: Whether both tools will be used for a while (yes or no).
    type: string
output_contract:
  format: markdown
  sections: [Inventory, Mapping, New files, No equivalent, Migration steps, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Coding agents share concepts but not formats. Repository instructions live in AGENTS.md, CLAUDE.md, GEMINI.md, a copilot instructions file or a rules folder; scoped rules are nested files in some tools and glob-matched frontmatter in others; custom commands, MCP config, hooks, permission lists and ignore files each have their own location and syntax, and some tools lack hooks or ignore files entirely. A migration that copies text across without checking loses things silently: a glob rule that no longer applies to the right files, a hook-enforced check that becomes a polite request, an ignore rule that the new tool does not read. When both tools stay in use, the cheapest durable answer is one canonical instruction file with thin pointers, so the two never drift.
</context>

<task>
Migrate this setup from {{from_tool}} to {{to_tool}}.
<current_setup>
{{current_setup}}
</current_setup>
{{#keep_both}}Keep both tools in use: {{keep_both}}{{/keep_both}}

1. Inventory every item in the current setup by type: repository instructions, scoped rules, commands, subagents or skills, MCP servers, hooks, permissions, ignore rules, environment setup.
2. Map each item to the target tool's feature and location. If you are not sure of the target's exact path, file name or key, write your best mapping and mark it "check against the tool's documentation". Do not present guesses as facts.
3. Write the new files. Keep instruction content once: if both tools stay, make one canonical file and have the other point to it where the tool supports that.
4. List what has no equivalent and the closest substitute: a hook becomes a git pre-commit hook or a CI check; an unsupported ignore rule becomes a permission deny or an instruction line, with the weaker guarantee stated.
5. Migration steps in order, including what to delete and when (only after the new setup is verified, and only if not keeping both).
6. Verify: three short tasks to run in the new tool that exercise the instructions, one scoped rule and one command or MCP server, with the expected behaviour.
</task>

<constraints>
- Preserve meaning, not wording: rewrite rules that relied on a feature the new tool lacks rather than copying them unchanged.
- Never copy secrets into new files; use environment variable references.
- Do not delete old files in the steps until verification passes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Inventory
Table: item, type, current path.
## Mapping
Table: item, target feature, target path, confidence (sure, check docs).
## New files
One fenced block per file with its path.
## No equivalent
Bullets: item, substitute, what is weaker.
## Migration steps
Numbered.
## Verify
Three tasks with expected behaviour.
</output_format>
