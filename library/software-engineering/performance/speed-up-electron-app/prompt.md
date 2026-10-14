---
schema: 1
id: speed-up-electron-app
kind: prompt
title: Speed up an Electron app
description: Cuts Electron app startup time and memory by bundling and lazy-loading modules, unblocking the main process, removing sync IPC and trimming windows, measured on a slow machine.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [frontend-engineer, fullstack-engineer, software-engineer]
stack: [electron]
requires: [repo-read, file-write, shell]
inputs: [repo, text, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [desktop-app, startup-time, main-process, ipc, memory-usage]
pairs_with:
  prompts: [reduce-memory-footprint, read-flame-graph, speed-up-cli-startup]
  personas: [performance-engineer]
args:
  - name: problem
    description: What is slow (time to first window, time to interactive, UI freezes, memory use), Electron version, platforms, number of windows, and any timings or memory numbers with the machine they came from.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Startup timeline, Causes, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Electron apps are slow to start mainly because of module loading: an unbundled app `require`s thousands of files from `node_modules`, each one a filesystem read and compile, and many top-level imports pull in libraries the first window never uses. Bundling the main and renderer code and requiring heavy modules lazily is usually the biggest win. The main process also runs the app's event loop for every window: any synchronous file, database, crypto or `execSync` work there freezes all windows, and synchronous IPC (`ipcRenderer.sendSync`, the old `remote` module) blocks the renderer until the main process answers. Heavy work belongs in a utility process or worker thread. Every `BrowserWindow` is its own renderer process with its own memory, so hidden windows kept "for speed" and many webviews add up. Showing the window on `ready-to-show` with a light first screen makes startup feel faster, but does not replace removing work. V8 snapshots and code cache can help further but are complex and version-sensitive, so they come last. Developer machines hide all of this; measure packaged builds on a slow machine.
</context>

<task>
Speed up this Electron app: {{problem}}

1. Read the main process entry, window creation, preload scripts, IPC handlers and the build or packaging config. Note the Electron version and whether code is bundled.
2. Baseline on a packaged build: time from launch to first window shown and to first meaningful content, main and renderer memory per process, measured several times. If numbers are missing, add timing marks and explain how to collect CPU profiles for the main process and the renderer.
3. Build a startup timeline: app ready, module loading, window creation, preload, renderer bundle parse, first data load. Attribute time to each phase.
4. Find the causes and cite file:line: unbundled or eagerly required modules, synchronous work in the main process, sync IPC, work done before the window shows that could wait, extra or hidden windows, large renderer bundles, and native modules loaded at startup.
5. Fix in order of impact: bundle and lazy-require; move blocking work to async APIs, a utility process or a worker; replace sync IPC with `invoke`/`handle`; defer non-critical initialisation until after first paint; close or lazily create windows; split the renderer bundle.
6. Re-measure on the same machine and build, run the test suite, and smoke-test the packaged app on each target platform available.
</task>

<constraints>
- Keep `contextIsolation`, sandboxing and the preload security model as they are or stricter; never trade security settings for speed.
- Report numbers only from packaged builds and name the machine.
- Treat V8 snapshots and custom code-cache setups as optional follow-ups with their maintenance cost.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Table: metric | value | machine | build | runs.
## Startup timeline
Table: phase | ms | main work.
## Causes
Ranked, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
Before and after for the same metrics, plus test and smoke-test results.
</output_format>
