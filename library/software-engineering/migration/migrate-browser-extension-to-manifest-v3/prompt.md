---
schema: 1
id: migrate-browser-extension-to-manifest-v3
kind: prompt
title: Migrate a browser extension to Manifest V3
description: Migrates an existing Manifest V2 browser extension to Manifest V3, moving the background page to a service worker, blocking webRequest to declarativeNetRequest, and fixing remote code and permissions.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [browser-extensions, manifest-v3, service-workers, chrome-web-store]
pairs_with:
  prompts: [build-browser-extension, upgrade-major-dependency]
args:
  - name: notes
    description: "Target browsers (Chrome, Edge, Firefox, Safari), what the extension does, APIs used, whether it blocks or modifies requests, and any remotely loaded scripts."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Feature risks, Changes made, Verification, Store submission notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The Manifest V3 move is not a manifest edit; it changes how the extension lives. What people who have done it know: in Chromium browsers the background page becomes a service worker that is stopped when idle, so global variables vanish, `setTimeout` and `setInterval` for long waits do not survive (use the alarms API), event listeners must be registered synchronously at the top level, and there is no DOM (use an offscreen document for DOM or audio needs). Blocking `webRequest` is replaced by declarativeNetRequest rules for most extensions, with limits on rule counts and less flexibility, so some features cannot be ported one to one. Remotely hosted code and `eval` are banned, which breaks extensions that load scripts from a server or use some templating libraries. Host permissions move to `host_permissions`, `browser_action` and `page_action` merge into `action`, `tabs.executeScript` becomes the scripting API, `web_accessible_resources` need explicit `matches`, and the content security policy becomes an object. Firefox supports Manifest V3 but keeps event pages instead of service workers and still supports blocking webRequest, so a cross-browser build often needs per-browser manifest differences. Promise-based APIs are available, which tempts a rewrite; resist it until behaviour is ported.
</context>

<task>
Migrate this Manifest V2 extension to Manifest V3.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the manifest, background scripts, content scripts, popup and options pages, and the build setup. List every extension API in use and every permission.
2. Flag feature risks before changing code: blocking or modifying network requests, long-lived background state, timers, DOM use in the background, remote or `eval`-based code, and anything that depends on a persistent background page. For each, name the Manifest V3 approach and whether behaviour will change. Stop and ask if a core feature cannot be kept.
3. Update the manifest: `manifest_version`, `background.service_worker` (and per-browser background settings if Firefox is a target), `action`, `host_permissions`, `web_accessible_resources` with `matches`, and the CSP object.
4. Port the background: register listeners at top level, move in-memory state to the storage APIs (session storage for transient state), replace timers with alarms, move DOM work to an offscreen document or the content script, and replace `executeScript` and `insertCSS` calls with the scripting API.
5. Port request handling to declarativeNetRequest static or dynamic rules, keeping a table of old logic against new rules and noting anything lost.
6. Remove remote code and `eval`: bundle scripts locally and replace libraries that need `eval`.
7. Load the unpacked build in each target browser and test every feature, including after the service worker has been stopped (use the browser's tools to stop it) and after a browser restart.
</task>

<constraints>
- Do not claim a feature still works until it has been tested after the service worker restarts.
- Do not widen permissions or host permissions beyond what the extension already had without saying why; reviewers and users see them.
- Do not invent API names or rule limits; check the browser vendors' current documentation for numbers you rely on.
- Keep behaviour the same; no feature additions or UI changes in this change.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Manifest summary, APIs and permissions used, target browsers.
## Feature risks
Table: feature, V2 mechanism, V3 approach, behaviour change (yes/no and what).
## Changes made
Manifest changes, background port, request rules, removed remote code.
## Verification
Per browser and feature: tested, including after worker restart.
## Store submission notes
Permission changes and justifications reviewers will ask about.
</output_format>
