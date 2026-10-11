---
schema: 1
id: review-react-code-change
kind: prompt
title: Review a React code change
description: Reviews a React diff for effect misuse, stale closures, unstable keys, derived state copied into state, wasted re-renders, missing loading and error states, and hook rule breaks.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer, fullstack-engineer]
stack: [react, typescript]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hooks, use-effect, stale-closures, re-renders, pull-request]
pairs_with:
  personas: [react-engineer]
  prompts: [review-pull-request, fix-react-state-and-effect-bug, fix-react-rerenders]
  rules: [react-component-rules]
args:
  - name: diff
    description: The React diff with file paths. Include the parent that renders the changed component and any custom hooks it calls if they are not in the diff.
    type: text
    required: true
  - name: context
    description: React version, framework (Vite SPA, Next.js, Remix), the data-fetching and state libraries in use (TanStack Query, SWR, Redux, Zustand), and whether Strict Mode is on.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most React defects that reach production pass type checks and look reasonable line by line. They come from a few shapes. An effect used for something that is not synchronisation with an outside system: computing derived values, reacting to a user event, or resetting state when a prop changes, each of which causes an extra render and often a flash of stale UI. A dependency array that lies (missing values give stale closures, so a handler reads the first render's state; objects or functions created during render make the effect run every time, sometimes in a loop). A fetch in an effect with no cleanup, so a slow earlier response overwrites a newer one. Props copied into `useState`, which silently ignores later prop changes. Index or random keys, which keep the wrong input state attached to the wrong row after a reorder or delete. State updates that read the current value instead of using the updater form, losing increments when batched. Hooks called conditionally or after an early return. Strict Mode runs effects twice in development precisely to expose missing cleanup, so "it double-fires in dev" is a symptom, not noise. Memoisation is only worth flagging when it is missing on a measured hot path or present but defeated by an unstable dependency.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed component in full, its parent, and the custom hooks it uses; check the React version in `package.json` and how the project already fetches data and manages state. Run the type checker, the linter (including `react-hooks/exhaustive-deps` if configured) and the related tests if you can, and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. For every `useEffect` and `useLayoutEffect`, name the external system it synchronises with. If there is none, say what should replace it: a value computed during render, `useMemo` if it is measurably expensive, logic moved into the event handler, or a `key` to reset state.
3. Check each dependency array against what the effect, callback or memo reads. Flag missing dependencies (stale closures), unstable objects and functions defined in render, effects that set state they depend on, and `eslint-disable` comments on the hooks rule.
4. Check async work: fetches or subscriptions without cleanup or an `AbortController`, out-of-order responses, state set after unmount, timers and listeners not removed, and server data duplicated into local state when the project already has a data-fetching library. On React 19, also check `use()` given a promise created during render (a new promise every render, so it never settles; it must be cached or come from the framework or data library), and form actions with `useActionState`, `useOptimistic` or `useFormStatus` that miss the pending, error or rollback case.
5. Check state: props copied into state without a reset rule, derived values stored instead of computed, updates that should use the updater form, objects or arrays mutated in place, and state held higher than the components that use it.
6. Check lists and identity: keys that are indexes on reorderable or filterable lists, keys generated during render, and components defined inside other components (which remount on every render and lose their state).
7. Check states the user sees: loading, empty, error with a retry, and double submission while a request is pending.
8. Only for code on a hot path (long lists, inputs, animation), flag work that re-renders large subtrees on every keystroke and memoisation defeated by unstable props. Do not ask for `useMemo` or `memo` elsewhere.
9. For each finding, write the user action or prop change that triggers it and what goes wrong. Drop any finding you cannot trigger.
</task>

<constraints>
- State the React version you assumed. Do not apply React 19 or compiler-specific advice to older versions, and do not flag manual memoisation as redundant unless the React Compiler is confirmed to be enabled.
- Fix with React itself and the project's existing libraries before suggesting new dependencies.
- At most 10 findings, most severe first: wrong data shown or lost input, then broken states, then leaks, then render cost. No formatting or naming comments.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity (high, medium, low), `path:line`, the component or hook, the defect, the triggering action or prop change, and the fix in one or two sentences.
## Missing tests
Bullets naming the user-visible behaviour each test covers (for example "typing fast then clearing shows results for the empty query"), or "None".
## Questions
Versions, library choices or intended behaviour you need confirmed, or "None".
</output_format>
