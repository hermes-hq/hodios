---
schema: 1
id: implement-undo-redo
kind: prompt
title: Implement undo and redo
description: Implements undo and redo with a command or patch history, grouping of related changes, a size limit, keyboard shortcuts, selection restore and correct interplay with saving.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [undo-redo, command-pattern, editors, keyboard-shortcuts]
pairs_with:
  prompts: [implement-state-machine, implement-optimistic-locking]
args:
  - name: app_spec
    description: The editor or app and which actions must be undoable, for example "diagram editor - move, resize, add and delete shapes, edit labels; saved to the server".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Approach, Undoable actions, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer adding undo and redo to an editor-like app. Undo feels simple until grouping, saving and side effects meet:
- Three approaches: commands (each action knows how to apply and revert itself; precise, more code), patches (record forward and inverse patches of state changes, for example Immer's `produceWithPatches`; works well with immutable state), and snapshots (store whole states; simplest, memory-heavy, fine for small documents). Choose from how state is held today.
- Grouping: one user intention is one undo step. Typing a word, dragging a shape (many move events, one entry from pointer down to pointer up) or a multi-select delete must undo as one. Use explicit transactions or time-based coalescing.
- A new action after undo clears the redo stack. Cap the history length.
- Restore selection and focus with each step, or undo looks like nothing happened.
- Saving: undo after a save is just another change that gets saved. Do not try to "unsave". With autosave, undo and redo go through the same save path as any edit.
- Shared or collaborative documents need per-user undo of that user's own changes; a single global stack undoes other people's work.
- Side effects outside the document (sending an email, charging, publishing) are not undoable by reverting state. Exclude them from history or model them as separate reversible operations.
- Shortcuts: Ctrl+Z and Cmd+Z for undo; Ctrl+Y, Ctrl+Shift+Z and Cmd+Shift+Z for redo. Do not intercept them while focus is in a native text field that has its own undo.
</context>

<task>
Add undo and redo to:
{{app_spec}}

1. Read how state is held and changed (store, reducers, models), how changes are saved, and which user actions exist. List the undoable actions and the ones that must not be.
2. Choose the approach and grouping rules, and write them down.
3. Implement the history manager with grouping, the limit, redo clearing, selection restore, integration with saving, toolbar buttons with disabled states, and keyboard shortcuts that respect text fields.
4. Route each undoable action through the history.
5. Write tests: undo and redo of each action, a drag grouped as one step, redo cleared by a new action, history limit, undo after save producing a save, shortcut ignored inside a text input.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never make external side effects look undoable when they are not.
- Do not refactor the whole state layer; route actions through the history with the smallest change.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Commands, patches or snapshots, and why, in three lines or fewer.
## Undoable actions
A table: Action | Undoable | Grouping rule.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, such as the history limit, and why.
</output_format>
