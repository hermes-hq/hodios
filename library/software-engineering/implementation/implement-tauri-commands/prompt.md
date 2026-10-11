---
schema: 1
id: implement-tauri-commands
kind: prompt
title: Implement Tauri commands
description: Implements Tauri commands with typed and validated arguments, async Rust handlers, serialisable errors, managed state, progress channels, least-privilege permissions and typed frontend wrappers.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, frontend-engineer, software-engineer]
stack: [tauri, typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ipc, tauri-commands, desktop-app, rust-backend, capabilities]
pairs_with:
  prompts: [structure-desktop-app]
  personas: [rust-engineer]
  rules: [tauri-rules]
args:
  - name: command_spec
    description: What the frontend needs from Rust, for example "import a folder of CSV files with progress, list recent imports, cancel a running import".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Commands, Permissions, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Rust and TypeScript engineer adding Tauri commands, the boundary between the web frontend and the native side. The frontend is untrusted input; anything that loads remote content or is compromised by XSS can call your commands. What trips people up:
- Tauri 1 and 2 differ: v2 uses capabilities and permissions and has `tauri::ipc::Channel`; v1 used an allowlist. Check `Cargo.toml` and `tauri.conf.json` before writing anything.
- Argument names: the frontend passes camelCase keys by default for snake_case Rust parameters (`invoke('import_folder', { folderPath })` for `folder_path`), unless the command sets `rename_all`. Mismatches fail at runtime only.
- Async commands cannot take borrowed arguments such as `&str` or `State<'_, T>` unless they return a `Result`; use owned types. Run CPU-heavy or blocking work with `spawn_blocking` so the async runtime stays free.
- Errors must be serialisable. `anyhow::Error` and `std::io::Error` are not; define an error enum with `thiserror` and a `Serialize` impl that sends a stable code and a safe message. Never `unwrap` on input or I/O inside a command.
- Validate arguments in Rust: paths canonicalised and kept inside allowed roots, sizes and enums checked. Never run shell commands built from frontend strings.
- Shared state with `app.manage()` and `State<'_, T>`; use tokio locks in async code and never hold a lock across `.await`.
- Progress and streaming: use a `Channel` argument (v2) for ordered per-call updates, events for app-wide broadcasts. Support cancellation with a token stored in state.
- Permissions: grant plugin permissions per window in capability files with narrow scopes. Check whether the project restricts which windows may call app commands (an app manifest in `build.rs`) and follow it.
- Give the frontend one typed wrapper per command (or generated bindings such as tauri-specta if used), not raw `invoke` strings scattered through components.
</context>

<task>
Implement these commands:
{{command_spec}}

1. Read the Tauri version, `src-tauri` layout, existing commands, error type, state, capability files, and the frontend wrappers and tests.
2. Write the command list: name, arguments, return type, errors, progress or cancellation, and which windows may call it.
3. Implement the commands with owned argument types, validation, the error enum, state, `spawn_blocking` for heavy work, channels for progress and cancellation; register them in the invoke handler.
4. Update capability files with the narrowest permissions the commands' plugins need.
5. Add typed frontend wrappers and use them in the screens in scope.
6. Write tests: Rust unit tests for the logic separated from the command function (including path escape attempts and error mapping), and frontend tests with Tauri's IPC mocks for the wrappers.
7. Run `cargo test`, `cargo clippy`, the frontend type check and tests. Fix what fails.
</task>

<constraints>
- Never trust paths or strings from the frontend without validation.
- Never widen capabilities to broad defaults or unscoped file system or shell access.
- Do not add crates or packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Commands
A table: Command | Arguments | Returns | Errors | Progress or cancel | Windows.
## Permissions
Capability changes and why each is needed.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
</output_format>
