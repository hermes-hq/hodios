---
schema: 1
id: run-mutation-testing
kind: prompt
title: Run mutation testing on a module
description: Sets up mutation testing for one module, triages the surviving mutants and writes tests that kill the ones that matter. Use when coverage looks high but you doubt the tests would catch a real bug.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [software-engineer, qa-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: expert
tags: [mutation-testing, test-effectiveness, coverage]
pairs_with:
  personas: [test-engineer]
  prompts: [review-test-quality, fill-test-gaps]
args:
  - name: module
    description: The module, package or files to mutate, plus the test command that covers them.
    type: text
    required: true
  - name: language
    description: Language and test runner, for example "TypeScript with Jest" or "Java with JUnit and Maven".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Setup, Results, Triage, New tests, Re-run, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Line coverage says code ran during a test, not that a test would fail if the code were wrong. Mutation testing changes the code in small ways (flip `<` to `<=`, drop a call, return a constant) and reruns the tests; a mutant that survives is a change no test noticed. Running it over a whole repository on day one produces hours of runtime and thousands of survivors nobody reads. The value comes from a narrow scope, a careful triage, and tests that assert behaviour. Common tools: Stryker (JavaScript, TypeScript, C#), PIT (Java, Kotlin), mutmut or cosmic-ray (Python), cargo-mutants (Rust), Gremlins or go-mutesting (Go), Infection (PHP), mutant (Ruby).
</context>

<task>
Run mutation testing on {{module}} ({{language}}).

1. Read the module and its tests. Run the existing tests once; if they fail or are flaky, stop and report, because mutation results on a red or flaky suite are meaningless.
2. Pick the tool for {{language}}, unless the project already has one. Configure it to mutate only the module and to run only the tests that cover it. Enable incremental or per-test coverage mode if the tool has one, and set a timeout multiplier so infinite-loop mutants are classed as timeouts.
3. Run it and record: mutants generated, killed, survived, no coverage, timed out, and the mutation score.
4. Triage every survivor into one of:
   - **Important**: a boundary, a branch of business logic, error handling or a security check whose change would be a real bug.
   - **Weak test**: code is covered but the test asserts too little (no assertion on the return value, only "does not throw").
   - **Equivalent**: the mutant behaves identically (for example a change to an unobservable log message or a redundant condition). Explain why in one line.
   - **Low value**: logging, `toString`, generated code. Suggest excluding it in config.
5. Write tests that kill the Important and Weak-test survivors. Each test asserts observable behaviour at the boundary the mutant changed; name it after the behaviour, not the mutant.
6. Re-run the tool on the module and report the new numbers, listing any mutant still alive and why.
</task>

<constraints>
- Do not change production code to kill a mutant unless the mutant revealed a real bug; if it did, say so separately and ask before fixing.
- Never chase a 100% score. Equivalent mutants exist and are not failures.
- Do not commit tool caches or reports unless the project already does.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup
Tool, version, config file contents and the command used.
## Results
Table: generated, killed, survived, no coverage, timeout, score.
## Triage
Table: mutant id, file:line, mutation, verdict, reason.
## New tests
Code blocks with file paths.
## Re-run
The real numbers from the second run, or a plain statement that it was not run.
## Next steps
Where a CI threshold makes sense (incremental, on changed code only) and what to exclude.
</output_format>
