---
schema: 1
id: explain-codebase
kind: prompt
title: Explain a codebase
description: Explains an unfamiliar codebase. Maps its structure, traces one real request end to end and names the concepts and gotchas a newcomer needs. Use when joining a project or reading an unknown repo.
category: learning
version: 1.0.0
status: experimental
stage: [learn, discover]
role: [software-engineer]
requires: [repo-read]
inputs: [repo]
output: [explanation, diagram]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [code-reading, architecture-overview, new-joiner]
pairs_with:
  personas: [socratic-tutor]
args:
  - name: focus
    description: A feature, flow or question to centre the explanation on (for example "how a payment is captured"). Leave empty for a general tour.
    type: text
  - name: depth
    description: overview gives the map and one flow; deep also covers data model, error handling, configuration and tests.
    type: enum
    enum: [overview, deep]
    default: overview
  - name: background
    description: What the reader already knows, such as the language or framework, so the explanation skips it.
    type: text
output_contract:
  format: markdown
  sections: [What it is, Map, How a request flows, Key concepts, Where to start, Gotchas, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A newcomer does not need a summary of every file. They need a mental model: what the system is for, where each responsibility lives, how one real piece of work travels through the code, and which surprises will cost them a day. Explanations of code are only useful if they are true, so every statement must point at the file that proves it.
</context>

<task>
Explain the codebase in the working directory at {{depth}} depth.
{{#focus}}
Centre the explanation on: {{focus}}
{{/focus}}
{{#background}}
The reader already knows: {{background}}. Do not explain that.
{{/background}}

1. Orient: read the README, contributing docs, manifests and lockfiles (languages, frameworks, key dependencies), build and CI config, and the top two levels of the directory tree. Skip vendored, generated and build output folders.
2. Find the entry points: main functions, server bootstrap, CLI definitions, route tables, job schedulers, exported library index.
3. Trace one real flow from entry to exit (the focus, if given, or the most central user action): each hop with `path:line`, what it does and what data it passes on.
4. Identify the key concepts: domain terms, core types or tables, and the architectural pattern actually used (layers, modules, events), described from the code, not from labels.
5. For deep: also cover the data model, error handling, configuration and environment variables, and how the tests are organised and run.
6. Note gotchas: code generation, magic or convention-based wiring, global state, surprising side effects, environment-dependent behaviour, dead or legacy areas.
</task>

<constraints>
- Cite a file path (and line where useful) for every claim about the code. Mark anything inferred from names or structure rather than read as "(inferred)".
- Do not describe files you have not opened as if you had. If the repo is too large to read fully, say which parts you sampled.
- Do not suggest refactors or fixes unless the reader asks; this is an explanation.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What it is
Two or three sentences: purpose, users, main technologies.
## Map
A table: directory or module | responsibility | files to read first.
## How a request flows
Numbered hops with `path:line`. Add a Mermaid sequence or flowchart if there are more than five hops.
## Key concepts
A short glossary of domain terms and core types, each with where it is defined.
## Where to start
Three files to read first, and one small, safe change that would teach the reader the workflow (for example adding a test for an existing function).
## Gotchas
Bullets, each with the file that shows it.
## Open questions
What the code alone could not answer, and who or what might (docs, history, owners).
</output_format>
