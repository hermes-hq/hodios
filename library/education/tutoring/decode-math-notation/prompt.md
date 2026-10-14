---
schema: 1
id: decode-math-notation
kind: prompt
title: Decode maths notation
description: Explains the symbols in a formula or textbook line piece by piece (sigma, set builder, subscripts, Leibniz, quantifiers) and reads it aloud in plain words.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [mathematics]
requires: [none]
inputs: [text, image]
output: [explanation, conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [mathematical-notation, symbols, summation, set-builder, subscripts, reading-maths]
pairs_with:
  prompts: [explain-worked-solution, read-textbook-actively]
  personas: [math-tutor]
args:
  - name: notation
    description: The formula, line or passage to decode, copied as text (LaTeX is fine) or described if it is from an image.
    type: text
    required: true
  - name: source
    description: Where it comes from, for example "first-year statistics lecture notes", "A-level maths textbook", "an economics paper". Helps pick the meaning of symbols that differ between fields.
    type: string
  - name: level
    description: The learner's level, for example "secondary school", "first-year undergraduate", "adult returning to study".
    type: string
    default: first-year undergraduate
output_contract:
  format: markdown
  sections: [Read aloud, Piece by piece, A tiny example, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner at {{level}} level is stuck on notation, not on the idea behind it.
{{#source}}Source: {{source}}{{/source}}

<notation>
{{notation}}
</notation>

Notation is a compressed language, and most "I don't get this formula" moments are really "I can't read this line". Experienced readers do three things novices skip: they find the main operator first (is this whole thing a sum, a set, an equation, a definition?), they separate bound or dummy variables (the i in a sum, the x in a set builder) from the ones that carry meaning outside, and they turn the line into a sentence before doing any algebra. Symbols are also overloaded: a bar can mean a mean, a complement or a conjugate; a prime can mean a derivative or "another one"; |x| can be absolute value, size of a set or a determinant; log can be base e or base 10 depending on the field. Context decides, so say which reading applies and why.
</context>

<task>
1. Identify the overall structure: what kind of statement this is (definition, equation, inequality, set, sum, function rule, theorem) and its main operator.
2. Read the whole line aloud as a natural English sentence a lecturer would say.
3. Go through every symbol and sub-expression from the outside in. For each: what it is called, how to say it, what it means here, and whether it is a bound (dummy) variable or a free one. Note any symbol with more than one common meaning and say which one fits this source.
4. Give a tiny concrete example: plug in small numbers or a small set and evaluate or list what the expression produces, step by step, so the learner sees the notation do its job. Check your arithmetic.
5. Point out one or two common misreadings of this exact line (for example where the sum's limits apply, or that dy/dx is not a fraction you cancel at this stage).
6. Ask the learner to read one related line back to you in words, or to evaluate a second small example. Wait for their answer and correct it gently before moving on.
</task>

<constraints>
- Explain the notation that is there; do not launch into solving a wider problem unless the learner asks.
- If a symbol is ambiguous and the source does not settle it, give the likely readings and ask, rather than guessing silently.
- If the notation was described from an image and something is unclear (a subscript or a superscript, a hat or a bar), ask before explaining.
- Use plain words first and formal names second. Keep LaTeX out of the explanation unless the learner wrote LaTeX.
- Do not invent a definition for a symbol the source defines itself; ask the learner to share that definition.
</constraints>

<output_format>
## Read aloud
One or two sentences in plain English.
## Piece by piece
A table: Symbol or part | Say it as | Means here | Bound or free.
## A tiny example
Small numbers worked step by step, plus the common misreadings.
## Check yourself
One question for the learner to answer, then wait.
</output_format>
