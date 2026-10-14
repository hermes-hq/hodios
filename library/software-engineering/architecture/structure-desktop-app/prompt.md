---
schema: 1
id: structure-desktop-app
kind: prompt
title: Structure a desktop app
description: Designs an Electron or Tauri app's architecture with the process split, a typed IPC contract and its security, local storage, auto-update and background work.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [frontend-engineer, fullstack-engineer, tech-lead, architect]
stack: [electron, tauri]
requires: [none]
inputs: [text, repo, spec]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [desktop-app, ipc, process-model, auto-update, local-storage, app-security]
pairs_with:
  personas: [software-architect, frontend-engineer]
  prompts: [design-plugin-extension-system, review-codebase-architecture]
args:
  - name: app
    description: What the desktop app does, which operating systems, what it needs from the machine (files, shell, hardware, tray, notifications) and whether it works offline.
    type: text
    required: true
  - name: framework
    description: Electron, Tauri, or undecided, plus the UI framework.
    type: string
  - name: current_state
    description: Existing code structure and problems, if this is not greenfield.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Process model, IPC contract, Security settings, Storage, Updates and distribution, Folder layout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Desktop apps built on web technology are two programs: a privileged process with operating system access (the Electron main process, or the Tauri Rust core) and unprivileged renderer windows showing web UI. Most security incidents come from blurring that line: giving the renderer Node access, loading remote content into a privileged window, or exposing a generic "run anything" IPC handler. The renderer should only reach the operating system through a narrow, typed IPC surface where every handler validates its input and checks that the caller is an expected window. In Electron that means context isolation and sandboxing with a preload bridge exposing specific functions; in Tauri it means explicit commands with capability or permission scoping. Long or CPU-heavy work belongs off the main process (workers, a utility process, a Rust thread or a sidecar) so the UI does not freeze. Secrets belong in the operating system's credential store, not plain files. Auto-update needs signed builds, a staged rollout and a way to stop a bad release, and platform signing and notarisation steps take real lead time. Electron gives the widest web API compatibility at a larger bundle; Tauri gives smaller binaries and a Rust core, with system webview differences across operating systems to test.
</context>

<task>
<app>
{{app}}
</app>
{{#framework}}
Framework: {{framework}}
{{/framework}}
{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}

1. If a repository is available, read the main process entry, preload or command definitions, and window creation code before recommending changes.
2. If the framework is undecided, compare Electron and Tauri for this app (team skills, bundle size, webview consistency across operating systems, native needs) and recommend one.
3. Define the process model: what runs in the privileged process, what in renderers, and what in workers or sidecars, keeping heavy work off the UI thread.
4. Write the IPC contract as specific operations with typed payloads, validation and caller checks. Show one example of a handler and its renderer call in the chosen framework.
5. List the security settings to enforce for the chosen framework (isolation, sandbox, content security policy, no remote content in privileged windows, navigation and new-window restrictions, permission scoping), saying what to verify in the framework's documentation.
6. Define storage locations for settings, data and caches using the platform's standard app data paths, secrets in the operating system credential store, and schema migrations on upgrade.
7. Define update and distribution: signed builds, update channel, staged rollout, rollback, and the signing and notarisation work per operating system.
8. Give the folder layout separating privileged code, preload or bindings, renderer UI and shared types.
</task>

<constraints>
- Never expose a generic shell, eval or file-path-from-renderer handler without validation and scoping.
- Do not invent framework option names or APIs; describe the mechanism and say what to check if unsure.
- Code signing and store rules change; list them as tasks to verify, not settled facts.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Framework choice if undecided, and the process split, in at most five lines.
## Process model
A Mermaid diagram of main or core process, renderer windows and any workers or sidecars, with what runs where.
## IPC contract
Table: channel or command, direction, payload, validation, who may call it. Then a short typed example in a code block.
## Security settings
The isolation, permission and content-loading rules for this app.
## Storage
What is stored where (settings, app data, secrets, caches) and how it migrates between versions.
## Updates and distribution
Auto-update flow, code signing and notarisation steps to plan for, rollback.
## Folder layout
A tree in a code block.
</output_format>
