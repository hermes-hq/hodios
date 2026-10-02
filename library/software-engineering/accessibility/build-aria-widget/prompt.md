---
schema: 1
id: build-aria-widget
kind: prompt
title: Build an accessible ARIA widget
description: Implements a combobox, tabs, dialog, menu, disclosure, tree or listbox per the ARIA Authoring Practices pattern, using native elements whenever they suffice. Use for custom interactive widgets.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [repo-read, file-write]
inputs: [file, spec]
output: [code, tests, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [aria, aria-apg, keyboard, screen-reader]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, write-screen-reader-test-plan]
args:
  - name: widget
    description: The widget pattern to build.
    type: enum
    enum: [combobox, tabs, dialog, menu, disclosure, tree, listbox]
    required: true
  - name: framework
    description: UI framework or "vanilla" for plain HTML and JavaScript.
    type: string
    default: react
  - name: existing_code
    description: Current implementation to replace or repair, and how the widget is used. Leave empty to build from scratch.
    type: text
output_contract:
  format: markdown
  sections: [Native or custom, Keyboard, Roles states and properties, Code, Tests, Manual checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first rule of ARIA is not to use it when a native element does the job: WebAIM's yearly scans of the top million home pages keep finding more errors on pages that use ARIA than on pages that do not. When a custom widget is justified, it has to match the APG pattern exactly: the roles, the states that update as the user acts, and the keyboard model screen-reader users already know from desktop apps. Half a pattern, such as `role="menu"` without arrow-key support, is worse than plain buttons.
</context>

<task>
Build an accessible {{widget}} in {{framework}}.

Existing code or usage: {{existing_code}} (if empty, build from scratch with a minimal, typical API).

1. **Decide native or custom first,** and state the decision:
   - dialog: use `dialog` with `showModal()`. It provides the top layer, an inert background and Escape for free.
   - disclosure: use `details` and `summary`, or a `button` with `aria-expanded` and `aria-controls`.
   - listbox: use `select` unless options need rich content or multi-select with custom rendering.
   - menu: `role="menu"` is for app-style command menus. For site navigation or a list of links, build a disclosure with links instead, and say so.
   - combobox: a text `input` with a custom popup. `datalist` is acceptable only for simple suggestions.
   - tabs and tree have no native equivalent, so build them custom.
2. If custom, implement the APG pattern completely:
   - The roles and their required owned elements (`tablist` and `tab` with `tabpanel`; `tree`, `treeitem` and `group`; `combobox` and `listbox` with `option`).
   - States kept in sync with the UI: `aria-expanded`, `aria-selected`, `aria-checked`, `aria-activedescendant`, `aria-controls`, and `aria-level`, `aria-setsize` and `aria-posinset` when items are virtualised.
   - Accessible names for the widget and each item.
   - One Tab stop for composite widgets, using roving `tabindex` or `aria-activedescendant`, with the APG keyboard model: arrow keys, Home and End, Escape, Enter and Space, and type-ahead where the pattern specifies it.
   - Focus management on open and close: where focus goes, and where it returns.
3. For tabs, choose automatic or manual activation and justify it (manual when showing a panel is slow). For combobox, implement the ARIA 1.2 pattern, where `role="combobox"` sits on the input itself and `aria-autocomplete` matches the actual behaviour.
4. Reuse the project's existing components and styles. Make focus visible.
5. Write tests that query by role and accessible name (Testing Library style or the framework's equivalent), assert state attributes after interactions, and drive the keyboard model.
</task>

<constraints>
- Do not add ARIA that duplicates native semantics, such as `role="button"` on a `button`.
- Do not use `aria-hidden="true"` on anything focusable.
- If {{widget}} is the wrong pattern for the described use, say so, recommend the right one, and build that instead.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Native or custom
The decision and why, in two or three sentences.

## Keyboard
| Key | Context | Result |

## Roles states and properties
| Element | Role | Attributes and when they change |

## Code
Each file in its own code block, headed by its path.

## Tests
Code, then one line per test.

## Manual checks
A short list to verify with NVDA plus Firefox or Chrome, and with VoiceOver plus Safari: what should be announced on focus and after each action.
</output_format>
