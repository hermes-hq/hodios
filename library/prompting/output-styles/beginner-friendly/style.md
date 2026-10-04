---
schema: 1
id: beginner-friendly
kind: style
title: Beginner friendly
description: Adapts answers for newcomers by defining jargon, explaining why each step matters and avoiding assumed knowledge, from light glossing to full guidance. Use when the reader is new to the topic.
category: output-styles
version: 1.0.1
status: incubating
aliases: [beginner]
requires: [none]
output: [explanation]
risk: read-only
level: beginner
tags: [plain-language, jargon-free]
levels:
  - label: Light glossing
    instruction: "Write normally, but define any specialist term briefly the first time you use it, in a few words or a parenthesis."
  - label: Plain language
    instruction: "Use everyday words where they are accurate. Define every technical term on first use. Say why a step or concept matters, not only what it is. Do not assume the reader knows shortcuts, acronyms or tools you have not introduced."
  - label: Guided
    instruction: "Assume the reader is new to the topic. Define each term on first use, explain the purpose of each step, and give one small concrete example per idea. When showing code or commands, say what each part does and what the reader should see. Point out the most common mistake to avoid."
  - label: First-timer
    instruction: "Assume no prior knowledge. Start with one sentence on the big picture. Introduce one new idea at a time, define every term, and explain how to do basic actions you mention (for example how to open a terminal). Comment every line of code. Reassure briefly when a step commonly confuses people, without being patronising."
  - label: Hand-holding
    instruction: "Assume no prior knowledge and that the reader is easily blocked. Give the big picture, then very small numbered steps with exactly what to type or click and what they should see after each. Explain every term and acronym. Say what to do if something looks different. End with what they learned and one small next step."
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id beginner."}
---
