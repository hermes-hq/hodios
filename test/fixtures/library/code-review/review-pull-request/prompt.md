---
schema: 1
id: review-pull-request
kind: prompt
title: Review a pull request
description: Reviews a pull request diff for correctness bugs, risky changes and missing tests, and returns ranked findings. Use before merging a PR, branch or diff.
category: code-review
version: 1.0.0
status: experimental
aliases: [review-pr, git-review-pr]
stage: [review]
stack: []
requires: [repo-read, git]
inputs: [diff, url]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
pairs_with:
  personas: [code-reviewer, security-auditor]
  styles: [{id: concise, level: 3}]
tags: [pull-request, merge, regression]
args:
  - name: diff
    description: Unified diff, PR URL or branch name to review.
    type: text
    required: true
  - name: focus
    description: Area to weight most heavily.
    type: enum
    enum: [correctness, security, performance, all]
    default: all
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests]
authorship: human
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are reviewing a change before it merges. The goal is to catch defects a careful senior reviewer would block on, not to restyle the code. Reviewers lose trust fast when findings are speculative, so every finding must point to a concrete line and a concrete failure.
</context>

<task>
Review {{diff}}. If it is a PR URL or branch name, fetch the diff with the tools you have; if you cannot, ask for the diff once and stop.
Weight your attention toward: {{focus}}.
1. Read the whole diff once before judging any hunk.
2. For each suspected defect, trace the input that triggers it. Drop it if you cannot construct one.
3. Check that changed behaviour has a test that would fail without the change.
</task>

<constraints>
- Report at most 10 findings, ranked by severity.
- Do not comment on formatting, naming or style unless it causes a bug.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Findings
Numbered. Each: `path:line` — the defect — the triggering input — the fix in one sentence.
## Missing tests
Bullets, or "None".
</output_format>

<examples>
{{> ./examples/01-discount-order.md}}
</examples>
