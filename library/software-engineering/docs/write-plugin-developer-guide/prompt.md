---
schema: 1
id: write-plugin-developer-guide
kind: prompt
title: Write a plugin developer guide
description: Writes the guide for third parties building plugins or extensions for your product, covering the plugin lifecycle, APIs and permissions, a first working plugin, testing and publishing.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, developer-advocate, software-engineer]
stack: []
requires: [repo-read, file-write]
inputs: [repo, spec, text]
output: [docs]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plugin-api, extensions, extension-points, developer-guide, third-party-developers]
pairs_with:
  prompts: [write-code-tutorial, write-migration-guide]
args:
  - name: plugin_system
    description: Where the plugin system lives in the repo or how it works - manifest format, extension points or hooks, host APIs, permission model, sandboxing, loading and distribution.
    type: text
    required: true
  - name: audience
    description: Who builds plugins, for example "external developers comfortable with TypeScript".
    type: string
    default: external developers new to the product
output_contract:
  format: markdown
  sections: [Guide written, API surface covered, Gaps and risks, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Plugin authors are outsiders: they cannot read your source, they do not share your vocabulary, and whatever the guide shows becomes a public contract you must keep. Good plugin docs answer, in order: what can a plugin do and not do, how is it packaged (manifest fields), when does the host load, activate and unload it, which APIs and events it may use and with what permissions, how to run and debug it locally against the host, and how to publish and version it. The common failures are a guide that documents internal functions plugins should never touch, a "hello world" that does not run because a manifest field or build step is missing, silence on compatibility (which host versions a plugin targets and what happens on upgrade), and no mention of permissions, sandbox limits or review rules that will get a plugin rejected.
</context>

<task>
Write the plugin developer guide for this system:

<plugin_system>
{{plugin_system}}
</plugin_system>

Audience: {{audience}}.

1. Read the plugin loader, manifest schema, public API types and any existing example plugins. Separate the supported public API from internals that happen to be reachable.
2. Write an overview: what plugins can do, the extension points, and explicit limits (what plugins cannot do).
3. Write "Your first plugin": the smallest working plugin with every file it needs, the build step, and how to load it into a local host. Follow the real manifest schema and loader exactly.
4. Document the lifecycle: install, load, activate, deactivate, unload and update, and what a plugin must clean up.
5. Write the API reference outline per extension point: signature, when it is called, arguments, return value, errors and an example. Mark experimental APIs.
6. Document permissions and sandboxing: what each permission grants, how users approve them, and what is blocked.
7. Cover testing and debugging (logs, dev mode, reloading), versioning and host compatibility (the manifest field for supported versions, deprecation policy), and publishing (packaging, signing, review rules, marketplace listing) where the input covers them.
8. Run the first plugin example if a host and build are available locally, and note what you verified.
</task>

<constraints>
- Document only the public, supported API. If plugins can reach internals, say so as a gap; do not document internals as API.
- Every manifest field, hook name and API signature must match the code. Mark anything you could not confirm "to confirm".
- Do not invent review rules, marketplace policies or revenue terms.
- Keep secrets out of examples; use placeholders.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the guide. Then reply with:
## Guide written
Paths and sections.
## API surface covered
Extension points and APIs documented, with any marked experimental.
## Gaps and risks
Internals reachable by plugins, missing permissions, undocumented behaviour. Write "None" if there are none.
## Questions for the owners
Facts to confirm before publishing (compatibility policy, review rules).
</output_format>
