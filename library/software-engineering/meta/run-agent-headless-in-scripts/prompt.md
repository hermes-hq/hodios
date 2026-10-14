---
schema: 1
id: run-agent-headless-in-scripts
kind: prompt
title: Run a coding agent headless from scripts
description: Writes a script that runs a coding agent non-interactively with a fixed prompt, a narrow permission mode, structured output parsing, timeouts, turn and cost caps, exit codes and logs.
category: meta
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, devops-engineer]
requires: [none]
inputs: [text]
output: [script, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [coding-agents, headless-mode, automation, structured-output, scripting]
pairs_with:
  prompts: [design-ci-agent-job, write-subagent-brief, plan-agent-batch-migration, audit-agent-permissions]
args:
  - name: job
    description: What the script should have the agent do, on what inputs (a list of files, issues, repositories), how often, and what you do with the result.
    type: text
    required: true
  - name: agent
    description: The agent CLI you use and its version, and the script language you want (bash, Python, Node).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design, Script, Prompt file, Safety, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most coding agent CLIs have a non-interactive mode that takes a prompt, runs to completion and prints a result, often with a JSON output option. Scripts built on it fail in predictable ways. The agent waits for a permission prompt nobody answers and the job hangs, so the permission mode and allowed tools must be set explicitly. The opposite mistake, bypassing all permissions, is dangerous whenever inputs are not fully trusted. Free-text output is hard to parse; asking for a fixed JSON shape and validating it, with the final result field read from the tool's JSON envelope, is far more robust. Runs need a wall-clock timeout, a turn or budget cap, and retries only for transient errors. Several runs in parallel on one checkout clobber each other, so each run needs its own worktree or copy. Every run should keep its transcript, and the script should check the git diff afterwards instead of trusting the agent's summary.
</context>

<task>
Write a headless script for this job.
<job>
{{job}}
</job>
Agent and language: {{agent}}

1. Design: inputs, one agent run per input, working directory per run, concurrency limit, where outputs and transcripts go, and what counts as success.
2. Prompt file: a self-contained prompt with the task, constraints, the checks to run and an exact JSON shape for the final answer. Keep it in a file, not inline in the script.
3. Script: invoke the agent in non-interactive mode with the prompt file, an explicit narrow tool allowlist or permission mode, a turn or budget cap if the CLI supports it, JSON output, and a wall-clock timeout around the process. Parse the result, validate it against the expected shape, and handle failures: non-zero exit, timeout, invalid JSON, and a claimed success with no diff. Use exit codes the caller can act on. Mark flags you are not sure exist for this CLI version with "check against the tool's documentation".
4. After each run, record the git diff stat and the check results independently of what the agent said.
5. Safety: what the permission settings allow and deny, why permission bypass is not used, and what to change if inputs come from untrusted sources.
6. Test: a dry run on one input, a forced failure (bad input) and a timeout test.
</task>

<constraints>
- No push, publish, deploy or merge from the script unless the job explicitly asks, and then only as a separate, clearly marked step.
- No secrets inline in the script or prompt.
- Do not invent CLI flags; flag uncertain ones.
</constraints>

<output_format>
## Design
Bullets.
## Script
Fenced block.
## Prompt file
Fenced block.
## Safety
Bullets.
## Test
Numbered tests with expected results.
</output_format>
