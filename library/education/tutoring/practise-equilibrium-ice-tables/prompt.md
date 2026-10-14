---
schema: 1
id: practise-equilibrium-ice-tables
kind: prompt
title: Practise equilibrium with ICE tables
description: Tutors chemical equilibrium problems with ICE tables, Kc and Kp expressions, reaction quotient Q, the small-x approximation and Le Chatelier predictions.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [chemistry]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [chemical-equilibrium, ice-tables, kc, kp, le-chatelier, reaction-quotient]
pairs_with:
  prompts: [practise-ph-calculations, practise-mole-calculations]
  personas: [science-tutor]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: Which kind of equilibrium problem to practise. mixed builds from writing K expressions to full ICE problems and predictions.
    type: enum
    enum: [k-expressions, ice-tables, q-versus-k, le-chatelier, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
  - name: course
    description: The course, for example "A-level Chemistry", "AP Chemistry", "General Chemistry 2". Sets whether Kp and the small-x approximation appear.
    type: string
    default: AP Chemistry
output_contract:
  format: markdown
  sections: [Results, Method card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise equilibrium problems. Topic: {{topic}}.

ICE tables (Initial, Change, Equilibrium) make equilibrium problems routine, but students trip on predictable things: putting moles in the table when K needs concentrations (divide by volume first), ignoring stoichiometric coefficients in the change row (2NO2 changes by 2x, not x) and in the K expression (as powers), including pure solids and liquids in K, assuming the small-x approximation without checking it (under about 5% of the starting value), and using Le Chatelier to predict a change in K when only temperature changes K. Comparing Q with K before starting tells you which direction the reaction moves, which decides the sign of x.
</context>

<task>
1. Show the method card once:
   - Write the balanced equation and the K expression: products over reactants, each raised to its coefficient; leave out pure solids and liquids.
   - Convert amounts to concentrations (or partial pressures for Kp).
   - If needed, compare Q with K to find the direction.
   - ICE table: Initial, Change (coefficients times x, signs by direction), Equilibrium.
   - Substitute into K and solve; use the small-x approximation only if K is small, then check it.
   - Le Chatelier: changing concentration or pressure shifts the position without changing K; a catalyst shifts nothing, it only speeds up reaching equilibrium; only temperature changes K.
2. Set {{problems}} problems one at a time, growing in difficulty, matched to {{topic}}, using realistic reactions (Haber process, H2 + I2 ⇌ 2HI, N2O4 ⇌ 2NO2, ester formation).
3. For each problem, ask the learner first for the K expression, then the ICE table row by row, then the equation to solve, then the answer with a check.
4. Check each step. If wrong, name the slip (moles not concentration, coefficients missed, solid included, approximation not checked) and let them retry. Then show the working briefly.
5. For Le Chatelier questions, ask the learner to predict the shift and then explain it in terms of Q versus K.
6. Close with the summary.
</task>

<constraints>
- Solve every problem yourself first; if the equation is quadratic, check which root is physically meaningful (no negative concentrations).
- One problem per message; never show working before the learner has tried.
- Use K values that are illustrative and say so; do not present invented values as literature data.
- Keep units consistent; note that many courses treat K as unitless while others expect units, and follow the course.
- If the learner moves to acid-base pH problems, say that is a separate session and offer to continue with general equilibrium.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the reaction and the data.

At the end:
## Results
| Problem | Type | Correct? | Slip |
## Method card
The six steps, plus the learner's personal watch-out.
## Next practice
Two problems targeting their slip, answers hidden until asked.
</output_format>
