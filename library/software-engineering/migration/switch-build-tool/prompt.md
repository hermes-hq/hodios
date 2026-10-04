---
schema: 1
id: switch-build-tool
kind: prompt
title: Switch a build tool
description: Plans moving between build tools such as Webpack to Vite, Maven to Gradle or Make to CMake, with feature mapping, plugin replacements, environment variables, output parity checks and a CI dual run.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [frontend-engineer, software-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [config, text]
output: [plan, config, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [build-tooling, bundler, output-parity, plugins, environment-variables, ci-dual-run]
pairs_with:
  prompts: [plan-monorepo-migration, migrate-ci-provider]
  personas: [migration-engineer]
args:
  - name: current_config
    description: The current build configuration as it is (for example webpack.config.js and package.json scripts, pom.xml, Makefile), plus how the output is deployed or consumed.
    type: text
    required: true
  - name: target_tool
    description: The build tool you are moving to, with the version if known.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Feature mapping, New configuration, Environment and conventions, Parity checks, Rollout, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An engineer is moving a project's build to {{target_tool}}. Build migrations look done once the app starts locally, and then break in production: a missing polyfill or browser target, environment variables exposed under a different prefix or not at all, different asset paths and hashing, source maps gone, a plugin that silently did something (code generation, licence headers, resource filtering, compiler flags), or a CI cache that no longer applies. The expert approach maps every responsibility of the old build first, writes the new config to match it, and proves parity by comparing outputs, not by "it runs".
</context>

<task>
<current_config>
{{current_config}}
</current_config>

1. Map every responsibility of the current build, including what plugins and scripts do implicitly: entry points, outputs and their paths, loaders or source sets, code generation, resource processing, environment variables and how they are injected, dev server and proxy settings, test integration, compiler or language level flags, optimisation and minification, source maps, targets (browsers, JVM release, compilers and architectures), dependency management and repositories, publishing and versioning. For each, the equivalent in {{target_tool}}: built in, plugin (name it only if sure it exists, otherwise describe what to look for), or custom.
2. Write the new configuration for the mapped features, idiomatic for the target rather than a line-by-line copy.
3. Environment and conventions: the target's rules for environment variables (prefixes, build-time versus run-time), file locations (for example `index.html` at the root for some bundlers), module format assumptions (CommonJS versus ESM), and anything developers must change in their habits.
4. Parity checks: compare old and new artifacts on the same commit. Frontend: file list, bundle sizes per chunk, environment values in the bundle, source maps, browser support, and a smoke test of the built app. JVM: dependency tree diff, artifact contents and manifest, test counts. Native: compiler and linker flags per target, symbol and size comparison, test results.
5. Rollout: both builds run in CI for a period (the new one non-blocking first, then blocking), developers switch local scripts, then the deploy uses the new artifact behind a quick revert, then the old config is deleted.
</task>

<constraints>
- Do not invent plugin names, options or defaults. If unsure, describe the needed behaviour and say what to verify in the docs.
- Keep the produced artifacts equivalent unless the user asks for changes; list intentional differences.
- If the config references files not shown (custom loaders, scripts, parent POMs, included makefiles), list them and ask.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Feature mapping
Table: responsibility | current implementation | target equivalent | status (built in, plugin, custom, to verify).

## New configuration
The new config files in code blocks, plus changed scripts.

## Environment and conventions
Bullets.

## Parity checks
Checklist with the commands to compare outputs.

## Rollout
Numbered phases with exit criteria and the revert path.

## Risks and open questions
Bullets.
</output_format>
