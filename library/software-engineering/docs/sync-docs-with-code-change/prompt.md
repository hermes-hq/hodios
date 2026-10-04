---
schema: 1
id: sync-docs-with-code-change
kind: prompt
title: Update the docs a code change made stale
description: Finds the documentation a code change affects, such as READMEs, API docs, guides and examples, updates it to match, and runs the code snippets to prove they still work. Use before merging a change.
category: docs
version: 1.0.0
status: incubating
stage: [build, review]
role: [software-engineer, technical-writer, maintainer]
requires: [repo-read, file-write, shell, git]
inputs: [diff, repo]
output: [diff, docs, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [docs-as-code, stale-docs, code-snippets, doc-tests]
pairs_with:
  prompts: [audit-documentation, write-changelog, write-migration-guide]
  personas: [technical-writer]
args:
  - name: diff_or_branch
    description: The change to document, as a branch name to compare with the main branch, a commit range, or a pasted diff.
    type: string
    required: true
  - name: docs_paths
    description: Where documentation lives, for example "README.md, docs/, examples/, the docstrings in src/api". Include generated API reference sources if they come from code comments.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Public changes, Docs updated, Snippets verified, Not verified, Outside this change]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Docs go stale one merge at a time: a renamed flag stays in the README, an example still passes an argument that was removed, a default changes and the guide still promises the old one. The places to update are rarely obvious from the diff, because docs mention names, not files. Updating text without running the examples leaves the worst kind of stale docs: snippets that look right and fail when copied.
</context>

<task>
Update the documentation affected by this change.

<change>
{{diff_or_branch}}
</change>

<docs_paths>
{{docs_paths}}
</docs_paths>

1. Get the full diff (for a branch, compare it with the merge base of the main branch). List every change a reader of the docs could notice: renamed or removed functions, classes, endpoints, CLI commands and flags, config keys and environment variables; new or changed parameters, defaults, return values, error messages and status codes; changed behaviour, limits and requirements; new features with no docs yet.
2. For each change, search the docs paths for every old name, value and related phrase (including code blocks, tables, screenshots' alt text, and docstrings that feed generated reference docs). List each hit with file and line.
3. Update each affected passage to match the new code: minimal edits in the existing voice and structure, correct versions or "since" notes if the docs use them, and a changelog or migration note if the project keeps one and the change breaks users.
4. For new public behaviour with no docs, add a short section in the most natural place, or list it under Outside this change if it needs a writer's decision.
5. Verify every snippet you touched and every snippet that mentions a changed name: run it (doc tests, the examples folder, or a copy in a scratch directory against the changed code), or type-check or compile it when it cannot run. Regenerate API reference docs if the project generates them and check the output.
</task>

<constraints>
- Docs follow the code. If the docs reveal that the code looks wrong (a documented guarantee the change broke), do not edit the docs to hide it; report it under Outside this change.
- Do not rewrite or restyle passages the change does not affect.
- Do not invent behaviour: when the diff does not make a behaviour clear, read the code and tests, and if it is still unclear, ask.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Public changes
Table: Change | Kind (renamed, removed, new, behaviour) | Source location.

## Docs updated
Table: File and line | Before (short) | After (short) | Change it reflects.

## Snippets verified
Table: Snippet location | How verified | Result.

## Not verified
Snippets or docs that could not be checked, and why.

## Outside this change
One line each: stale docs unrelated to this diff, code that may contradict its docs, missing docs needing a writer.
</output_format>
