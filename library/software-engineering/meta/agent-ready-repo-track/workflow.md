---
schema: 1
id: agent-ready-repo-track
kind: workflow
title: Agent-ready repository track
description: Prepares a repository for coding agents in four gated steps, from a timed setup audit and verified instruction files to least-privilege guardrails and a trial task that tests them.
category: meta
version: 1.0.0
status: incubating
stage: [discover, build, verify]
role: [tech-lead, software-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [report, docs, config]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, agent-instructions, developer-experience, least-privilege]
pairs_with:
  prompts: [write-agents-md, audit-agent-permissions, exclude-files-from-agent-context, write-agent-environment-setup, design-coding-agent-hooks]
  personas: [careful-coding-agent]
args:
  - name: goal
    description: How the team wants to use agents in this repository, for example supervised sessions on features or unattended bug fixes in the cloud.
    type: text
    required: true
  - name: trial_task
    description: A small real task from the backlog to test the setup in the last step. Leave empty to pick one from open issues or TODOs.
    type: text
steps:
  - {id: audit, file: steps/01-audit.md, stage: discover, gate: approve, artifact: "agent-ready/01-audit.md"}
  - {id: instructions, file: steps/02-instructions.md, stage: build, gate: approve}
  - {id: guardrails, file: steps/03-guardrails.md, stage: build, gate: approve}
  - {id: trial, file: steps/04-trial.md, stage: verify, gate: none, artifact: "agent-ready/04-report.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Makes this repository ready for coding agents used for: {{goal}}. An agent is only as good as the feedback the repository gives it: a setup that works from scratch, checks that run in seconds, instructions that are true, and permissions that match the job. This track measures those first, fixes them in small reviewed steps, and ends by running a real task to see where an agent still stumbles.

Rules for every step:
- Record only what you ran and saw, with the command and its real result.
- Every command written into an instruction file must have been run successfully in this track.
- Never read or print secret values; refer to sensitive files by path.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
