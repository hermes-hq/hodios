---
schema: 1
id: fix-regex-not-matching
kind: prompt
title: Fix a regular expression that does not match
description: Fixes an existing regular expression that matches too much, too little or hangs from catastrophic backtracking, explaining each part and proving the fix with matching and non-matching test cases.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, data-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [text, file]
output: [explanation, code, tests]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [regex, pattern-matching, backtracking, redos, text-parsing]
pairs_with:
  prompts: [write-regex, fix-text-encoding-bug]
args:
  - name: pattern
    description: The regular expression exactly as written in the code, including flags and how it is called (match, search, fullmatch, replace, split, test).
    type: text
    required: true
  - name: engine
    description: The language or tool that runs it, for example Python re, JavaScript, Java, .NET, Go RE2, PCRE in PHP, grep -E, a database REGEXP, an editor search.
    type: text
    required: true
  - name: examples
    description: Strings that should match and strings that should not, and what it does wrong on them (no match, wrong capture, matches too much, hangs).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the pattern does now, Why it fails, Fixed pattern, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who fixes regular expressions by reading them token by token for the specific engine. The bugs that cause most trouble:
- Anchoring and call semantics: Python `re.match` anchors at the start only, `search` finds anywhere, `fullmatch` anchors both ends; JavaScript `test` with the `g` flag keeps `lastIndex` between calls, so alternate calls fail; `^` and `$` behave per line only with the multiline flag; `$` in Python also matches before a final newline.
- Greedy versus lazy: `.*` runs to the last possible match (`<.*>` eats several tags); a negated class like `[^>]*` is usually clearer than `.*?`.
- `.` does not match newlines without the dotall flag.
- Escaping: in string literals backslashes are processed twice (`"\d"` in Java or C# strings, `"\\."`), so raw strings help; unescaped `.`, `+`, `?`, `(` in literal text; a hyphen in the middle of a character class makes a range.
- Unicode: `\w` and `\d` are ASCII-only in some engines and Unicode-aware in others; accented letters and non-ASCII digits behave differently; the JavaScript `u` flag changes behaviour.
- Engine features: lookbehind, possessive quantifiers and atomic groups are not supported everywhere; Go and RE2 have no backreferences or lookaround; POSIX grep needs `-E` or `-P` for some syntax.
- Catastrophic backtracking: nested or overlapping quantifiers such as `(a+)+`, `(.*)*`, `(\w+\s?)*$` take exponential time on a near-miss input. This is a denial-of-service risk (ReDoS) when the input comes from users. Fixes: remove the ambiguity so each character can be matched one way, use atomic groups or possessive quantifiers where supported, a linear-time engine, or an input length limit.
- Using a regex where a parser fits better: HTML, nested structures, full email address validation, and CSV with quoted fields.
</context>

<task>
Fix this regular expression.

Pattern and call:
{{pattern}}

Engine:
{{engine}}

Examples and what goes wrong:
{{examples}}

1. If you can read the repository, look at how the pattern is built (string escaping, concatenation, flags) and every place it is used before answering.
2. Explain what the pattern does now, token by token, for this engine and call.
3. Show why it fails on each example given: where it matches, where it stops, or why it backtracks.
4. Give the fixed pattern for this engine, with flags and the corrected call if the call was wrong, written as it should appear in the source code (escaping included). Prefer the simplest pattern that passes all examples; explain each change.
5. Give tests: a table of inputs with expected match or no match and captures, including the user's examples plus edge cases (empty string, boundaries, Unicode, newlines, and a long near-miss input to prove there is no catastrophic backtracking), and a unit test in the language used.
6. If the job is better done by a parser or a library (URL, email, HTML, CSV, dates), say so briefly and still fix the regex if the user wants it.
</task>

<constraints>
- Only use syntax the stated engine supports; say if a feature is unavailable and give an alternative.
- Do not claim a pattern is correct without walking it against every example given.
- Flag any pattern that runs on untrusted input and can backtrack exponentially, even if it was not the reported problem.
</constraints>

<output_format>
## What the pattern does now
Token-by-token reading.
## Why it fails
Per example.
## Fixed pattern
The pattern as written in source, with the changes explained.
## Tests
Table of cases and a unit test.
</output_format>
