---
schema: 1
id: automate-runbook-steps
kind: prompt
title: Automate a manual runbook safely
description: Turns a manual runbook into automation step by step, keeping human approval on risky actions, with dry runs, logging, idempotent steps and a manual fallback.
category: incident
version: 1.0.0
status: incubating
stage: [build, operate]
role: [sre, devops-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [document, repo, config]
output: [code, docs, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [toil-reduction, runbook-automation, dry-run, human-in-the-loop, idempotency]
pairs_with:
  prompts: [write-runbook, audit-runbook-library, review-one-off-production-script]
  personas: [site-reliability-engineer]
args:
  - name: runbook
    description: The runbook to automate - a file path in the repo or the pasted text - and how often it is run and by whom.
    type: text
    required: true
  - name: target
    description: Where the automation should live and run (a script in the repo, a CI or ops pipeline, a chat-ops command, an automation platform), the language or tool preferred, and the permissions it will have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Step classification, What I built, Safety controls, Verification, Runbook update, Not automated]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a manual operational procedure into automation without making it more dangerous. Runbook automation fails when a script does at machine speed what a human did with judgement: it restarts every node at once, fails over during a network partition, or deletes the wrong resource because a lookup returned nothing and the filter became "everything". Experts automate in layers. First the read-only diagnostics (gather facts, compare with thresholds, print a recommendation), which give value with no risk. Then safe, reversible, idempotent actions with preconditions checked first. Risky actions stay behind an explicit human approval showing exactly what will change, with a dry run by default, blast-radius limits (one host at a time, a maximum count), and stop conditions. Every run logs who ran it, with which inputs, what it changed and the result, and the manual runbook stays as a fallback for when the automation itself is broken.
</context>

<task>
Automate this runbook:

<runbook>
{{runbook}}
</runbook>

<target>
{{target}}
</target>

1. Read the runbook and any referenced scripts, tools and configuration in the repo. Find existing patterns for ops scripts (language, logging, config, how credentials are loaded) and follow them.
2. Classify each step: read-only diagnostic, safe reversible action, risky action (destructive, hard to undo, broad blast radius), or judgement call. Present the classification before writing code.
3. Build the automation in that order: diagnostics first; reversible actions with precondition checks; risky actions only behind an approval prompt or flag that shows the planned changes, with dry run as the default mode. Judgement calls stay manual, with the automation presenting the facts.
4. Add safety controls: input validation, refusing to act on empty or unexpectedly large target sets, one-at-a-time or capped batches with a health check between, a timeout and a stop condition, idempotent steps safe to re-run, and structured logs of every action.
5. Add tests where the repo has a test setup (at least for target selection, dry run output and the empty-target guard) and run them. Run the tool in dry-run mode against a non-production target only if the user provides one.
6. Update the runbook: how to run the automation, what it does and does not do, and the manual steps kept as fallback.
7. Report what you verified and what was not tested.
</task>

<constraints>
- Never run the automation against production, and never execute the runbook's risky steps yourself.
- Dry run is the default; real changes require an explicit flag or approval.
- No credentials in code; load them the way the repo already does.
- Do not automate judgement calls (such as whether to fail over); automate gathering the facts for them.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Step classification
Table: Step | Class | Automated how.

## What I built
Files and how to run, with an example dry-run output.

## Safety controls
Bullets.

## Verification
Tests and runs with real results; what was not tested.

## Runbook update
Summary of the changes to the runbook.

## Not automated
Steps left manual and why.
</output_format>
