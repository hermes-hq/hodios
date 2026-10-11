---
schema: 1
id: explain-regex
kind: prompt
title: Explain a regular expression
description: Explains a regular expression token by token, shows what it matches and misses on sample strings, and flags catastrophic backtracking, flavour differences and edge cases.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, data-analyst, student]
stack: []
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [regular-expressions, pattern-matching, backtracking, code-reading]
pairs_with:
  prompts: [write-regex, fix-regex-not-matching, make-regex-readable, emulate-regex-tester]
args:
  - name: regex
    description: The regular expression exactly as it appears in the code, including delimiters and flags (for example /^\d{3}-\d{4}$/i).
    type: text
    required: true
  - name: flavour
    description: Where the regex runs (JavaScript, Python re, PCRE, Java, .NET, Go RE2, grep -E, a database). Changes what some tokens mean.
    type: string
  - name: samples
    description: Example strings it is meant to match or reject, if you have them.
    type: text
  - name: purpose
    description: What the regex is supposed to do, if known.
    type: text
output_contract:
  format: markdown
  sections: [In one sentence, Token by token, Matches and misses, Traps, Readable version]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Regexes are write-only for most people: dense, flavour-dependent and easy to misread. The usual misreadings are predictable. `.` does not match a newline by default; `^` and `$` mean line or string boundaries depending on the multiline flag; `\d` matches non-ASCII digits in some flavours; a missing anchor makes `\d{3}` match inside `12345`; `[A-z]` includes punctuation; a quantifier on a group captures only the last repetition; and nested quantifiers such as `(a+)+` or `(\w+\s?)*` can backtrack exponentially on a near-miss input, which is a real denial-of-service risk on user input. Go's RE2 and Rust's regex crate do not backtrack and do not support lookarounds or backreferences at all.
</context>

<task>
Explain this regular expression{{#flavour}} ({{flavour}} flavour){{/flavour}}:

```
{{regex}}
```
{{#purpose}}
Intended purpose: {{purpose}}
{{/purpose}}
{{#samples}}
Sample strings:
{{samples}}
{{/samples}}

1. If no flavour is given, assume PCRE-like behaviour as in JavaScript and Python, say so, and note any token in this regex whose meaning differs across common flavours.
2. Say in one sentence what the regex matches, in plain words a non-expert could check against the intent.
3. Break it into tokens and groups in order. For each: the token, what it matches, and any flag that changes it. Number capture groups as the engine numbers them and name what each captures.
4. Build a table of six to ten test strings: the samples if given, plus strings you choose that probe the edges (empty, boundary lengths, a near-miss, unexpected characters, Unicode, a newline, a match embedded in longer text). For each, say match or no match and the captured groups. Work each one through carefully; do not guess.
5. List the traps that apply to this regex: missing or wrong anchors, greedy versus lazy surprises, unescaped metacharacters, character ranges wider than intended, flag-dependent behaviour, and catastrophic backtracking. For backtracking, name the pattern responsible and an input shape that triggers it.
6. If the purpose is known and the regex does not meet it, say where it diverges, shown with a string from the table. Then give a readable version: the same regex in verbose or commented form if the flavour supports it, otherwise split into named parts.
</task>

<constraints>
- Explain the regex that is there. Do not replace it with a different one unless it fails its stated purpose, and then show both.
- Be exact about match results; a wrong row in the table is worse than a missing one. If a result depends on flags or flavour, say which.
- Do not claim a backtracking risk without naming the nested or overlapping quantifier that causes it.
{{> output/uncertainty}}
</constraints>

<output_format>
## In one sentence
What it matches, in plain words.
## Token by token
A table: token, meaning, notes.
## Matches and misses
A table: test string, match yes or no, captured groups, why.
## Traps
Bullets, each tied to a token. "None found" if there are none.
## Readable version
The regex in commented or split form, plus a fixed version only if it fails its purpose.
</output_format>
