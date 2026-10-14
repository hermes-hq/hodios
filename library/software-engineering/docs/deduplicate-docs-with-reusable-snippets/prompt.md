---
schema: 1
id: deduplicate-docs-with-reusable-snippets
kind: prompt
title: Deduplicate docs with reusable snippets
description: Finds content repeated across docs pages, such as install steps, version requirements and warnings, and replaces it with shared snippets or includes so a change is made once.
category: docs
version: 1.0.0
status: incubating
stage: [maintain]
role: [technical-writer, maintainer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [single-source, content-reuse, docs-includes, docs-maintenance]
pairs_with:
  prompts: [audit-documentation, reorganize-docs-by-diataxis, sync-docs-with-code-change]
args:
  - name: scope
    description: The docs folder or section to work on, or "all".
    type: text
    default: all
output_contract:
  format: markdown
  sections: [Duplicates found, Changes made, Conflicts to resolve, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Repeated content is where docs go wrong first. The install command, minimum version, environment variable list or security warning gets copied to six pages, then updated on two of them. Most generators support reuse. MkDocs has the snippets extension, Docusaurus has imported MDX partials, Sphinx has `include` and `literalinclude`, and AsciiDoc and Hugo have includes and shortcodes. Not every repetition should be shared, though. Text that looks the same but means something different in each context will need to diverge again. A page made entirely of includes is hard for writers to edit and for translators to handle. Headings inside snippets can break anchors and the table of contents. In some tools, relative links inside a snippet resolve against the including page.
</context>

<task>
Find and consolidate repeated content in {{scope}} of this repository's docs.

1. Identify the docs generator and its include mechanism, and whether includes are already used (follow the existing folder and naming convention if so).
2. Find repeated blocks across pages: exact duplicates and near-duplicates of commands, version requirements, prerequisite lists, configuration snippets, admonitions and legal or security notices. Ignore code that is repeated on purpose in self-contained tutorials.
3. Triage each group: identical in meaning, so share it; diverged copies where one is probably wrong, so flag it and ask which is correct; context-specific, so leave it.
4. For shared blocks, create snippet files in a folder excluded from navigation and search, with no top-level headings inside. Replace each copy with the include. Use the most recent correct version and say which copy it came from.
5. Build the docs and compare the rendered text of every changed page before and after (diff the built HTML text or the generator's output). The only differences should be the intended fixes.
</task>

<constraints>
- Do not resolve diverged copies by guessing which is right; list them under conflicts.
- Keep each page readable in the source: do not turn a page into a list of includes.
- Make links inside snippets work from every including page (absolute or site-root links if the generator resolves relative links per page).
- Change only the duplicated blocks; leave other content as it is.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Duplicates found
Table: block, pages, decision (shared, conflict, left).
## Changes made
Snippet files created and pages changed.
## Conflicts to resolve
Each diverged block with the differing versions side by side and a question.
## Verification
The build result and the rendered-text comparison.
</output_format>
