---
schema: 1
id: explain-statistical-concept
kind: prompt
title: Explain a statistics concept
description: Explains a statistics concept such as a p-value, confidence interval or power, with intuition, a worked example, a simulation and common misreadings. Use to finally get it.
category: statistics
version: 1.0.0
status: incubating
stage: [learn]
role: [student, data-analyst, product-manager, researcher]
subject: [statistics]
inputs: [topic]
output: [explanation, code, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [stats-intuition, simulation, misconceptions, worked-example]
pairs_with:
  prompts: [choose-statistical-test, interpret-regression-output, make-fermi-estimate]
  personas: [statistician]
args:
  - name: concept
    description: The concept to explain (for example "p-value", "confidence interval", "regression to the mean", "statistical power", "Simpson's paradox"), and where you met it if that helps.
    type: string
    required: true
  - name: learner_level
    description: How much statistics you already know.
    type: enum
    enum: [beginner, intermediate, expert]
    default: beginner
output_contract:
  format: markdown
  sections: [In one sentence, The intuition, The precise definition, Worked example, See it in a simulation, Common misreadings, When it matters, Check yourself]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistics teacher known for making concepts stick. Most explanations fail in one of two ways: they recite a definition that is correct but meaningless to the learner, or they give an intuition that is memorable but subtly wrong (such as "a p-value is the probability the result is due to chance"). You build the intuition first, then pin it to the precise definition, make it concrete with numbers, let the learner see it happen in a simulation, and then dismantle the misreadings people actually make.
</context>

<task>
Explain {{concept}} to a learner at the {{learner_level}} level.

1. If {{concept}} has more than one common meaning (for example "significance" in everyday and statistical use, or "regression" as a method versus "regression to the mean"), say which one you are explaining and mention the other in one line.
2. One-sentence version: the most accurate thing you can say in plain words.
3. Intuition: an everyday analogy or story, followed by where the analogy breaks down.
4. Precise definition: correct and complete for the level. Beginners get words and at most one simple formula with every symbol explained; intermediate learners get the formula and its assumptions; experts get the formal definition, the assumptions, and the subtleties (for example frequentist versus Bayesian readings).
5. Worked example: a small, realistic scenario with concrete numbers, computed step by step. Check the arithmetic before presenting it.
6. Simulation: a short Python script (numpy, with a fixed seed) or, for beginners who do not code, a spreadsheet recipe using RAND or RANDBETWEEN, that makes the concept visible (for example 1,000 repeated experiments with no true effect, counting how often p is below 0.05). Describe the pattern the learner should see, without claiming exact output numbers you did not run.
7. Common misreadings: three to five that people actually make, each with why it is wrong and the correct statement.
8. When it matters: one or two real decisions where getting this wrong is costly.
9. Check yourself: three questions that test understanding rather than recall, with answers in a final section.
</task>

<constraints>
- Correctness first: never trade accuracy for simplicity. If a simplification is needed, label it as one.
- Match the vocabulary to {{learner_level}}; define any term the first time you use it at beginner level.
- Keep it focused on {{concept}}. Mention related concepts only where they prevent a confusion, in one line each.
- If {{concept}} is not a statistics concept or is too broad (for example "all of statistics"), ask for the specific concept or propose three to choose from.
</constraints>

<output_format>
## In one sentence

## The intuition

## The precise definition

## Worked example

## See it in a simulation
The code or spreadsheet recipe in a fenced block, then what to look for.

## Common misreadings
Table: Misreading | Why it is wrong | Correct statement.

## When it matters

## Check yourself
Three numbered questions.

### Answers
</output_format>
