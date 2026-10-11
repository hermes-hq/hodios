---
schema: 1
id: review-single-file-or-function
kind: prompt
title: Review a pasted function or file
description: Reviews a function, class or file pasted on its own, with no pull request or repository, for bugs, edge cases and non-idiomatic code, ranked by severity, with a corrected version.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer]
requires: [none]
inputs: [file, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [snippet-review, edge-cases, idioms, bugs]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-pull-request, explain-code, review-code-readability]
args:
  - name: code
    description: The function, class or file to review.
    type: text
    required: true
  - name: language
    description: Language and version, framework and runtime if relevant (for example "Python 3.12, no third-party libraries").
    type: text
  - name: purpose
    description: What the code is supposed to do, expected inputs and how it is called.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Findings, Corrected code, Tests to try]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code pasted without its repository is reviewed with missing context: the callers, the types of inputs, the framework conventions and the tests are all invisible. A good reviewer of isolated code makes those gaps explicit instead of guessing silently, then tests the code mentally against the inputs that break most functions: empty, one element, duplicates, null or missing values, negative and zero, very large, Unicode and whitespace, unsorted input, concurrent calls, and failures from anything it calls. Language-specific traps matter more than general style: mutable default arguments and integer division in Python, `==` versus `===` and floating-point money in JavaScript, nil maps and loop variable capture in Go, integer overflow and iterator invalidation in C++ and Java, unchecked `unwrap` in Rust. The output should be something the person can paste back: a corrected version that keeps their structure, not a rewrite in a different style.
</context>

<task>
<code>
{{code}}
</code>

{{#language}}
<language>
{{language}}
</language>
{{/language}}

{{#purpose}}
<purpose>
{{purpose}}
</purpose>
{{/purpose}}

1. State your assumptions: language and version, what the code is meant to do, the types and ranges of inputs, and how it is called. If the purpose is genuinely unclear, ask before reviewing.
2. Trace the code with a normal input, then with each edge input that applies (empty, single, duplicates, null, zero and negative, very large, special characters, unsorted, concurrent use, failures from calls it makes). Note every input that gives a wrong result, an exception, or wrong performance.
3. Check language-specific traps for the stated language and version.
4. Check error handling and resource handling: errors swallowed, files or connections not closed, exceptions that reveal internals.
5. Rank findings: bug (wrong result or crash on realistic input), risk (fails on unusual input or under load), idiom (works but non-idiomatic or hard to maintain).
6. Write the corrected code, keeping the original structure, names and style where they are fine, and mark each change with a short comment referencing the finding number.
7. List the inputs the person should test, with the expected result for each.
</task>

<constraints>
- Every bug finding includes the input that triggers it and the wrong versus expected result.
- Do not assume project context you cannot see; list it under Assumptions.
- Do not rewrite into a different paradigm or add dependencies unless a finding requires it.
- At most 10 findings.
</constraints>

<output_format>
## Assumptions
Bullets.
## Findings
Numbered: bug/risk/idiom, line, input, wrong versus expected, fix.
## Corrected code
One code block, with comments referencing finding numbers.
## Tests to try
Table: input, expected result.
</output_format>
