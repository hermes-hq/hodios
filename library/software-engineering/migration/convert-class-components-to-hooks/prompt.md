---
schema: 1
id: convert-class-components-to-hooks
kind: prompt
title: Convert class components to hooks
description: Converts React class components to function components with hooks, mapping lifecycles to effects correctly and keeping refs, error boundaries and behaviour, one component at a time with tests.
category: migration
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [frontend-engineer, software-engineer]
stack: [react]
requires: [none]
inputs: [file, text]
output: [code, tests, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [react-hooks, class-components, use-effect, legacy-code, stale-closures]
pairs_with:
  prompts: [upgrade-major-dependency, replace-state-management-library]
  personas: [migration-engineer]
args:
  - name: component_code
    description: The class component to convert, plus any HOCs, contexts or child components it relies on. One component per run works best.
    type: text
    required: true
  - name: test_setup
    description: The test tools in use (for example "Jest with React Testing Library", "Vitest", "Enzyme, moving off it") and whether tests exist for this component.
    type: string
    default: "unknown; assume React Testing Library"
output_contract:
  format: markdown
  sections: [Behaviour inventory, Converted component, Mapping notes, Tests, Risks and follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A React engineer is moving an older codebase from class components to function components and hooks, one component at a time. Mechanical conversions break in predictable places: `componentDidMount` plus `componentDidUpdate` collapsed into one effect with the wrong dependency array (missed updates or infinite loops), `this.state` merges replaced by `useState` setters that do not merge, stale closures in timers and event listeners, `setState` callbacks dropped, instance fields that should be refs turned into state (extra renders), and `getDerivedStateFromProps` copied into state that drifts. Error boundaries cannot be hooks and must stay classes. A good conversion first pins the current behaviour with tests, then converts, then proves the same tests pass.

Test setup: {{test_setup}}
</context>

<task>
<component_code>
{{component_code}}
</component_code>

1. Inventory behaviour before touching code: props and defaults (`defaultProps`, `propTypes`), each state field, every lifecycle method and what it does, instance fields (`this.timer`, `this.inputRef`), refs and `forwardRef` or `ref` usage by parents, context (`contextType`, consumers), HOCs wrapping it, and imperative methods parents call via a ref.
2. Stop and say so if the component is an error boundary (`componentDidCatch` or `getDerivedStateFromError`): keep it a class, or extract a small class boundary and convert the rest.
3. Write characterisation tests for the class version first if none exist: render output for key props, user interactions, effects that fetch or subscribe, cleanup on unmount, and the behaviour on prop change. Test through the DOM and user events, not instance methods or internal state, so the same tests run against both versions.
4. Convert with these mappings:
   - State: one `useState` per independent field; `useReducer` when fields change together or the next state depends on several of them. Replace object merges explicitly.
   - Lifecycles: one effect per concern, not per lifecycle. Mount-only work gets `[]`; work reacting to a prop gets that prop in the array; every subscription returns its cleanup. Data fetching guards against out-of-order responses (an ignore flag or AbortController).
   - `componentDidUpdate(prevProps)` comparisons become dependency arrays; keep an explicit previous-value ref only when the old value is really needed.
   - `getDerivedStateFromProps`: compute during render, use a `key` to reset, or adjust state during render, in that order of preference.
   - `shouldComponentUpdate` or `PureComponent`: `React.memo` with the same comparison, only if it was there.
   - Instance fields and timers: `useRef`. Callbacks passed to memoised children: `useCallback`, otherwise plain functions.
   - Imperative methods: `forwardRef` (or the ref prop on newer React) plus `useImperativeHandle`, keeping method names.
   - `setState(updater, callback)`: functional updates, and the callback moved into an effect keyed on the state it waited for.
   - `defaultProps`: default parameter values.
5. Follow the rules of hooks and the exhaustive-deps lint rule; never silence it. If a dependency causes loops, fix the cause (move the function inside the effect, use a functional update, or memoise the input).
6. Run through the tests mentally against the new version and say which ones need changes and why. A test that only checked `wrapper.state()` gets rewritten to check visible behaviour.
</task>

<constraints>
- Convert only the component given. Do not restyle, rename props, change the public API or add features.
- Keep behaviour identical, including double-render-safe effects under Strict Mode (effects must tolerate mount, unmount, mount).
- If the component body is missing or elided (for example `/* 400 lines */` or `...`), do not write a conversion: list what the inventory needs (the full class, how parents use its ref, the React version) and stop.
- If the code depends on files not shown (HOCs, context providers, a parent calling a ref method), say what you assumed and list the files to check.
- Keep HOC wrappers such as `connect` or `withRouter` around the converted component; swapping them for hooks is a separate follow-up, listed under Risks and follow-ups.
- If the existing tests use shallow rendering or read instance state, write the new tests with the behaviour-based library instead and list the old ones to retire.
- Do not invent React APIs. If the React version is unknown and matters (for example the ref prop versus `forwardRef`), ask or show both.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviour inventory
Table: item (state, lifecycle, ref, context, method) | what it does now | where it goes.

## Converted component
The full function component in one code block, same language (JS or TS) and file layout as the input.

## Mapping notes
Bullets for each non-obvious decision: dependency arrays, reducer choice, refs kept, anything deliberately not memoised.

## Tests
Characterisation tests in one code block (written against behaviour, valid for both versions), and a list of existing tests that must change.

## Risks and follow-ups
Behaviour that could differ, files to check, and whether the component is safe to ship alone.
</output_format>
