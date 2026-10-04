---
schema: 1
id: design-plugin-extension-system
kind: prompt
title: Design a plugin system
description: Designs a plugin or extension system for an application, with extension points, a stable versioned API, discovery and loading, isolation and permissions, and a policy for breaking changes.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [maintainer, architect, software-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, code, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [plugins, extensibility, api-versioning, sandboxing]
pairs_with:
  personas: [software-architect, api-designer]
  prompts: [write-adr, design-api-contract]
args:
  - name: application_description
    description: The application (editor, CLI, desktop app, web platform, game, build tool), what users want to extend, who writes plugins (your team, trusted partners, anyone on the internet), how they are distributed, and the runtime.
    type: text
    required: true
  - name: language
    description: The host language and runtime, for example TypeScript on Node, Python, Go, Rust, C# or a JVM language. Decides loading and isolation options.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Requirements, Extension points, Plugin API, Discovery and loading, Isolation and permissions, Versioning and breaking changes, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design plugin systems that survive years of releases. The common failures: exposing internal objects so every refactor breaks plugins, too many extension points before anyone needs them, loading untrusted code with full access to the user's files and secrets, no API version so incompatibilities surface as crashes, one slow or crashing plugin taking the host down, and load order bugs when plugins depend on each other. The best plugin APIs are small, declarative where possible (a manifest with contributions), and asynchronous at the boundary.

Host language and runtime: {{language}}
</context>

<task>
<application_description>
{{application_description}}
</application_description>

1. Requirements: who writes plugins and how much they are trusted, what they must be able to do (the three to five real use cases), performance expectations (startup time, hot paths) and distribution (bundled, registry, marketplace, local folder).
2. Extension points: list a minimal set driven by the use cases. For each, choose the style: declarative contribution in a manifest (commands, menus, settings, file types), event hooks (before or after an action, with whether a hook may veto or modify), provider interfaces (implement a language, a storage backend), or UI slots. Say what each point can and cannot change.
3. Plugin API: a narrow, documented facade that never exposes internal types. Show a short sketch of the manifest and the activation entry point in the host language above, including lazy activation on an event, a disposal or deactivate method, and how plugins get services (passed in context, not imported globals).
4. Discovery and loading: where plugins are found, manifest validation, dependency resolution between plugins and load order, lazy loading to protect startup time, and how failures are contained and reported (a broken plugin is disabled with a clear message, not a host crash).
5. Isolation and permissions, scaled to trust: in-process for first-party code; separate process or worker with message passing for third-party code; WebAssembly or a language sandbox where available for untrusted code. Declare permissions in the manifest (file system scope, network, secrets, shell), show them at install, and enforce them in the host. Add time and memory limits for hooks on hot paths.
6. Versioning: semantic versioning of the plugin API separate from the app version, an engine compatibility range in the manifest, deprecation with warnings for at least one major cycle, a compatibility test suite or sample plugins run in CI, and a changelog for plugin authors.
</task>

<constraints>
- Fit the isolation level to the trust level stated; if who writes plugins is not stated, ask, because it decides the design.
- Code sketches must be short and in the host language; if it is not stated, use neutral pseudocode.
- Do not invent library names you are unsure of; describe the mechanism and name a library only as an example to evaluate.
- Prefer fewer extension points; justify each by a use case given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements
Bullets: authors and trust, use cases, performance and distribution.

## Extension points
Table: point | style | use case | can change | cannot change.

## Plugin API
Manifest and entry point sketches in code blocks, then the API rules.

## Discovery and loading
Numbered lifecycle from discovery to deactivation, with failure handling.

## Isolation and permissions
Table: plugin source | isolation | permissions model | limits.

## Versioning and breaking changes
Bullets with the policy.

## Risks and questions
Bullets.
</output_format>
