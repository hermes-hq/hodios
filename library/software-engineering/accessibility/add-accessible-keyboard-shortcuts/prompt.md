---
schema: 1
id: add-accessible-keyboard-shortcuts
kind: prompt
title: Add keyboard shortcuts that do not break assistive tech
description: Adds or fixes app keyboard shortcuts so they do not clash with screen readers or browsers, can be turned off or remapped, are discoverable and exposed to assistive technology.
category: accessibility
version: 1.0.0
status: incubating
stage: [design, build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, table, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [keyboard-shortcuts, hotkeys, wcag-2-1-4, aria-keyshortcuts, power-users]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-keyboard-navigation, audit-motor-accessibility, make-rich-text-editor-accessible]
args:
  - name: shortcuts
    description: The shortcuts that exist or are planned (key, action, scope) and the code that handles them, including any hotkey library.
    type: text
    required: true
  - name: platforms
    description: Operating systems and browsers the app targets, for example "web on Windows, macOS, ChromeOS".
    type: string
    default: "web on Windows and macOS"
output_contract:
  format: markdown
  sections: [Shortcut audit, Changes, Settings and discoverability, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Single-key shortcuts ("j" for next, "s" to star, "?" for help) are fast for some users and dangerous for others: speech-recognition users trigger them by dictating words, and people with tremor trigger them by accident. WCAG 2.1.4 therefore requires that shortcuts using only letters, numbers, punctuation or symbols can be turned off, remapped to include a modifier, or are active only while the relevant component has focus. Shortcuts also collide: screen readers in browse mode use single letters (H for heading, B for button, K for link in NVDA) and the Insert or Caps Lock key; browsers own Ctrl or Cmd with L, T, W, N, R, F and P; VoiceOver uses Control+Option; and operating systems take others. A shortcut that handles `keydown` on the document while focus is in a text field breaks typing. Good practice: modifier-based shortcuts for global actions, single keys only within focused widgets or behind a setting, a help dialog listing shortcuts (often "?" but also reachable from a menu), `aria-keyshortcuts` on the controls they trigger, and labels that show the shortcut on hover and focus. Use `event.key` for characters and `event.code` only where physical position matters, and consider non-US layouts.
</context>

<task>
Review and fix these keyboard shortcuts for {{platforms}}.

<shortcuts>
{{shortcuts}}
</shortcuts>

1. Read the handling code and any hotkey library. List each shortcut: keys, action, scope (global or within a component), and where the listener is attached.
2. Flag conflicts with common screen readers (NVDA, JAWS, VoiceOver, Narrator), browsers and the operating systems in scope, and flag single-character shortcuts that fall under WCAG 2.1.4. Do not guess obscure conflicts; mark uncertain ones for testing.
3. Fix the listener: ignore events from text inputs, textareas, `contenteditable` and open dialogs unless the shortcut is meant for them; avoid overriding browser and OS shortcuts; handle `event.key` with layout differences in mind.
4. Add a setting to turn off single-character shortcuts and, if feasible, to remap them; persist it per user.
5. Make shortcuts discoverable: a help dialog listing them, built as an accessible dialog and reachable from a visible menu item, plus `aria-keyshortcuts` on the related controls and the shortcut shown in tooltips or menus.
6. Write tests: shortcuts fire in the right scope, do not fire while typing, and stop when disabled. Run them and report results.
</task>

<constraints>
- Every action reachable by a shortcut must also be reachable by a visible control.
- Do not override standard browser or OS shortcuts for routine actions.
- Do not claim a shortcut is conflict-free across all assistive technology; list what was checked and what needs testing.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Shortcut audit
Table: keys | action | scope | conflicts | WCAG 2.1.4 issue | change.

## Changes
Diffs with file paths.

## Settings and discoverability
Diffs and the text of the help dialog.

## Tests
Test code and the command result.
</output_format>
