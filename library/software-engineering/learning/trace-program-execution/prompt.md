---
schema: 1
id: trace-program-execution
kind: prompt
title: Trace a program line by line
description: Traces a short program line by line with a table of every variable's value after each step, so a beginner sees exactly how values change, where loops exit and why the output is what it is.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [student, software-engineer, individual]
stack: []
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [trace-table, dry-run, code-reading, beginner-programming]
pairs_with:
  prompts: [explain-code, drill-code-reading, emulate-python-repl]
args:
  - name: code
    description: The program or function to trace, ideally under 40 lines.
    type: text
    required: true
  - name: input
    description: The input values or function arguments to trace with.
    type: text
  - name: language
    description: The programming language, if not obvious.
    type: string
  - name: puzzle
    description: What confuses you, such as "why does it print 4 and not 5".
    type: text
output_contract:
  format: markdown
  sections: [What we are tracing, Trace table, Key moments, Output, Try it yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Beginners usually understand each line of a program on its own and still cannot predict what it does, because the difficulty is the state: which value a variable holds at this moment. A trace table, the dry run teachers use, fixes this by recording every variable after every executed line. The moments that matter are where beginners' mental models break: a loop condition checked one more time than expected, an off-by-one in a range end, a variable reassigned inside a loop versus outside, integer division, a function receiving a copy versus a reference to the same list, string immutability, short-circuit evaluation, and a `return` inside a loop ending the function early.
</context>

<task>
Trace this {{#language}}{{language}} {{/language}}program{{#input}} with input {{input}}{{/input}}:

```
{{code}}
```
{{#puzzle}}
What confuses the learner: {{puzzle}}
{{/puzzle}}

1. If no input is given and the code needs one, pick a small input that exercises the interesting path, and say so. If the program is longer than about 40 lines or loops more than about 20 times, trace the first iterations in full, then summarise the pattern and show the final ones.
2. Say in one sentence what will be traced: the starting values and the entry point.
3. Build the trace table: one row per executed step (line number, the line, each variable's value after the line, any output). Show loop condition checks as their own rows, including the final check that fails. Show lists and objects in full when they change.
4. Point out the three to five key moments: where a value changes in a way a beginner would not predict, where a loop exits and why, and where a function is called and returns. Tie each to the row number.
5. Give the final output and, if a puzzle was given, answer it directly from the row that explains it.
6. Give one small change to the input or code for the learner to trace themselves, and the question to answer, without the answer.
</task>

<constraints>
- Execute the code exactly as the language does, including integer division, floating point, reference semantics and evaluation order. If behaviour depends on the language version, say which you assumed.
- Do not fix or improve the code unless the learner asks; a bug is traced, not hidden. If it would crash, trace to the crash and show the error.
- Keep the vocabulary at a beginner level and define any term the first time it appears.
{{> output/uncertainty}}
</constraints>

<output_format>
## What we are tracing
One or two sentences.
## Trace table
Step, line, code, variables after, output.
## Key moments
Numbered, each pointing at a step.
## Output
The final output, and the puzzle answered.
## Try it yourself
One change and one question.
</output_format>
