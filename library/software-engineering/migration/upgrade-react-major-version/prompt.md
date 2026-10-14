---
schema: 1
id: upgrade-react-major-version
kind: prompt
title: Upgrade React to a new major version
description: Upgrades a React app across a major version, such as 18 to 19, using the official codemods, replacing removed APIs, fixing ref and context changes and checking library compatibility.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [react]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [breaking-changes, codemods, peer-dependencies, react-19]
pairs_with:
  prompts: [upgrade-major-dependency, convert-class-components-to-hooks]
args:
  - name: target_version
    description: The React major version to move to.
    type: string
    default: "the latest stable major"
  - name: project
    description: "Anything known about the app: current React version, framework (Vite, Next.js, Remix, React Native), TypeScript, test setup, key UI libraries."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Blockers, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A React major upgrade is rarely blocked by your own code. It is blocked by the libraries that pin `react` and `react-dom` in their peer dependencies, by the type package moving at the same time, and by the test setup. The React team ships a last minor before each major (18.3 before 19) that logs a warning for every API the major removes, so the safe route is: move to that minor, clear its warnings, then take the major. For 18 to 19 the removals that bite are `ReactDOM.render` and `hydrate` (use `createRoot` and `hydrateRoot`), `unmountComponentAtNode`, `findDOMNode`, string refs, legacy context (`contextTypes`, `getChildContext`), `propTypes` checks and `defaultProps` on function components (use default parameters), and `act` moving from `react-dom/test-utils` to `react`. New behaviour to adopt or watch: `ref` is a plain prop on function components so `forwardRef` becomes optional, `<Context>` can be used as the provider, ref callbacks may return a cleanup function (so an implicit return from a ref callback is now an error in TypeScript), and `useRef` needs an argument in the types. Upgrading `@types/react` and `@types/react-dom` with the runtime is part of the job, and the types change on their own (for example the global `JSX` namespace moves under `React.JSX`, and element props default to `unknown` instead of `any`).
</context>

<task>
Upgrade React to {{target_version}}.
{{#project}}
About the project:
{{project}}
{{/project}}

1. Read `package.json`, the lockfile and the entry point. Record the current `react`, `react-dom` and `@types/react*` versions, the framework, and how the root is rendered.
2. Run the build, type check, lint and tests and record the results as the baseline.
3. Get the official React upgrade guide for every major between current and target. Fetch it if you can; otherwise ask the user to paste it and stop. Do not list breaking changes from memory alone.
4. List every dependency with a peer dependency on `react` or `react-dom` (component libraries, form, routing, state, animation, testing libraries). For each, find the first version that supports the target and whether that is itself a major upgrade. Report blockers before touching code.
5. If a last minor before the target exists (for example 18.3 before 19), upgrade to it first, run the app and tests, and collect every deprecation warning.
6. Run the official React codemods for the target, including the types codemod if the project uses TypeScript, then review every change they made. Fix what they cannot: legacy context, string refs, `findDOMNode` uses, `defaultProps` on function components, root rendering.
7. Upgrade `react`, `react-dom` and the type packages together, plus the libraries from step 4. Use the package manager; never force past peer conflicts with flags.
8. Update the test setup (`act` import, testing library versions, any shallow renderer use).
9. Run the baseline checks again, start the app, and click through the main screens with the console open, looking for new warnings and double-rendering effects.
</task>

<constraints>
- Do not use `--force`, `--legacy-peer-deps` or overrides to hide a library that does not support the target. Report it as a blocker with its options (upgrade, replace, wait).
- Do not rewrite components to new patterns (Actions, `use`, compiler-friendly refactors) as part of the upgrade. List them as follow-ups.
- Keep `forwardRef` where it works; removing it is optional cleanup, not required.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current versions, framework, root rendering, baseline check results.
## Blockers
Table: library, current version, supports target from, action needed. "None" if clear.
## Changes made
Grouped by kind of change (codemod output, manual API replacements, types, tests), with files.
## Verification
Table: check, before, after. Plus what was clicked through in the running app.
## Follow-ups
Deprecations that will break in the next major, optional new patterns, anything not verified.
</output_format>
