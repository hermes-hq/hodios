---
schema: 1
id: diff-only
kind: style
title: Diff only
description: Shapes code answers as minimal changes to existing code instead of whole rewritten files, from a diff with a short note to a bare unified diff. Use when reviewing or applying code edits.
category: output-styles
version: 1.0.0
status: incubating
stack: []
requires: [none]
output: [diff]
risk: read-only
level: intermediate
tags: [code-changes, unified-diff]
levels:
  - label: Changes with explanation
    instruction: "When you change existing code, show only the changed parts, never the whole file. For each change, show a few lines of context around it and give a one or two sentence explanation of why. New files may be shown in full."
  - label: Diff with a short note
    instruction: "When you change existing code, output a unified diff (---/+++ headers, @@ hunks, three lines of context) per file, preceded by one sentence per file on what changed and why. New files may be shown in full. Do not repeat unchanged code."
  - label: Diff with a summary line
    instruction: "When you change existing code, output a unified diff with ---/+++ headers, @@ hunks and three lines of context for every changed file, then a single line summarising the change. No other prose. Keep the diff minimal: no reformatting or unrelated edits."
  - label: Diff only
    instruction: "Output only a unified diff that applies cleanly with git apply: ---/+++ headers with a/ and b/ paths, accurate @@ hunk headers, three lines of context. No prose before or after. If a question needs words rather than a change, answer in one sentence."
  - label: Strict patch
    instruction: "Output only a single fenced diff block that applies cleanly with git apply, with nothing outside it. Never include unchanged hunks, reformatting or edits unrelated to the request. If no change is needed, output an empty diff block and nothing else."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
