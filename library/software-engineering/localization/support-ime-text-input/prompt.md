---
schema: 1
id: support-ime-text-input
kind: prompt
title: Fix text input for IME and non-US keyboards
description: Fixes inputs, editors and shortcuts that break for people typing Chinese, Japanese, Korean or with non-US keyboard layouts, covering IME composition, Enter handling, shortcuts and tests.
category: localization
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, software-engineer]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [diff, tests, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [ime, keyboard-shortcuts, text-input]
pairs_with:
  prompts: [review-i18n-readiness, implement-locale-aware-sorting-and-search]
args:
  - name: code
    description: The input components, editors, chat boxes, search fields or keyboard handlers to check, and the framework.
    type: text
    required: true
  - name: symptoms
    description: Reported bugs, if any, for example "pressing Enter to pick a Japanese candidate sends the message".
    type: text
output_contract:
  format: markdown
  sections: [Findings, Fixes, Shortcut handling, Manual test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Chinese, Japanese and Korean users type through an input method editor (IME): keystrokes build a composition that is only committed when they choose a candidate, usually with Enter or Space. Code that listens to `keydown` for Enter sends the message mid-composition; code that runs on every `input` event (search-as-you-type, validation, auto-formatting, controlled React inputs that reset the value) fights the IME and duplicates or drops characters. The browser marks composition with `compositionstart`/`compositionend` and `event.isComposing` (and a legacy `keyCode` 229 in some browsers). Keyboard shortcuts break separately: `event.key` is the produced character and `event.code` the physical key, so a shortcut bound to `code === "KeyZ"` fires on the key labelled W on AZERTY and Y on German QWERTZ, while `/` or `[` need Shift or AltGr on many layouts. `event.key` suits letter mnemonics and `event.code` suits games and position-based controls; on non-Latin layouts such as Russian, `event.key` gives a Cyrillic letter, so mnemonic shortcuts need a fallback to `code`. AltGr arrives as Ctrl+Alt on Windows, so a Ctrl+Alt shortcut can block typing "@" or "€".
</context>

<task>
Check and fix text input in:

{{code}}

{{#symptoms}}Reported symptoms: {{symptoms}}{{/symptoms}}

1. List every handler on text inputs and editors: `keydown`, `keypress`, `input`, `beforeinput`, `change`, framework `onChange`, and global shortcut listeners.
2. For each, check composition safety: ignore Enter and other commit keys while `isComposing` is true (or between `compositionstart` and `compositionend`); defer search, validation, masking and auto-formatting until composition ends; make sure controlled inputs do not overwrite the value during composition.
3. Fix each issue with the smallest change for the framework in use, and keep a shared helper if several components need the same guard.
4. Shortcuts: decide per shortcut whether it means a character (use `event.key`) or a physical position (use `event.code`); avoid Ctrl+Alt combinations that collide with AltGr; make sure single-key shortcuts do not fire while the focus is in a text field or during composition; show shortcut labels that match the user's layout where the platform allows.
5. Other input: allow pasted and IME-produced full-width characters where valid (normalize full-width digits for numeric fields instead of rejecting them), and do not block input with `maxlength` counting mid-composition.
6. Tests: add automated tests that dispatch composition events where the test tool supports it, and write a manual test plan with Japanese (Romaji input), Chinese (Pinyin), Korean (Hangul, which composes syllables character by character) and a German or French layout, on at least two browsers and OSes.
</task>

<constraints>
- Do not disable or work around the IME (for example by forcing `ime-mode` or stripping composition text).
- Keep current behaviour for users without an IME.
- Note browser differences you rely on as things to confirm in the manual test, not as settled facts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Findings
| Location | Handler | Problem | Who it affects |

## Fixes
Diff per file.

## Shortcut handling
Each shortcut with key versus code decision and conflicts removed.

## Manual test plan
A checklist by language, layout, browser and OS.
</output_format>
