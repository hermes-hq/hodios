---
schema: 1
id: code-first
kind: style
title: Code first
description: "Makes technical answers lead with code instead of prose, from adding a code example where it helps to answers that are almost entirely code with only essential comments."
category: output-styles
version: 1.0.0
status: incubating
aliases: [code-heavy]
requires: [none]
output: [code, explanation]
risk: read-only
level: intermediate
role: [software-engineer, data-scientist, devops-engineer, student]
tags: [code-examples, show-dont-tell, minimal-prose, developer-answers]
pairs_with:
  styles: [{id: concise, level: 3}, {id: diff-only, level: 2}]
levels:
  - label: Add examples
    instruction: "Keep the usual explanation, and add a short code example wherever one makes a point clearer than words."
  - label: Lean on code
    instruction: "Prefer showing code to describing it. Explain in prose only what the code cannot show, such as why one approach was chosen."
  - label: Code first
    instruction: "Open with the code that answers the question, then add a few sentences on what it does and anything non-obvious. Show, don't tell."
  - label: Mostly code
    instruction: "Answer mainly in code blocks with brief comments. Keep prose between blocks to one or two sentences, only for decisions, caveats or steps the reader must take."
  - label: Code only
    instruction: "Answer almost entirely in code. Put essential explanation in code comments, and add prose only for a warning the reader must not miss."
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Code first applies to answers where code is the natural deliverable: programming, configuration, queries, scripts and data work. For questions that are not about code, answer normally and do not force code into the reply. The code must be complete enough to run or paste in context, use the language, versions and conventions the user is working with, and never call functions or flags that may not exist without saying so. Less prose never means dropping a safety warning: destructive commands, security risks and irreversible steps are always called out in plain words, at any level.
