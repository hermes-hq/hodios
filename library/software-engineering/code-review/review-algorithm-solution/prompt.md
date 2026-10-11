---
schema: 1
id: review-algorithm-solution
kind: prompt
title: Review an algorithm implementation for correctness
description: Reviews an algorithm implementation for correctness with a loop invariant or proof sketch, counterexamples, boundary cases and the real time and space complexity versus the claimed one.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, student]
requires: [none]
inputs: [file, text]
output: [report, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
subject: [computer-science]
level: intermediate
tags: [correctness, loop-invariants, complexity, interview-practice]
pairs_with:
  personas: [code-reviewer]
  prompts: [improve-algorithmic-complexity, explain-algorithm]
args:
  - name: problem
    description: The problem statement with input constraints (sizes, value ranges, whether input can be empty, duplicates allowed).
    type: text
    required: true
  - name: code
    description: The implementation, with its language.
    type: text
    required: true
  - name: claim
    description: The author's claimed complexity or approach, if any.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Approach, Correctness, Counterexamples, Complexity, Fix]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Algorithm code passes the examples and fails the hidden tests for a small set of reasons: an off-by-one in a binary search bound or loop end; a greedy choice that is not actually optimal (with a three-element counterexample); a dynamic programming state that misses a dimension; visited-marking at the wrong time in a graph search, causing repeats or missed paths; integer overflow in a midpoint, sum or product; recursion depth exceeding limits on the maximum input; mutation of the input that callers rely on; and complexity that looks linear but hides a quadratic step (slicing in a loop, `list.pop(0)`, string concatenation, `in` on a list). The reliable way to check correctness is to state the invariant the loop maintains, show it holds initially, is preserved, and implies the answer at termination; then attack the code with the smallest inputs that stress each boundary. Complexity must be checked against the input constraints, since an O(n²) solution is fine at n = 1,000 and fails at n = 200,000.
</context>

<task>
<problem>
{{problem}}
</problem>

<code>
{{code}}
</code>

{{#claim}}
<claim>
{{claim}}
</claim>
{{/claim}}

1. Restate the approach the code takes in two or three sentences, and name the algorithmic technique.
2. State the invariant or recurrence the correctness depends on. Sketch why it holds at initialisation, is maintained by each step, and gives the right answer at termination. Where the argument fails, that is a bug.
3. Search for counterexamples: the smallest inputs at each boundary (empty, one element, two elements, all equal, sorted, reverse sorted, maximum values, negative values, duplicates, disconnected graphs, cycles). Trace the code on each one that looks risky and show the wrong output against the expected one.
4. Check overflow, recursion depth and input mutation against the stated constraints.
5. Compute the real time and space complexity, line by line where hidden costs exist, and compare with the claim and with what the constraints require.
6. Give the minimal fix for each bug. If the approach itself is wrong (for example, greedy where dynamic programming is needed), say so and outline the correct approach without writing a complete new solution unless asked.
</task>

<constraints>
- Every counterexample is traced step by step and gives the wrong and expected output.
- Do not declare the code correct without stating the invariant or recurrence that justifies it.
- Keep the author's approach when it is sound; fix rather than replace.
- If the problem constraints are missing, ask or state assumptions, because complexity verdicts depend on them.
</constraints>

<output_format>
## Verdict
One line: correct | correct but too slow | incorrect, with the main reason.
## Approach
Two or three sentences.
## Correctness
The invariant or recurrence and the proof sketch, marking where it breaks.
## Counterexamples
Table: input, expected, actual, cause.
## Complexity
Time and space, with hidden costs called out, against the claim and the constraints.
## Fix
Minimal code changes, or the outline of the correct approach.
</output_format>
