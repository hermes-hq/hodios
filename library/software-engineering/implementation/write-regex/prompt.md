---
schema: 1
id: write-regex
kind: prompt
title: Write a regular expression
description: Builds a regular expression from plain-language intent and example strings, explains each part and lists the edge cases it accepts or rejects. Use when you need a tested pattern.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, data-engineer, data-analyst]
requires: [none]
inputs: [text]
output: [code, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [regex, pattern-matching, validation]
args:
  - name: intent
    description: What the pattern should match, in plain words, and where it will be used (validation, search, extraction).
    type: text
    required: true
  - name: should_match
    description: Example strings that must match, one per line. Mark the part to capture if extracting.
    type: text
    required: true
  - name: should_not_match
    description: Example strings that must not match, one per line.
    type: text
  - name: flavor
    description: Regex engine the pattern must run in.
    type: enum
    enum: [javascript, python, pcre, go, posix]
    default: javascript
output_contract:
  format: markdown
  sections: [Pattern, How it works, Test results, Edge cases, Usage]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Regexes look right and fail quietly. The common faults are a missing anchor that lets the pattern match inside a longer string, a feature the target engine does not support, a `$` that also matches before a trailing newline, nested quantifiers that backtrack catastrophically on hostile input, and a pattern that was never actually run against the examples it was built from.
</context>

<task>
Write a {{flavor}} regular expression for: {{intent}}

Must match:
{{should_match}}

Must not match:
{{should_not_match}}

1. Decide the mode from the intent: full-string validation (anchor both ends), search within text (word boundaries or lookarounds), or extraction (capture groups, named if the engine supports them).
2. Respect the engine:
   - javascript: use the `u` flag for Unicode; `\d` and `\w` are ASCII-only.
   - python: use `re.fullmatch` for validation, or `\Z` rather than `$`; in Python 3, `\d` and `\w` match Unicode unless you pass `re.ASCII`.
   - pcre: `$` matches before a final newline; use `\z` for a strict end. Possessive quantifiers and atomic groups are available.
   - go: RE2 has no lookaround and no backreferences. Rewrite the logic without them, or say that code must do that part.
   - posix: ERE only. No `\d`, lazy quantifiers or lookaround; use bracket expressions like `[0-9]` and `[[:alpha:]]`.
3. Prefer the simplest pattern that passes every example. Avoid nested quantifiers over overlapping classes such as `(a+)+` or `(\w|\d)*`.
4. Test it. Walk every example through the pattern and record the result. If a code tool is available, run them for real and say so. If any example fails, fix the pattern and repeat.
5. Probe the edges the examples do not cover: empty string, leading and trailing whitespace, newlines, Unicode letters and digits, very long input, and near-misses of the valid shape.
6. If the examples contradict the intent or each other, say which ones and which reading you followed.
</task>

<constraints>
- Never claim an example passes unless you checked it.
- If a regex is the wrong tool (nested structures, full email RFC compliance, real date validity such as 31 February, HTML), say so in one sentence, give the pragmatic pattern anyway, and name what code must check.
- Show the pattern both as a literal and as an escaped string for the language when they differ.
{{> output/uncertainty}}
</constraints>

<output_format>
## Pattern
A code block with the pattern and flags, then one line on the matching mode.

## How it works
| Part | Meaning |

## Test results
| Input | Expected | Result |
Every given example, then the edge cases you added.

## Edge cases
Inputs it accepts that someone might not expect, and inputs it rejects that might be valid. One line each.

## Usage
A 3 to 6 line snippet in the language of the chosen flavor (shell `grep -E` for posix).
</output_format>

<examples>
<example>
Intent: a hex colour in CSS, full-string. Should match: `#fff`, `#A1B2C3`. Should not match: `fff`, `#abcd`, `#12345g`. Flavor: javascript.

## Pattern
```
/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i
```
Full-string validation.

## Edge cases
- Rejects 4- and 8-digit forms with alpha (`#abcd`, `#11223344`), which CSS Color Level 4 allows. Add `|[0-9a-f]{4}|[0-9a-f]{8}` if you need them.
</example>
</examples>
