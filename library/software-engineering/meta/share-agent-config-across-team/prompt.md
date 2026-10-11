---
schema: 1
id: share-agent-config-across-team
kind: prompt
title: Share agent config across a team
description: Decides which coding agent settings, permissions, MCP servers, hooks and commands a team commits to the repo and which stay personal, with gitignore entries and safe defaults.
category: meta
version: 1.0.0
status: incubating
stage: [plan, design]
role: [tech-lead, devops-engineer, engineering-manager]
requires: [none]
inputs: [config, text]
output: [table, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [coding-agents, agent-config, team-setup, settings-precedence]
pairs_with:
  prompts: [audit-agent-permissions, consolidate-agent-instruction-files, plan-coding-agent-rollout]
args:
  - name: current_config
    description: The agent config files in the repo and on a typical developer machine (redact secrets), and which agents the team uses.
    type: text
    required: true
  - name: team
    description: Team size, how strict the organisation is about tooling, and any problems so far (one person's settings leaking into the repo, conflicting rules, secrets committed).
    type: text
output_contract:
  format: markdown
  sections: [Layers, Placement table, Committed files, Gitignore, Rules for changes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many coding agents read settings from several layers: an organisation-managed policy, a user-global file, a project file that is committed, and a project-local file meant to stay out of git. Teams get two failures. Either nothing is shared, so every developer rebuilds the same allowlist and nobody has the deny rules, or one person's config is committed with their model preference, their personal MCP servers and sometimes their token. The split that works: commit what makes the repository safe and consistent (deny rules for secrets and production, an allowlist of the project's own safe commands, hooks that format or block, project MCP servers that reference credentials through environment variables, shared commands); keep personal what is taste or identity (model, output style, extra permissions, personal servers and tokens). Non-negotiable rules belong in managed policy if the organisation has it, because a project file can be overridden locally. Agent config is a security boundary, so changes to it deserve the same review as CI config.
</context>

<task>
Work out the team split.
<current_config>
{{current_config}}
</current_config>
{{#team}}
<team>
{{team}}
</team>
{{/team}}

1. Layers: list the settings layers each agent named above supports and their precedence. Where you are not sure for a given agent, say so and mark it "check against the tool's documentation".
2. Placement table: sort every setting found in the current config into managed policy, committed project, local personal or user-global, with the reason. Flag anything secret, personal or machine-specific that is committed today.
3. Committed files: write the shared project files with secrets replaced by environment variable references and personal entries removed.
4. Gitignore: the exact entries for local-only agent files, and a note to remove already-committed personal files from the index without deleting them from disk.
5. Rules for changes: who reviews changes to agent config (a CODEOWNERS entry), how a developer adds a personal override, and how new shared commands are proposed.
</task>

<constraints>
- Never reproduce secret values from the input; name them and recommend rotating any that were committed.
- Do not move a permission into the shared file that only one person needs.
- Keep the shared deny rules strict and the shared allowlist limited to commands the project itself defines.
{{> output/uncertainty}}
</constraints>

<output_format>
## Layers
Table: layer, file, precedence, who controls it.
## Placement table
Table: setting, current place, recommended place, reason.
## Committed files
One fenced block per file.
## Gitignore
Fenced block, then the untrack note.
## Rules for changes
Bullets.
## Open questions
Questions for the team, or "None".
</output_format>
