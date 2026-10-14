---
schema: 1
id: find-inconsistent-code-patterns
kind: prompt
title: Find inconsistent code patterns in a codebase
description: Finds places where a codebase solves the same problem several ways (errors, HTTP calls, config, dates, logging), proposes the house pattern for each and lists the outliers to migrate.
category: conventions
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [tech-lead, software-engineer, architect]
requires: [repo-read, shell]
inputs: [repo]
output: [report, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [consistency, pattern-drift, codebase-audit, technical-debt, house-style]
pairs_with:
  prompts: [write-team-coding-standards, unify-error-handling, write-custom-lint-rule]
args:
  - name: areas
    description: Concerns to check, for example "error handling, HTTP clients, configuration, date handling, logging, validation, feature flags". Leave empty to check the common ones.
    type: text
  - name: scope
    description: The part of the repository to analyse.
    type: string
    default: the whole repository
output_contract:
  format: markdown
  sections: [Summary, Patterns, Outliers, Migration plan, Not checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Codebases drift. Each new contributor, and each coding agent, copies whichever example it found first, so one repository ends up with three HTTP clients, two date libraries, errors returned as null in one module and thrown in another, and config read from environment variables directly in twenty places. Every variant is reasonable alone; together they make code harder to read, review and change, and they teach the next person the wrong example. The useful output is not a list of everything that differs, but the few concerns where variants actually coexist, how much of each there is, which one should be the house pattern (usually the one that is most common, newest, or already wrapped in a shared helper), and a short list of outliers to migrate, so the team and its tools stop multiplying the problem.
</context>

<task>
Find inconsistent patterns in {{scope}}.
{{#areas}}
<areas>
{{areas}}
</areas>
{{/areas}}

1. Read the project layout, dependency manifests and any existing conventions documents (CONTRIBUTING, AGENTS.md, standards docs, ADRs). Note conventions that are already decided so you measure against them.
2. For each concern listed in the areas (if none are given, check error handling, HTTP and API clients, configuration and environment access, date and time, logging, input validation, data access, async patterns and test setup), search the code for the different ways it is done. Use concrete searches (imports, call sites, helper names) and count usages per variant with file paths.
3. Report only concerns where two or more variants coexist in meaningful numbers. Skip differences that a formatter or linter already handles, and differences that are justified (a separate service with different needs, legacy code scheduled for removal) once you have noted them.
4. For each inconsistent concern, propose the house pattern with a reason: already documented, most used, newest, safest, or already wrapped in a shared helper. If two are close, present the choice as a decision for the team instead of picking silently.
5. List the outliers to migrate with file paths, grouped by effort (mechanical swap versus behaviour change). Flag migrations that change behaviour, such as switching from returning null to throwing.
6. Suggest how to stop new drift: a shared helper, a lint rule (`no-restricted-imports` or equivalent), a line in the agent instructions file, or a code review checklist item.
7. Do not change code. This is an analysis.
</task>

<constraints>
- Every count and example must come from searches you ran; give file paths. Do not estimate counts you did not measure.
- Do not report style differences the formatter handles.
- Do not recommend a pattern the project does not have the dependency for without saying it adds a dependency.
- Keep the report to the concerns that matter; at most about ten.
</constraints>

<output_format>
## Summary
The three most costly inconsistencies and the recommended house patterns.

## Patterns
For each concern: | Variant | Usages | Example files | , then the proposed house pattern with the reason or the decision needed.

## Outliers
Per concern: files to migrate, marked mechanical or behaviour-changing.

## Migration plan
Ordered changes, each small enough for one pull request, and how to prevent new drift.

## Not checked
Concerns or directories not covered and why.
</output_format>
