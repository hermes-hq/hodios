---
schema: 1
id: run-predict-observe-explain
kind: prompt
title: Run a predict-observe-explain task
description: Runs a predict-observe-explain sequence on a science phenomenon so the learner commits to a reasoned prediction, meets what really happens and reconciles the two.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher]
subject: [physics, chemistry, biology]
requires: [none]
inputs: [topic]
output: [conversation, explanation, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [predict-observe-explain, misconceptions, conceptual-change, science-inquiry, demonstrations]
pairs_with:
  prompts: [explain-concept-at-level]
  personas: [science-tutor]
args:
  - name: phenomenon
    description: The phenomenon or demonstration, for example "a heavy and a light ball dropped together", "ice melting in salt water versus fresh water", "a plant kept in the dark". Or a topic, and the tutor picks a phenomenon.
    type: string
    required: true
  - name: level
    description: The learner's stage. Sets the vocabulary and how far the explanation goes.
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
  - name: rounds
    description: How many predict-observe-explain cycles to run, each a variation that tests the same idea.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [What you predicted, What happened, The idea, Your misconception check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner is exploring: {{phenomenon}}.
Learner level: {{level}}. Predict-observe-explain (POE) works because it makes a learner's existing mental model visible and then puts it under strain. Its value is lost when the tutor accepts a prediction without a reason, reveals the outcome before the learner commits, describes the outcome vaguely or with the explanation baked in, or simply states the right idea at the end instead of letting the learner reconcile prediction and observation. Each cycle tests one idea; a second cycle with a variation checks whether the change in thinking sticks.
</context>

<task>
Number of cycles: {{rounds}}. If the phenomenon is only a topic, choose a phenomenon with a well-known counter-intuitive outcome at this level and say what it is. If the phenomenon is dangerous to try (toxic gases, fire, mains electricity, strong acids or bases, anything pressurised or explosive), say so first in one plain sentence (what the hazard is) and that it must not be tried at home; then either run it as a thought experiment with no procedure, quantities or method given, or offer a safe phenomenon that tests the same idea, and let the learner choose.

1. Set up: describe the situation precisely (what objects, what is done, what stays the same) in neutral words that do not hint at the outcome. Ask the learner whether anything is unclear about the setup.
2. Predict: ask what they think will happen. Offer three or four options where the wrong ones match common misconceptions, plus "something else". Then ask for their reason, and a confidence from 1 to 5. Do not continue without a reason.
3. Observe: describe what actually happens as an observer would see and measure it, with realistic numbers or times where useful. Include the details that matter (for example "both land within a hair of each other; the paper sheet floats down later"). If it can be done safely at home or in class with ordinary materials, describe how to try it, with any safety note.
4. Explain: ask the learner first: "Where does what happened match or clash with your reason?" Let them propose an explanation. Then help them refine it with questions, and only then state the accepted idea at {{level}} level in three to five sentences, naming the misconception if one appeared.
5. Vary: run the next cycle with a changed condition that the right idea predicts correctly and the misconception predicts wrongly. Compare the learner's reasoning across cycles.
6. Close with the summary.
</task>

<constraints>
- Never reveal or hint at the outcome before the learner has committed to a prediction and reason.
- Treat wrong predictions as useful data; praise the reasoning shown, never the right guess.
- Describe outcomes accurately. If the real result depends on conditions (air resistance, concentration, temperature), state the conditions. If you are unsure what would happen, say so rather than inventing a result.
- Any hands-on suggestion uses safe household or standard school materials and includes a one-line safety note; no flames, mains electricity or hazardous chemicals at home. Never give step-by-step instructions, amounts or conditions for producing a hazardous result, even as an observation.
- One question per message.
</constraints>

<output_format>
During the session: short turns, ending with one question.

At the end:
## What you predicted
Each cycle's prediction, reason and confidence.
## What happened
Each observed outcome in one or two sentences.
## The idea
The accepted explanation at {{level}} level.
## Your misconception check
The misconception (if any), why it is tempting, and one everyday situation where it would mislead.
</output_format>
