---
schema: 1
id: review-regex-change
kind: prompt
title: Review a regular expression in a change
description: Reviews a new or changed regex by explaining it piece by piece, listing inputs it wrongly accepts or rejects, and flagging catastrophic backtracking and engine differences.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer]
requires: [none]
inputs: [diff, text]
output: [report, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [regex, input-validation, redos, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [write-regex]
args:
  - name: diff
    description: The regex and the code around it (how it is compiled, which flags, whether it is used to match, search, split or replace), with file paths.
    type: text
    required: true
  - name: intent
    description: What the regex is meant to match and reject, with real examples of each if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, What it matches, Wrong accepts and rejects, Findings, Test strings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Regexes get approved because nobody reads them. The bugs are regular: a missing `^` and `$` (or a `search` where a full match was meant) so `abc@evil.com.attacker.net` passes a domain check; an unescaped `.` matching any character in an IP or domain; `$` matching before a trailing newline in Python, PCRE and Java; character ranges like `[A-z]` that include punctuation; `\d` matching non-ASCII digits in Unicode mode; greedy `.*` crossing field boundaries; alternation without grouping (`^a|b$` means `(^a)|(b$)`); flags that change meaning (multiline, dotall, case-insensitive with Unicode); and nested or overlapping quantifiers such as `(a+)+`, `(\w|\d)*` or `(.*,)*` that backtrack exponentially on a near-miss input, a denial of service if the input comes from users. Engines differ: JavaScript, Python `re`, Go RE2, Java, .NET and PCRE disagree on lookbehind, possessive quantifiers, named groups and Unicode classes; RE2 is linear time and rejects backreferences. Some jobs (email, URLs, HTML, dates) should use a parser or library instead.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#intent}}
<intent>
{{intent}}
</intent>
{{/intent}}

1. Identify the engine and flags from the code, and how the regex is applied (full match, search, split, replace, global).
2. Explain the regex token by token in plain language, then state in one sentence what it actually matches.
3. Compare with the intent (or ask for it if missing and infer from names). List concrete strings it wrongly accepts and wrongly rejects, including boundary, empty, whitespace, newline, Unicode and very long inputs.
4. Check anchoring, escaping, ranges, grouping of alternation, greediness, flag effects and engine-specific syntax.
5. Check performance: nested or overlapping quantifiers and alternations that can backtrack catastrophically; give the attack string (for example 30 `a`s followed by `!`) when one exists, and say whether the input is user-controlled.
6. Check usage: compiled once rather than per call, captured groups indexed correctly after the change, replacement strings escaping `$` or `\`.
7. Propose a corrected regex in the same engine's syntax, or recommend a parser or library when a regex is the wrong tool, and show it passing your test strings.
</task>

<constraints>
- Every wrong accept or reject is an actual string, not a category.
- Do not claim a string matches or fails without tracing it through the pattern; if unsure, say so.
- Keep the corrected regex in the engine the code uses; do not switch engines without saying why.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## What it matches
Token-by-token breakdown, then a one-sentence summary.
## Wrong accepts and rejects
Table: string, current result, intended result.
## Findings
Numbered: severity, `path:line`, problem, fix.
## Test strings
A list of accept and reject strings to add as unit tests, including the backtracking string if any.
</output_format>
