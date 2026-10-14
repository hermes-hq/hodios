---
schema: 1
id: prepare-code-for-new-feature
kind: prompt
title: Refactor to make a planned feature easy
description: Does the preparatory refactoring that turns a planned feature into a small change, in separate behaviour-preserving commits made before the feature itself.
category: refactoring
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer]
requires: [repo-read, file-write, shell, git]
inputs: [repo, ticket, spec]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [preparatory-refactoring, small-commits, feature-work, change-design]
pairs_with:
  prompts: [plan-large-refactor, simplify-function]
  personas: [refactoring-specialist]
args:
  - name: feature
    description: The feature you are about to build, as a ticket or a short description, and the area of the code it touches.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Feature change today, Preparatory steps, Commits, Feature change after, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Make the change easy, then make the easy change." Before building a feature, the useful question is what shape the code would need for the feature to be a few lines: a second payment provider is easy if provider calls go through one interface; a new export format is easy if formatting is separate from querying; a new rule is easy if rules are data. Preparatory refactoring is only the refactoring that serves this feature, not a general cleanup of the area.

It works when it is kept separate: each preparatory step is a behaviour-preserving commit that passes the tests on its own, so reviewers can check refactors and the feature separately, and the refactors can merge even if the feature slips. Mixing refactoring and new behaviour in one commit is the main way bugs hide in review. The usual preparatory moves are small: extract a function or interface at the point the feature will vary, move a conditional into a polymorphic or table-driven form when a new case is coming, parameterise a hard-coded value, split a function that the feature needs to call halfway through, or add tests around code the feature will touch. If the preparation is bigger than the feature, or touches far more code, stop and discuss: it is a separate project.
</context>

<task>
Prepare the code for {{feature}}.

1. Read the code the feature touches and sketch the change as if you made it today: which files, which functions, what would be duplicated or bolted on. This is the baseline to beat.
2. Identify the shape that would make it small: the seam, extraction or parameter the feature needs. List the preparatory steps, each behaviour-preserving, and the expected size of the feature afterwards. If preparation is larger than the feature, say so and propose a smaller option. Wait for approval.
3. Make sure the touched code is covered by tests; add characterization tests first where it is not.
4. Do each preparatory step as its own commit with a message saying it is a refactor with no behaviour change, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} before each commit.
5. Describe the feature change on top of the prepared code (files and rough diff), but do not implement the feature unless the user asks.
</task>

<constraints>
- Preparatory commits contain no behaviour changes; anything that changes behaviour belongs to the feature.
- Only refactor what this feature needs; list other cleanups you noticed as follow-ups.
- Do not push, open pull requests or rewrite history unless asked.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Feature change today
What the feature would look like without preparation.
## Preparatory steps
Numbered steps with the reason each serves the feature.
## Commits
Commit messages and diffs, each with its test result.
## Feature change after
The expected feature change on the prepared code.
## Check
Tests run and results, and follow-ups noticed.
</output_format>
