---
schema: 1
id: plan-rfc-process
kind: prompt
title: Plan an RFC process for an open-source project
description: Designs a lightweight RFC or enhancement proposal process for an open-source project - when one is needed, the template, review stages, how decisions close and how stale proposals end.
category: open-source
version: 1.0.0
status: incubating
stage: [plan]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text]
output: [docs, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rfc, enhancement-proposals, consensus, design-review, community-process]
pairs_with:
  prompts: [write-project-governance, write-design-doc, summarize-discussion-positions, write-versioning-policy]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, its size (maintainers, regular contributors, users), how big changes are decided today, and what has gone wrong - for example surprise breaking changes, endless issue threads or a large PR rejected after months of work.
    type: text
    required: true
  - name: governance
    description: Who has final say today (a lead, a core team voting, a steering committee). Paste GOVERNANCE.md if you have one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, When an RFC is required, Lifecycle, Decision rule, Template, Process document, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An RFC process exists to decide big changes before someone writes the code, in writing, where people who are not in the chat can take part. Projects borrow heavyweight processes from large language and framework communities and then nobody writes RFCs because the bar is too high; or they adopt a template without a decision rule, so proposals sit open forever. What makes it work: a clear threshold for when an RFC is required (and an explicit list of what does not need one), a short template that forces motivation, alternatives and drawbacks, a named shepherd, a final comment period with a fixed length, a decision rule that matches the project's real governance, and a way to close inactive proposals kindly. Rejected RFCs are valuable records too.
</context>

<task>
Design an RFC process for this project.

<project>
{{project}}
</project>
{{#governance}}

<governance>
{{governance}}
</governance>
{{/governance}}

1. Fit check: say whether an RFC process is worth it at this size, or whether a lighter step (a "design" issue label with a short template) would do. If lighter is better, design that instead and say why.
2. When an RFC is required: concrete triggers for this project (public API changes, breaking changes, new dependencies of a certain kind, changes to governance or licence, removal of features) and what does not need one (bug fixes, docs, internal refactors).
3. Lifecycle: stages from idea to draft, review with a shepherd, final comment period (state a length such as 10 days and why), accepted, rejected, postponed or withdrawn, then implemented. Say where RFCs live (a dedicated repository, a folder, or discussions) and the trade-offs.
4. Decision rule: who decides and how, matching the governance above; what counts as consensus; how objections are raised and answered; tie-breaks; and how a decision is recorded.
5. Template: a short Markdown template with summary, motivation, detailed design, drawbacks, alternatives, unresolved questions, compatibility and migration, and prior art.
6. Process document: the RFC process text ready to paste into the repository, written for a newcomer.
7. Rollout: how to introduce it, a trial period, which in-flight debate to run through it first, and how to review the process after a few RFCs.
</task>

<constraints>
- Match the decision rule to the governance given; do not invent a steering committee or voting body the project does not have. If governance is unknown, say what was assumed.
- Keep the template short enough that a contributor can fill it in an evening.
- Do not copy another project's process text; you may mention that large projects use similar processes in general terms.
</constraints>

<output_format>
## Fit check
Two to four sentences.

## When an RFC is required
Two lists: required, not required.

## Lifecycle
Numbered stages with exit criteria.

## Decision rule
Bullets.

## Template
Fenced Markdown block.

## Process document
Fenced Markdown block ready to commit.

## Rollout
Numbered steps with a review date.
</output_format>
