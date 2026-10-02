---
schema: 1
id: explain-stack-trace
kind: prompt
title: Explain a stack trace
description: Explains an error and its stack trace in plain words, finds the frame that matters, and ranks the likely causes with the next checks to run. Use when an exception or crash is hard to read.
category: debugging
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer]
stack: []
requires: [repo-read]
inputs: [stack-trace, logs]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [exception, crash, error-message]
pairs_with:
  personas: [debugger]
  prompts: [find-root-cause]
args:
  - name: trace
    description: The full error message and stack trace, including any "Caused by" or chained exceptions.
    type: text
    required: true
  - name: context
    description: What you were doing when it happened, and anything that changed recently.
    type: text
output_contract:
  format: markdown
  sections: [What happened, Where, Likely causes, Next checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Stack traces are long, and most of their frames belong to frameworks and libraries. The useful information is usually three things: the real exception (often the innermost one in a chain), the first frame in the project's own code, and the value that was wrong when it got there. Each runtime prints these differently.
</context>

<task>
Explain this error:
{{trace}}
{{#context}}
Context: {{context}}
{{/context}}
1. Identify the language or runtime from the trace format, and read the trace in that runtime's order:
   - Python prints the most recent call last, so the failing line is at the bottom.
   - Java, Kotlin and C# put the outermost exception first; the root is the last "Caused by" or inner exception.
   - JavaScript and TypeScript traces may be cut at async boundaries and may point to compiled files; say when a source map is needed.
   - Go panics list each goroutine; the panicking goroutine comes first. Rust panics need `RUST_BACKTRACE=1` for a full trace.
2. Find the root exception and its message. Say what it means in one plain sentence.
3. Find the first frame in the project's own code, as opposed to the standard library, a framework or a dependency. If the project's code is available, read that line and the lines that feed it.
4. Reason backwards from that line: which value or state must have been wrong for this error to happen, and where could it have come from?
5. Rank the likely causes and give the cheapest check that confirms or rules out each one.
</task>

<constraints>
- Do not guess at code you have not seen. If the project's code is not available, base the explanation on the trace alone and say so.
- Quote frames exactly as they appear in the trace. Never invent file names, line numbers or function names.
- Ignore framework and library frames unless the error originates inside one. If it does, say whether the likely fault is still the caller's input.
- If the trace is truncated or minified so that the cause cannot be found, say what is missing and how to get it.
{{> output/uncertainty}}
{{> output/verbosity-spec}}
</constraints>

<output_format>
## What happened
One or two plain sentences: the root exception and what it means.
## Where
The frame that matters, quoted from the trace, and why that frame.
## Likely causes
Numbered, most likely first. Each cause with the evidence for it.
## Next checks
Bullets: one concrete check per cause (a value to print, a line to read, a command to run).
</output_format>
