---
schema: 1
id: set-up-agent-git-checkpoints
kind: prompt
title: Set up git checkpoints for agent work
description: Sets up a git routine for coding agent work with a branch per task, checkpoint commits after each green step, safe ways back to a checkpoint and a clean squash before review.
category: meta
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer, tech-lead]
stack: [git]
requires: [none]
inputs: [text, config]
output: [checklist, config, docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [coding-agents, checkpoint-commits, branching, revert-points]
pairs_with:
  prompts: [recover-from-bad-agent-session, plan-parallel-agent-worktrees, write-agents-md]
  rules: [git-safety-rules]
args:
  - name: setup
    description: How you work with agents today (interactive or unattended, one or several at once), your branch and merge rules, and what went wrong (lost work, giant unreviewable commits, tangled history).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Routine, Agent instruction lines, Going back, Before review, Guardrails]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agents make many edits quickly, and a long session without commits has one undo point: the start. Small checkpoint commits after each step that passes its checks give cheap restore points, make it obvious what each step changed, and let a human stop the agent at a known-good state. The routine has to be safe for agents: they should never rewrite shared history, force push, or run destructive commands like a hard reset or clean without approval, and they cannot use interactive git commands. Checkpoints are noise in the final history, so they are squashed before review, either by the platform's squash merge or by a soft reset to the base followed by one commit. Some agent tools have their own checkpoint or rewind feature; it usually covers file edits only, not effects of shell commands, so git remains the reliable record.
</context>

<task>
Design a checkpoint routine for this setup.
<setup>
{{setup}}
</setup>

1. Routine: branch naming per task from an up-to-date base; when to commit (after each step whose checks pass, before any risky operation, before ending a session); the checkpoint message format (a prefix such as "wip:" and the step); never commit secrets or generated artefacts.
2. Agent instruction lines: the exact lines for the repository's agent instruction file that tell the agent to follow the routine, and what it must never do without approval (push to shared branches, force push, hard reset, clean, rebase published commits, delete branches).
3. Going back: how a human or the agent returns to a checkpoint without losing later work: a backup branch first, then revert or a reset on the task branch only, and how to find commits through the reflog. Label destructive commands.
4. Before review: how to squash the checkpoints into reviewable commits (squash merge on the platform, or a soft reset to the merge base and a new commit), and how to keep a meaningful split when the change is large.
5. Guardrails: settings that enforce the routine (branch protection on the default branch, a permission deny or approval for force pushes and hard resets in the agent config, a pre-push hook), with any exact config keys you are unsure of marked "check against the tool's documentation".
</task>

<constraints>
- Every destructive command is labelled and preceded by a backup step.
- No interactive git commands in agent instructions.
- Keep the routine simple enough to follow in every session.
</constraints>

<output_format>
## Routine
Numbered steps with the commands.
## Agent instruction lines
Fenced block.
## Going back
Steps with commands, destructive ones labelled.
## Before review
Steps with commands.
## Guardrails
Bullets with config snippets.
</output_format>
