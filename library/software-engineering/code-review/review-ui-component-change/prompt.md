---
schema: 1
id: review-ui-component-change
kind: prompt
title: Review a UI component change
description: Reviews a frontend component PR for state ownership, re-render and effect hazards, missing loading, empty and error states, responsive and accessibility basics, and token use. Use on UI pull requests.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer]
stack: []
requires: [none]
inputs: [diff, image]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ui-components, ui-states, re-renders, design-tokens, responsive]
pairs_with:
  prompts: [review-pull-request, build-ui-component, audit-web-accessibility]
args:
  - name: diff
    description: The component diff, ideally with its styles, tests and stories. Add screenshots or a short description of the design if you have them.
    type: text
    required: true
  - name: framework
    description: The UI framework the component uses.
    type: enum
    enum: [react, vue, angular, svelte, other]
    default: react
output_contract:
  format: markdown
  sections: [Verdict, Findings, State coverage, Screenshots to attach]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review a UI component change the way a senior frontend engineer does. Component PRs usually look fine in the one state the author tested: data loaded, wide screen, short English text, mouse user. The defects live in the other states and in how state and effects are wired: duplicated state that drifts, effects that loop or leak, a list that re-renders on every keystroke, a spinner that never ends when the request fails. Framework: {{framework}}.
</context>

<task>
<diff>
{{diff}}
</diff>

Read the whole diff, then check:
1. **State ownership.** Is each piece of state owned in one place? Flag props copied into local state without a sync rule, derived values stored instead of computed, server data duplicated outside the data-fetching layer, and state lifted higher than the components that use it.
2. **Effects and rendering.** Flag effects with missing or over-broad dependencies, effects that set state they depend on (loops), subscriptions, timers and listeners without cleanup, fetches without cancellation or a guard against out-of-order responses, new object or function props that defeat memoisation in hot lists, unstable or index keys on reorderable lists, and expensive work in render. Use the {{framework}} idiom (for example hooks rules in React, `watch` and `computed` in Vue, change detection and `OnPush` or signals in Angular, reactive statements and runes in Svelte).
3. **States.** For data-driven components, confirm each of: loading (and no layout jump when it resolves), empty, error with a way to retry, partial or slow data, very long text and long words, many items, zero or one item, disabled and read-only, and optimistic updates rolled back on failure.
4. **Responsive behaviour.** Narrow (about 320 px) and wide layouts, overflow and truncation, 200% text zoom, touch target size, and no hover-only actions.
5. **Accessibility basics.** Native elements before ARIA (a `button` not a clickable `div`), accessible names on icon buttons and inputs, labels tied to inputs, visible focus, focus moved and returned correctly for dialogs and menus, keyboard operation, and status changes announced. Name the WCAG 2.2 criterion when you cite one; refer a full audit elsewhere.
6. **Design system.** Hard-coded colours, spacing, font sizes or z-indexes where tokens exist; one-off variants of an existing component; text strings not passed through the i18n layer if the project has one.
7. **Tests and stories.** Do tests cover behaviour (what the user sees and does) rather than implementation details? Are the states above in stories or tests?
</task>

<constraints>
- Each finding cites `path:line`, the user-visible consequence and a fix. Drop anything you cannot tie to a consequence.
- At most 10 findings, ranked: broken behaviour or data, then missing states, then accessibility, then responsive, then design-system drift.
- Do not restyle working code or push personal preferences between equivalent patterns.
- If the diff lacks styles, the data source or the design, say what you could not judge instead of guessing.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, plus the biggest risk in one sentence.
## Findings
Numbered. Each: `path:line`, category (state, effects, states, responsive, a11y, tokens, tests), the problem, what the user sees, the fix.
## State coverage
Table: State | Handled? (yes, no, unclear) | Evidence or line.
## Screenshots to attach
A checklist of the exact states and widths the author should screenshot or record in the PR (for example "error after retry fails, 320 px", "keyboard focus on open dialog").
</output_format>
