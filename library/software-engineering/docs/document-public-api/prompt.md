---
schema: 1
id: document-public-api
kind: prompt
title: Document a public API
description: Writes reference docs for a module's exported functions, classes or endpoints in the native doc-comment format, covering real behaviour, errors and edge cases. Use before a release.
category: docs
version: 1.0.1
status: experimental
aliases: [doc-api]
stage: [build, ship]
role: [software-engineer, maintainer, technical-writer]
requires: [repo-read, file-write]
inputs: [file, repo]
output: [docs, diff]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [api-reference, doc-comments]
pairs_with:
  personas: [technical-writer]
args:
  - name: target
    description: The module, package, file, class or set of endpoints to document.
    type: text
    required: true
  - name: format
    description: Where the docs go. inline writes doc comments in the code; reference writes a separate Markdown reference page.
    type: enum
    enum: [inline, reference]
    default: inline
output_contract:
  format: markdown
  sections: [Changes, Questions for the author, Behaviour worth reviewing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id doc-api."}
---
<context>
API reference is read by someone about to call the code. They need what the signature cannot say: what each parameter means and which values are valid, what comes back in each case, what can fail and how, and what the call changes besides its return value. Restating the type signature in prose wastes their time; describing the behaviour the author intended instead of the behaviour the code has misleads them.
</context>

<task>
Document the public API of {{target}} as {{format}} docs.

1. Find the public surface: exported symbols, `__all__`, `pub` items, capitalised Go identifiers, public classes and methods, or routes in the router or OpenAPI spec. Skip private and internal helpers.
2. For each symbol, read its implementation, its callers and its tests before writing. Check the existing doc comments for conventions.
3. Document, for each symbol:
   - a one-line summary that says what it does, starting with a verb;
   - each parameter: meaning, valid range or format, units, default and what happens with null, empty or out-of-range values;
   - the return value in each case, including empty results;
   - errors, exceptions or error codes, and the condition for each;
   - side effects (I/O, mutation of arguments, global state, network, caching), concurrency or async behaviour, and notable cost;
   - a short example taken or adapted from the tests, when the usage is not obvious.
4. Use the native format for the language: TSDoc or JSDoc, Python docstrings in the style the project already uses (Google, NumPy or reST), rustdoc, Go doc comments, Javadoc or KDoc, XML docs for C#, or OpenAPI descriptions for HTTP endpoints. For `reference`, write one Markdown page grouped by module with the same content.
</task>

<constraints>
- Describe what the code does, not what the name suggests. If they differ, or the behaviour looks like a bug, document the actual behaviour and list it under "Behaviour worth reviewing". Do not change the code.
- Never invent parameters, defaults, error types or examples. If behaviour depends on code you cannot see, say so in "Questions for the author".
- Do not repeat information the type system already states (do not write "@param name - the name, a string").
- Edit only doc comments or the reference page. No reformatting, renaming or refactoring.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Apply the documentation edits. Then reply with:
## Changes
The symbols you documented, one line each.
## Questions for the author
Behaviour you could not determine from the code, as questions.
## Behaviour worth reviewing
Places where the code's behaviour looks surprising or inconsistent with its name, each with `path:line`. Write "None" if there are none.
</output_format>
