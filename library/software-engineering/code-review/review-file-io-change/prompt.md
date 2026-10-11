---
schema: 1
id: review-file-io-change
kind: prompt
title: Review file handling code
description: Reviews code that reads and writes files for non-atomic writes, path traversal, temp file cleanup, encoding and line-ending assumptions, and loading large files into memory.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer]
requires: [none]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [file-io, atomic-writes, path-traversal, encoding, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-error-handling, implement-file-upload]
args:
  - name: diff
    description: The change with file paths, including where file names and paths come from.
    type: text
    required: true
  - name: context
    description: Operating systems it runs on, whether paths or names can come from users, typical and largest file sizes, and whether several processes touch the same files.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, File operations, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
File code is short and full of traps. Writing a file in place means a crash or full disk halfway leaves a truncated config or corrupted save; the safe pattern is write to a temporary file in the same directory, flush and fsync, then rename over the target (rename is atomic on the same filesystem, not across mounts, and on Windows replacing an open file can fail). Joining a user-supplied name onto a base directory allows `../` traversal and absolute paths that discard the base entirely (`os.path.join("/data", "/etc/passwd")` returns `/etc/passwd`); the check must resolve the final path and confirm it stays inside the base, including through symlinks. Reading without an explicit encoding uses the platform default, which differs between Linux and Windows; BOMs and CRLF line endings break naive parsers. `read()` on a 4 GB upload loads 4 GB into memory. Temp files without cleanup in a `finally` or context manager fill the disk. File handles opened in a loop without closing hit descriptor limits. Two processes appending or rewriting the same file need locking. Case-insensitive filesystems (macOS, Windows) make `Report.txt` and `report.txt` the same file.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. List every file operation in the change: open, read, write, append, rename, delete, list, temp file creation, and where each path comes from (constant, config, user input, upload, archive entry).
2. Check paths: traversal through `..`, absolute paths, symlinks and archive entries (zip slip); normalisation and containment check after resolving; platform separators; case sensitivity; reserved names on Windows.
3. Check write safety: in-place writes of important files, missing temp-then-rename, rename across filesystems, missing fsync where durability matters, partially written output left behind on error, permissions on created files.
4. Check resource handling: files closed on every path (context managers, `defer`, try-with-resources), temp files and directories removed, descriptor use in loops.
5. Check content handling: explicit encoding, BOM and line endings, binary versus text mode, streaming or chunked reading for large files, size limits on user-supplied files.
6. Check concurrency: several processes or threads writing the same file, read-while-write, check-then-act races (exists then open).
7. Check error handling: missing file, permission denied, disk full and partial reads handled with useful messages.
8. For each finding, give the input or event that triggers it and the smallest fix using the language's standard library.
</task>

<constraints>
- Path traversal from user input is critical and listed first.
- Every finding names the triggering input or event (a file name, a crash point, a file size, an OS).
- Do not suggest deleting or moving real files as part of verifying a finding.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## File operations
Table: operation, path source, user-controlled (yes/no), atomic (yes/no/n.a.).
## Findings
Numbered: severity, `path:line`, trigger, effect, fix.
## Tests to add
Bullets: traversal names, crash-during-write, large file, encoding fixtures.
</output_format>
