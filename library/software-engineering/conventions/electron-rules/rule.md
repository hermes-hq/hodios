---
schema: 1
id: electron-rules
kind: rule
title: Electron rules
description: Standing rules for Electron apps covering context isolation, sandboxed renderers, a typed preload bridge, validated IPC, navigation limits, secure updates and main-process hygiene.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [electron]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [ipc, preload, context-isolation, sandbox, auto-update]
applies_to: ["**/main/**", "**/preload/**", "**/electron/**", "**/*.ts", "**/*.js"]
pairs_with:
  rules: [typescript-strict-rules, secure-coding-rules]
  prompts: [harden-electron-app, speed-up-electron-app]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Electron app:

**Know the setup first**
- Check the Electron version in `package.json` and the build tool (Electron Forge, electron-builder, electron-vite or custom) before using APIs or changing config. Defaults changed across major versions; follow what this version documents.
- Find where windows are created and where the preload script lives. Follow the existing IPC naming and folder layout.

**Process boundary (never weaken it)**
- Every `BrowserWindow` and `WebContentsView` keeps `contextIsolation: true`, `nodeIntegration: false` and `sandbox: true`. Never turn these off to make something work; expose what the renderer needs through the preload script instead.
- Never set `webSecurity: false`, `allowRunningInsecureContent: true` or enable `experimentalFeatures` in shipped code.
- Treat the renderer as untrusted, like a web page. Anything it sends is input to validate.

**Preload and IPC**
- The preload script exposes a small, named API with `contextBridge.exposeInMainWorld`: one function per action (`saveFile(path, data)`), never `ipcRenderer` itself, never a generic `send(channel, ...args)` or `invoke(channel)` passthrough.
- Use `ipcRenderer.invoke` with `ipcMain.handle` for request and response; use `send` and `on` only for fire-and-forget events. Keep channel names in one shared constants module with typed payloads.
- In every `ipcMain.handle`, validate the arguments (type, range, allowed paths) and check `event.senderFrame` origin when more than one origin can load. Do not let the renderer pass arbitrary file paths, shell commands or URLs to the main process without an allow-list.
- Return plain serialisable data, never Node objects, functions or class instances.

**Content and navigation**
- Load local content from the packaged files or a custom protocol, not `file://` with broad access. Set a Content-Security-Policy that disallows inline scripts and remote code.
- Block unexpected navigation with a `will-navigate` handler and control new windows with `setWindowOpenHandler`. Open external links in the system browser with `shell.openExternal`, only for `https:` URLs you have checked.
- Never load remote web content into a window that has a preload with privileged APIs.

**Main process**
- Keep the main process responsive: no synchronous file or network work on the main thread in handlers, no `*Sync` APIs in hot paths. Move heavy work to a utility process or worker.
- Store user data under `app.getPath('userData')`, not next to the executable. Store secrets with `safeStorage` or the OS keychain, never in plain JSON or `localStorage`.
- Handle `window-all-closed`, `activate` and single-instance lock the way the platform expects (macOS keeps the app open).

**Updates and packaging**
- Auto-update only from a signed release channel over HTTPS, with code signing on macOS and Windows. Never download and run code from an unverified URL.
- Enable the Electron fuses the project supports (for example disabling `RunAsNode` and enabling ASAR integrity) and do not turn existing ones off.
- Keep `electron` and the build tool on supported versions; old majors stop getting Chromium security fixes.

**Before you finish**
- Run the type check, lint and tests, start the app, and exercise the changed IPC path. Say what you ran and what still needs a packaged-build check on each platform.
