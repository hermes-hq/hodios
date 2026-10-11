---
schema: 1
id: verify-agent-completion-claims
kind: prompt
title: Verify an agent's completion claims
description: Checks a coding agent's "done" report against the diff, real test runs and the requirements, flagging unverified claims, skipped steps, weakened tests and work that was never done.
category: meta
version: 1.0.0
status: incubating
stage: [verify, review]
role: [software-engineer, tech-lead, qa-engineer]
requires: [repo-read, git, shell]
inputs: [diff, text, ticket]
output: [report, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coding-agents, completion-claims, test-integrity, merge-readiness]
pairs_with:
  prompts: [review-agent-transcript, pick-best-agent-attempt, review-agent-plan]
  personas: [careful-coding-agent]
args:
  - name: claims
    description: The agent's final report or summary, as written.
    type: text
    required: true
  - name: requirements
    description: The task, issue or acceptance criteria the agent was given.
    type: text
    required: true
  - name: base
    description: The branch or commit the work started from, to diff against. Leave empty to use the branch's merge base with the default branch.
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Claim check, Requirement check, Test integrity, Before merge]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Agent reports are written to sound finished. "All tests pass" may mean the agent ran one file, ran tests before its last edit, or never ran them. "Handled edge cases" may mean one null check. The common gaps: a claimed check that was not run or was run before the final change; tests edited to match the new behaviour instead of the requirement (changed expected values, loosened assertions, added skip markers, broad try/catch, mocks that make the test vacuous); special-casing the test input; a requirement quietly dropped; TODOs left in new code; files changed outside the asked scope. The only reliable method is to treat each sentence of the report as a claim and check it against the diff and a fresh run.
</context>

<task>
Verify this report.
<claims>
{{claims}}
</claims>
<requirements>
{{requirements}}
</requirements>
{{#base}}Base: {{base}}{{/base}}

1. Get the full diff from the base with read-only git commands. List files changed, and which are tests, config, lockfiles or CI.
2. Split the report into individual claims. For each, find the evidence in the diff or rerun the check now (tests, type-check, lint, build as the repository defines them). Mark verified, false or unverifiable.
3. Check each requirement against the diff: met, partly met, not met or not checkable, with the file and line.
4. Test integrity: inspect every changed test file for changed expected values, removed or loosened assertions, skip or only markers, new broad mocks or catch-alls, and snapshot updates. For each, say whether the requirement justifies the change. Look in the implementation for code that special-cases test inputs.
5. Look for unreported work: files outside scope, new dependencies, TODO or FIXME added, debug output left in, deleted code.
6. Give a verdict: ready to review, needs fixes (list them), or not done.
</task>

<constraints>
- Run only checks; do not fix anything in this task.
- A claim with no evidence is unverified, not true.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line, then the top issues.
## Claim check
Table: claim, status (verified, false, unverifiable), evidence.
## Requirement check
Table: requirement, status, where.
## Test integrity
Findings with file and line, or "No weakened tests found" with what was inspected.
## Before merge
Numbered fixes or questions for the agent.
</output_format>
