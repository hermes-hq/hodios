---
schema: 1
id: structure-mobile-app-modules
kind: prompt
title: Structure mobile app modules
description: Designs the module architecture of a growing mobile app, covering presentation pattern, feature modules, dependency rules, navigation, design system and build times, with a migration path.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [mobile-engineer, tech-lead, architect]
requires: [none]
inputs: [text, repo]
output: [plan, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [modularization, feature-modules, build-times, dependency-graph]
pairs_with:
  personas: [mobile-engineer, software-architect]
  prompts: [write-adr, untangle-circular-dependencies]
args:
  - name: app_overview
    description: What the app does, number of screens and features, team size and how teams split the work, current project structure (single module, a few modules), pain points (build times, merge conflicts, slow onboarding), and constraints such as minimum OS versions.
    type: text
    required: true
  - name: platform
    description: The app's platform.
    type: enum
    enum: [ios, android, react-native, flutter]
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Target structure, Dependency rules, Navigation and shared code, Build and tooling effects, Migration path, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the module structure of a mobile app that has outgrown its first shape. Modularisation pays off through faster incremental builds, clear ownership and parallel work, but it fails in known ways: modules split by layer (all view models in one module) instead of by feature so every change touches everything, feature modules that import each other directly and create cycles, a "common" or "core" module that grows into a dumping ground everyone depends on, navigation that requires features to know each other's screens, and a big-bang migration that freezes feature work. Small apps with one or two developers often do not need many modules at all, and saying so is a valid answer.

Platform: {{platform}}
</context>

<task>
<app_overview>
{{app_overview}}
</app_overview>

1. Diagnose: what hurts today, which pains modularisation fixes and which it does not (a slow CI from too many tests is not solved by modules). Decide how far to go given team size: no change, a light split (app, a few features, core), or a full feature-module graph.
2. Choose the presentation pattern that fits {{platform}} and the team (for example MVVM with a unidirectional state flow; on ios SwiftUI with observable view models or a reducer architecture; on android Compose with ViewModel and state holders; on react-native feature folders with a state library; on flutter a single state management approach such as Bloc or Riverpod). Justify it in two sentences and keep it consistent across features.
3. Define the module types and their allowed dependencies: app (composition root), feature modules (each with a small public API or interface module and an implementation), domain or data modules per bounded area, shared design system, core utilities with a strict scope (logging, networking client, analytics interface), and test fixtures. Show the graph.
4. Navigation and shared code: who owns routes, how one feature opens another without depending on its implementation (route contracts, deep link registry, coordinator in the app module), where dependency injection is wired, and the rule for what may enter core.
5. Build and tooling effects for {{platform}}: incremental build gains, configuration cost of many modules, how to enforce the dependency rules (build tool visibility, lint rules or a dependency check in CI), previews and sample apps per feature.
6. Migration path: an order of extraction (design system first, then the leaf features with fewest dependents), each step shippable alongside feature work, with how to measure progress (build time, module count, cycles at zero).
</task>

<constraints>
- Use only the facts given; if team size, current structure or the main pain is missing, ask for them and stop. Mark other gaps as [X].
- Do not quote build-time savings as fact; say what to measure before and after.
- Prefer the platform's standard tooling (Swift Package Manager or Xcode targets, Gradle modules, workspaces or monorepo packages for react-native, Dart packages for flutter) and name it.
- Never recommend more modules than the team can own; a module should have a clear owner.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Pains, which ones this solves, and the depth of change recommended, in under 150 words.

## Target structure
A Mermaid graph of modules and dependencies, then a table: module | type | contains | owner | may depend on.

## Dependency rules
Numbered rules with how each is enforced.

## Navigation and shared code
Bullets on routing, DI wiring and the core module's admission rule.

## Build and tooling effects
Bullets, with what to measure.

## Migration path
Table: step | what moves | prerequisite | how to verify.

## Risks and questions
Bullets.
</output_format>
