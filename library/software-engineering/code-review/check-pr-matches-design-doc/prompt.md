---
schema: 1
id: check-pr-matches-design-doc
kind: prompt
title: Check a pull request against its design doc
description: Compares an implementation with its approved design doc or RFC and lists deviations, missing pieces, scope creep and decisions made in code that the doc never recorded.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, architect]
requires: [none]
inputs: [diff, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-docs, rfc, conformance, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [write-design-doc, review-system-design, verify-pr-meets-acceptance-criteria]
args:
  - name: design_doc
    description: The approved design doc or RFC, including any decisions recorded in review comments.
    type: text
    required: true
  - name: diff
    description: The implementation diff or pull requests, with file paths.
    type: text
    required: true
  - name: phase
    description: Which part or milestone of the design this pull request is meant to deliver, if it is one of several.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Conformance table, Deviations, Undocumented decisions, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design docs are reviewed carefully and then quietly diverge from the code. The divergences that matter are rarely the headline component names; they are in the details reviewers approved on purpose: the consistency model ("writes go through the outbox"), failure behaviour ("degrade to cached results if search is down"), limits and quotas, the data model and its indexes, what is explicitly a non-goal, the migration and rollout sequence, and the security decisions (who can call what). Implementations also make decisions the doc never addressed, such as a new dependency, a retry policy or a different storage format; these are not wrong, but they should be recorded so the doc stays true. Some deviations are improvements; the point is that they are visible and agreed, not that the code must obey the document.
</context>

<task>
<design_doc>
{{design_doc}}
</design_doc>

<diff>
{{diff}}
</diff>

{{#phase}}
<phase>
{{phase}}
</phase>
{{/phase}}

1. Extract the checkable commitments from the design doc: components and responsibilities, interfaces and data model, consistency and failure behaviour, limits, security and access rules, non-goals, rollout and migration steps, and observability. Number them. If a phase is given, mark which commitments this pull request should cover.
2. For each in-scope commitment, find the code that implements it and classify: implemented as designed, implemented differently, partly implemented, missing, or not verifiable from the diff. Cite `path:line` for evidence.
3. For each deviation, describe the difference and its consequence, and say whether it looks like an improvement, a neutral change or a risk.
4. Check non-goals: list code that builds something the doc explicitly ruled out or did not include (scope creep).
5. List decisions the code makes that the doc does not mention (new dependencies, storage formats, retry and timeout values, defaults, public endpoints) which the doc should record.
6. Recommend for each deviation whether to change the code or update the doc, without deciding for the team.
</task>

<constraints>
- Every classification cites the doc section and the code location.
- Do not judge the design itself; that is a design review. Mention a design concern in one line only if the code reveals a problem the doc missed.
- When the doc is ambiguous, list the ambiguity under Questions rather than picking an interpretation.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Summary
Two or three sentences: how closely the code follows the design and the most important gap.
## Conformance table
Table: #, commitment (doc section), status, evidence (`path:line`).
## Deviations
Numbered: commitment, what the code does instead, consequence, improvement/neutral/risk, change code or update doc.
## Undocumented decisions
Bullets: decision, where in code, suggested doc wording.
## Questions
Bullets: ambiguities to resolve with the doc's authors.
</output_format>
