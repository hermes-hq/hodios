---
schema: 1
id: plan-parallel-agent-worktrees
kind: prompt
title: Plan parallel agent work
description: Splits a large change into tasks several coding agents can run in parallel worktrees without conflicts, with file ownership per task, interfaces fixed first, merge order and integration checks.
category: meta
version: 1.0.0
status: incubating
stage: [plan]
role: [software-engineer, tech-lead]
stack: []
requires: [none]
inputs: [text, repo, spec]
output: [plan, table, prompt]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [multi-agent, git-worktrees, task-decomposition, merge-order, parallel-work]
pairs_with:
  prompts: [write-subagent-brief, write-agent-handoff, manage-agent-context-for-long-task]
args:
  - name: goal
    description: The change you want - feature, migration or refactor - with its acceptance criteria and any deadline.
    type: text
    required: true
  - name: repo_layout
    description: The relevant parts of the repository - top-level folders, modules and what they own, shared files that many changes touch (routes, registries, schemas, lock files), and the build and test commands.
    type: text
    required: true
  - name: agent_count
    description: How many agents you plan to run at once.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Feasibility, Phase 0 contracts, Task table, Worktree setup, Merge plan, Integration checks, Task briefs, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan how to split one large change across several coding agents working at the same time, each in its own git worktree and branch. Parallel agents save time only when their tasks do not collide. They collide when two tasks edit the same file (registries, route tables, lock files, shared types), when a task depends on an interface another task is still inventing, and when nobody owns integration, so each branch passes alone and the merge fails. The fix is to decide shared contracts first, give each task an exclusive set of files, and plan the merge order before any agent starts.

Agents at once: {{agent_count}}
</context>

<task>
<goal>
{{goal}}
</goal>
<repo_layout>
{{repo_layout}}
</repo_layout>

1. Feasibility: say whether the change parallelises well. If most work touches the same few files, or the design is still unclear, recommend fewer agents or sequential work and say why. Plan the rest for the number you recommend, not the number asked for; if you recommend sequential work, give an ordered task list instead of parallel briefs.
2. Phase 0, contracts: the shared pieces every task depends on (interfaces, types, database schema, API shapes, feature flag names, test fixtures). Do these first, in one small branch merged to the base before the parallel phase. List each contract precisely.
3. Split into tasks, at most the agent count (or your lower recommendation) running at once, each with: an id, the goal, the files or folders it owns exclusively, files it may read but not edit, its dependency on contracts or other tasks, and its done criteria (commands that must pass).
4. Hot files: for each shared file several tasks need to change (registries, routers, lock files, changelogs), assign one owner task, or defer those edits to an integration task at the end. Dependency changes happen only in phase 0 or the integration task.
5. Merge plan: order of merging, rebasing rules (each branch rebases on the base after each merge), who resolves conflicts, and a stop rule if a branch drifts beyond its owned files.
6. Integration checks: after each merge run the full build and tests; a final integration task that wires everything together and runs end-to-end checks.
7. Write a short brief for each task that an agent can run unattended: goal, owned files, forbidden files, contracts to rely on, commands to run before finishing, what to report, and when to stop and ask.
8. Worktree setup: the commands to create one worktree and branch per task from the base after phase 0, and a note on per-worktree setup costs (dependency install, ports, databases) and how to avoid clashes.
</task>

<constraints>
- Use only paths and commands from the repo layout; mark anything assumed as [X] and list it.
- No two parallel tasks may own the same file. If that cannot be avoided, sequence them.
- Keep each task small enough to review in one sitting (roughly a few hundred changed lines).
- Agents must not merge their own branches; a person or the integration step does.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Feasibility
Two to four lines with a recommendation.
## Phase 0 contracts
Bullets, each contract with its exact shape.
## Task table
Table: id | goal | owns | reads only | depends on | done when.
## Worktree setup
One fenced block with the commands, then bullets on per-worktree setup and clashes (ports, databases, installs).
## Merge plan
Numbered order with rebase and conflict rules.
## Integration checks
Bullets.
## Task briefs
One fenced block per task, each under about 150 words.
## Risks
Bullets: collision points and what to watch.
</output_format>
