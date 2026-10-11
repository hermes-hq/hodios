---
schema: 1
id: write-text-processing-one-liner
kind: prompt
title: Write a jq, awk or sed one-liner
description: Writes a jq, awk, sed or grep command for a described text, log or JSON transformation, explains each piece, notes GNU versus BSD differences and shows a safe way to test it first.
category: implementation
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, devops-engineer, sre, data-engineer]
stack: [bash]
requires: [none]
inputs: [text, logs, dataset]
output: [code, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [jq, awk, sed, grep, command-line, log-parsing]
args:
  - name: transformation
    description: What to extract or change, in plain words.
    type: text
    required: true
  - name: sample_input
    description: A few representative lines or a JSON sample, including awkward cases (empty fields, quotes, nested arrays).
    type: text
    required: true
  - name: platform
    description: Where it will run, which decides GNU or BSD tool flags.
    type: enum
    enum: [linux, macos, both, windows-wsl]
    default: both
output_contract:
  format: markdown
  sections: [Command, How it works, Expected output, Test it safely, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Command-line text tools are fast but unforgiving. `sed -i` takes a suffix argument on macOS (`sed -i ''`) and not on GNU, so a command copied from a Linux answer fails or creates stray files on a Mac. `grep -P` does not exist in BSD grep. `awk -F,` breaks on CSV fields that contain quoted commas. `jq` prints strings with quotes unless you use `-r`, returns `null` for a missing key (which then flows silently into later steps) but errors when indexing into a string or number, unless you guard with `select`, `//` or `?`; and `has("key")` tells absent from `null` where `.key` cannot. And an in-place edit over many files with a wrong pattern is hard to undo.
</context>

<task>
Write a command for this transformation:

{{transformation}}

Sample input:

<sample_input>
{{sample_input}}
</sample_input>

Runs on: {{platform}}

1. Pick the right tool: `jq` for JSON, `awk` for column and field logic, `sed` for line-level substitutions, `grep` for filtering, a combination in a short pipeline when that is clearer. If the data is real CSV with quoted fields, or the logic needs more than a readable pipeline, say a small script or a CSV-aware tool (Miller, csvkit, Python's csv module) is the safer choice, and still give the best command-line option.
2. Write the command against the sample, handling the awkward cases visible in it (empty fields, missing keys, extra whitespace, Windows line endings).
3. Explain it piece by piece: each flag, each part of the filter or program.
4. Show the exact output it produces for the sample input.
5. For in-place edits, show the preview version first (print to stdout or `diff` against the original) and then the in-place version with a backup suffix, using flags that work on the stated platform (or a portable form for "both").
6. List caveats: encodings, very large files, locale effects on sorting and character classes, and edge cases not present in the sample.
</task>

<constraints>
- Never give an in-place or delete command without a preview step first.
- Do not use GNU-only flags when the platform is `macos` or `both` without offering the portable alternative.
- Do not claim the output for input you were not shown; base the expected output on the sample only.
- Quote the program in single quotes so the shell does not expand it, and mention when that is a problem (for example a value containing a single quote).
</constraints>

<output_format>
## Command
One code block.

## How it works
Bullets, one per part.

## Expected output
Code block with the output for the sample.

## Test it safely
The preview or dry-run variant, then the final variant if it modifies files.

## Caveats
Bullets, or "None".
</output_format>
