---
schema: 1
id: clean-up-utils-folder
kind: prompt
title: Break up a junk-drawer utils module
description: Breaks a grab-bag utils or helpers module into domain-owned modules, deletes unused helpers, merges duplicates and fixes every import without behaviour change.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [table, plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [utils-module, helpers, module-ownership, imports]
pairs_with:
  prompts: [remove-dead-code, reduce-duplication, reorganize-project-structure]
args:
  - name: module
    description: The utils or helpers file or folder, as a path, with the language and whether it is published as part of a library API.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests and the type checker or linter.
    type: string
output_contract:
  format: markdown
  sections: [Inventory, New homes, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`utils.py`, `helpers.ts` and `common/` grow because there is no obvious home for a small function. Over time they collect three kinds of code: helpers used by one feature (which belong next to that feature), domain logic hiding as a helper (`calculateTax` in utils belongs in billing), and genuinely generic code (string, date and collection helpers), much of which duplicates the standard library or another helper in the same folder. Utils modules also become dependency hubs: everything imports them and they import half the app, creating cycles.

The cleanup is mostly mechanical but has traps: re-exports and barrel files (`index.ts`, `__init__.py`) hide where things are used; dynamic imports, string-based lookups and dependency injection registration are missed by "find usages"; other packages in a monorepo, scripts, notebooks and tests may import helpers; helpers that are part of a published library's API cannot simply move. A temporary re-export from the old location keeps external importers working while they migrate, with a deprecation note. Helpers with no callers are deleted only after searching the whole repository, including string references.
</context>

<task>
Break up {{module}}.

1. Inventory every exported function, class and constant: callers (by module, across the whole repository, including tests, scripts and other packages), what it depends on, and whether it duplicates another helper or a standard-library function.
2. Classify each: delete (no callers), merge (duplicate), move next to its only consumer, move to a domain module (business logic), or keep in a small generic module with a specific name (`strings`, `dates`) instead of `utils`. Propose the new homes. If the module is a published API, plan re-exports with deprecation. Wait for approval.
3. Move one group at a time, updating imports directly rather than through new barrels, and run the tests and type checker{{#test_command}} with `{{test_command}}`{{/test_command}} after each group.
4. Delete helpers with no callers after confirming with a repository-wide text search, and remove the old module or leave only deprecated re-exports.
5. Show the diff, the final layout and any import cycles removed.
</task>

<constraints>
- No behaviour change; moved code is moved, not rewritten. Improvements go to a follow-up list.
- Do not delete anything referenced dynamically, by string, or by external packages; when unsure, keep it and list it.
- Keep published APIs importable from the old path until the user decides otherwise.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Inventory
Table: helper, callers, duplicate of, classification.
## New homes
Mapping from old location to new location.
## Steps
Numbered steps, each with its test check.
## Diff
The change and final layout.
## Check
Tests, type check and searches run, with results.
</output_format>
