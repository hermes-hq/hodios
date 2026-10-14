---
schema: 1
id: speed-up-angular-change-detection
kind: prompt
title: Speed up Angular change detection
description: Speeds up a sluggish Angular app by finding excess change detection with the profiler, then applying OnPush, signals, tracked loops, pure pipes and zone controls.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
stack: [angular]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [change-detection, onpush, signals, zone-js, angular-devtools]
pairs_with:
  prompts: [fix-angular-change-detection-error, slim-down-angular-components, speed-up-long-list-rendering]
  personas: [angular-engineer, performance-engineer]
args:
  - name: symptom
    description: What is slow (typing lag in a form, a dashboard that freezes, slow table scroll), which components are involved, the Angular version, and whether the app uses zone.js, signals or NgRx.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Profile, Causes, Changes, Results, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
With zone.js, every DOM event, timer, XHR and promise resolution triggers change detection, and with the Default strategy Angular checks every binding in every component on every cycle. That is fine for small trees and slow for large ones. The costs multiply in specific places: function calls and getters in templates (they run on every check), `*ngFor` or `@for` without proper tracking (DOM re-created when the array reference changes), high-frequency events such as `mousemove`, `scroll` or a `setInterval` polling loop triggering app-wide checks, and third-party libraries that schedule timers inside the zone. The fixes: `ChangeDetectionStrategy.OnPush` with immutable inputs, observables through the `async` pipe or signals so only affected views are checked; `track` in `@for` (required since Angular 17) or `trackBy`; pure pipes or `computed()` signals instead of template methods; `NgZone.runOutsideAngular` for high-frequency work, re-entering only to update state; event coalescing; and, on versions that support it, zoneless change detection. OnPush breaks code that mutates input objects in place, so mutations must be found first.
</context>

<task>
Speed up change detection for: {{symptom}}

1. Read `package.json` for the Angular version and check whether zone.js is used, then read the slow components, their templates, parents and the services or stores they read.
2. Profile: use Angular DevTools' profiler to record the slow interaction and note how many change detection cycles fire and which components take the most time. If you cannot run it, give the recording steps and list the code-level suspects you found.
3. Find the causes and cite file:line: template function calls and getters, untracked loops, Default-strategy components in hot subtrees, in-place mutation of inputs, high-frequency events and timers inside the zone, and subscriptions that call `detectChanges` unnecessarily.
4. Fix in order of impact: OnPush on the hot components (after fixing in-place mutations they depend on); signals or `async` pipe for state; tracking in loops; pure pipes or `computed()` for derived values; `runOutsideAngular` for high-frequency handlers; event coalescing. Propose zoneless only if the version supports it and the codebase is ready, as a separate step.
5. Re-profile the same interaction, run unit and end-to-end tests, and check that views still update after async changes.
</task>

<constraints>
- Before switching a component to OnPush, list every way its inputs and state change and make sure each one still triggers an update.
- Do not sprinkle `ChangeDetectorRef.detectChanges()` or `markForCheck()` to patch stale views; fix the data flow.
- Use APIs that exist in the installed Angular version; mark uncertain ones [CHECK DOCS].
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Profile
Change detection cycles and the costliest components before the change.
## Causes
Ranked, with file:line.
## Changes
One line per file: `path`, what changed.
## Results
Profile after the change and test results.
## Risks
Places where views could now miss an update, and how they were checked.
</output_format>
