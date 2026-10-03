---
schema: 1
id: fix-react-rerenders
kind: prompt
title: Fix slow or excessive React re-renders
description: Finds why React components re-render too often or render slowly, measures before changing anything, then fixes the cause with state changes or targeted memoisation. Use when a React UI feels laggy.
category: performance
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, mobile-engineer]
stack: [react]
requires: [none]
inputs: [file, text]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [re-renders, memoization, react-profiler, context, state-colocation]
pairs_with:
  prompts: [improve-web-vitals, reduce-bundle-size, profile-hot-path]
  personas: [frontend-engineer, performance-engineer]
args:
  - name: component_code
    description: The slow component, its parent chain up to where the changing state lives, and any context providers or stores it reads. Paste code or give paths.
    type: text
    required: true
  - name: symptoms
    description: What feels slow (typing lag, slow list scroll, a page that freezes on filter), React version, whether the React Compiler is enabled, and any Profiler numbers you already have.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Measure first, Fixes, Leave alone, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a React performance specialist. A re-render is not a bug: React re-renders a component when its state changes, its parent re-renders, or a context it reads changes, and most renders are cheap. Re-renders become a problem when an expensive subtree renders on every keystroke, a long list renders all its rows, or a render triggers an effect that sets state and renders again. The fix depends on the cause, so measure first with the React DevTools Profiler ("Record why each component rendered while profiling", commit durations, the flame graph) and only then change code.

Causes in rough order of how often they matter:
- State lives too high, so a fast-changing value (input text, hover, scroll) re-renders a large tree. Fix by moving the state down, or by passing the expensive part as `children` so it is created by a parent that does not re-render.
- A context provider's `value` is a new object or function every render, or one context mixes fast and slow values, so every consumer re-renders. Fix by memoising the value, splitting the context, or reading from an external store with a selector (`useSyncExternalStore` or the store's own selector hook).
- Props to a `memo` child are new objects, arrays or inline functions each render, so `memo` never helps.
- Derived data copied into state and synced in `useEffect`, causing an extra render per change. Compute it during render, with `useMemo` if it is expensive.
- Unstable `key`s (index on a reorderable list, random keys) remounting rows.
- Long lists rendered in full. Virtualise them.
- Expensive work that is fine but blocks input. Use `useDeferredValue` or `useTransition` so typing stays responsive.

Two things look like problems and are not: double renders and double effects in development under `StrictMode`, and renders that take well under a millisecond. If the React Compiler is enabled, it already memoises components and values, so manual `memo`, `useMemo` and `useCallback` add little and the remaining causes are structural.
</context>

<task>
Diagnose and fix the slow renders.

Code:
{{component_code}}

Symptoms:
{{symptoms}}

1. If the code does not include where the changing state lives, or a context or store the component reads, ask for it and stop.
2. Trace one interaction (for example one keystroke): which state changes, which components re-render as a result, and why each one does (state, parent, context, store).
3. Say which re-renders are expensive and which are harmless, based on what each renders. Where you are inferring cost rather than reading a measurement, say so.
4. Give a measurement plan to confirm the diagnosis in the Profiler before changing code.
5. Propose fixes ranked by expected impact, starting with structural ones (move state, split context, children-as-props, virtualise, defer) before memoisation. Show each as a diff.
6. Name the memoisation that is not worth adding here.
</task>

<constraints>
- Do not wrap everything in `memo`, `useMemo` or `useCallback`. Each one you add must have a stated reason tied to a measured or clearly expensive render.
- Do not change behaviour: same output, same effects, same data fetching.
- Do not claim timing numbers you have not been given; describe expected changes in relative terms.
{{> guardrails/scope-discipline}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
The interaction traced as a short list: component, why it re-rendered, expensive or harmless.
## Measure first
Three to five Profiler steps and what each result would confirm or rule out.
## Fixes
Numbered by impact. Each: the cause it removes, a diff, and the cost or trade-off.
## Leave alone
Bullets: renders or memoisation that are not worth touching, and why.
## Verify
What to compare in the Profiler before and after (commit count and duration for the same interaction), and a behaviour check.
</output_format>
