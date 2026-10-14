---
schema: 1
id: migrate-commonjs-to-esm
kind: prompt
title: Migrate a Node.js project from CommonJS to ES modules
description: Converts a Node.js app or library from CommonJS to ES modules, handling extensions, __dirname, JSON imports, dynamic require, tests, TypeScript settings and the exports field for consumers.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, maintain]
role: [backend-engineer, fullstack-engineer, maintainer]
stack: [nodejs, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [plan, diff, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [esm, module-system, package-exports, dual-package, node-modules]
pairs_with:
  prompts: [migrate-javascript-to-typescript, switch-build-tool, upgrade-major-dependency]
  personas: [migration-engineer]
args:
  - name: project
    description: What the project is (application or published library), its minimum supported Node.js version, and the test runner and build tools it uses.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Starting point, Strategy, Changes made, Consumer impact, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Switching module systems looks like a search-and-replace of `require` with `import` and breaks in a dozen quieter places. In ES modules relative imports need the full file extension; `__dirname`, `__filename`, `require.resolve` and `module.exports` do not exist; JSON imports need import attributes or `createRequire`; top-level code that relied on conditional or lazy `require` must become dynamic `import()`, which is asynchronous; and test runners, mocks and loaders each have their own ESM story. For a published library the decision is also about consumers: going ESM-only is a breaking change, a dual package risks two copies of module state (the dual-package hazard), and the `exports` field closes off deep imports that consumers may rely on. Recent Node.js versions can `require()` synchronous ES modules, which softens the change for CommonJS consumers, but only on the versions that support it.
</context>

<task>
Project: {{project}}

1. Record the starting point: `package.json` `type`, `main`, `exports`, the files that use `require`, `module.exports`, `__dirname`, `require.resolve`, JSON requires, conditional or lazy requires, and the test, build and lint tooling.
2. Choose the strategy and say why: for an application, flip `"type": "module"` and convert everything, or keep `.cjs` islands for files tools load as CommonJS (some config files). For a library, choose ESM-only with a major version bump, or a dual build with an `exports` map, and name the hazard you accept.
3. If TypeScript is used, set `module` and `moduleResolution` to the Node.js-aware settings and write `.js` extensions in relative import paths in the source.
4. Convert in an order that keeps the build green: shared utilities and leaf modules first, entry points last. Replace `__dirname` with `import.meta` equivalents for the minimum Node version, JSON requires with import attributes or `createRequire`, lazy requires with `import()` and the async changes that follow.
5. Update the test setup for ESM (runner config, module mocking that works with ESM, loaders) and any scripts or binaries with shebangs.
6. For a library, write the `exports` map with `types`, `import` and, if dual, `require` conditions; check that every documented import path still resolves; pack the package and install the tarball in a throwaway CommonJS project and a throwaway ESM project.
7. Run the full build, tests and lint, then start the app or run the CLI.
</task>

<constraints>
- Do not claim a Node.js feature exists without checking it against the stated minimum version; mark anything you could not confirm.
- Do not mix `require` and `import` for the same module without saying why.
- For libraries, list every consumer-visible change; do not ship a breaking change in a minor version.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Bullets with counts per pattern.
## Strategy
Chosen approach, the reason, and the trade-off accepted.
## Changes made
Grouped by pattern, with the diff summary.
## Consumer impact
For libraries: entry points before and after, breaking or not, version bump. For apps: "Not applicable".
## Verification
Commands run and results, including the packed-tarball check for libraries.
</output_format>
