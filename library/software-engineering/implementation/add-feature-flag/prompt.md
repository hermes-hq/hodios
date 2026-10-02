---
schema: 1
id: add-feature-flag
kind: prompt
title: Put a change behind a feature flag
description: Wraps new behaviour behind a feature flag with a safe default, a kill switch, tests for both paths and a cleanup ticket. Use when shipping a risky change incrementally.
category: implementation
version: 1.0.0
status: incubating
stage: [build, ship]
role: [software-engineer, fullstack-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [spec, diff, repo]
output: [code, tests, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [feature-flags, progressive-delivery, kill-switch]
args:
  - name: change
    description: The new behaviour to put behind the flag, as a description or a diff.
    type: text
    required: true
  - name: flag_system
    description: Flag system to use, for example LaunchDarkly, Unleash, OpenFeature, a config table or an env var.
    type: string
    default: existing system or env var
output_contract:
  format: markdown
  sections: [Flag, Changes, Tests, Rollout and kill switch, Cleanup ticket]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A flag is only a safety net if turning it off really restores the old behaviour, and only cheap if it is removed once the rollout ends. Flags go wrong when the default is the new code, when an outage of the flag service flips everyone to the untested path, when the check is scattered across a dozen `if` statements that drift apart, when a schema change makes the old path impossible, or when nobody owns the removal and the flag lives for years.
</context>

<task>
Put this change behind a feature flag:

{{change}}

Flag system: {{flag_system}} (with the default, use the flag system the repo already has; if it has none, use an environment variable read through the existing config layer).

1. Find how the repo already defines, names, reads and tests flags. Follow that exactly, including the naming convention.
2. Classify the flag (release toggle, ops kill switch, experiment or permission) and choose its lifetime from that.
3. The default and every failure mode, such as the flag service being unreachable or the flag missing, must evaluate to the **old** behaviour.
4. Evaluate the flag once per request or unit of work, at the highest sensible point, and branch there. Do not scatter checks through the call tree or evaluate inside hot loops. Pass the decision down if deeper code needs it.
5. Keep both paths complete and independently correct. If the change touches persisted data or a schema, make sure both paths can read what the other writes (expand then contract). If they cannot, say so plainly: a flag cannot protect that part.
6. Record which path ran, using the project's logging or metrics conventions, so the rollout can be watched.
7. Tests: the old path with the flag off, the new path with the flag on, and the old path when flag evaluation fails. Reuse the existing test helpers for overriding flags.
8. Run the tests.
</task>

<constraints>
- Do not change the old path's behaviour, even to tidy it.
- Do not use a flag to gate a security fix; say so if the change is one.
- Targeting rules (percentages, user segments) only if the flag system supports them; do not build your own.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flag
| Name | Type | Default | Evaluated at | Failure behaviour | Suggested expiry |

## Changes
One line per file.

## Tests
One line per test: which path and condition.

## Rollout and kill switch
Numbered steps to enable gradually, the signals to watch, and exactly how to turn it off without a deploy (or a warning if the chosen system needs a deploy).

## Cleanup ticket
Ready to paste: title, owner placeholder, due date placeholder, every code location to delete, and the tests to remove or keep.
</output_format>
