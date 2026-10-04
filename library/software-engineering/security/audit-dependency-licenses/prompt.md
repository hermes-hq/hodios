---
schema: 1
id: audit-dependency-licenses
kind: prompt
title: Audit the licences of every dependency
description: Inventories the licences of all direct and transitive dependencies, flags conflicts with the project's licence or policy, and lists packages for legal review. Use before a release or due diligence.
category: security
version: 1.0.0
status: incubating
stage: [verify, review]
role: [maintainer, legal-professional, software-engineer, tech-lead]
advice_risk: [legal]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [table, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [open-source-licenses, license-compliance, spdx, copyleft, sbom, notices]
pairs_with:
  prompts: [audit-dependencies, vet-dependency]
args:
  - name: repo_path
    description: Path to the local clone, with its lockfiles.
    type: string
    required: true
  - name: project_license
    description: The project's own licence and how it is distributed, for example "proprietary SaaS, never distributed", "Apache-2.0 library on npm" or "proprietary desktop app shipped to customers".
    type: string
    required: true
  - name: policy
    description: The organisation's allowed, review-required and denied licences, if there is a policy. Leave empty to flag by common risk categories instead.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Summary, Needs review, Obligations, Unknown licences, Questions for counsel, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Licence risk depends on three things together: the dependency's licence, how the project uses it (linked into what is shipped, a build tool, a test helper), and how the project is distributed (a hosted service, a library others ship, a binary given to customers). The same copyleft licence can be a non-issue for an internal service and a blocker for a distributed product, and the network clause of some licences reaches hosted services too. Inventories go wrong by reading only direct dependencies, trusting a package manifest that disagrees with the actual LICENSE file, missing licence changes between versions, and dropping attribution obligations that apply even under permissive licences.
</context>

<task>
Audit the dependency licences for the project at `{{repo_path}}`.

Project licence and distribution: {{project_license}}
<policy>
{{policy}}
</policy>

1. Identify every ecosystem and lockfile in the repository (including nested packages, containers and vendored code). Inventory from the resolved lockfile, not the manifest, so transitive dependencies and exact versions are included.
2. Use the licence tooling already present or the standard local tool for each ecosystem (for example license-checker or an npm query, pip-licenses, cargo-deny or cargo-license, go-licenses, the Maven or Gradle licence plugins, or a scanner such as ScanCode). Do not upload the dependency list to an online service without asking.
3. For each package record: name, version, direct or transitive, scope (runtime and shipped, build-only, dev or test), declared licence as an SPDX expression, and the licence found in its LICENSE or COPYING file when they differ.
4. Classify each package against the policy, or without one, into: permissive; weak copyleft (for example LGPL, MPL, EPL); strong copyleft (GPL); network copyleft (AGPL and similar); source-available or non-commercial terms; dual or multiple licences; unknown, missing or custom. Mark how the classification interacts with the stated distribution model and scope.
5. Flag: packages that conflict with the policy or plausibly with the distribution model; unknown and custom licences; manifest and LICENSE disagreements; licence changes between the locked version and newer versions; packages with notices that must be reproduced.
6. Write the full inventory to a file (CSV, or an SBOM format the project already uses) next to the report, and list the attribution and notice obligations for what is shipped.
</task>

<constraints>
- State once, at the start of the report, that this is an inventory to support a legal review, not legal advice, and that conclusions about compatibility and compliance belong to qualified counsel.
- Use "needs review" or "possible conflict", never "compliant", "safe" or "violation". Do not interpret licence terms beyond describing their well-known category.
- If the distribution model is unclear from the arguments, ask before classifying risk, because it changes the answer.
- Do not remove, replace or upgrade dependencies; recommend options for counsel and the team.
{{> guardrails/professional-limits}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Scope
Ecosystems, lockfiles, package counts (direct, transitive, by scope), tools used, what was not covered.

## Summary
Counts per licence category and per policy status.

## Needs review
Table: Package | Version | Scope | Licence | Why flagged | Questions it raises.

## Obligations
Attribution and notice obligations for shipped packages, and where a notice file would go.

## Unknown licences
Table: Package | Version | What was found | Suggested next step (contact the author, check the source repository).

## Questions for counsel
Numbered questions that a lawyer needs to answer, with the facts each one depends on.

## Verification
Commands run and real results, and where the inventory file is.
</output_format>
