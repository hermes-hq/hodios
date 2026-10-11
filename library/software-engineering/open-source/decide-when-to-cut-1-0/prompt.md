---
schema: 1
id: decide-when-to-cut-1-0
kind: prompt
title: Decide whether a project is ready for 1.0
description: Decides whether an open-source library or tool is ready to declare 1.0, by checking API stability, real usage, docs, tests and support capacity, and lists what to freeze, fix or remove first.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [maintainer, tech-lead]
requires: [repo-read]
inputs: [repo, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [semver, api-stability, release-readiness, public-api, versioning]
pairs_with:
  prompts: [write-versioning-policy, plan-breaking-major-release, document-public-api]
  personas: [open-source-maintainer]
args:
  - name: project
    description: The project, its current 0.x version and history (how often the API changed recently), who uses it in production, open breaking proposals, and how many maintainers there are.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Verdict, Evidence, Before 1.0, Remove or hide, After 1.0]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Under semantic versioning, 0.x means anything may change; 1.0 means the public API is a promise. Many projects stay at 0.x for years while companies run them in production, which mostly hurts users: they cannot tell breaking releases from safe ones (in some ecosystems minor bumps in 0.x are treated as breaking, in others not), and the project avoids committing to anything. Others declare 1.0 too early and need 2.0 and 3.0 within a year. The right signals: the main API has not needed breaking changes for a while, real users rely on it in production, the known breaking proposals are either done or rejected, the public surface is deliberately small (internals hidden or marked), docs cover the stable surface, and the maintainers can support the promise. 1.0 does not mean feature-complete. The preparation work is mostly removing and hiding things, because everything public at 1.0 becomes expensive to change.

{{> guardrails/investigate-before-answering}}

Project:
<project>
{{project}}
</project>
</context>

<task>
1. If the repository is available, read the public surface: exported modules and types, CLI flags and config keys, and the changelog's record of recent breaking changes.
2. Assess each signal: API churn over recent releases, production use, outstanding breaking proposals, public surface size, documentation of the stable surface, test coverage of public behaviour, and maintainer capacity. Mark each ready, nearly or not ready with evidence.
3. Give a verdict: ready now, ready after a short list of items, or not yet with the reason and what would change it. Note the cost of staying at 0.x for this project's users.
4. Before 1.0: the concrete items to finish (breaking changes to land in a last 0.x, docs, a versioning policy).
5. Remove or hide: exports, options and behaviours that should become private, experimental or removed before the promise starts, and how to mark experimental APIs after 1.0.
6. After 1.0: what changes in practice (deprecation before removal, semver checks in CI, a support statement).
</task>

<constraints>
- Do not invent usage numbers, release dates or adopters; base the verdict on the evidence given and the repository, and mark gaps.
- Do not equate 1.0 with feature-completeness or perfection; say so if the user seems to.
- If the repository was not read, say the public-surface review is based only on the description.
</constraints>

<output_format>
Use the contract's section headings in order. Verdict in two or three sentences. Evidence as a table: Signal | Status | Evidence. Before 1.0 and Remove or hide as checklists.
</output_format>
