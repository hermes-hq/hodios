---
schema: 1
id: explain-project-dependencies
kind: prompt
title: Explain a project's dependencies
description: Explains what each dependency in package.json, requirements, pyproject, go.mod, Cargo.toml or a Gemfile does in this project, and which are core, dev-only, overlapping or unused.
category: learning
version: 1.0.0
status: incubating
stage: [learn, discover]
role: [software-engineer]
stack: []
requires: [repo-read]
inputs: [repo, file]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [package-manifest, new-joiner, code-reading, third-party-libraries]
pairs_with:
  prompts: [explain-codebase, vet-dependency, audit-dependencies]
args:
  - name: manifest
    description: The manifest file to explain (path in the repo, or its contents pasted). Leave empty to use the main manifest in the working directory.
    type: text
  - name: background
    description: What you already know, such as "I know React but not this backend stack", so familiar packages get one line.
    type: text
output_contract:
  format: markdown
  sections: [Stack at a glance, Dependency by dependency, Overlaps and oddities, Read these first, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The dependency list is the fastest map of a project's architecture: it shows the framework, the database layer, how it talks to the outside world, how it is tested and built. Newcomers read it as a flat list, though, and miss what matters: which few packages shape every file (the framework, ORM, state library, validation library) versus small utilities; which are build or test tooling only; which are plugins of another (eslint-plugin-*, @types/*, pytest-*); two libraries doing the same job (two HTTP clients, two date libraries) left from a migration; and packages declared but never imported, or imported but only present transitively. A package's general description is less useful than how this project uses it.
</context>

<task>
Explain the dependencies of the project in the working directory{{#manifest}}, starting from: {{manifest}}{{/manifest}}.
{{#background}}
The reader already knows: {{background}}. Keep those to one line each.
{{/background}}

1. Find the manifests (there may be several in a monorepo) and the lockfile. Note the package manager and the runtime version constraints.
2. Group dependencies by role: framework and runtime, data and persistence, networking and integrations, UI, validation and serialisation, auth and security, observability, utilities, then dev-only (build, lint, format, types, test).
3. For each dependency, search the code for its imports or configuration and say how this project uses it, with one example file path. Mark ones you cannot find used as "no imports found" rather than "unused", since some are loaded by config, plugins or CLI.
4. Mark the core dependencies: the few that shape most of the code and that a newcomer must learn first.
5. Flag overlaps (two libraries for the same job), runtime packages listed as dev-only or the reverse, plugins whose host is missing, very old major versions pinned far behind the lockfile, and packages present only transitively but imported directly.
6. Point to the docs or files to read first for each core dependency, using the repo's own config files (such as the ORM schema or router setup).
</task>

<constraints>
- Describe how this project uses each package from the code, not from memory of the package's website. If you only know the package in general, say so.
- Do not remove, upgrade or install anything; this is an explanation. Suggest follow-ups only in Overlaps and oddities.
- Do not state a package has known vulnerabilities or is abandoned unless a tool output in the repo shows it; suggest the audit command instead.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Stack at a glance
Two or three sentences plus the package manager and runtime versions.
## Dependency by dependency
A table per role group: package, version range, how this project uses it, example file, core or not.
## Overlaps and oddities
Bullets. "None found" if none.
## Read these first
The core dependencies in learning order, each with the repo file that shows its setup.
## Questions
What the code could not answer.
</output_format>
