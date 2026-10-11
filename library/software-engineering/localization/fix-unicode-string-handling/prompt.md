---
schema: 1
id: fix-unicode-string-handling
kind: prompt
title: Fix Unicode-unsafe string handling
description: Finds and fixes code that breaks on non-ASCII text, such as length limits, truncation, reversal, case changes, initials and slugs that split emoji, combining marks and scripts.
category: localization
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, frontend-engineer, backend-engineer]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [diff, tests, report]
risk: edits-files
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [unicode, grapheme-clusters, text-processing]
pairs_with:
  prompts: [implement-locale-aware-sorting-and-search, review-i18n-readiness]
args:
  - name: code
    description: Files, functions or a description of where text is measured, cut, transformed or validated.
    type: text
    required: true
  - name: language
    description: Programming language and runtime, for example "TypeScript in browsers and Node 22", "Python 3.12", "Go", "Swift".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Findings, Fixes, Tests, Storage and limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
What a user sees as one character can be several code points ("é" as e plus a combining accent, a flag, a family emoji joined by zero-width joiners, a Devanagari syllable) and each code point can be one or two UTF-16 code units or up to four UTF-8 bytes. So `str.length`, `slice`, `substring`, `[::-1]` and byte-based column limits split characters, leave half a surrogate pair, or drop an accent. `toUpperCase` without a locale turns Turkish "i" into "I" instead of "İ", German "ß" uppercases to "SS" (changing length), and case-insensitive comparison needs case folding, not lowercasing. "First letter as initial", slug generation and username validation written with `[A-Za-z]` lock out most of the world's names. Each language has the right tool: `Intl.Segmenter` in JavaScript, the `regex` package's `\X` or a grapheme library in Python, `unicode-segmentation` in Rust, Swift's `Character`, ICU's `BreakIterator` in Java and Kotlin. Encoding bugs (mojibake) are a different problem and are not in scope here.
</context>

<task>
Fix Unicode handling in this {{language}} code:

{{code}}

1. Find every operation that measures, cuts, reverses, iterates, changes case, compares, validates or generates identifiers from user text.
2. For each, give an input that breaks it, chosen from: a combining sequence (e plus U+0301), an emoji with skin tone, a ZWJ family emoji, a flag, Devanagari or Thai text, Turkish "i", German "ß", Greek final sigma, and a right-to-left name.
3. Fix with the right unit:
   - Display length and truncation (counters, "Read more", initials): grapheme clusters, with an ellipsis that never splits a cluster.
   - Storage limits: decide whether the limit is bytes (database column, protocol) or characters (product rule) and enforce the right one, truncating on a cluster boundary.
   - Case: locale-aware case mapping when the locale is known; case folding for case-insensitive comparison.
   - Equality and uniqueness: Unicode normalization (NFC for storage, NFKC with confusable checks for usernames when needed).
   - Validation: Unicode property classes (`\p{L}`, `\p{M}`) instead of ASCII ranges for names; never require a first and last name.
   - Slugs: transliterate only where a library supports the script; otherwise keep Unicode in the slug with percent-encoding.
4. Write tests with the breaking inputs as fixtures, asserting counts, truncation results and round trips.
5. Note where client and server count differently (for example a JavaScript `maxlength` counts UTF-16 units while the database counts characters) and align them.
</task>

<constraints>
- Change behaviour only for the identified bugs; keep ASCII results identical.
- Name the library or built-in you rely on and whether it is already a dependency; do not add a dependency when the standard library covers the case.
- Do not handle encoding or mojibake here; mention it if seen and leave it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Findings
| Location | Operation | Breaking input | Wrong result | Correct result |

## Fixes
Diff per file.

## Tests
Test code with fixtures.

## Storage and limits
Byte versus character decisions and client-server alignment.
</output_format>
