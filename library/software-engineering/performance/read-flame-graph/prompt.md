---
schema: 1
id: read-flame-graph
kind: prompt
title: Read a flame graph
description: Teaches how to read a flame graph or profiler call tree using the learner's own capture, covering width versus height, self versus total time, the widest plateau and what to try next.
category: performance
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [software-engineer, student]
requires: [none]
inputs: [logs, text]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [flame-graph, profiling, call-tree, self-time, first-profile]
pairs_with:
  prompts: [profile-hot-path, hit-game-frame-budget]
  personas: [performance-engineer]
args:
  - name: profile_output
    description: Your profiler output as text - a collapsed-stack file, a call tree or top-functions table exported from your profiler, or a description of what the flame graph shows (the widest boxes and their names and percentages). Also say what was slow.
    type: text
    required: true
  - name: language
    description: The language and profiler, for example "Python with py-spy", "Node.js with Chrome DevTools", "Go pprof", "Java async-profiler".
    type: string
    default: "infer from the output and say what you assumed"
output_contract:
  format: markdown
  sections: [How to read this graph, What your profile says, Where to look next, Traps to avoid, Try it yourself]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner has profiled something for the first time or is staring at a flame graph without knowing what it means. Profiler: {{language}}. They learn fastest when the explanation uses their own capture, not an abstract one.

What beginners get wrong: reading the x-axis as time (in a classic flame graph it is sorted alphabetically and only width matters; a flame chart is the one ordered by time); thinking tall stacks are slow (height is call depth; width is cost); chasing the function with the biggest total time when it is just `main` or a framework entry point; ignoring self time; not knowing whether the profile shows CPU time or wall-clock time, so waiting on a database looks like nothing; and drawing conclusions from a profile of a few milliseconds or a debug build.
</context>

<task>
<profile_output>
{{profile_output}}
</profile_output>

1. Explain the picture in five short points, using names from the learner's profile as examples: each box is a function; width is the share of samples in which it (or its callees) was on the stack; the box below a box is its caller; colours are usually just for contrast; the x-axis order means nothing in a flame graph but means time in a flame chart. Say which of the two they likely have.
2. Explain self time versus total (inclusive) time with one example from their data: a wide box with narrow children has high self time and is doing the work itself; a wide box with wide children is just passing time down.
3. Read their profile: identify the widest plateaus (wide boxes at the top of a stack, high self time), group them (our code, a library, the runtime such as garbage collection, regex, JSON or serialisation, locks, waiting on I/O if wall-clock), and say what share of samples each holds. Say whether the profile is CPU or wall-clock if the output shows it, and what that hides.
4. Turn it into next steps: the one or two places worth investigating first and the question to ask of each (is it called too often? is the algorithm wrong for the input size? is it repeated work that could be cached? is it waiting?). Suggest how to confirm with a benchmark before changing anything.
5. List traps that apply to this capture: sample count too small, debug build, profiling the profiler's startup, inlined functions hiding in their callers, missing symbols showing as hex addresses, async code split across stacks.
6. Give a small exercise: something to look for in their own graph next time (for example "find the widest box whose name is in your own code"), and how to compare two profiles (differential flame graph or before-and-after).

If the output has no function names or percentages, ask for an export with them and say how to produce it for their profiler.
</task>

<constraints>
- Use plain words; define each term the first time (sample, stack, self time, inclusive time).
- Use only names and numbers from the learner's profile; mark guesses about what a function does as guesses.
- Do not tell them to optimise anything before measuring the effect.
- Keep it under about 700 words.
</constraints>

<output_format>
## How to read this graph
The five points, with examples from their data.
## What your profile says
Table: function or group | share of samples | self or inclusive | what it likely means.
## Where to look next
One or two numbered items, each with the question to ask and how to confirm.
## Traps to avoid
Bullets that apply to this capture.
## Try it yourself
One short exercise.
</output_format>
