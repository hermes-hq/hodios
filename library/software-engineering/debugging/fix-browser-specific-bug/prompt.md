---
schema: 1
id: fix-browser-specific-bug
kind: prompt
title: Fix a bug that only happens in one browser
description: Finds why a web page works in one browser but breaks in Safari, Firefox or mobile browsers, and fixes it with feature detection rather than browser sniffing.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript, html-css]
requires: [repo-read, file-write, shell]
inputs: [logs, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cross-browser, safari, webkit, compatibility, browserslist]
pairs_with:
  prompts: [fix-css-layout-bug, debug-network-request, fix-cookie-not-being-set]
args:
  - name: symptom
    description: "What breaks, in which browsers and versions and on which devices, and what works where. Include console errors from the failing browser."
    type: text
    required: true
  - name: code
    description: "The page or component code, and the build config (browserslist, Babel or TypeScript target, polyfills), or their paths."
    type: text
output_contract:
  format: markdown
  sections: [Difference between browsers, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who has fixed many "only in Safari" bugs. The cause is usually one of these:
- An API or syntax the browser version does not support, compiled for the wrong target: a newer JavaScript method (`Array.prototype.at`, `structuredClone`, `Object.groupBy`), regex lookbehind in older Safari, a CSS feature (`:has`, container queries, `dvh` units, subgrid) on an older version. Check the browserslist and the build target, and compatibility data.
- Date parsing: `new Date('2026-03-01 10:00')` (space instead of `T`) is invalid in Safari; only ISO 8601 with `T` is reliable.
- Storage and privacy: Safari's Intelligent Tracking Prevention partitions or deletes third-party cookies and storage, private browsing modes limit storage, and iframes from another site cannot set cookies.
- Media: autoplay requires `muted` and `playsinline` on iOS; codecs differ; audio needs a user gesture.
- iOS specifics: `100vh` includes the area under the browser bars (use `dvh`/`svh`), `position: fixed` with the on-screen keyboard, inputs under 16px font size zoom the page, `:hover` sticking on tap, and all iOS browsers use WebKit, so "Chrome on iPhone" behaves like Safari.
- Events: `click` on non-interactive elements on iOS, passive listeners and `preventDefault` on touch, `beforeunload` limits, pointer versus mouse events.
- Layout engines: flexbox gaps and min sizes, `overflow` with `position: sticky`, form control default styles.
- Extensions, content blockers and enterprise policies, which can make one user's browser look broken.
Feature detection (`'x' in window`, `CSS.supports()`, `@supports`) is reliable; user agent sniffing breaks with each release.
</context>

<task>
Fix this browser-specific bug.

Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the code that runs in the failing scenario and the build target configuration.
2. List which features, APIs and behaviours in that code differ in the failing browser, using the console error first. Say how to confirm each (open Web Inspector on the device via remote debugging, `CSS.supports` in the console, a minimal test page).
3. Name the cause. If you cannot tell without testing on the device, say what to test and stop there.
4. Fix it with the most standards-based option: correct the build target or add the specific polyfill, use a supported API, parse dates in ISO format or with a library already in the project, add `@supports` fallbacks, use the iOS-safe units and attributes.
5. Say which browsers and versions were tested and which need a real-device check.
</task>

<constraints>
- Do not use user agent sniffing as the fix unless there is no detectable feature, and then say why.
- Do not add a large polyfill bundle for one missing method.
- Do not claim a feature is supported or unsupported in a browser version from memory when unsure; say how to check.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Difference between browsers
The API, behaviour or CSS feature that differs, and the evidence for it.
## Cause
Why it fails in that browser.
## Fix
The diff, using feature detection or a standards-based alternative.
## Verification
Where it was tested, and what still needs testing on a real device.
</output_format>
