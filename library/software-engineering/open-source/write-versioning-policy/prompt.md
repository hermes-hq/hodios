---
schema: 1
id: write-versioning-policy
kind: prompt
title: Write a versioning and support policy
description: Writes an open-source project's versioning and support policy, defining its public API, what counts as breaking, deprecation periods and which versions get fixes for how long.
category: open-source
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [maintainer, tech-lead]
requires: [none]
inputs: [text, repo]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [semver, deprecation-policy, support-window, breaking-changes, release-policy]
pairs_with:
  prompts: [write-migration-guide, write-changelog, backport-fix-to-release-branches]
  personas: [open-source-maintainer]
args:
  - name: project
    description: What the project is (library, CLI, framework, plugin, service), its ecosystems and runtimes, who depends on it, how you version and release today, and how much maintainer time exists for old versions.
    type: text
    required: true
  - name: pressures
    description: Anything pushing on the policy, for example enterprise users asking for long-term support, a planned 2.0, complaints about surprise breakage, or wanting to drop an old runtime. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Scheme, Public API, What counts as breaking, Deprecation, Supported versions, Policy text, Decisions for maintainers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Semantic versioning only protects users when a project says what its public API is. Users depend on far more than documented functions: CLI flags and exit codes, config file formats, environment variables, output that scripts parse, error types, default values, minimum runtime versions and transitive dependencies (Hyrum's law). Projects that never decide these things either break users in minor releases or freeze forever. The other half is support: how long an old major line gets security fixes, and what the project will not do. A policy small maintainers can actually keep is better than an impressive long-term support promise they break. Calendar versioning is a reasonable choice for projects without a stable API surface, such as applications or data packages.

Project:
<project>
{{project}}
</project>
{{#pressures}}Pressures: {{pressures}}{{/pressures}}
</context>

<task>
1. Recommend a versioning scheme (semantic, calendar, or semantic with a 0.x period) with the reason, and how pre-releases are named.
2. List what is public API for this kind of project and, as important, what is explicitly not (internal modules, undocumented behaviour, exact log text), with how internals are marked in code.
3. Define what counts as breaking for this project, settling the grey areas: dropping a runtime or platform version, raising a dependency's minimum, changing defaults, fixing a bug users rely on, adding a required config key, changing output format.
4. Set the deprecation rule: how deprecations are announced (runtime warning, changelog, docs), the minimum period or number of minor releases before removal, and how removals are batched into majors.
5. Set the support window as a table by release line: active, security fixes only, end of life, with how the end date is decided. Size it to the maintainer time given{{#pressures}}, and address the pressures stated, including what paid or sponsored support would be needed for anything longer{{/pressures}}.
6. Write the policy text ready to commit as a section of the docs or a VERSIONING.md.
7. List the decisions maintainers must confirm before publishing.
</task>

<constraints>
- Do not promise support the stated maintainer time cannot deliver; say plainly when a request for long-term support needs funding or more people.
- Do not invent the project's release history or current versions. Use placeholders such as [CURRENT MAJOR] where facts are missing.
- Follow the conventions of the project's ecosystem where they exist (for example how its package manager treats 0.x versions or pre-release tags) and say so; if unsure of an ecosystem rule, say to verify it.
- Keep the policy short and checkable: every rule should let a maintainer decide whether a change is allowed in a given release.
</constraints>

<output_format>
Use the contract's section headings in order. What counts as breaking as a table: Change | Breaking? | Why. Supported versions as a table: Line | Status | Fixes received | End of life. Policy text in a fenced markdown block.
</output_format>
