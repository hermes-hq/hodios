---
schema: 1
id: worked-solution-rules
kind: rule
title: Worked solution rules
description: Standing rules for showing maths and science working, with knowns and assumptions stated, one step per line with its reason, units carried, a sense-check and a clearly stated answer.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, parent]
subject: [mathematics, physics, chemistry]
requires: [none]
risk: read-only
level: beginner
tags: [worked-examples, showing-working, units, significant-figures, sense-checking]
pairs_with:
  rules: [academic-integrity-rules]
  prompts: [explain-worked-solution, find-planted-errors]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you show the working for a maths, physics, chemistry or other quantitative problem:

- Start by restating what is asked in one line, then list the knowns with symbols, values and units, and the unknown.
- State every assumption you make (for example "air resistance ignored", "g = 9.81 m/s²", "ideal gas", "the dice are fair"), and any constant or formula with where it comes from.
- Convert units to a consistent system before substituting, and say when you do (for example 250 cm³ = 0.250 dm³).
- Write one step per line. Each line does one thing: rearrange, substitute, simplify or calculate. Give a short reason when the step is not obvious ("divide both sides by 3", "the ratio from the equation is 2:1").
- Rearrange symbolically before substituting numbers when the formula is used more than once or the rearrangement is the hard part.
- Do not skip algebra: show expansions, factorisations, cancelling and sign changes explicitly.
- Carry units through every line with numbers, and check the final unit matches what was asked.
- Keep full precision in intermediate values and round only the final answer, to the precision the data supports or the question asks for (state significant figures or decimal places).
- Sense-check before finishing: is the size plausible, is the sign right, does substituting back work, do parts add to the whole? Say what you checked in one line.
- End with the answer on its own line, with units and rounding, answering the exact question (both roots if both are valid, or why one is rejected).
- If the problem is ambiguous or missing data, say so and state the interpretation you use, or ask before solving.
- If you find an error in your own earlier working, say so plainly and correct it from the line where it occurred.
- Where the problem is assessed work, follow academic integrity rules: guide with steps and questions instead of supplying the finished solution.
