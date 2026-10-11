---
schema: 1
id: implement-desktop-auto-update
kind: prompt
title: Implement desktop app auto-update
description: Implements auto-update for an Electron or Tauri app with signed releases and verified updates, update channels, staged rollout, a non-disruptive restart prompt and a recovery plan.
category: implementation
version: 1.0.0
status: incubating
stage: [build, ship]
role: [fullstack-engineer, frontend-engineer, devops-engineer]
stack: [electron, tauri]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, config, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [auto-update, code-signing, release-channels, staged-rollout, desktop-app]
pairs_with:
  prompts: [structure-desktop-app, harden-electron-app]
  rules: [tauri-rules]
args:
  - name: app_context
    description: The framework, platforms, how releases are built and hosted, and any update needs, for example "Tauri 2 app for macOS and Windows, built in GitHub Actions, releases on GitHub; want a beta channel".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Update architecture, Signing and keys, Rollout and recovery, Changes, Verification, Manual steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a desktop engineer adding auto-update. An updater is a remote code delivery channel to every user's machine, so it must be secure, and a bad release reaches everyone, so it must be recoverable:
- Electron: `electron-updater` (with electron-builder) or the built-in `autoUpdater` (Squirrel) with a feed. macOS updates require a code-signed and notarised app. On Windows, the installer type (NSIS, MSI, Squirrel) decides how updates apply. On Linux, AppImage supports self-update; deb and rpm users update through their package manager.
- Tauri 2: the updater plugin verifies each update with a signature made by your own update key pair. The public key goes in the config; the private key and its password live only in CI secrets. Enable updater artifacts in the bundle config, and serve a static JSON or a dynamic endpoint that returns version, URL and signature per platform.
- Never disable signature verification, never serve updates over plain HTTP, and never commit or print the private key.
- Channels: stable and beta from separate feeds or a channel field; prerelease builds never reach stable users.
- Staged rollout: electron-updater supports a staging percentage in the feed file; with Tauri or a custom endpoint, the server decides per client (a stable hash of an install id). Watch crash and error rates before widening.
- Recovery: auto-updaters do not roll back by themselves. Keep previous artifacts, be able to pull a bad version from the feed at once, and ship a higher version that fixes or reverts. Local data migrations must tolerate the next version and ideally the previous one.
- UX: check at start and periodically, download in the background, ask before restarting and never restart during unsaved work, show release notes, and respect a user or administrator setting that turns updates off.
- Test the real path: install an older signed build, publish a newer one to a test feed, and update.
</context>

<task>
Add auto-update to this app:
{{app_context}}

1. Read the app's build and packaging config, CI release workflow, signing setup, hosting of releases, and any existing update code.
2. Write the update architecture: updater library, feed or endpoint format, channels, check timing and the UI flow.
3. Write the signing and key handling, naming each secret CI needs without creating or printing keys.
4. Implement the updater code in the main or Rust process, the renderer UI (available, downloading, ready to restart), the channel setting, and the feed generation in the release workflow.
5. Write the rollout and recovery plan: staging percentages, signals to watch, how to pull a release, how to ship a fix.
6. Verify with a test feed: an older build updates to a newer one, a tampered artifact is rejected, a beta build is not offered to stable users. Report what was verified and what needs real signing credentials.
</task>

<constraints>
- Never disable update signature checks or code signing to make it work.
- Never generate, print or commit private signing keys; tell the maintainer which secrets to create.
- Do not publish releases or change production feeds without confirmation.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Update architecture
Library, feed format, channels, timing and UI states.
## Signing and keys
What is signed with what, where each key lives, and the CI secrets needed.
## Rollout and recovery
Staging steps, signals, pulling a release and shipping a fix.
## Changes
One line per file: `path`, what changed.
## Verification
Checks run and their actual results.
## Manual steps
What the maintainer must do, such as creating keys or certificates.
</output_format>
