---
schema: 1
id: fix-text-encoding-bug
kind: prompt
title: Fix a text encoding bug
description: Fixes text encoding bugs such as mojibake, broken emoji, question marks or byte order marks by tracing the bytes through files, databases and APIs to the hop that breaks them. Use for garbled text.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, data-engineer]
stack: []
requires: [none]
inputs: [text, file, logs]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [unicode, utf-8, mojibake, character-encoding, emoji]
pairs_with:
  prompts: [find-root-cause, write-file-parser]
args:
  - name: symptom
    description: What the broken text looks like next to what it should be, for example "José shows as JosÃ©" or "emoji become ????". Paste the raw output, or better, a hex dump of the bytes.
    type: text
    required: true
  - name: data_flow
    description: Every hop the text passes through, in order, with settings you know, for example "CSV exported from Excel on Windows, read by a Python script, inserted into MySQL 8, served by a PHP API, shown in a browser". Include code for each hop if you can.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the symptom means, Where it breaks, Fix, Repairing existing data, Test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who debugs encoding problems by looking at bytes, not at how a terminal or browser chooses to render them. Text breaks at a boundary where bytes are written in one encoding and read in another, and each symptom points to a specific mistake:
- `Ã©`, `â€™`, `Ã¼`: UTF-8 bytes decoded as Latin-1 or Windows-1252. Usually reversible if nothing re-encoded it again.
- `ÃƒÂ©`-style chains: the same mistake made twice (double encoding).
- U+FFFD replacement characters: bytes that were not valid in the encoding the reader assumed. The original characters are lost at that hop.
- `?` in place of characters: text encoded into a charset that cannot represent them, such as a MySQL `utf8` (utf8mb3) column receiving emoji, or a Latin-1 connection. Lost at that hop.
- `ï»¿` at the start of a file or first CSV header: a UTF-8 byte order mark read as Windows-1252, or a BOM breaking a header match.
- Broken emoji or "half characters" after truncation: a string cut by UTF-16 code units or bytes instead of by code points or grapheme clusters.
- Two strings that look identical but do not compare equal: different Unicode normalisation (NFC versus NFD, common with macOS file names).

Common defaults that cause this: Excel opening a UTF-8 CSV without a BOM as the system code page; Python's `open()` using the locale encoding on Windows; Java versions before 18 using the platform default charset; HTTP responses with no `charset` in `Content-Type`; database connections whose client charset differs from the column charset.
</context>

<task>
Fix this encoding bug.

Symptom:
{{symptom}}

Data flow:
{{data_flow}}

1. Read the symptom and name the mistake it indicates from the patterns above. If the bytes are ambiguous, show how to get them at each hop (`xxd` or `od -c`, `repr()` in Python, `Buffer.from(s).toString("hex")`, `SELECT HEX(col)` or `convert_to(col, 'UTF8')`) and what each result would mean.
2. If the data flow is missing a hop that could explain the symptom, ask about that hop and stop.
3. Walk the hops in order and find the first one where the bytes stop being correct UTF-8 (or the intended encoding). Say what that hop assumes and what it receives.
4. Fix it at that hop by declaring the encoding explicitly (file open mode, database connection and column charset and collation, HTTP header, CSV export option). Then list the other hops that only work by luck and should declare the encoding too.
5. Say whether existing broken data can be repaired. Mojibake that was not re-encoded can be reversed; replacement characters and `?` cannot, and must be re-imported from the source. Give the repair query or script and how to test it on a copy first.
</task>

<constraints>
- Never recommend stripping, ignoring or replacing undecodable characters (`errors="ignore"`, `iconv -c`) as the fix; that hides data loss.
- Prefer UTF-8 everywhere, and `utf8mb4` with a matching collation in MySQL and MariaDB.
- Do not convert a database table in place without a backup and a tested copy.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## What the symptom means
Two to three sentences naming the mistake and whether data is recoverable.
## Where it breaks
Table: Hop | Encoding it writes | Encoding it reads | OK or broken.
## Fix
A diff or configuration change for the breaking hop, then a short list of the other hops to make explicit.
## Repairing existing data
The steps and script or query, or "Not recoverable: re-import from <source>".
## Test
A round-trip test with `é`, `ß`, `日本語`, an emoji outside the Basic Multilingual Plane (for example U+1F600) and a combining accent, checked at the last hop.
</output_format>
