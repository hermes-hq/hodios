---
schema: 1
id: find-planted-errors
kind: prompt
title: Find planted errors
description: Plays an error-hunting game with worked solutions that hide planted mistakes; the learner finds, fixes and names each error type, and gets a score and an error-pattern debrief.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [mathematics, physics, chemistry]
requires: [none]
inputs: [topic]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-analysis, worked-examples, self-checking, game, misconceptions]
pairs_with:
  prompts: [check-my-reasoning, explain-worked-solution]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: The topic to practise, for example "solving quadratics by factorising", "moles and concentration", "kinematics with suvat".
    type: string
    required: true
  - name: items
    description: How many worked solutions in the game.
    type: number
    default: 5
  - name: level
    description: The learner's stage.
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
output_contract:
  format: markdown
  sections: [Score, Your error patterns, Habits to adopt]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner is practising {{topic}} by hunting for errors in worked solutions.
Level: {{level}}.
 Finding someone else's mistake trains the checking habit that catches one's own, and naming the type of mistake shows which checks to use. The game fails if every item has an obvious error, if the "error" is ambiguous, if the planted error is not the kind real students make, or if the assistant itself makes an unplanned mistake. Including a clean item now and then stops learners from "finding" errors that are not there.
</context>

<task>
1. Explain the rules in three lines: {{items}} worked solutions, one at a time; each has one planted error or none; for each, the learner says the line with the error, fixes it, and names the error type. Points: 1 for the right line, 1 for a correct fix, 1 for the type. Clean items score 3 for "no error".
2. Plan the set before showing anything: mix these types across the items, matched to {{topic}}:
   - Slip: arithmetic or copying mistake (7 x 8 = 54, a sign dropped when expanding).
   - Concept: a wrong rule or misconception (√(a² + b²) = a + b, adding fractions by adding denominators, forgetting to square the coefficient in (2x)²).
   - Misread: answering a different question than asked (finding x when y was asked, using diameter as radius).
   - Units or magnitude: a unit not converted, or an answer of absurd size.
   - Invalid step: dividing by an expression that could be zero, or squaring both sides and keeping an extra root.
   Make one item in about five clean. Keep the error to one line so it is unambiguous.
3. Show each item as numbered lines, with the question first. Ask: "Which line, what's the fix, and what type?"
4. After the learner answers, score it, reveal the planted error and the corrected line, and explain in one or two sentences why that error happens and the check that catches it (estimate first, substitute back, check units, reread the question). If the learner spots a genuine second issue you did not plant, acknowledge it and award the point.
5. After the last item, give the debrief.
</task>

<constraints>
- Every line other than the planted error must be correct. Verify each solution fully before showing it.
- Never reveal or hint at the error line before the learner answers; one item per message.
- Keep the maths within the topic and at {{level}} level. If the topic is not one with worked solutions (for example a history topic), say this game suits maths and science and suggest a related topic.
- Keep the tone light and game-like; wrong guesses cost nothing.
</constraints>

<output_format>
Each item: "Item k of {{items}}", the question, then numbered solution lines.

At the end:
## Score
Points out of {{items}} x 3, with a line per item: planted type, found or missed.
## Your error patterns
Which types the learner found easily and which they missed.
## Habits to adopt
Two or three checks matched to the missed types.
</output_format>
