---
schema: 1
id: fix-angular-change-detection-error
kind: prompt
title: Fix an Angular change detection error
description: Fixes ExpressionChangedAfterItHasBeenChecked errors, views that do not update under OnPush, and signal or zone issues in Angular.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
requires: [repo-read, file-write, shell]
inputs: [stack-trace, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [change-detection, onpush, signals, zonejs, rxjs]
pairs_with:
  personas: [angular-engineer]
args:
  - name: symptom
    description: "The error or behaviour: ExpressionChangedAfterItHasBeenCheckedError with its previous and current values, a view that does not update until a click, or an update that happens late."
    type: text
    required: true
  - name: code
    description: "The component, its template, the parent and any services or observables involved, or their paths."
    type: text
  - name: version
    description: "The Angular version and whether the app is zoneless, uses signals, OnPush, or standalone components."
    type: text
output_contract:
  format: markdown
  sections: [What change detection is doing, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an Angular engineer who understands change detection runs top-down and, in development mode, runs a second check to make sure bindings did not change during the first. The two families of bugs:

ExpressionChangedAfterItHasBeenChecked (dev-mode only, but signals a real data-flow problem):
- A child changes parent state during its own lifecycle hooks (`ngOnInit`, `ngAfterViewInit`), for example a child emitting an event that updates a parent binding already checked.
- A getter or method used in a template that returns a new value each call (`new Date()`, a new array or object).
- Values set in `ngAfterViewInit` or `ngAfterContentInit` that feed bindings already rendered.
Fixes: move the state to where it is owned, compute it earlier (`ngOnInit`, constructor, a signal or computed), make template expressions pure, or restructure so data flows one way. `setTimeout` or `detectChanges()` in the hook only hides it.

Views that do not update:
- `OnPush` components only check when an input reference changes, an event fires in the component, an `async` pipe emits, or a signal read in the template changes. Mutating an input object in place does nothing.
- Work outside Angular's zone (third-party libraries, `runOutsideAngular`, some WebSocket or map SDK callbacks) does not trigger change detection in zone-based apps.
- Zoneless apps (experimental from Angular 18, stable in 20, the default for new projects from 21) rely on signals, the `async` pipe, `markForCheck` and events; plain field assignments from timers or promises do not update the view.
- Subscriptions that set fields instead of using the `async` pipe or `toSignal`.
</context>

<task>
Fix this change detection problem.

{{#version}}
Angular setup: {{version}}

{{/version}}
Symptom:
{{symptom}}
{{#code}}

Code:
{{code}}
{{/code}}

1. Read the component, template, parent and the data source. Note the change detection strategy and whether the app uses zone.js.
2. For the dev-mode error, use the previous and current values in the message to find the binding, then find where it changes after being checked. For views that do not update, find what change detection trigger is missing.
3. Name the cause from the families above.
4. Fix data flow at the source: immutable updates for OnPush inputs, signals or the `async` pipe for async data, pure template expressions, state computed before the view is checked, `NgZone.run` for callbacks from outside the zone, or `markForCheck` where a manual trigger is the honest model.
5. Verify with a component test or browser steps, and run the app in development mode to confirm the error no longer appears.
</task>

<constraints>
- Do not wrap updates in `setTimeout`, `Promise.resolve().then` or call `detectChanges()` in lifecycle hooks to silence the error, unless you explain why it is genuinely the right model.
- Do not switch a component's change detection strategy back to Default as the fix for OnPush without saying why.
- Do not use `enableProdMode` to hide the dev-mode check.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What change detection is doing
When the value changes relative to the check that read it, or why no check runs after the change.
## Cause
The cause, with the line.
## Fix
The diff.
## Verification
How it was confirmed: a test with fixture.detectChanges or browser steps, and that the dev-mode error is gone.
</output_format>
