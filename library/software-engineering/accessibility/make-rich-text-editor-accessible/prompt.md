---
schema: 1
id: make-rich-text-editor-accessible
kind: prompt
title: Make a rich-text editor accessible
description: Makes a rich-text editor usable with keyboard and screen readers, with a labelled editing area, a toolbar that follows the toolbar pattern, announced formatting state and documented shortcuts.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [rich-text-editor, contenteditable, toolbar, wysiwyg, keyboard]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [add-accessible-keyboard-shortcuts, build-aria-widget, add-live-region-announcements]
args:
  - name: editor
    description: The editor library and version (TipTap, ProseMirror, Lexical, Slate, Quill, CKEditor, TinyMCE or custom), the toolbar code, and features such as mentions, slash commands, images and tables.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Problems found, Editing area, Toolbar, Popups and inline features, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rich-text editors sit on `contenteditable`, which screen readers support reasonably well when it is left alone; most failures come from what surrounds it. The editing area needs `role="textbox"`, `aria-multiline="true"` and a name tied to the visible label; it must not trap Tab unless the user opts in (many editors use Tab for indentation, so provide Escape then Tab, or Ctrl+M style toggles, and document them). The toolbar should follow the APG toolbar pattern: one tab stop, arrow keys between buttons, toggle buttons with `aria-pressed` that reflect the formatting at the caret, grouped controls with separators, and a way to reach it from the editor (often Alt+F10). Bold and italic applied by shortcut are silent unless the state is exposed or announced. Mention and slash-command popups are comboboxes: focus stays in the editor, `aria-activedescendant` points to the option, and the list is announced. Images need an alt text field at insertion time, and pasted content should keep heading and list semantics rather than becoming styled spans. The major libraries (CKEditor, TinyMCE, Lexical, TipTap) differ widely in built-in support; read the library's accessibility docs before writing custom code.
</context>

<task>
Make this rich-text editor accessible in {{framework}}.

<editor>
{{editor}}
</editor>

1. Read the editor setup, toolbar and plugins, and the library's accessibility documentation. List problems for keyboard, screen-reader and voice-control users; mark inferences.
2. Editing area: role, multiline, name from the visible label, description for hints and character limits, `aria-invalid` and error text when validation fails, and an escape route from Tab capture that is documented.
3. Toolbar: APG toolbar pattern with one tab stop and arrow keys, named buttons with `aria-pressed` kept in sync with the caret's formatting, menus for headings or colour that are real menus or selects, and a keyboard shortcut to move between editor and toolbar.
4. Formatting feedback: expose state through the toolbar, and, where the library supports it, announce changes made by shortcut ("Bold on") through a polite region without spamming.
5. Popups: mentions, emoji pickers, slash commands and link dialogs implemented as combobox or dialog patterns, with focus and Escape handled and the selected option announced.
6. Content semantics: headings, lists, links, tables and images output as semantic HTML; an alt text step on image insertion; pasted content normalised to semantic elements.
7. Write tests for the toolbar keyboard model, pressed states and popup behaviour; run them. Give a manual check for NVDA and VoiceOver covering typing, formatting, links and mentions.
</task>

<constraints>
- Do not replace the editor library unless the user asks; configure or extend it, and file upstream issues for library bugs.
- Do not trap keyboard focus in the editor without a documented way out.
- Do not override native caret and selection behaviour that screen readers rely on.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Numbered, with who is blocked.

## Editing area
Diffs.

## Toolbar
Diffs and a key table.

## Popups and inline features
Diffs.

## Tests and manual check
Test code, command result, manual steps.
</output_format>
