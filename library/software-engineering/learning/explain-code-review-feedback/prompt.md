---
schema: 1
id: explain-code-review-feedback
kind: prompt
title: Explain code review feedback you received
description: Explains code review comments a developer received, covering what each reviewer means, the principle behind it, how to address it and how to reply, so the lesson carries to the next PR.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, student]
stack: []
requires: [none]
inputs: [text, diff]
output: [explanation, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [pull-request, review-comments, junior-developers, reviewer-intent]
pairs_with:
  prompts: [respond-to-review-comments, review-code-for-learner]
  personas: [coding-mentor]
args:
  - name: comments
    description: The review comments, each with the code line or diff hunk it refers to if possible.
    type: text
    required: true
  - name: code
    description: The diff or code the comments are about.
    type: text
  - name: confusion
    description: What you do not understand or disagree with.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Comment by comment, Patterns to learn, Replies you could send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Review comments are compressed: "nit", "consider extracting this", "this will N+1", "can we not leak the abstraction here?" assume shared vocabulary and team norms a junior developer may not have. Each comment carries a severity (blocking, suggestion, nit, question, praise) that is often only implied, a principle behind it (naming, single responsibility, error handling, performance, security, consistency with the codebase), and sometimes plain preference. Learners who only apply the change without the principle get the same comment next week; learners who take every comment as criticism of themselves stop asking. Some comments are wrong or debatable, and a good reply can disagree respectfully with a reason.
</context>

<task>
Explain these review comments to the developer who received them.

Comments:
{{comments}}
{{#code}}

Code under review:
```
{{code}}
```
{{/code}}
{{#confusion}}
What the developer is unsure about: {{confusion}}
{{/confusion}}

1. Give a short overview: how serious the review is overall, which comments block merging, and the tone (direct is not hostile).
2. For each comment: translate it into plain words, decode jargon, classify it (blocking, suggestion, nit, question, praise), name the principle behind it, and say concretely how to address it in this code with a short example where it helps.
3. Where a comment is a matter of taste, debatable, or possibly wrong given the code, say so with the reason, and suggest asking rather than silently complying or ignoring it.
4. Group the comments into two or three patterns worth learning, each with a one-line rule of thumb to apply before the next PR.
5. Draft a short, professional reply for each comment that needs one: acknowledging a fix, asking a clarifying question, or disagreeing politely with a reason.
</task>

<constraints>
- Explain what the reviewer most likely meant; if a comment is ambiguous, give the likely readings and suggest asking.
- Do not take sides against the reviewer or the developer. Judge comments on the code.
- Keep replies short, neutral and specific; no over-apologising.
{{> output/uncertainty}}
</constraints>

<output_format>
## Overview
Three or four sentences.
## Comment by comment
A section per comment: what it means, type, principle, how to address it.
## Patterns to learn
Two or three rules of thumb.
## Replies you could send
A quoted reply per comment that needs one.
</output_format>
