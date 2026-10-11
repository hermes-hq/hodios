---
schema: 1
id: shrink-failing-input
kind: prompt
title: Shrink a failing input to a minimal case
description: Reduces a large input that triggers a bug, such as a file, request, document or sequence of steps, to the smallest case that still fails, using an automated check and delta-debugging style halving.
category: debugging
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, qa-engineer]
stack: []
requires: [repo-read, shell]
inputs: [file, dataset, text]
output: [code, tests, explanation]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [delta-debugging, test-case-reduction, minimal-reproduction, crash-triage]
pairs_with:
  prompts: [reproduce-bug-report, add-regression-test, write-fuzz-harness]
args:
  - name: failure
    description: What goes wrong and how you trigger it today, for example "the importer crashes with KeyError on this 40 MB CSV" or "the compiler emits wrong code for this 3,000-line file".
    type: text
    required: true
  - name: input_description
    description: The kind of input and its structure (CSV rows, JSON tree, source file, list of API calls, UI steps), its size, and any parts that must stay valid for the program to get far enough to fail.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Failure check, Reduction plan, Reducer, Minimal case, What it tells us]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who knows that a 3-line reproduction finds a bug faster than any amount of staring at a 40 MB input. Reduction works only with an automated "interesting" check: a script that runs the program on a candidate and answers yes when it fails in the same way. The check must match the specific failure (same exception type and location, same wrong output), or the reducer will happily shrink the input into a different bug, such as a parse error caused by cutting a file in half.

Reduce at the level of the input's structure: rows or records before characters, JSON or AST nodes before bytes, whole API calls before fields. Delta debugging (ddmin) removes chunks, halves the chunk size when nothing can be removed, and stops when no single element can go. Existing tools do this for you: C-Reduce or C-Vise for C-like source, generic line- or token-based reducers for other text formats, Hypothesis and other property-based libraries that shrink automatically, fuzzer minimisers (`afl-tmin`, libFuzzer `-minimize_crash=1`), and `git bisect` when the variable is history rather than input.
</context>

<task>
Shrink this failing input.

Failure:
{{failure}}

Input:
{{input_description}}

1. Write the failure check first: a script that runs the program on a candidate input with a timeout and exits 0 only when the same failure occurs, matched on the specific error and location or the wrong output, not on "any non-zero exit". Run it on the original input to confirm it says yes, and on a known-good input to confirm it says no.
2. Choose the reduction units from the input's structure and the order to try them in, keeping the parts that must stay valid for the program to reach the failing code.
3. Use an existing reducer if one fits; otherwise write a small ddmin-style reducer for this structure. Keep every intermediate candidate that still fails so progress is never lost.
4. Run it. After it stops, try hand simplifications it cannot make: replace values with simpler ones (long strings to "a", big numbers to 0 or 1), rename fields, and remove optional structure, checking each with the failure check.
5. Present the minimal case, then say what it reveals: which element is necessary, which nearby variations pass, and the hypothesis that follows. Turn the minimal case into a regression test.
</task>

<constraints>
- Never accept a smaller input that fails in a different way; the failure check must guard against it.
- Keep the reduced case free of personal or customer data: if the original contains it, replace values with synthetic ones and re-check that it still fails.
- Do not run untrusted inputs or the program under test with more privileges than needed; use a timeout and a scratch directory.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Failure check
The script and its results on the original and a known-good input.
## Reduction plan
Units, order, and what must stay valid.
## Reducer
The tool command or reducer code.
## Minimal case
The final input and its size compared with the original.
## What it tells us
Necessary elements, passing variations, the hypothesis and the regression test.
</output_format>
