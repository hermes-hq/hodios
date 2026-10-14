---
schema: 1
id: mine-review-comments-for-agent-rules
kind: prompt
title: Turn review comments into agent rules
description: Mines repeated human review comments on agent-written pull requests and turns each recurring correction into an instruction rule, a lint or test check, or a note that it needs human judgement.
category: meta
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [tech-lead, software-engineer]
requires: [none]
inputs: [text, document]
output: [table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, agent-instructions, feedback-loop, code-review-comments]
pairs_with:
  prompts: [review-agent-transcript, prune-agent-instructions, write-ai-reviewer-instructions]
args:
  - name: comments
    description: Review comments left on agent-written pull requests over a period, ideally with the file or pull request each came from.
    type: text
    required: true
  - name: instructions
    description: The current agent instruction file, to avoid duplicates and conflicts.
    type: text
output_contract:
  format: markdown
  sections: [Clusters, Proposed changes, Team decisions, Instruction file patch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reviewers of agent-written code type the same corrections again and again ("use the repository's HTTP client, not fetch", "tests go next to the file", "don't catch and log, rethrow"), because nothing feeds them back to the agent. Each review comment that repeats is a missing rule or a missing check. Not every comment should become a rule: a one-off is noise, a disagreement between two reviewers is a team decision, and anything mechanical is better caught by a linter, test or hook than asked for in prose. A good rule is specific, says what to do instead, and points to an example in the code.
</context>

<task>
Turn these review comments into fixes:
<comments>
{{comments}}
</comments>
{{#instructions}}
Current instruction file:
<instructions>
{{instructions}}
</instructions>
{{/instructions}}

1. Cluster the comments by the underlying correction, not the wording. Count occurrences and note the reviewers if visible.
2. Drop clusters seen once, unless the issue is a security or data-loss risk.
3. For each remaining cluster, choose the fix: an instruction rule (written as a specific positive action with an example path), a deterministic check (lint rule, type rule, test, hook, CI step, and what it would catch), or both.
4. Flag clusters where reviewers disagree with each other or where the comment is taste, as decisions for the team, with the options.
5. Compare with the current instruction file: mark rules that already exist (and so are being ignored; suggest why) and rules that would conflict.
6. Write a patch to the instruction file with only the new and changed lines.
</task>

<constraints>
- Do not attribute blame to individual reviewers or authors; refer to reviewers only to show disagreement.
- Do not write a rule from a single comment unless it is security- or data-related.
- Prefer a check over a rule whenever the issue can be detected mechanically.
{{> output/uncertainty}}
</constraints>

<output_format>
## Clusters
Table: correction, count, example comment, already in instructions (yes or no).
## Proposed changes
Table: cluster, fix type (rule, check, both), the rule text or check description.
## Team decisions
Each disagreement with the options, or "None".
## Instruction file patch
One fenced block with the lines to add or change.
</output_format>
