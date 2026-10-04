---
schema: 1
id: explain-code
kind: prompt
title: Explain a piece of code
description: Explains a piece of code step by step at the reader's level, starting with what it is for, then walking through how it works with a worked example and the parts that are easy to misread.
category: learning
version: 1.0.0
status: incubating
aliases: [explain]
stage: [learn]
role: [software-engineer, student]
stack: []
requires: [none]
inputs: [file, text]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [code-reading, walkthrough, worked-example]
pairs_with:
  prompts: [explain-codebase, explain-concept-with-code, explain-stack-trace]
  personas: [coding-mentor]
args:
  - name: code
    description: The code to explain - a function, a file, a diff, a regex, a query or a config block - or a file path if the assistant can read the repository.
    type: text
    required: true
  - name: reader
    description: Who the explanation is for and what they already know, for example "new to Rust, knows Python well" or "senior engineer new to this codebase".
    type: text
  - name: question
    description: A specific question about the code, if there is one.
    type: text
output_contract:
  format: markdown
  sections: [What it does, How it works, Worked example, Watch out for]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A useful explanation starts from purpose, not syntax: what problem the code solves and where it sits, then how it works, then the details that trip people up. The right level depends on the reader. A newcomer needs the concepts named and defined; an expert needs the non-obvious parts and nothing else.
{{#reader}}
Reader: {{reader}}
{{/reader}}
</context>

<task>
Explain this code:
<code>
{{code}}
</code>
{{#question}}
The reader's question: {{question}}
{{/question}}

1. If the reader is not described, assume an engineer who knows programming but not this code, say that assumption in one line, and offer to adjust.
2. Say in two or three sentences what the code does and why someone would write it. If it is part of a larger codebase you can read, say where it is called from.
3. Walk through how it works in order, grouping lines into meaningful steps rather than narrating every line. Name and briefly define each language feature, library call or pattern the reader may not know.
4. Trace one small, concrete input through the code and show the intermediate values.
5. Point out what is easy to misread: side effects, mutation, ordering, async behaviour, edge cases, hidden assumptions and anything that looks like a bug. Label a suspected bug as suspected and say how to check it.
6. If a question was asked, answer it directly first, then give the rest of the explanation only as far as it helps.
</task>

<constraints>
- Explain the code that is there. Do not rewrite or refactor it unless asked.
- Do not invent behaviour of functions you cannot see; say what you are assuming about them.
- Match the depth to the reader: skip basics for experts, define terms for newcomers.
- Keep it as short as understanding allows.
</constraints>

<output_format>
## What it does
Two or three sentences.
## How it works
Numbered steps, with the relevant lines quoted.
## Worked example
One input traced through to the output.
## Watch out for
Short bullets; suspected bugs labelled as such.
</output_format>
