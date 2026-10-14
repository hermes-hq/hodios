---
schema: 1
id: tauri-rules
kind: rule
title: Tauri rules
description: Standing rules for Tauri 2 apps covering minimal capabilities and permissions, typed commands, async Rust handlers, errors across IPC, state, secrets and signed updates.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, frontend-engineer]
stack: [tauri]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [capabilities, ipc, tauri-commands, desktop-app, auto-update]
applies_to: ["src-tauri/**", "src/**/*.ts", "src/**/*.tsx"]
pairs_with:
  rules: [rust-style-rules, typescript-strict-rules]
  personas: [rust-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Tauri app:

**Know the setup first**
- Check the Tauri version in `src-tauri/Cargo.toml` and `package.json`. Tauri 2 uses capabilities and plugin permissions; Tauri 1 used an `allowlist`. Do not mix the two models or copy v1 snippets into a v2 app.
- Read `tauri.conf.json` and `src-tauri/capabilities/` before adding a feature, and follow the existing command module layout.

**Capabilities and permissions**
- Grant the least permission that works: add the specific permission (for example `fs:allow-read-text-file` scoped to a directory) to the capability for the window that needs it, not `*:default` sets or broad scopes like `$HOME/**`.
- Scope file system, shell and HTTP plugin permissions to explicit paths, programs and URLs. Never enable arbitrary shell execution or open-ended `http` scopes for convenience.
- Keep separate capabilities for windows with different trust (a main window versus one that shows remote content). Never give a window that loads remote URLs access to privileged commands.

**Commands**
- Each `#[tauri::command]` does one job, takes typed arguments that deserialise into Rust types, and validates them (paths stay inside allowed roots, sizes and enums are checked). The frontend is untrusted input.
- Make commands that do I/O or slow work `async` so they do not block the main thread; use `tauri::async_runtime::spawn_blocking` for blocking work.
- Return `Result<T, E>` where `E` is a serialisable error type with a stable shape (an enum with `thiserror` and a `Serialize` impl). Never `unwrap` or `expect` on input or I/O in a command; a panic there kills the request with no useful message.
- Register every command in the `invoke_handler` and give the frontend a typed wrapper (one TypeScript function per command, or generated bindings such as tauri-specta if the project uses them). Do not scatter raw `invoke('name')` strings through components.

**State and events**
- Hold shared state with `app.manage()` and access it with `State<'_, T>`; use `Mutex` or `RwLock` (tokio versions in async code) and never hold a lock across an `.await`.
- Use events for progress and push updates from Rust, and unlisten in the frontend when the component unmounts.

**Secrets and data**
- No API keys or secrets in the frontend bundle or `tauri.conf.json`; they ship to every user. Call third-party APIs that need secrets from a backend you control, or store user-provided secrets with the OS keychain via a plugin.
- Store app data in the paths from the `path` API (app data, app config), not next to the binary.
- Keep a strict Content-Security-Policy in `tauri.conf.json`; do not set it to `null` to fix a loading error.

**Updates and builds**
- Use the updater plugin with signed artifacts and the public key in config. Never print, commit or log the private signing key.
- Keep `cargo clippy` clean and the frontend type check passing.

**Before you finish**
- Run `cargo check`, `cargo clippy`, the Rust tests and the frontend type check and tests, then run the app and call the changed command. Say what you ran.
