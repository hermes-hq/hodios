---
schema: 1
id: inventory-deprecated-api-usage
kind: prompt
title: Inventory deprecated API usage
description: Groups deprecation warnings and deprecated API usages by replacement before an upgrade, estimates effort per group and orders the work into small changes that ship on the current version.
category: migration
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [software-engineer, maintainer, tech-lead]
stack: []
requires: [none]
inputs: [logs, text, file]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deprecations, upgrade-readiness, tech-debt, warnings, effort-estimate]
pairs_with:
  prompts: [upgrade-major-dependency, upgrade-game-engine-version]
  workflows: [runtime-upgrade-track, dependency-update-sweep-track]
  personas: [migration-engineer]
args:
  - name: warnings_or_code
    description: Deprecation warnings from the build, tests or runtime logs (paste as they are), and or code that uses the APIs. Include the current framework or SDK version.
    type: text
    required: true
  - name: target_version
    description: The version you plan to upgrade to, if known, so removals can be prioritised.
    type: string
    default: not decided
output_contract:
  format: markdown
  sections: [Summary, Deprecation groups, Work order, Gaps in the scan, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An engineer is preparing a framework or SDK upgrade and has a wall of deprecation warnings. Treating them as one list leads to a giant upgrade branch that never merges. Experts group warnings by replacement (one fix pattern covers many sites), fix what the current version already supports, so each change ships safely before the upgrade, and leave only true version-coupled changes for the upgrade itself. Warnings also undercount: some deprecations only fire at runtime on rarely used paths, some are hidden by log filters, and dependencies emit warnings the team cannot fix directly.

Target version: {{target_version}}
</context>

<task>
<warnings_or_code>
{{warnings_or_code}}
</warnings_or_code>

1. Parse each warning or usage: the deprecated API, the replacement named in the message or docs, file and line, and the source (own code, a dependency, generated code, configuration). Deduplicate identical warnings that repeat per test or request.
2. Group by replacement: one group per deprecated API or pattern, with its count of call sites and files.
3. For each group decide:
   - Fixable now: the replacement exists in the current version, so the change ships before the upgrade.
   - Upgrade-coupled: the replacement only exists in the target version; it must change with the upgrade (consider a small compatibility shim).
   - Dependency-owned: the warning comes from a library; the fix is upgrading or replacing that library, or waiting.
   - Removed in target: if a target version is given above and its docs or the warning say it removes the API, mark it blocking.
   Mark anything you are unsure about as "to verify in the release notes".
4. Estimate effort per group (S: mechanical, codemod or search-and-replace; M: needs judgement per site; L: behaviour change or design decision), and whether an official codemod or automated fix exists (only if sure).
5. Order the work: blocking groups first, then high-count mechanical groups (a codemod clears many warnings in one review), then the rest; each item is one small pull request. Propose turning fixed deprecations into errors in CI (warnings-as-errors for that category) so they do not come back.
6. Gaps in the scan: how to surface deprecations the input missed (run the full test suite with deprecation warnings enabled and not filtered, enable runtime deprecation logging in staging, compiler or linter deprecation flags, a search for known deprecated names).
</task>

<constraints>
- Use only warnings and code given; do not invent call sites or counts.
- Do not claim an API is removed in a version unless the warning says so or you are sure; otherwise mark it to verify.
- If the current version is missing and it matters for "fixable now", ask for it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Totals: warnings parsed, unique groups, blocking groups, fixable now.

## Deprecation groups
Table: group (deprecated API) | replacement | sites | source | category (fixable now, upgrade-coupled, dependency-owned, blocking) | effort | codemod?

## Work order
Numbered list of small changes, each with the group and the CI guard to add.

## Gaps in the scan
Bullets with commands or settings to run.

## Open questions
Bullets.
</output_format>
