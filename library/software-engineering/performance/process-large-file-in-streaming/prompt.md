---
schema: 1
id: process-large-file-in-streaming
kind: prompt
title: Process a huge file in constant memory
description: Rewrites code that loads a huge CSV, JSON, XML or log file into memory so it streams the input in constant memory with chunked processing and batched output, keeping results identical.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, backend-engineer, data-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [streaming, large-files, memory-usage, chunking, out-of-memory]
pairs_with:
  prompts: [reduce-memory-footprint, write-file-parser, speed-up-dataframe-code]
  personas: [performance-engineer]
args:
  - name: target
    description: The code that reads the file, the file format and size, and the symptom (out of memory, slow, swapping).
    type: text
    required: true
  - name: constraints
    description: Memory limit, where the file comes from (disk, upload, object storage), where results go, and whether order or totals across the whole file matter.
    type: text
output_contract:
  format: markdown
  sections: [Result, Why it used so much memory, Changes, Equivalence check, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code that calls read(), readFileSync, json.load, file.readlines() or a DataFrame read on a multi-gigabyte file holds the whole file, and often several copies (raw bytes, decoded string, parsed objects at many times the file size). The fix is streaming: read line by line or in chunks, process each record, write results incrementally. Each format has its streaming tool: line iteration and csv readers for CSV and logs (with quoted fields containing newlines handled by a real CSV parser, not split), JSON Lines read per line, a single giant JSON array needs an incremental parser (ijson, stream-json, Jackson streaming, System.Text.Json Utf8JsonReader, serde_json StreamDeserializer for sequences), XML needs iterparse, SAX or StAX with elements cleared after use, and pandas or Polars have chunked or lazy readers. Some operations cannot stream naively: global sorts, deduplication and joins need external sorting, a database, or a bounded index. Output must be written as it goes, in batches, not collected in a list. Compressed inputs can be decompressed as a stream.
</context>

<task>
Target: {{target}}
{{#constraints}}
Constraints:
{{constraints}}
{{/constraints}}

1. Read the code and identify every place the whole input or all results are held in memory, including hidden ones (list(...), sorted(...), accumulating dicts, ORM bulk lists).
2. Measure peak memory and time on a sample large enough to show the growth (or estimate from the code and say so).
3. Rewrite to stream: the format's streaming reader, record-by-record or chunked processing, and incremental output written in batches (file writes, database batch inserts, multipart uploads).
4. For operations that need the whole dataset (sort, dedup, group totals, joins), choose a bounded approach: running aggregates, an on-disk or database staging step, external sort, or a key index that fits in memory, and state its memory bound.
5. Keep error handling per record: report bad rows with line or record numbers instead of failing the whole file, if the original behaviour allows.
6. Verify the output matches the original on a sample (same rows, same totals), measure peak memory and time again, and run the tests.
</task>

<constraints>
- Results must be identical to the original for valid input; show the comparison.
- State the new memory bound and what it depends on (chunk size, number of distinct keys).
- Do not delete or overwrite input files.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Peak memory and time before and after, with the file size.
## Why it used so much memory
Each place with `path:line`.
## Changes
The diff with one sentence per change.
## Equivalence check
How outputs were compared and the result.
## Limits
The memory bound and what would break it.
</output_format>
