---
schema: 1
id: manage-focus-after-ui-updates
kind: prompt
title: Manage focus after in-page UI updates
description: Fixes where keyboard focus goes after deleting or adding items, inline editing, closing panels or loading content, so keyboard and screen-reader users are not dropped to the top of the page.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [focus-management, keyboard, screen-reader, dynamic-content, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, fix-spa-route-announcements, add-live-region-announcements, write-accessibility-regression-tests]
args:
  - name: component
    description: The component code or file paths, and the interactions that move or remove content (delete row, add item, save inline edit, close side panel, load more).
    type: text
    required: true
  - name: framework
    description: The UI framework, for example React, Vue, Svelte, Angular or plain DOM.
    type: string
    default: react
  - name: symptom
    description: What goes wrong today, if known, for example "after deleting a row focus jumps to the top of the page".
    type: text
output_contract:
  format: markdown
  sections: [Focus map, Changes, Tests, Manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When the element that has focus is removed from the DOM, browsers move focus to the `body`. A keyboard user is thrown to the top of the page and a screen reader often says nothing, so the user does not know whether the action worked. The fix is a deliberate focus target for every action that removes, replaces or reveals content. Experienced engineers use a few rules: after deleting an item, focus the next item, else the previous one, else the list's heading or an empty-state message; after adding an item, keep focus on the add control and announce the result, unless the user must now edit the new item; after an inline edit is saved or cancelled, return focus to the control that opened it; after closing a panel, return focus to its trigger, or to a sensible fallback if the trigger is gone; after "load more", focus the first new item or keep focus on the button and announce how many loaded. Moving focus to a non-interactive element needs `tabindex="-1"`, and focus must be moved after the framework has rendered (an effect, `nextTick`, `tick()` or `afterNextRender`), not before. Do not move focus on changes the user did not cause.
</context>

<task>
Fix focus handling in this {{framework}} component.

<component>
{{component}}
</component>
{{#symptom}}
Reported symptom: {{symptom}}
{{/symptom}}

1. Read the component and its parents. List every user action that removes, replaces, reorders or reveals content, and what currently happens to focus (trace it in code; say when you are inferring).
2. For each action, choose the focus target using the rules in the context, and write the focus map before writing code.
3. Look for an existing focus utility, ref pattern or hook in the codebase and reuse it. Otherwise add the smallest helper the project's style allows.
4. Implement the moves after render using the framework's correct timing. Add `tabindex="-1"` only to non-interactive targets, and do not leave a visible focus ring suppressed on them if the user needs to see where they are.
5. Where a focus move alone does not tell a screen-reader user what happened (an item added, an item deleted), add a short polite announcement through the project's existing live region, or note that one is needed.
6. Write tests that perform each action with real keyboard events and assert the active element afterwards. Run them and the existing suite; report results.
7. Give a two-minute manual check with the keyboard and one screen reader.
</task>

<constraints>
- Never move focus on content changes the user did not trigger, such as polling updates or other users' edits.
- Do not use `autofocus` or focus calls in render bodies that steal focus on every re-render.
- Do not use positive `tabindex` values.
- Keep the change limited to focus handling; do not refactor the component.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Focus map
Table: action | focus today | focus target after fix | fallback | announcement.

## Changes
Diffs with file paths.

## Tests
The test code and the command run with its result.

## Manual check
Numbered steps.
</output_format>
