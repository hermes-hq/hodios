---
schema: 1
id: fix-hot-reload-not-working
kind: prompt
title: Fix hot reload or file watching that stopped working
description: Fixes a dev server whose hot reload or file watching does not pick up changes, covering watcher limits, Docker mounts, WSL paths, caches and HMR boundaries.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [config, logs, repo]
output: [explanation, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [hot-reload, hmr, file-watching, dev-server, wsl]
pairs_with:
  prompts: [find-ignored-config-setting, fix-stale-cache-bug]
args:
  - name: symptom
    description: "What happens when you save a file: nothing, a full reload instead of a hot update, state lost, or changes appear only after a restart. Include any warning in the terminal or browser console."
    type: text
    required: true
  - name: setup
    description: "The dev server and tool (Vite, Next.js, webpack, nodemon, uvicorn --reload, Flask debug, Spring devtools), and where it runs: macOS, Linux, Windows, WSL 2, Docker, a VM or a network drive."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where the chain breaks, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes slow dev loops. Hot reload is a chain: the editor writes the file, the OS emits a file system event, the watcher sees it, the tool rebuilds, and the browser or process updates. Find the broken link before changing anything:
- No file system events: Docker bind mounts from macOS or Windows hosts, files on the Windows side of WSL 2 (`/mnt/c/...`) watched from Linux, network drives and some VMs do not deliver inotify events. Fix by moving the project into the Linux file system in WSL, or enabling polling (`CHOKIDAR_USEPOLLING`, Vite `server.watch.usePolling`, `WATCHPACK_POLLING`), which costs CPU.
- Watcher limits on Linux: "ENOSPC: System limit for number of file watchers reached" means `fs.inotify.max_user_watches` is too low or the watcher includes `node_modules`.
- The watcher ignores the path: a file outside the project root, a symlinked package in a monorepo, an ignore pattern, or editors that save via rename ("safe write") confusing some watchers.
- The rebuild is fine but the update is not applied: React Fast Refresh only hot-updates files that export components only, so a file that also exports a constant or a non-component triggers a full reload; anonymous default exports or class components lose state; an HMR websocket that cannot connect through a proxy or from a container (configure the client port and host).
- Server reloaders: uvicorn `--reload` and Flask watch only certain directories and file types; Spring devtools needs a rebuild in the IDE to trigger; nodemon needs the right `watch` and `ext` settings.
- Caches: a stale `.next`, `.vite` or `node_modules/.cache`, or a service worker serving old assets.
</context>

<task>
Fix hot reload for this setup.

Symptom:
{{symptom}}

Setup:
{{setup}}

1. Read the dev server config and how it is started (package.json scripts, compose files, devcontainer config).
2. Test the chain from the start: touch a file and see whether the dev server logs a change. If it does not, the problem is events or the watcher; if it does, the problem is the rebuild or the update.
3. Name the cause from the list above, using the setup details.
4. Give the fix for this setup, preferring native events (moving the project into the WSL Linux file system, raising the inotify limit, fixing ignore patterns or the HMR client host and port) over polling. If polling is the only option, set a reasonable interval and say the CPU cost.
5. Say how to confirm it works, and which file to edit to test a hot update rather than a full reload.
</task>

<constraints>
- Do not suggest clearing caches or reinstalling `node_modules` as the first step unless the evidence points to a cache.
- Ask before changing system settings such as inotify limits, and give the persistent way to set them only on the user's machine.
- Keep changes to dev configuration; do not change production builds.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the chain breaks
Which link fails: the file system event, the watcher, the rebuild, or the browser update.
## Cause
The cause in one paragraph.
## Fix
The config or setup change.
## Check
How to confirm, and the trade-off of the fix if it uses polling.
</output_format>
