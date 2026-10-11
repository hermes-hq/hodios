---
schema: 1
id: make-regex-readable
kind: prompt
title: Make a cryptic regex readable
description: Rewrites a cryptic regular expression with named groups, verbose mode or composed parts, with tests proving it matches and captures exactly what the old one did.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer]
requires: [none]
inputs: [text, file]
output: [code, tests, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [regular-expressions, named-groups, readability, pattern-matching]
pairs_with:
  prompts: [write-regex]
args:
  - name: regex
    description: The regular expression and the code around it, with the language or engine (PCRE, Python re, JavaScript, Java, .NET, Go RE2, POSIX grep) and the flags used.
    type: text
    required: true
  - name: samples
    description: Optional. Real strings it should and should not match.
    type: text
output_contract:
  format: markdown
  sections: [What it matches, Readable version, Equivalence tests, Differences found]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Regexes are rewritten for readability with tools that differ by engine. Verbose or extended mode (`re.VERBOSE` in Python, `(?x)` in PCRE, Java, .NET and Ruby) allows whitespace and comments, but whitespace inside the pattern then needs escaping or `[ ]`, and `#` starts a comment. JavaScript has no verbose flag, so readability comes from building the pattern from named string parts with `new RegExp`, escaping each part. Named groups (`(?P<name>...)` in Python, `(?<name>...)` elsewhere) document captures, but adding a group shifts the numbering of later groups, so code reading `match[2]` or numbered references in replacement strings breaks; use non-capturing `(?:...)` for grouping that does not capture. Go's RE2 has no lookarounds or backreferences.

Small edits change matches: `^` and `$` behave differently with multiline mode, `$` in Python and PCRE also matches before a trailing newline (`\Z` or `\z` do not), `\d` matches non-ASCII digits in Python 3 and .NET unless ASCII mode is set, `.` does not match newlines without dotall, character class ranges depend on case flags, and greedy versus lazy quantifiers change captures without changing whether the string matches. Nested quantifiers like `(a+)+` risk catastrophic backtracking. Equivalence is checked with a test table run against both patterns: whether each string matches and every captured group.
</context>

<task>
Make {{regex}} readable.

1. Explain in plain words what the regex matches, part by part, and how its captures are used by the surrounding code (group numbers, replacements, split).
2. Write the readable version in the engine's idiom: verbose mode with comments, or composed named parts where verbose mode is not available. Use named groups where code reads captures, non-capturing groups elsewhere, and keep group numbering compatible or update every use of the numbers in the same change.
3. Build a test table: {{#samples}}the given samples, plus {{/samples}}typical matches, near misses, empty string, boundaries (start, end, trailing newline), Unicode digits or letters if relevant, and very long inputs for patterns with nested quantifiers.
4. Assert that old and new patterns agree on match result and every capture for each row, and give the tests in the project's language.
5. Report any case where the original seems wrong (matches something it should not, or backtracks badly) as a finding, without changing behaviour.
</task>

<constraints>
- The new pattern must match exactly the same strings and produce the same captures as the old one; any difference is reported, not shipped.
- Use only features the named engine supports.
- Do not replace the regex with a parser or a different approach unless the user asks; you may suggest it.
{{> output/uncertainty}}
</constraints>

<output_format>
## What it matches
Part-by-part explanation and how captures are used.
## Readable version
The new pattern in code.
## Equivalence tests
Test table and the test code.
## Differences found
Suspected bugs or risks in the original, unchanged.
</output_format>
