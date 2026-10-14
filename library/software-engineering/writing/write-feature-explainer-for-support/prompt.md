---
schema: 1
id: write-feature-explainer-for-support
kind: prompt
title: Explain how a feature really works for support
description: Writes an internal explainer for support staff on how a feature really behaves, with its rules, limits, edge cases, the questions customers get confused by and how to diagnose a report.
category: writing
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, product-manager, support-agent]
requires: [repo-read]
inputs: [spec, file, notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [support-enablement, internal-docs, edge-cases, diagnosis, feature-behaviour]
pairs_with:
  prompts: [write-known-issue-brief, write-troubleshooting-guide]
args:
  - name: feature
    description: The feature, with whatever you have - spec, code paths to read, config, notes on limits and known confusions.
    type: text
    required: true
  - name: common_questions
    description: Questions or tickets support already gets about it.
    type: text
output_contract:
  format: markdown
  sections: [What it is, How it works, "Working as designed (but confusing)", "How to check a customer's case", Probably a bug if, Common questions, Unconfirmed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Support teams learn features from marketing pages and release notes, which describe the happy path. The tickets come from the rules nobody wrote down: what happens at a limit, the order in which settings win, delays from caches and background jobs, time zones, permissions, what a plan downgrade does to existing data. Engineers know these from the code. A good explainer turns that knowledge into rules support can apply without reading code, tells them how to check a customer's situation, and separates "working as designed" from "probably a bug" so engineering gets fewer false escalations and fewer real bugs are dismissed.
</context>

<task>
Write an internal explainer of this feature for the support team.

<feature>
{{feature}}
</feature>
{{#common_questions}}
<common_questions>
{{common_questions}}
</common_questions>
{{/common_questions}}

1. If code or config paths are given and you can read them, read them first and base the rules on what the code does, noting where it differs from the spec.
2. Explain in one paragraph what the feature is for and who can use it (plans, roles, platforms).
3. Write "How it works" as plain rules: triggers, order of precedence, timing and delays, limits and what happens at them, and what happens on downgrade, deletion or expiry.
4. List edge cases and confusing behaviours that are working as designed, each with a one-line explanation support can give.
5. Write "How to check": what to look at in the admin tools or ask the customer to tell what state they are in.
6. Write "Probably a bug if": signs that should go to engineering, and what to collect.
{{#common_questions}}7. Answer each common question directly.{{/common_questions}}
</task>

<constraints>
- Only state rules supported by the input or the code you read; mark anything inferred "(confirm with engineering)".
- No internal hostnames, code identifiers or people's names in the explainer body.
- Do not promise roadmap changes or fixes.
- Write for a non-engineer; avoid jargon or explain it once.
</constraints>

<output_format>
## What it is
## How it works
## Working as designed (but confusing)
## How to check a customer's case
## Probably a bug if
## Common questions
## Unconfirmed
Points marked for engineering to confirm, or "None".
</output_format>
