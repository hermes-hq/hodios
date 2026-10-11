---
schema: 1
id: check-library-usage-against-docs
kind: prompt
title: Check library calls against the docs for that version
description: Checks a diff's calls to a library or framework against that exact version's documentation for deprecated calls, wrong defaults, misread parameters and APIs that do not exist.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer]
requires: [repo-read]
inputs: [diff, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dependencies, api-usage, deprecations, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-ai-generated-code, inventory-deprecated-api-usage]
args:
  - name: diff
    description: The change with file paths.
    type: text
    required: true
  - name: docs
    description: The relevant documentation, changelog or type definitions for the installed version, if you have them. Otherwise the agent reads the lockfile and installed package sources.
    type: text
output_contract:
  format: markdown
  sections: [Versions, Call check, Findings, Unverified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Library misuse looks like correct code. The call compiles, the test with the happy path passes, and the bug sits in a default: a parameter that means milliseconds in this version and seconds in the next; a `timeout` that applies only to connect; a `merge` that is shallow; an option renamed in the last major so the old one is silently ignored; a function that returns a new object rather than mutating; a date library that is mutable; an ORM method that skips validation or hooks; a client that is not thread-safe or must be closed. Code written from memory, by people or by AI assistants, often targets a different version than the one installed. The reliable source of truth is the lockfile plus the installed package's own docs, type definitions or source, not general knowledge of the library.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#docs}}
<docs>
{{docs}}
</docs>
{{/docs}}

1. Find the installed version of every third-party library the diff calls, from the lockfile or manifest. Note when the manifest range and the lockfile disagree.
2. List each library call, constructor and configuration option the diff uses.
3. For each, verify against the supplied docs or the installed package (type definitions, docstrings, source, changelog): it exists in this version, arguments are in the right order and units, defaults are what the code assumes, return value and mutability are what the code assumes, errors it raises are handled, and it is not deprecated.
4. Check lifecycle requirements: clients or sessions that must be reused, closed, awaited or not shared across threads or processes.
5. For each mismatch, quote the doc line or source that proves it, give the effect on this code, and give the corrected call for the installed version.
6. List every call you could not verify and why, instead of guessing.
</task>

<constraints>
- Cite the evidence for every finding: a doc quote, a file and line in the installed package, or a changelog entry. No finding from memory alone.
- Do not upgrade or downgrade dependencies as part of the review; if an upgrade would help, say so in one line.
- Do not run install or update commands that change the lockfile.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Versions
Table: library, manifest range, locked version.
## Call check
Table: call, file:line, verified (yes/no/mismatch), source checked.
## Findings
Numbered: severity, `path:line`, call, what the code assumes, what the version does (with evidence), fix.
## Unverified
Bullets: calls not verified and what would be needed.
</output_format>
