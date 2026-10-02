---
schema: 1
id: explain-concept-at-level
kind: prompt
title: Explain a concept at a chosen level
description: Explains a concept at a chosen level, from child to expert, with an analogy, a worked example and one check-for-understanding question. Use when a textbook explanation is not landing.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
requires: [none]
inputs: [topic]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
tags: [analogies, worked-examples, eli5]
pairs_with:
  prompts: [check-my-reasoning, make-flashcards]
args:
  - name: concept
    description: The concept to explain, e.g. "opportunity cost", "eigenvectors", "photosynthesis".
    type: string
    required: true
  - name: level
    description: Who the explanation is for.
    type: enum
    enum: [child, high-school, undergraduate, expert]
    default: high-school
  - name: subject
    description: Optional field, to disambiguate concepts that mean different things in different fields (entropy in physics vs. information theory).
    type: string
output_contract:
  format: markdown
  sections: [In one sentence, The idea, Analogy, Worked example, Watch out for, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A good explanation starts from what the listener already knows and adds one new idea at a time. The level decides the vocabulary, the prerequisites you may assume and how formal you can be. The most common failure is simplifying by saying something false; a good teacher simplifies by leaving things out and says so.
</context>

<task>
Explain **{{concept}}**{{#subject}} in the context of {{subject}}{{/subject}} for a `{{level}}` audience.

1. Identify the one or two prerequisite ideas this audience may lack, and bridge them in a sentence each before you rely on them.
2. State the core idea in one sentence.
3. Build the explanation in small steps, defining every technical term on first use.
4. Give one analogy from the audience's everyday life, then say where the analogy breaks down.
5. Work one concrete example step by step, with real numbers, objects or cases.
6. Name the most common misconception about this concept and correct it.
7. Ask one question that checks understanding rather than recall: the learner has to apply the idea to a new case.

Calibrate to the level:
- `child` (about 8 to 11): short sentences, everyday objects, no jargon, no formulas. About 150 to 250 words.
- `high-school`: plain language, each technical term defined, light algebra only if the subject needs it. About 300 to 450 words.
- `undergraduate`: standard terminology and notation, the formal definition, and how the concept connects to neighbouring ones. About 400 to 600 words.
- `expert`: skip the basics; give the precise statement, its assumptions, edge cases, limits of validity and the subtleties practitioners get wrong. As long as it needs to be, no longer.
</task>

<constraints>
- Simplify by omission, never by stating something false. When you leave out an important qualification, mark it: "(Simplified: …)".
- If {{concept}} means different things in different fields and no subject was given, pick the most common meaning, say which one in the first line, and name the other.
- If the concept is not something you can explain accurately (unclear, very new or outside what you know), say so instead of guessing.
- Do not answer the check question.
</constraints>

<output_format>
Markdown with these headings, in order:
## In one sentence
## The idea
## Analogy
The analogy, then one line starting "Where it breaks:".
## Worked example
## Watch out for
The misconception and the correction.
## Check yourself
One question. Then the line "Reply with your answer and I'll tell you how you did."
</output_format>
