---
schema: 1
id: learn-framework-from-known-one
kind: prompt
title: Learn a framework through one you know
description: Teaches a new framework by mapping it onto one you already know, such as React to Vue or Django to Rails, with equivalent code, false friends, idioms and a small porting exercise.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer, frontend-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [topic, preferences]
output: [explanation, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [framework-switching, concept-mapping, false-friends, idioms]
pairs_with:
  prompts: [learn-new-programming-language, plan-learning-path, explain-library-internals]
args:
  - name: known
    description: The framework you know well, with version if relevant (for example "React 18 with hooks", "Django 5", "Spring Boot 3").
    type: string
    required: true
  - name: target
    description: The framework you need to learn (for example "Vue 3 with the Composition API", "Rails 7", "NestJS").
    type: string
    required: true
  - name: goal
    description: What you need to do with it, such as "maintain an existing app" or "build a new CRUD service".
    type: text
output_contract:
  format: markdown
  sections: [The big differences, Concept map, Same feature in both, False friends, Idioms to adopt, Porting exercise, What to read next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Experienced developers switching frameworks do not need a beginner tutorial; they need a translation table and a warning list. Most concepts map (components, routing, ORM models, middleware, dependency injection, templating, migrations, test setup), but the dangerous parts are the false friends: things with the same name or look that behave differently, such as Vue's reactivity versus React's re-render model, Rails callbacks versus Django signals, Angular services versus React context, or "controller" meaning different things in different MVC frameworks. Each framework also has a philosophy (convention over configuration, explicit over implicit, batteries included) that explains its idioms, and writing the old framework's style in the new one is the most common source of awkward code in reviews.
</context>

<task>
Teach {{target}} to someone who knows {{known}} well.
{{#goal}}
Their goal: {{goal}}
{{/goal}}

1. Explain the three to five big differences in philosophy and runtime model in a short paragraph each: how rendering or request handling works, where state and configuration live, and how much is convention versus explicit wiring.
2. Build a concept map table: concept in {{known}}, equivalent in {{target}}, and how close the match is (same, similar, different, no equivalent). Cover project structure, routing, components or controllers, state or models, data access, validation, middleware or lifecycle, dependency injection, config, testing and the CLI.
3. Implement one small, realistic feature in both frameworks side by side (for example a list with a form, or a CRUD endpoint with validation), using current recommended APIs for each, and walk through the differences line by line.
4. List the false friends: features that look the same but behave differently, each with the bug it causes when the learner assumes the old behaviour.
5. List the idioms to adopt and the habits from {{known}} to drop, each with a short example.
6. Give a porting exercise: a short snippet in {{known}} to rewrite in idiomatic {{target}}, with the points a reviewer would check. Put a model answer at the very end.
7. Point to the official guides worth reading first, by name, for the learner's goal.
</task>

<constraints>
- Use the current stable major versions unless the learner named others, and say which versions the code targets. Do not mix APIs across versions (such as Vue Options and Composition API) without saying so.
- Do not use APIs you are not sure exist; mark anything uncertain.
- Skip explaining concepts the learner already knows from {{known}}; spend the words on differences.
{{> output/uncertainty}}
</constraints>

<output_format>
## The big differences
Three to five short paragraphs.
## Concept map
A table.
## Same feature in both
Two code blocks and line-by-line notes.
## False friends
Bullets: looks like, actually, the bug it causes.
## Idioms to adopt
Bullets with tiny examples.
## Porting exercise
The snippet and review points, then "Model answer" at the end.
## What to read next
Official guides by name.
</output_format>
