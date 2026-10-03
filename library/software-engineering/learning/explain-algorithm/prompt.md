---
schema: 1
id: explain-algorithm
kind: prompt
title: Explain an algorithm
description: Explains an algorithm or data structure through intuition, a step-by-step trace on a small input, the invariant that makes it correct, complexity and runnable code in the learner's language.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [student, software-engineer, job-seeker]
stack: []
subject: [computer-science]
requires: [none]
inputs: [topic]
output: [explanation, code, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [algorithm-analysis, data-structures, big-o, worked-example, coding-interviews]
pairs_with:
  prompts: [explain-concept-with-code, create-coding-exercises]
  personas: [coding-mentor, socratic-tutor]
args:
  - name: algorithm
    description: The algorithm or data structure, for example binary search, Dijkstra's shortest path, quicksort, union-find, a heap, a trie, or dynamic programming for edit distance.
    type: string
    required: true
  - name: language
    description: The programming language for the code. Leave empty for Python.
    type: string
    default: Python
  - name: level
    description: The learner's level.
    type: enum
    enum: [beginner, intermediate, expert]
    default: intermediate
output_contract:
  format: markdown
  sections: [The idea, Worked trace, Code, Why it works, Complexity, Pitfalls, When to use it, Practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach algorithms the way they stick: the idea first, then a hand trace on a small concrete input the learner could follow with pencil and paper, then code that matches the trace line for line, then the reason it is correct. Learners who skip the trace can recite the code but cannot adapt it; learners who skip the invariant cannot tell when a variation breaks it. Complexity should be derived from the structure of the code, not asserted.
</context>

<task>
Explain {{algorithm}} at the {{level}} level, with code in {{language}}.

1. If the name is ambiguous (for example "partition", "DP" or "two pointers" without a problem) or refers to a family, say which specific algorithm you will explain and why, or ask if the choice matters.
2. The idea: the problem it solves, a one-sentence intuition, and the key insight that makes it better than the obvious approach.
3. Worked trace: choose a small input (5 to 8 elements, or a graph of 4 to 6 nodes) that exercises the interesting cases, and trace every step in a table showing the state that matters (pointers, the frontier, the stack, the table being filled).
4. Code: a clean, runnable implementation with the variable names used in the trace, an example call and its expected output as a comment.
5. Why it works: state the invariant or the key property (loop invariant, greedy choice, optimal substructure, heap property) and show briefly why each step preserves it and why it gives the right answer at the end. For beginner, keep this to a plain-language paragraph.
6. Complexity: time and space in the best, average and worst case where they differ, derived from the code, and what input causes the worst case.
7. Pitfalls: the two or three mistakes people make implementing or applying it (off-by-one bounds, overflow in a midpoint, mutating during iteration, preconditions such as sorted input or non-negative weights).
8. When to use it and what to use instead when its preconditions do not hold.
9. Practice: two short exercises, a variation and an application, with hints but not full solutions.
</task>

<constraints>
- The code must run as written on a current stable version of the language.
- The trace and the code must agree; if you simplify the code, simplify the trace too.
- State preconditions explicitly, and say plainly when a common belief about the algorithm is wrong.
- For beginner, define every term (invariant, complexity, recursion) the first time; for expert, go straight to the proof sketch, amortised or probabilistic analysis, and known variants.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with these `##` headings, in order: The idea, Worked trace, Code, Why it works, Complexity, Pitfalls, When to use it, Practice.
The trace is a table. Code blocks have a language tag.
</output_format>
