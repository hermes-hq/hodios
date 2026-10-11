---
schema: 1
id: build-sdk-example-app
kind: prompt
title: Build an SDK example app
description: Builds a small runnable example app for one framework that shows an SDK's main flows end to end, with a README, pinned versions, env-based config and a CI check that it still runs.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [developer-advocate, software-engineer, maintainer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, notes]
output: [code, docs, config]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sample-app, sdk-examples, developer-experience, runnable-examples]
pairs_with:
  prompts: [write-code-samples, write-api-quickstart, test-code-in-docs]
args:
  - name: sdk
    description: The SDK (package name and version, or its path in this repo) and the flows the example must show.
    type: text
    required: true
  - name: framework
    description: The framework or platform for this example, for example Next.js, FastAPI, Spring Boot, SwiftUI or a plain Node script.
    type: text
    required: true
  - name: notes
    description: Where examples live in the repo, test or sandbox credentials available, and anything the example must avoid.
    type: text
output_contract:
  format: markdown
  sections: [What was built, How to run it, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Developers copy example apps more than they read reference docs, so an example's habits become the SDK's real usage. Good examples are small (one framework, the three to five flows people actually need), run with one command after setting a few environment variables, and show the production-correct pattern: the SDK client created once and reused, secret keys only on the server, errors handled, webhooks verified, pagination followed. Examples rot quickly: unpinned dependencies break them, and nobody notices until a developer files an issue. The ones that stay healthy pin versions, use the SDK's test or sandbox mode, and are built or run in CI on every SDK release.
</context>

<task>
Build an example app for {{sdk}} using {{framework}}.
{{#notes}}Notes: {{notes}}{{/notes}}

1. Read the SDK's public API, its existing samples and docs, and the repo's examples folder conventions (layout, naming, shared assets, how other examples are tested). Follow them.
2. Choose the flows to show from the request, keeping to the SDK's main use cases. Skip anything the SDK does not support yet.
3. Scaffold the smallest app the framework's own tooling would create, then add the flows. Create the SDK client once, keep secrets on the server side, read config from environment variables with a committed `.env.example` (no real values), handle and display SDK errors, and add comments only where the SDK usage is not obvious.
4. Pin the SDK and framework versions in the lockfile. Use the SDK's sandbox or test mode by default.
5. Write a README: what it shows, prerequisites with versions, setup in numbered steps, the run command, what to expect, and where each flow lives in the code.
6. Install, build and run the app or its tests. If the flows need real credentials you do not have, run up to that point, and add a CI job (matching existing CI) that builds the example, and runs it where test credentials are available.
</task>

<constraints>
- Never commit keys, tokens or real account ids; use placeholders in `.env.example`.
- Use only SDK methods that exist in the pinned version; check the source or type definitions, not memory.
- Keep it an example: no auth system, database or styling framework unless a flow needs it.
- Ask before adding new CI secrets or changing shared CI config.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What was built
Folder, files, flows covered and the SDK methods each uses.
## How to run it
The README's setup and run steps, condensed.
## Verification
Install, build, test or run commands with real results, and what could not be run without credentials.
## Follow-ups
Gaps found in the SDK or its docs while building, and CI or credential steps for the owner.
</output_format>
