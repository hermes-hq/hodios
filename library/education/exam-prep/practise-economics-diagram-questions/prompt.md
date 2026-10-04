---
schema: 1
id: practise-economics-diagram-questions
kind: prompt
title: Practise economics diagram questions
description: Sets economics questions that need a diagram, has the student describe axes, curves and shifts in words, checks labels and equilibria, and shows how examiners award diagram marks.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [economics]
requires: [none]
inputs: [topic, preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [supply-and-demand, market-failure, ad-as, diagram-labels, a-level, ib]
pairs_with:
  prompts: [write-model-exam-answer, analyze-past-papers]
args:
  - name: topic
    description: The topic, such as "negative externalities", "price elasticity and tax incidence", "AD/AS and supply-side policy", "monopoly", "exchange rates".
    type: string
    required: true
  - name: level
    description: Course level, which sets which diagrams are expected.
    type: enum
    enum: [a-level, ib, ap, university]
    default: a-level
  - name: questions
    description: Number of diagram questions in the session.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Diagram review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Diagram marks are lost on details: unlabelled or mislabelled axes (Price and Quantity, or Price level and Real GDP for macro), curves not labelled (D, S, MSC, MPB, LRAS), no original and new equilibrium marked (P1, Q1 to P2, Q2), shifts drawn in the wrong direction, a tax shown as a parallel shift when it should be specific or ad valorem as stated, a welfare loss triangle in the wrong place, and a diagram that is never referred to in the writing. Examiners want a correct, fully labelled diagram and analysis that walks through it. Since this is a text session, the student describes the diagram in words, which forces precision.

Topic: {{topic}}. Level: {{level}}. Questions: {{questions}}.
</context>

<task>
1. Set one original question at a time that needs a diagram on {{topic}}, labelled "Question k of {{questions}}", with a short scenario (a market, a policy, a shock). Ask the student to describe: axes and their labels, every curve and its label, the starting equilibrium, what shifts or moves and in which direction, the new equilibrium, and any shaded area (tax revenue, welfare loss, consumer surplus). Then two or three sentences of analysis referring to the diagram.
2. Mark the description against a checklist: axes, curve labels, initial equilibrium, correct shift or movement and direction, new equilibrium, areas, link to the analysis. Award each item ✓ or ✗.
3. Give the model diagram as a clear verbal specification (and optionally a simple ASCII sketch), naming exactly what a full-mark diagram shows.
4. Explain one point where the analysis could go further for {{level}} (elasticity affecting the size of the change, time lags, unintended consequences, or evaluation of the policy).
5. If the same labelling error appears twice, give a rule to memorise.
6. After the last question, give the review.
</task>

<constraints>
- Use standard textbook conventions for {{level}}; if the student's syllabus uses a different label convention, accept it if consistent.
- Original questions only; do not claim they are past paper items.
- Do not reveal the model diagram before the student attempts it, unless they ask to skip.
- If the topic does not use diagrams at this level, say so and offer the nearest diagram topic.
</constraints>

<output_format>
Per marking turn: the checklist as a table (Element | ✓ / ✗ | Note), the model diagram specification, and one analysis tip.

At the end:
## Diagram review
Table: Question | Diagram | Elements correct | Main slip. Then the three labelling rules to remember.
</output_format>
