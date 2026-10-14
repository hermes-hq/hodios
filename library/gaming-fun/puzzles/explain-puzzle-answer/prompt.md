---
schema: 1
id: explain-puzzle-answer
kind: prompt
title: Explain a puzzle's answer
description: Explains why a puzzle's answer is right when the answer key does not make sense, checking the key first, then walking through the logic several ways, from Monty Hall to puzzle-book riddles.
category: puzzles
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, parent, teacher]
requires: [none]
inputs: [text, image]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [answer-key, brain-teaser, probability-puzzles, monty-hall, why-it-works]
pairs_with:
  prompts: [give-spoiler-free-puzzle-hints, make-math-brain-teasers]
args:
  - name: puzzle
    description: The puzzle exactly as written, or the name of a well-known puzzle such as the Monty Hall problem or the river crossing puzzle.
    type: text
    required: true
  - name: given_answer
    description: The answer from the book, site or friend that you do not understand or do not believe.
    type: text
  - name: sticking_point
    description: What feels wrong to you, for example "surely it's 50/50 once a door is opened".
    type: text
output_contract:
  format: markdown
  sections: [The puzzle, Is the answer right?, Why it works, Takeaway, Try this one]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain puzzle answers to people who have the answer but not the understanding. The best explanations do not just repeat the official working more slowly: they find the specific intuition that is misleading the reader and replace it, usually by showing the same idea from a second angle such as listing every case, scaling the puzzle up or down (Monty Hall with 100 doors), drawing a table, or running a small concrete example. Answer keys are also wrong more often than people expect, and many famous puzzles have hidden assumptions (in Monty Hall, the host always opens a goat door and always offers the switch; without that rule, the answer changes), so the answer is checked before it is defended.

Puzzle:
{{puzzle}}

{{#given_answer}}Given answer: {{given_answer}}{{/given_answer}}
{{#sticking_point}}What feels wrong: {{sticking_point}}{{/sticking_point}}
</context>

<task>
1. Restate the puzzle in one or two sentences, including any assumptions it needs. If the wording is ambiguous in a way that changes the answer, say so and show the answer under each reading.
2. Solve it yourself, independently of the given answer.
3. {{#given_answer}}Compare with the given answer. If it is right, say so. If it is wrong, say so plainly, show where it goes wrong, and give the correct answer. If it is right only under an assumption the puzzle does not state, name the assumption.{{/given_answer}}{{#sticking_point}} Name the intuition behind the sticking point and why it is natural, then show exactly where it breaks.{{/sticking_point}}
4. Explain the answer at least two different ways, chosen to fit the puzzle: an exhaustive list of cases, a table or tree, a smaller or larger version of the puzzle, a concrete simulation in words ("play it 300 times"), or an algebraic or logical argument.
5. Give a one-sentence takeaway the reader can reuse on similar puzzles.
6. Offer one variant that tests whether the idea has landed, with its answer hidden below a clear spoiler line.
</task>

<constraints>
- Check every arithmetic and probability step; do not reproduce a given answer's working without checking it.
- No condescension. The reader's confusion is usually shared by many experts; say so where true, but do not invent anecdotes about who was fooled.
- Use plain words before notation; introduce any symbol before using it.
- If the puzzle is one you recognise by name, still work from the wording the reader gave, since versions differ.
</constraints>

<output_format>
## The puzzle
## Is the answer right?
## Why it works
## Takeaway
## Try this one
</output_format>
