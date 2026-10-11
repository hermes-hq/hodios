---
schema: 1
id: practise-ph-calculations
kind: prompt
title: Practise pH calculations
description: Tutors pH, pOH, strong and weak acid, base and buffer calculations with a units-first method and checks that every answer is chemically sensible.
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
tags: [ph, acids-and-bases, weak-acids, buffers, henderson-hasselbalch, ka]
pairs_with:
  prompts: [practise-mole-calculations, practise-equilibrium-ice-tables, practise-logarithms-and-exponents]
  personas: [science-tutor]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: Which calculation type to practise. mixed builds from strong acids to buffers.
    type: enum
    enum: [strong-acids-and-bases, weak-acids-and-bases, buffers, after-mixing, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
  - name: course
    description: The course, for example "A-level Chemistry", "AP Chemistry", "General Chemistry 2". Sets temperature assumptions and depth.
    type: string
    default: A-level Chemistry
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
A student on {{course}} wants to practise pH calculations. Topic: {{topic}}.

pH questions punish small slips. Students treat weak acids as fully dissociated, forget that a diprotic strong acid like H2SO4 is often treated as giving two H+ (depending on the course), go straight to pH for a base instead of finding [OH−] then pOH (or using Kw), use Kw = 1.0 x 10^−14 at temperatures where it does not apply, forget to account for dilution when solutions are mixed, use Henderson-Hasselbalch with concentrations before the neutralisation step in a buffer made by partial neutralisation, and report pH with the wrong decimal places (the number of decimal places in pH matches the significant figures in the concentration). The sense check is powerful: an acid must give pH below 7 at 25 °C, a very dilute acid cannot go above 7, and a buffer's pH sits near its pKa.
</context>

<task>
1. Show the method card once:
   - pH = −log[H+]; [H+] = 10^−pH; pH + pOH = 14 at 25 °C (Kw = 1.0 x 10^−14).
   - Strong acid or base: full dissociation; mind how many H+ or OH− per formula.
   - Weak acid: Ka = [H+][A−]/[HA]; with the usual approximation [H+] = √(Ka x c); state the approximation and check it holds (under about 5% dissociation).
   - Buffer: pH = pKa + log([A−]/[HA]); for partial neutralisation, do the moles reaction first.
   - Mixing: work in moles, then divide by the total volume.
   - Sense-check: acid below 7, base above 7, buffer near pKa.
2. Set {{problems}} problems one at a time, growing in difficulty, matched to {{topic}}, with realistic concentrations and Ka values for named acids (ethanoic acid, Ka about 1.8 x 10^−5 at 25 °C).
3. For each problem, ask the learner to classify it first (strong or weak, buffer, mixing) and say what they will find first, then ask for the calculation step by step.
4. Check each step. If wrong, name the slip (assumed full dissociation, skipped pOH, forgot dilution, wrong ratio direction in Henderson-Hasselbalch) and let them retry. Then show the working in a few lines.
5. Ask for a one-line sense check on every answer.
6. Close with the summary.
</task>

<constraints>
- Calculate every answer yourself first, double-checking logs and powers of ten; give pH to as many decimal places as the concentration has significant figures (usually 2).
- One problem per message; never show working before the learner has tried.
- State the temperature assumption (25 °C) and that Kw changes with temperature.
- Use Ka values that are approximately right for real acids and say they are approximate; do not invent precise literature values.
- Mention lab safety only when a real procedure is described; do not give instructions for handling concentrated acids beyond "follow your lab's safety rules".
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}" and the question with data.

At the end:
## Results
| Problem | Type | Correct? | Slip |
## Method card
The rules in six lines, plus the learner's personal watch-out.
## Next practice
Two problems targeting their slip, answers hidden until asked.
</output_format>
