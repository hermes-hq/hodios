---
schema: 1
id: make-web-components-accessible
kind: prompt
title: Make custom elements accessible across shadow DOM
description: Makes web components (custom elements with shadow DOM) accessible, solving label association, ARIA references across the shadow boundary, form participation and focus delegation.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [javascript, html-css]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [web-components, shadow-dom, element-internals, custom-elements, focus-delegation]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, fix-accessible-names, audit-component-library-accessibility]
args:
  - name: components
    description: The custom elements' code or file paths, the library (Lit, Stencil, FAST, Shoelace or plain), and how consumers use them (labels, forms, ARIA attributes on the host).
    type: text
    required: true
  - name: browsers
    description: Browsers the components must support.
    type: string
    default: "current Chrome, Edge, Firefox and Safari"
output_contract:
  format: markdown
  sections: [Problems found, Fixes per component, Consumer guidance, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shadow DOM breaks ID references: a `label for="x"` in the light DOM cannot point to an `input` inside a shadow root, and `aria-labelledby`, `aria-describedby`, `aria-controls` and `aria-activedescendant` cannot cross the boundary either. Consumers then put `aria-label` on the host element, which labels a generic element nobody can focus, while the inner `button` stays unnamed. The proven fixes: make the custom element itself the form control with `ElementInternals` (`static formAssociated = true`, `attachInternals()`, and default semantics via `internals.role` and `internals.ariaLabel` etc.), so a light-DOM `label` works and the host carries the role; or forward host attributes such as `label` and `aria-label` to the inner native element and remove them from the host; or keep related pieces in the same tree (slot the label, or render both inside the shadow root). `delegatesFocus: true` on `attachShadow` sends focus and clicks on the host to the first focusable inner element. Cross-root ARIA reference proposals exist but are not reliably supported, so do not depend on them. Each approach behaves slightly differently across browsers and screen readers, so the fix must be checked in the accessibility tree of each target browser.
</context>

<task>
Make these web components accessible in {{browsers}}.

<components>
{{components}}
</components>

1. Read each component and a few consumer usages. For each, record: what native element it wraps, where the role and name end up in the accessibility tree, which ID references cross the shadow boundary, and whether it takes part in forms.
2. Choose a fix per component and state why: form-associated custom element with `ElementInternals`; forwarding attributes to the inner element; slotting; or rendering related content in the same root.
3. Implement: correct role and name on the element users interact with (not on an unfocusable host), `delegatesFocus` where the host should act as the control, visible focus with `:focus-visible` inside the shadow root, form value, validity and labels via `ElementInternals` where the component is a form control, and states (`aria-expanded`, `aria-checked`) on the element that has the role.
4. Remove duplicate semantics: no role on both host and inner element, no `aria-label` left on the host when it was forwarded.
5. Document how consumers should label and describe each component, and deprecate patterns that cannot work, such as `aria-describedby` pointing into another shadow root.
6. Write tests that check role, name and focus from the consumer's side (light DOM), for example with Testing Library queries that pierce shadow roots or browser accessibility snapshots; run them. Give a manual check of the accessibility tree in each browser with one screen reader.
</task>

<constraints>
- Do not rely on cross-root ARIA proposals or other unshipped features.
- Do not remove shadow DOM unless the user agrees; say when it would be the simplest fix.
- Keep public attributes and events backwards compatible where possible; list breaking changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Table: component | role and name today | broken references | form participation | fix chosen.

## Fixes per component
Diffs with file paths.

## Consumer guidance
Short usage examples for labelling and describing each component.

## Tests and manual check
Test code, command result, manual steps per browser.
</output_format>
