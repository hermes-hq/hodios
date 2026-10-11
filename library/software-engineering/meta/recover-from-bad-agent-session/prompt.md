---
schema: 1
id: recover-from-bad-agent-session
kind: prompt
title: Recover from a bad agent session
description: Triages a coding agent session that went wrong, working out what changed, what to keep, what to undo and how to restart, without losing good work or making the damage worse.
category: meta
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer]
requires: [repo-read, git]
inputs: [text, diff, logs]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, git-recovery, damage-control]
pairs_with:
  prompts: [review-agent-transcript, write-agent-handoff, audit-agent-permissions]
  rules: [git-safety-rules]
args:
  - name: situation
    description: What happened in the session, what you expected, and what looks wrong now.
    type: text
    required: true
  - name: git_state
    description: Output of read-only git commands such as status, log of the last commits, reflog head and diff stat. Leave empty to have the steps ask for it.
    type: text
output_contract:
  format: markdown
  sections: [Stop and snapshot, What changed, Keep or undo, Recovery steps, Outside the repository, Restart]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After an agent session goes wrong, the second mistake is usually the human's: a hard reset that throws away uncommitted good work along with the bad. An agent may have committed, amended, rebased or stashed; deleted untracked files; regenerated a lockfile; edited files outside the repository; or caused effects git cannot undo, such as running a migration, pushing a branch or publishing a package. Commits that seem lost are usually still reachable through the reflog for a while; deleted untracked files are not recoverable through git at all. So the order matters: stop the agent, snapshot everything as it is, find out what changed, then decide hunk by hunk.
</context>

<task>
Help recover from this session.
<situation>
{{situation}}
</situation>
{{#git_state}}
<git_state>
{{git_state}}
</git_state>
{{/git_state}}

1. Stop and snapshot: tell the user to stop the agent, then give non-destructive commands to preserve the current state (a backup branch at the current commit, the uncommitted changes saved as a patch or stash that is not dropped, a copy of untracked files). If no git state was given above, give the read-only commands whose output you need and stop until you have it.
2. What changed: from the git state, list commits made in the session, rewritten history (compare reflog with log), uncommitted changes by file, deleted files, and changes to lockfiles, configuration, CI and the agent's own settings.
3. Keep or undo: classify each change as keep, undo or inspect, with the reason. Keep good work even when it is mixed in with bad work; say how to split it (interactive staging by hunk, cherry-picking single commits).
4. Recovery steps: ordered commands from least to most destructive, each with what it does and how to undo it. Show how to recover a commit from the reflog if history was rewritten.
5. Outside the repository: ask about and list effects git cannot undo (database migrations run, branches pushed, packages published, files changed in the home directory, global config, deployed resources) and the separate fix for each.
6. Restart: what the next session should get (a handoff note with what to keep, the original goal, and the constraint the agent broke) and the instruction-file or permission change that would have prevented this.
</task>

<constraints>
- Never recommend a reset, checkout of paths, clean, force push or stash drop before the snapshot step is done, and label every destructive command as destructive.
- Do not claim deleted untracked files can be recovered through git.
- Ask before assuming anything happened outside the repository.
{{> output/uncertainty}}
</constraints>

<output_format>
## Stop and snapshot
Commands in a fenced block, with one line each on what they preserve.
## What changed
Table: change, where, made by the agent (yes, no, unknown).
## Keep or undo
Table: change, decision, reason, how.
## Recovery steps
Numbered commands with their effect, destructive ones labelled.
## Outside the repository
Effects to check and how to fix each, or questions.
## Restart
The handoff points and the prevention change.
</output_format>
