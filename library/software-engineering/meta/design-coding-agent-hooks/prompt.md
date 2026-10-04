---
schema: 1
id: design-coding-agent-hooks
kind: prompt
title: Design coding agent hooks
description: Designs lifecycle hooks for a coding agent, such as formatting after edits, blocking dangerous commands, fast tests before stopping and context at session start, kept fast and debuggable.
category: meta
version: 1.0.0
status: incubating
stage: [design, build]
role: [tech-lead, devops-engineer, software-engineer]
stack: []
requires: [none]
inputs: [repo, config, text]
output: [config, plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [agent-hooks, guardrails, lifecycle-events, team-setup, automation]
pairs_with:
  prompts: [audit-agent-permissions, write-agents-md, plan-coding-agent-rollout]
  personas: [careful-coding-agent]
args:
  - name: repo_context
    description: The repository - languages, the format, lint, type-check and test commands with how long each takes, how the agent is used (interactive, unattended in CI), commands or paths that must never be touched, and what goes wrong today when the agent works here.
    type: text
    required: true
  - name: agent_tool
    description: The coding agent and version you configure, so hook events and configuration format can match it. Leave empty for a tool-neutral design.
    type: string
output_contract:
  format: markdown
  sections: [Goals, Hook plan, Hook scripts, Configuration, Performance and debugging, Rollout, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design hooks: small programs the coding agent's harness runs automatically at lifecycle events, so the team's standards are enforced by code rather than by asking the model nicely. Instructions in an agent file are advice the model may forget; a hook always runs. Hook setups fail in predictable ways: a slow hook on every edit makes the agent crawl; a hook that blocks without a clear message makes the agent retry the same thing in a loop; a hook that reformats the whole repo creates huge diffs; and a hook that fails silently gives false confidence.

{{#agent_tool}}Agent tool: {{agent_tool}}{{/agent_tool}}
</context>

<task>
<repo_context>
{{repo_context}}
</repo_context>

1. Goals: from the repo context, list the problems hooks should solve (unformatted code, lint errors found late, dangerous commands, secrets in files, the agent stopping with failing tests, missing context at start), and which are better left to the agent instructions file or to CI.
2. Map each goal to the right event. Typical events: before a tool call or command (can block), after a file edit (can format or report), when a user prompt is submitted (can add context), at session start (can inject context), before the agent stops or finishes (can require a check), and on notification. If the agent tool is named, use its event names and say to check them against its current documentation; otherwise use neutral names.
3. Design each hook:
   - Format and lint after edit: only the changed files, with the project's own tools; report remaining lint errors back to the agent in a short message rather than failing silently.
   - Guard before commands: block destructive or out-of-policy commands (recursive deletes outside the workspace, force pushes, production credentials, package publishing, piping a downloaded script into a shell) and edits to protected paths (lock files, migrations already released, generated code, secrets). Explain why in the block message and say what to do instead.
   - Check before stop: run the fastest meaningful check (type check plus tests related to changed files) with a time budget; if it fails, return the failure summary so the agent continues.
   - Context at session start: current branch, uncommitted changes, recent failing CI, and pointers to the instructions file, kept to a few lines.
4. Write each hook as a short, portable script (POSIX shell or the repo's scripting language), reading the event payload from standard input as JSON if the tool provides it, with clear exit codes: allow, block with message, or warn.
5. Performance: a time budget per hook (after-edit hooks under about two seconds, stop hooks under about a minute), caching, and running only on relevant file types.
6. Debugging: log each hook run with event, decision and duration to a local file; a way to disable a hook temporarily; tests for the guard hook with allowed and blocked examples.
7. Rollout: check the hooks into the repository for the team, start with warn-only for guards for a week, review the log, then switch to blocking.
</task>

<constraints>
- Use only the commands given in the repo context; if a command or its runtime is missing, use a placeholder and ask.
- Hooks are a safety net, not a sandbox. Say that a determined or confused agent can work around pattern-based guards, and pair them with least-privilege permissions.
- Never put secrets in hook scripts or logs.
- Hook payload formats and event names differ by tool and version; mark tool-specific details as to be checked.
- Keep the scripts short and readable; no downloads or network calls in hooks.
</constraints>

<output_format>
## Goals
Bullets, with what stays in instructions or CI.
## Hook plan
Table: event | hook | purpose | blocks? | time budget.
## Hook scripts
One fenced block per hook.
## Configuration
One fenced block registering the hooks for the tool, or a neutral sketch.
## Performance and debugging
Bullets.
## Rollout
Numbered steps.
## Open questions
Bullets, or "None".
</output_format>
