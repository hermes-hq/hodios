---
schema: 1
id: explain-pointers-and-memory
kind: prompt
title: Explain pointers and memory in C or C++ code
description: Explains C or C++ pointer and memory code with step-by-step stack and heap diagrams, and points out dangling pointers, leaks, double frees, aliasing and off-by-one buffer errors.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [student, software-engineer, embedded-engineer]
stack: [c, cpp]
requires: [none]
inputs: [text]
output: [explanation, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [pointers, memory-model, stack-and-heap, undefined-behaviour]
pairs_with:
  prompts: [review-c-code-for-memory-safety, replace-raw-pointers-with-smart-pointers, trace-program-execution]
args:
  - name: code
    description: The C or C++ code, ideally a function or short program under 60 lines.
    type: text
    required: true
  - name: question
    description: What confuses you, such as "why does this print garbage" or "who frees this".
    type: text
output_contract:
  format: markdown
  sections: [What the code does with memory, Step by step, Problems, Ownership summary, Check it yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pointer code becomes clear when you draw boxes: each variable is a box on the stack, each allocation a box on the heap, and each pointer an arrow. Most confusion maps to a few situations: returning the address of a local variable (the box disappears when the function returns), freeing memory while another pointer still points at it, forgetting the extra byte for a string's terminating null, `sizeof` on a pointer versus an array, pointer arithmetic scaling by element size, an array decaying to a pointer when passed to a function, passing a pointer by value so the caller's pointer does not change, and in C++ a copy of a class that owns raw memory causing a double free. Undefined behaviour may appear to work, so "it runs" proves nothing.
</context>

<task>
Explain what this code does with memory.

```
{{code}}
```
{{#question}}
The learner's question: {{question}}
{{/question}}

1. Say in two sentences what the code does and which memory it uses: stack variables, heap allocations, static or string-literal storage.
2. Walk through it step by step at the points where memory changes (declarations, allocations, assignments through pointers, calls and returns, frees). After each, draw a text diagram with a Stack column and a Heap column: boxes with names, sizes where useful, values or "?" for uninitialised, and arrows for pointers (for example `p ──► [heap #1: 10 20 30]`). Mark freed or out-of-scope boxes as gone.
3. List every problem with the step where it happens: undefined behaviour (dangling pointer use, out-of-bounds access, uninitialised read, use after free, double free), leaks (the last pointer to a heap box lost), and logic errors (pointer passed by value, `sizeof` on a decayed array). Say what may happen in practice and why it may seem to work.
4. Summarise ownership: for each heap allocation, who allocates it, who is responsible for freeing it, and whether that happens on every path including errors.
5. Show how to confirm the problems with a tool: compiling with `-fsanitize=address,undefined -g`, or running Valgrind, and what the report would point at.
</task>

<constraints>
- Distinguish C from C++ behaviour where they differ, and say which standard you assume if it matters.
- Never say undefined behaviour is fine because it printed the right value.
- Explain the code first. Give a corrected version only for the problems found, kept minimal, after the explanation.
- Answer the learner's question directly in the step where it is resolved.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the code does with memory
Two sentences.
## Step by step
Numbered steps, each with the line and a Stack and Heap diagram in a text code block.
## Problems
Bullets: problem, step, what can happen. "None found" if none.
## Ownership summary
A table: allocation, allocated by, freed by, every path covered.
## Check it yourself
Sanitiser or Valgrind command and what to look for, then any minimal fix.
</output_format>
