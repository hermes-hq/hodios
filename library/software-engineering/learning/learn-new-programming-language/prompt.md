---
schema: 1
id: learn-new-programming-language
kind: prompt
title: Learn a new language from one you know
description: Teaches a new programming language by mapping it onto one the learner already knows, covering idioms, false friends, tooling and graded exercises. Use when switching languages for a job or project.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, student]
stack: []
requires: [none]
inputs: [text]
output: [explanation, table, quiz]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: optional
level: intermediate
tags: [language-switch, idioms, false-friends, upskilling]
args:
  - name: known_language
    description: The language the learner is fluent in, for example "Java (8 years, Spring)".
    type: string
    required: true
  - name: new_language
    description: The language to learn, with a version if it matters, for example "Rust 2021 edition" or "Go 1.22".
    type: string
    required: true
  - name: focus
    description: What the learner needs it for, for example "backend services", "data pipelines", "contributing to an existing codebase", or topics to emphasise.
    type: text
output_contract:
  format: markdown
  sections: [Mental model, Concept map, False friends, Idioms, Tooling, Exercises, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An experienced developer does not need to relearn loops and functions. What slows them down in a new language is the different mental model (ownership, goroutines, immutability, prototypes), the false friends that look familiar but behave differently, and writing the old language with new syntax, which reviewers in the new community reject. The fastest path maps what they know onto what is new, spends time where the languages genuinely differ, and practises with exercises built around those differences.
</context>

<task>
Teach {{new_language}} to someone fluent in {{known_language}}.
{{#focus}}Their goal: {{focus}}{{/focus}}
If the goal is not given, ask what they will build first and how much time they have, then continue with a general backend-and-scripting focus if they prefer not to say.

1. **Mental model.** In a short paragraph, the two or three ideas that most change how you think when moving from {{known_language}} to {{new_language}} (for example memory management, the type system, error handling, the concurrency model, mutability, compilation and deployment).
2. **Concept map.** A table that maps concepts the learner knows to their counterpart, marked "same", "similar, but…" or "no equivalent". Cover: types and generics, classes and interfaces or their replacement, error handling, null or absence, collections and iteration, modules and visibility, concurrency, memory and resources, string handling, testing, and packaging. Give a two- to five-line snippet side by side only where the difference matters.
3. **False friends.** Things that look the same in both languages and behave differently: equality, integer division and overflow, copying versus references, default mutability, scope and closures, string encoding, exception or panic semantics. For each: what the learner will assume, what really happens, and a snippet that shows it.
4. **Idioms.** The patterns a reviewer in the {{new_language}} community expects, each next to the {{known_language}}-flavoured version they would reject.
5. **Tooling.** The standard toolchain: install and version manager, package manager and manifest, formatter, linter, test runner, REPL or playground, debugger, and the documentation sources the community trusts.
6. **Exercises.** Five graded exercises, each built around a difference from steps 2 to 4: a short task, what it practises, and a hint. Offer to review the learner's solutions.
7. **Next steps.** A short path for the next two weeks matched to the goal.
</task>

<constraints>
- Correctness over coverage: only state behaviour you are confident of for the stated version. If behaviour changed across versions, say from which version it applies.
- Do not invent libraries or tools. Name a third-party library only when it is the community's clear default, and say it is third-party.
- Keep snippets minimal and runnable. Do not explain basics the learner already knows from {{known_language}}.
</constraints>

<output_format>
## Mental model
One paragraph.
## Concept map
Table: {{known_language}} concept | {{new_language}} counterpart | Same / similar, but… / no equivalent | Note.
## False friends
Numbered: the assumption, the reality, a snippet.
## Idioms
Pairs of "instead of this" and "write this", with one line on why.
## Tooling
Table: Job | Tool | Command.
## Exercises
Numbered, easiest first: task, what it practises, hint.
## Next steps
A short plan.
</output_format>
