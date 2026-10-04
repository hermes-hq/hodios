---
schema: 1
id: write-semgrep-rule
kind: prompt
title: Write a custom Semgrep rule
description: Writes a custom Semgrep static analysis rule for a risky code pattern in your codebase, with pattern logic, message, fix suggestion and passing and failing test snippets.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [security-engineer, software-engineer]
requires: [none]
inputs: [text, file]
output: [code, tests, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [semgrep, static-analysis, sast, custom-rules, guardrails-as-code]
pairs_with:
  prompts: [review-pr-for-security, audit-dependencies]
  personas: [security-auditor]
  rules: [secure-coding-rules]
args:
  - name: pattern_description
    description: The risky pattern in plain words - what code shape is dangerous, why, and what the safe alternative in your codebase is (an internal helper, a parameterised call, a wrapper).
    type: text
    required: true
  - name: language
    description: The language the rule targets, such as python, javascript, typescript, java, go, ruby or php.
    type: string
    required: true
  - name: examples
    description: Real or minimised snippets of vulnerable code and of safe code the rule must not flag, ideally from your own repository.
    type: text
  - name: rule_style
    description: search matches a code shape; taint tracks untrusted data from sources to sinks and suits injection-style bugs. auto lets the prompt choose and explain.
    type: enum
    enum: [auto, search, taint]
    default: auto
output_contract:
  format: markdown
  sections: [Approach, Rule, Test file, How to run, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Generic rulesets catch generic bugs. The highest-value static analysis rules are the custom ones that encode a team's own lessons: "never call `render_raw` with request data", "always go through `db.safe_query`", "this crypto helper is deprecated". They fail when the pattern is too literal (misses a renamed variable or a keyword argument), too broad (flags the safe helper itself), or has no tests, so it silently breaks on the next refactor. A rule earns its place in CI only with a clear message that tells the developer what to do instead, and a test file that proves both what it flags and what it leaves alone.
</context>

<task>
Write a Semgrep rule in {{language}} for this pattern:

<pattern_description>
{{pattern_description}}
</pattern_description>
{{#examples}}

<examples>
{{examples}}
</examples>
{{/examples}}

Rule style requested: {{rule_style}}.

1. If the description does not say what makes the code dangerous or what the safe alternative is, ask those two questions and stop.
2. Choose the approach. Use `mode: taint` with `pattern-sources`, `pattern-sinks` and `pattern-sanitizers` when the danger is untrusted data reaching a sink across assignments or function calls; use search mode with `patterns`, `pattern-either`, `pattern-not`, `pattern-inside` and `pattern-not-inside` when the danger is a code shape. Explain the choice in two sentences.
3. Write the rule in YAML: `id` (kebab-case, specific), `languages: [{{language}}]`, `severity` (ERROR, WARNING or INFO), a `message` that names the risk and the safe alternative in one or two sentences, `metadata` with `cwe`, `category: security`, `confidence` and `references` only if supplied, and the matching logic. Use metavariables (`$X`, `$...ARGS`) and the ellipsis operator so the rule survives renamed variables, extra arguments and keyword arguments. Narrow with `metavariable-regex` or `metavariable-pattern` where useful.
4. Add a `fix:` only when the rewrite is mechanical and always correct; otherwise put the fix in the message.
5. Write a test file in {{language}} with each case annotated on the line above it: `ruleid: <rule-id>` for code that must be flagged and `ok: <rule-id>` for code that must not, using the comment syntax of the language. Cover at least three true positives (including one variant shape such as an alias or a keyword argument) and three true negatives (the safe helper, a sanitised value, and the closest legitimate look-alike).
6. Trace every test case through the rule and state which match. Fix the rule until the trace agrees with the annotations.
</task>

<constraints>
- Match the language's real syntax; do not use pattern operators or keys that do not exist. If unsure whether an operator is supported for {{language}}, say so.
- Prefer fewer false positives over completeness for a rule that will block CI; if broad coverage is needed, propose a second WARNING-level rule.
- Do not paste secrets, internal URLs or customer data from the examples into the rule or tests; replace them with neutral names.
- Do not claim the rule has been run.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Search or taint, and why, in two sentences.

## Rule
One fenced `yaml` block.

## Test file
One fenced block in {{language}} with `ruleid:` and `ok:` annotations, followed by a table: Case | Expected | Matches when traced.

## How to run
The commands to run the tests (`semgrep --test` against the folder holding the rule and test file) and to scan the repository with the rule, plus where to add it in CI.

## Limits
What the rule will miss (cross-file flows, reflection, dynamic calls) and when to revisit it.
</output_format>
