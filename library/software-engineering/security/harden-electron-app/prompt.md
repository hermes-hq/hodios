---
schema: 1
id: harden-electron-app
kind: prompt
title: Harden an Electron app
description: Hardens an Electron desktop app with context isolation, sandboxed renderers, no Node integration, validated IPC, a strict CSP, safe navigation and signed auto-updates.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, security-engineer]
stack: [electron]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [desktop-security, context-isolation, ipc, preload, auto-update]
pairs_with:
  prompts: [harden-web-app-config, fix-xss-vulnerabilities, sign-release-artifacts]
  personas: [security-auditor]
args:
  - name: app
    description: What the app does, whether it loads remote content or only local files, and its Electron version if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current settings, Findings, Changes, Verification, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In Electron an XSS bug is not just a session theft: if the renderer can reach Node or a too-powerful preload API, it becomes code execution on the user's machine. The baseline is `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true` and `webSecurity` left on, all of which recent Electron versions default to but old code often overrides. The common real-world holes are elsewhere: a preload that exposes `ipcRenderer` or a generic `invoke(channel, ...args)` through `contextBridge`; IPC handlers in the main process that run shell commands, open paths or URLs from renderer arguments without validation or a sender check; `shell.openExternal` on any URL (which can launch `file:` or custom protocol handlers); `will-navigate` and `setWindowOpenHandler` not restricted, so a link loads attacker content into a privileged window; remote content loaded into a window with a preload; and auto-update over plain HTTP or without code signing. Outdated Electron also means an outdated Chromium with public exploits.
</context>

<task>
Harden this Electron app: {{app}}

1. Read `package.json` for the Electron version and compare it with the supported release lines; flag it if it is out of support.
2. Find every `BrowserWindow`, `BrowserView`, `WebContentsView` and `<webview>`, and record `webPreferences` (contextIsolation, nodeIntegration, sandbox, webSecurity, allowRunningInsecureContent, preload) and what content each loads.
3. Read every preload script. Replace any exposure of `ipcRenderer`, `require` or generic invoke with narrow, named functions that take typed arguments.
4. Read every `ipcMain.handle`/`on` handler. Validate arguments, check `event.senderFrame` origin is the app's own, and remove or constrain handlers that run commands, read or write arbitrary paths, or open arbitrary URLs.
5. Restrict navigation: a `will-navigate` handler and `setWindowOpenHandler` that deny by default and send allowed external links to `shell.openExternal` only after checking the scheme is `https` (and the host against an allowlist if possible).
6. Add a Content Security Policy for local pages (no `unsafe-eval`, no remote script origins unless required), and use a custom protocol or `file` loading consistently.
7. Check auto-update: HTTPS feed, signed builds on macOS and Windows, and signature verification by the updater. Enable relevant Electron fuses (for example disabling `RunAsNode` and the Node CLI inspect flags) if the build tool supports them.
8. Apply the changes, run the app's tests and a build, and smoke test that windows, links and IPC calls still work.
</task>

<constraints>
- Do not weaken any existing security setting to fix a feature; find another way and explain it.
- Keep the IPC API surface the UI needs; list any renderer code that must change.
- Do not change signing certificates or release infrastructure; describe what is needed.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current settings
Table: window, content loaded, contextIsolation, nodeIntegration, sandbox, preload.
## Findings
Ranked list: severity, file:line, how it could be exploited, fix.
## Changes
One line per file: `path`, what changed.
## Verification
Commands and manual checks run, with results.
## Residual risk
What remains, including Electron version and update signing status.
</output_format>
