---
schema: 1
id: explain-library-internals
kind: prompt
title: Explain how a library feature works inside
description: Explains how a library or framework feature works under the hood, such as React hooks, an ORM's lazy loading or Express middleware, with a tiny reimplementation and the behaviour it explains.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, frontend-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [topic, text]
output: [explanation, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [framework-internals, mental-models, reimplementation, under-the-hood]
pairs_with:
  prompts: [explain-concept-with-code, learn-framework-from-known-one]
args:
  - name: feature
    description: The feature and library, such as "React useState", "SQLAlchemy lazy loading", "Express middleware and next()", "Python decorators in Flask routes", "Vue reactivity".
    type: string
    required: true
  - name: puzzle
    description: The behaviour that confuses you, such as "why can't hooks be called in an if" or "why is there an N+1 query here".
    type: text
  - name: language
    description: The language for the reimplementation, if different from the library's.
    type: string
output_contract:
  format: markdown
  sections: [The idea in one paragraph, Tiny reimplementation, How the real one differs, Behaviour this explains, Where to read the source]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Framework rules feel arbitrary until you see the mechanism. Hooks must be called in the same order because React stores them in an array indexed by call position per component; an ORM issues N+1 queries because a lazy relationship is a property that runs a query on first access; Express middleware is a list of functions where `next()` calls the following one; Vue and MobX reactivity work by tracking which properties a function read through proxies or getters; Python decorators replace a function with a wrapper at import time. A thirty-line reimplementation that captures the core idea teaches more than pages of documentation, as long as it is honest about what the real implementation adds (scheduling, batching, edge cases, performance work).
</context>

<task>
Explain how {{feature}} works under the hood.
{{#puzzle}}
The behaviour that confuses the learner: {{puzzle}}
{{/puzzle}}

1. State the core mechanism in one paragraph: what data structure or trick makes it work, and when it runs (import time, render time, first access, per request).
2. Write a tiny reimplementation{{#language}} in {{language}}{{/language}}, ideally under 40 lines, that reproduces the essential behaviour, with comments at the lines that carry the idea. Include a short usage example and its output.
3. Explain how the real implementation differs: what it adds (scheduling, batching, caching, error handling, concurrency, dev-mode checks) and which simplifications in your version would break in real use. Name the version of the library you are describing if behaviour changed across versions.
4. Use the mechanism to explain three behaviours users trip over, including the puzzle if given, each traced back to a line of the reimplementation.
5. Point to where the learner can read the real source: the package and the module or function names to search for, without inventing file paths or line numbers you are not sure of.
</task>

<constraints>
- The reimplementation must run as shown and be clearly labelled a teaching model, not the library's code.
- Do not invent internal function names or file paths of the real library. If unsure, describe what to search for.
- If behaviour depends on the library version, say which version you describe.
{{> output/uncertainty}}
</constraints>

<output_format>
## The idea in one paragraph
One paragraph.
## Tiny reimplementation
A code block with usage and output.
## How the real one differs
Bullets.
## Behaviour this explains
Three numbered behaviours, each tied to the code.
## Where to read the source
Package and what to search for.
</output_format>
