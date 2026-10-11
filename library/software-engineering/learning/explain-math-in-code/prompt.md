---
schema: 1
id: explain-math-in-code
kind: prompt
title: Explain the maths in a piece of code
description: Maps the formula behind a piece of code (graphics, ML, finance, physics, statistics) to its variables and lines, explains the notation, and works one example through with real numbers.
category: learning
version: 1.0.0
status: incubating
stage: [learn, review]
role: [software-engineer, data-scientist, game-developer, student]
stack: []
subject: [mathematics]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [maths-notation, numerical-code, worked-example, code-reading]
pairs_with:
  prompts: [explain-code, tutor-game-math, explain-algorithm]
args:
  - name: code
    description: The function or snippet containing the maths.
    type: text
    required: true
  - name: domain
    description: What the code is for (shading, a loss function, loan amortisation, a physics step, a statistical test), if known.
    type: string
  - name: maths_level
    description: How much maths the reader is comfortable with, such as "school algebra" or "some calculus".
    type: string
output_contract:
  format: markdown
  sections: [The formula, Notation explained, Code to formula map, Worked example, Numerical traps, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code that implements maths is hard to read for a specific reason: the formula has been rearranged for speed or stability, its symbols have become short variable names, and the units and conventions are implicit. A dot product hides as `x*a + y*b + z*c`; a log-sum-exp trick subtracts the maximum before exponentiating; a loan payment formula is algebraically rearranged; a physics step uses `dt` with an integration method that changes stability; a variance uses `n - 1`; angles are in radians; matrices are row- or column-major. Readers need the textbook formula next to the code, each symbol tied to a variable, and one example with real numbers so they can check their understanding.
</context>

<task>
Explain the maths in this code{{#domain}} (used for {{domain}}){{/domain}}.
{{#maths_level}}
The reader is comfortable with: {{maths_level}}. Explain anything beyond that.
{{/maths_level}}

```
{{code}}
```

1. Name the formula or method the code implements, if it is a known one, and write it in standard notation. If the code rearranges it, show the standard form and then the rearranged form with each step of the algebra.
2. Explain every symbol and operator in the notation in plain words, including any sums, products, vectors, matrices, derivatives or logarithms, at the reader's level.
3. Map the code to the formula: a table of variable, symbol, meaning and units, then each line of code next to the part of the formula it computes.
4. Work one example through with small, realistic numbers, showing each intermediate value, so the reader can reproduce it on paper or in a REPL.
5. Point out numerical traps in this code: floating-point precision, overflow in exponentials, division by zero, integer division, degrees versus radians, row versus column conventions, accumulated error in a time step, and any stability trick it already uses and why.
</task>

<constraints>
- Do not name a formula the code does not match. If the code is a variant or contains a bug relative to the standard formula, say exactly where it diverges and show it in the worked example.
- Check the arithmetic in the worked example carefully, step by step.
- For finance or medical calculations, explain the maths only; do not advise on decisions based on it.
{{> output/uncertainty}}
</constraints>

<output_format>
## The formula
Name and standard notation, then the rearranged form if any.
## Notation explained
Bullets, one per symbol or operator.
## Code to formula map
A table: variable, symbol, meaning, units. Then line-by-line pairing.
## Worked example
Numbered steps with numbers.
## Numerical traps
Bullets. "None found" if none.
## Questions
What would settle any uncertainty.
</output_format>
