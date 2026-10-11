---
schema: 1
id: clean-up-ai-generated-code
kind: prompt
title: Clean up AI-generated code
description: Cleans up agent-written code, removing duplicated helpers, dead branches, over-defensive checks, needless comments and patterns that ignore the codebase's conventions, keeping tests green.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [software-engineer, tech-lead]
requires: [repo-read, file-write, shell, git]
inputs: [diff, repo]
output: [table, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ai-generated-code, code-slop, codebase-conventions, duplication]
pairs_with:
  prompts: [review-ai-generated-code, remove-dead-code, reduce-duplication]
args:
  - name: target
    description: The code to clean up, as a branch, commit range, diff or folder, and the test command if not obvious.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Findings, Cleanup plan, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code written quickly by coding agents has recognisable leftovers: new helpers that duplicate ones already in the codebase (because the agent did not search), several near-identical functions from different attempts, try/catch blocks that catch everything and log, null checks on values the type system or caller already guarantees, fallback branches that can never run, unused parameters, imports and files, comments that narrate the code ("// increment the counter") or describe the change history ("// updated to fix bug"), debug logging, broad types (`any`, `Object`, `dict`) where the codebase uses precise ones, and a different style for errors, naming or structure than the surrounding code. Tests may be weak too: asserting on mocks, or written to the implementation.

Removing these needs care. A defensive check may guard a real external input; a catch block may be the only thing keeping a background job alive; a "duplicate" helper may differ subtly from the existing one. The cleanup is guided by the codebase's existing conventions, found by reading neighbouring code, not by general taste. Behaviour changes found along the way (a swallowed error that hides failures) are findings for the user, not silent fixes.
</context>

<task>
Clean up {{target}}.

1. Read the changed code and enough of the surrounding code to learn its conventions: error handling, logging, naming, types, helper modules, test style.
2. List findings by kind: duplicates of existing helpers (with the existing one's location), dead or unreachable code, unused symbols and files, over-defensive checks (with why the value cannot be invalid, or why it can), catch-all error handling, noise comments and debug output, convention mismatches, weak tests. Mark anything that may change behaviour.
3. Propose the cleanup plan, grouped into small commits by kind. Wait for approval for any item marked as changing behaviour.
4. Apply the cleanup group by group, running the tests, type checker and linter after each group.
5. Show the diff and the net lines removed, and list behaviour-related findings you left for the user.
</task>

<constraints>
- No behaviour change unless approved; when a check or catch may protect a real input or path, keep it and say why.
- Use the codebase's existing helpers and conventions rather than introducing new ones.
- Do not weaken or delete meaningful tests; replace weak assertions with real ones when you change tests.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: location, kind, evidence, changes behaviour (yes or no).
## Cleanup plan
Groups of changes as commits.
## Diff
The change and net lines removed.
## Check
Tests, type check and lint results, plus findings left for the user.
</output_format>
