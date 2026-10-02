---
schema: 1
id: explain-concept-with-code
kind: prompt
title: Explain a concept with code
description: Explains a programming concept through the problem it solves, a minimal runnable example, a common mistake and a quick self-check, pitched at the learner's level. Use to learn or teach a concept.
category: learning
version: 1.0.0
status: experimental
stage: [learn]
role: [software-engineer, student]
requires: [none]
inputs: [topic]
output: [explanation, code, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [concepts, worked-example]
pairs_with:
  personas: [socratic-tutor]
  styles: [{id: beginner-friendly, level: 3}]
args:
  - name: concept
    description: The concept to explain, for example closures, database indexes, async/await or dependency injection.
    type: string
    required: true
  - name: language
    description: The language or stack for the examples. Leave empty to use the one the learner is working in, or the most common one for the concept.
    type: string
  - name: level
    description: The learner's level.
    type: enum
    enum: [beginner, intermediate, expert]
    default: intermediate
output_contract:
  format: markdown
  sections: [In one sentence, Why it exists, Example, How it works, Common mistake, When not to use it, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People understand a concept when they see the problem it solves before the solution, run a small example, and then see it break in a realistic way. Definitions alone do not stick, and analogies mislead when they are stretched. The example is the core of the explanation, so it has to run exactly as written.
</context>

<task>
Explain {{concept}} to a learner at the {{level}} level{{#language}}, with examples in {{language}}{{/language}}.

1. Give a one-sentence definition in plain words.
2. Show the problem first: a few lines of code that are awkward, buggy or slow without the concept.
3. Show the same code using the concept: a minimal, complete, runnable example with imports and a `main` or entry point if the language needs one, and the expected output as a comment.
4. Walk through how it works, step by step, referring to specific lines. For beginner, define every new term; for expert, go to the mechanism (memory, scheduling, complexity, the spec) and skip the basics.
5. Show one common mistake with the concept, what happens, and the fix.
6. Say when not to use it, and what to use instead.
7. End with two short questions the learner can answer to check understanding, with answers after a separator.
</task>

<constraints>
- The examples must run as written on a current stable version of the language. State the version or runtime if behaviour depends on it.
- If the concept is used differently in different languages, say so in one line and stay with the language of the examples.
- Use at most one analogy, and say where it stops being accurate.
- Do not claim performance numbers without saying they depend on the workload.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with these `##` headings, in order: In one sentence, Why it exists, Example, How it works, Common mistake, When not to use it, Check yourself.
Code blocks have a language tag. Keep each example under 30 lines.
</output_format>
