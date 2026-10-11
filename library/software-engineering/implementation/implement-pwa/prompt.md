---
schema: 1
id: implement-pwa
kind: prompt
title: Make a web app an installable PWA
description: Turns a web app into an installable PWA with a complete manifest, a service worker with per-request caching strategies, an offline page, safe update prompts and a kill switch.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, config, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pwa, service-worker, web-app-manifest, offline, caching-strategy]
pairs_with:
  prompts: [implement-offline-sync, implement-push-notifications]
  personas: [frontend-engineer]
args:
  - name: app_context
    description: The app, its framework and what should work offline, for example "Vite React field-inspection app; open last viewed jobs offline, data syncs later".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Manifest, Caching strategy, Update flow, Changes, Verification, Platform limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer making a web app installable and resilient offline. A service worker is a proxy between your app and the network that outlives deploys, so mistakes are sticky:
- Manifest: `name`, `short_name`, `start_url`, `scope`, `display`, `theme_color`, `background_color`, and icons at 192 and 512 pixels including a `maskable` one. The app must be served over HTTPS. Current Chromium browsers no longer require a service worker to offer install; the worker is for offline support and caching, not installability.
- The service worker's scope is its path; serve it from the root for the whole app, and serve `sw.js` with `Cache-Control: no-cache` so updates are found.
- Caching per request type: precache the app shell and hashed static assets (cache-first, revisioned by the build); network-first with a timeout for HTML navigations, falling back to an offline page; stale-while-revalidate for non-critical assets such as avatars; API responses with user data are not cached unless offline use requires it, and then never shared across accounts (clear on sign-out).
- Use the build's tooling (Workbox, `vite-plugin-pwa`, Serwist for Next.js, the framework's own module) rather than a hand-written worker.
- Updates: a new worker waits until all tabs close. Calling `skipWaiting` unconditionally swaps the worker under a running page, which then requests chunks that no longer exist. Show an "update available" prompt, then activate and reload on the user's choice.
- Keep a kill switch: a way to ship a worker that clears caches and unregisters itself if a bad worker goes out.
- Install prompts: `beforeinstallprompt` exists only in Chromium browsers. iOS installs via Share then Add to Home Screen, with its own limits on storage and background work.
- Offline data sync is a separate problem; this job covers installability and caching.
</context>

<task>
Make this app a PWA:
{{app_context}}

1. Read the build setup, framework, routing, how assets are hashed, API calls, auth and sign-out, and hosting headers.
2. Write the manifest and create icons from the existing logo if available, or list the icons needed.
3. Write the caching strategy per request type, including what is never cached.
4. Implement the service worker with the build's PWA tooling, the offline page, cache clearing on sign-out, the update prompt and the kill switch, and set the `no-cache` header for the worker file in the hosting config.
5. Verify in a production build: the manifest is valid, the app installs, offline navigation shows cached pages or the offline page, and a new deploy shows the update prompt without breaking the open tab. Add automated tests where the project's tooling allows.
</task>

<constraints>
- Never cache authenticated API responses in a way another account on the same device can read.
- Never call `skipWaiting` without a user-facing update path.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Manifest
The manifest fields and icons.
## Caching strategy
A table: Request type | Strategy | Expiry | Notes.
## Update flow
How a new version is detected, offered and activated, and the kill switch.
## Changes
One line per file: `path`, what changed.
## Verification
Checks run and their actual results.
## Platform limits
What behaves differently on iOS and other browsers.
</output_format>
