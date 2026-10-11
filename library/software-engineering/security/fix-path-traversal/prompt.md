---
schema: 1
id: fix-path-traversal
kind: prompt
title: Fix path traversal and zip slip
description: Fixes file read, download, write and archive extraction code against path traversal and zip slip, using canonical path checks or opaque file ids, with a test per fix.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [path-traversal, zip-slip, file-handling, owasp]
pairs_with:
  prompts: [audit-input-handling, review-file-io-change, implement-file-upload, write-exploit-regression-test]
  personas: [security-auditor]
args:
  - name: target
    description: The endpoints, functions or scanner findings that touch file paths.
    type: text
    required: true
  - name: stack
    description: Language and framework. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [File access points, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Path traversal happens whenever a path is built from input and then opened: `../` sequences, absolute paths (which make Python's `os.path.join`, `pathlib`'s `/` and Node's `path.resolve` discard the base directory), backslashes on Windows, URL-encoded or double-encoded dots, and symlinks inside the allowed directory that point outside it. Removing `../` with a replace call fails against `....//`. The correct check resolves the full path to its canonical form (resolving symlinks) and confirms it is inside the canonical base directory using a path-aware comparison, not a string prefix (`/srv/data-evil` starts with `/srv/data`). Archive extraction has the same bug as zip slip: entry names like `../../etc/cron.d/x` or absolute names, plus symlink entries and decompression bombs. Often the best fix is to stop accepting paths at all: store files under random ids and map ids to paths on the server.
</context>

<task>
Fix path traversal in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the file-handling code and check for an existing safe helper (`send_from_directory`, `safe_join`, `Path.resolve` checks, framework static file serving) to reuse.
2. Find every place a file path is built from input: downloads, file serving, template or language-file selection, uploads that keep the client's file name, log or export writers, and archive extraction (zip, tar, jar). List each with its input source.
3. Fix each one, preferring in this order:
   - replace the path parameter with an opaque id looked up on the server;
   - choose from a fixed allowlist of names;
   - otherwise resolve the canonical path and confirm it is inside the canonical base directory with a path-aware check, rejecting absolute input and refusing to follow symlinks out of the base.
4. For archive extraction, check every entry's resolved target the same way, skip or reject symlink and device entries, and cap total extracted size and entry count.
5. Add tests per fix with `../` sequences, an absolute path, encoded dots, a sibling directory whose name shares the prefix, a symlink pointing outside, and a malicious archive built in the test.
6. Run the tests and the linter.
</task>

<constraints>
- Never use string replacement of `../` or a prefix check on unresolved paths as the fix.
- Keep test files inside a temporary directory; never write outside it or touch real system paths.
- Do not delete files or directories outside the test fixtures.
- Note Windows path behaviour if the code may run on Windows.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## File access points
Table: file:line, operation (read, write, serve, extract), input source, fix chosen (id, allowlist, canonical check), status.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test with its payload.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
