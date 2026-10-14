---
schema: 1
id: test-code-with-randomness
kind: prompt
title: Test code that uses randomness
description: Tests code that uses randomness - shuffles, sampling, ids, jitter, A/B assignment - with injected or seeded sources, exact checks where possible and sound statistical checks where not.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, data-scientist]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [randomness, seeding, deterministic-tests, statistical-testing]
pairs_with:
  prompts: [write-property-based-tests, test-time-dependent-code, fix-flaky-test]
  personas: [test-engineer]
args:
  - name: target
    description: The code that uses randomness and what it should guarantee, for example "assigns 10% of users to the variant, stable per user", "retries with jitter between 100 and 200 ms".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Randomness sources, Approach, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Random behaviour makes tests either flaky (asserting exact output from an unseeded generator) or useless (asserting only that "something" came back). The first step is making the source controllable: inject a random generator or a seed, instead of calling a global like `Math.random` or the module-level `random` functions, so tests can fix it. Then pick the right kind of assertion. Most properties are exact and need no statistics: output is a permutation of the input, values stay within bounds, the same user always gets the same bucket, ids are unique and well formed. Seeded snapshot assertions ("with seed 42 we get exactly this") are brittle against library upgrades and refactors and should be rare. Distribution claims ("about 10%") need a statistical test with a sample size and tolerance chosen so the false-failure rate is tiny (for example a binomial or chi-squared bound at a very small significance level), with a fixed seed so the test is deterministic in CI. Security-sensitive randomness (tokens, keys) must come from a cryptographically secure source, which tests can check by construction.
</context>

<task>
Test the randomness in:
{{target}}

1. Read the code and find every randomness source: global random calls, UUID generation, shuffles, sampling, jitter, hashing for bucketing, randomness in dependencies. Note whether each is injectable or seeded.
2. If a source is not controllable, make the smallest change that makes it injectable (a parameter, a constructor argument or a module-level provider with a default) without changing behaviour, and show it before applying.
3. Classify each guarantee: exact property (bounds, permutation, uniqueness, stability per key, format), distribution property (proportions, uniformity), or security property (unpredictability).
4. Write tests for exact properties using an injected source: a stub returning chosen values for boundary checks (lowest and highest possible draws), and a seeded generator across many iterations for invariants.
5. Write distribution tests only where the distribution is the requirement: fix the seed, choose a sample size and tolerance from a stated statistical bound so a correct implementation fails with negligible probability, and document the calculation in the test.
6. For security-sensitive values, assert the cryptographically secure source is used and the length and alphabet are right; do not try to test unpredictability statistically.
7. Avoid exact seeded output snapshots unless the output must be reproducible across versions (for example a published procedural generator); say why when you use one.
8. Run the tests repeatedly, and also once with several different seeds, to confirm they pass for any correct randomness, not only the chosen seed.
</task>

<constraints>
- No test may depend on an unseeded, uncontrolled random source.
- Do not widen tolerances until a test passes; derive them from the stated bound.
- Keep production behaviour unchanged when making sources injectable.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Randomness sources
Table: location | source | controllable? | change needed.

## Approach
Each guarantee and how it is tested (exact, distribution, security).

## Tests
Diffs, including any injection change.

## Verification
Repeated runs and runs with different seeds.
</output_format>
