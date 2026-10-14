---
schema: 1
id: fix-redos-regex
kind: prompt
title: Fix regular expression denial of service (ReDoS)
description: Finds regular expressions that backtrack catastrophically on user input, rewrites them or moves them to a linear-time engine, and adds length limits and timing tests.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [redos, regex, denial-of-service]
pairs_with:
  prompts: [review-regex-change, write-regex, triage-sast-findings, fix-event-loop-blocking]
  personas: [security-auditor]
args:
  - name: target
    description: The regexes, files or scanner findings to fix, or the module to scan.
    type: text
    required: true
  - name: stack
    description: Language and regex engine. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Risky patterns, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Backtracking engines (JavaScript, Python `re`, Java, .NET, Ruby, PHP PCRE) can take exponential or polynomial time when a pattern lets the same characters be matched in many ways and the overall match then fails. The classic shapes are nested quantifiers (`(a+)+`, `(\w+\s?)*`), alternations that overlap (`(a|aa)*`, `(\d|\w)+`), and adjacent quantified parts that can swallow the same text (`\s*.*\s*$`, `\d+\d+`). One short request can pin a CPU core for minutes; in Node.js that blocks the whole event loop. Fixes, in order of strength: replace the regex with plain parsing code or a library validator (email, URL, date); rewrite so each character has only one way to match (make the parts mutually exclusive, use possessive quantifiers or atomic groups where the engine supports them); switch to a linear-time engine (RE2, Rust `regex`, Go `regexp`, .NET `RegexOptions.NonBacktracking`); cap input length before matching; and set a match timeout where the engine supports one (.NET, Java via interruptible input). Exposure matters: patterns on request data, headers, user-supplied regexes and file contents come first.
</context>

<task>
Fix ReDoS in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Find the regexes: literals, `RegExp` or `re.compile` calls, validation schemas, routing patterns and any place users supply a pattern. If a ReDoS linter or analyser is available in the project's tooling, run it; otherwise inspect each pattern by hand.
2. For each risky pattern, name the ambiguous part, build a short attack string (a long run of the repeated character followed by a non-matching character), and measure the match time on a growing input in a test.
3. Fix each one with the smallest safe change: rewrite to an unambiguous pattern, replace with parsing code or a vetted validator, or move to a linear-time engine. Add an input length cap before matching that fits the field.
4. If users can supply their own patterns, run them only in a linear-time engine or with a hard timeout, and limit pattern length.
5. Add tests that the rewritten pattern still accepts and rejects the same valid and invalid examples as before, and that the attack string completes within a small time bound.
6. Run the tests and the linter.
</task>

<constraints>
- Prove behaviour is unchanged with examples before and after; list any intentional change in what matches.
- Keep timing tests loose enough not to flake on slow CI machines; assert on growth, not on exact milliseconds.
- Do not replace a regex with a library you have not confirmed exists in the project or ecosystem.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Risky patterns
Table: file:line, pattern, input source, ambiguous part, attack string shape, fix chosen.
## Changes
One line per file: `path`, old pattern → new pattern or replacement.
## Tests
One line per test.
## Verification
Commands run, and match times before and after.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
