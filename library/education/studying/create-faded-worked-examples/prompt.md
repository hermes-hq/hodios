---
schema: 1
id: create-faded-worked-examples
kind: prompt
title: Create faded worked examples
description: Builds a sequence of worked examples for one procedure where each example leaves more of the final steps for the student, ending with an independent problem and a full key.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [mathematics, physics, chemistry]
requires: [none]
inputs: [topic, text]
output: [explanation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [worked-examples, backward-fading, procedural-skills, self-explanation]
pairs_with:
  prompts: [build-interleaved-practice-set, run-feynman-check]
  personas: [study-coach]
  rules: [academic-integrity-rules]
args:
  - name: procedure
    description: The procedure to learn, as specifically as possible, e.g. "solving simultaneous equations by elimination", "calculating standard deviation from a frequency table", "journal entries for depreciation".
    type: string
    required: true
  - name: level
    description: The student's stage of education.
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
  - name: steps_to_fade
    description: How many faded examples come between the fully worked example and the independent problem.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [The steps, Example 1 fully worked, Faded examples, Your turn, Answer key, If you got stuck]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Novices learn a procedure faster from studying worked examples than from solving problems cold, but they need to move to independent solving. Backward fading bridges the two: the first example is fully worked, the next leaves the last step blank, the next the last two, and so on, until the student solves a whole problem. Labelling each step with its sub-goal and asking "why this step?" makes the student explain rather than copy. Sequences fail when the examples change structure as well as numbers, when steps are fused so the blanks are unclear, or when the key has arithmetic errors.

Procedure: {{procedure}}. Level: {{level}}. Faded examples: {{steps_to_fade}}.
</context>

<task>
1. Break the procedure into 4 to 7 named steps, each a sub-goal ("Make the coefficients of y match", "Subtract to eliminate y"). If the procedure is too vague to break down (for example "algebra"), ask which procedure and stop.
2. If the procedure has fewer steps than {{steps_to_fade}} + 1, reduce the number of faded examples and say so.
3. Write Example 1 fully worked: each step labelled with its sub-goal, the working, and a one-line "why" for that step.
4. Write the faded examples. Each uses the same structure with new numbers and a slightly different surface (context, variable names or sign pattern) at the same difficulty. Fade backwards: example 2 leaves the last step blank, example 3 the last two, and so on. Blank steps show the sub-goal label and an answer line. For each worked step that remains, add a short prompt: "Why this step?"
5. Write one independent problem with only the question.
6. Solve everything, then check each answer a second way (substitution, estimation, inverse operation, units).
7. Write "If you got stuck": for each step, the most common mistake and how to spot it.
</task>

<constraints>
- Keep the structure identical across examples; only numbers and surface details change until the independent problem.
- Use notation and conventions normal for the level; for the adult level, use everyday contexts.
- Every answer must be correct and checked. Use numbers that keep the arithmetic clean unless messy numbers are part of the skill.
- If the student pastes a graded homework or exam question, do not solve it; use parallel examples with different numbers instead.
</constraints>

<output_format>
## The steps
Numbered sub-goal labels.

## Example 1 fully worked
Each step: label, working, "Why:" line.

## Faded examples
"### Example N", with completed steps shown, a "Why this step?" prompt after each, and blank steps as "Step k: label ____".

## Your turn
One problem.

## Answer key
Every blank and the independent problem, with working.

## If you got stuck
Table: Step | Common mistake | How to spot it.
</output_format>
