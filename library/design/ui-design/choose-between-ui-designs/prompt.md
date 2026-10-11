---
schema: 1
id: choose-between-ui-designs
kind: prompt
title: Choose between UI design options
description: Compares two or three design options for the same screen or flow against the goal, users and constraints, recommends one, says what to borrow from the others, and how to test if unsure.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, product-manager, founder, frontend-engineer]
requires: [none]
inputs: [image, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-options, design-decisions, trade-offs, comparison]
pairs_with:
  prompts: [critique-ui-screen, write-design-rationale, plan-concept-test, run-design-critique-session]
  personas: [product-designer]
args:
  - name: options
    description: The design options (screenshots or full descriptions), labelled A, B and C, each with any notes from the designer.
    type: text
    required: true
  - name: goal
    description: What the screen or flow must achieve, the users and their context, and the success measure.
    type: text
    required: true
  - name: constraints
    description: Deadline, engineering cost differences, design system rules, brand or legal requirements. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Criteria, Comparison, Borrow from the others, Risks of the choice, If still unsure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teams stall between design options because each person judges by a different criterion: one by looks, one by build cost, one by a pet use case. A good decision fixes the criteria first from the goal (task success for the main user, error risk, learnability for new users, efficiency for frequent users, accessibility, consistency with the rest of the product, cost to build and maintain), weights them, and then compares. Often the best answer is one option with a specific element from another. When the options are close on what matters, the honest answer is that a quick test will settle it better than more debate.
</context>

<task>
<options>
{{options}}
</options>

<goal>
{{goal}}
</goal>
{{#constraints}}

<decision_constraints>
{{constraints}}
</decision_constraints>
{{/constraints}}

If fewer than two options are given or the options cannot be understood, ask and stop.

1. **Criteria.** Derive four to seven criteria from the goal and constraints, with a weight (high, medium, low) and why each matters here.
2. **Comparison.** Rate each option on each criterion (strong, adequate, weak) with a one-line reason that points at a specific element of the design.
3. **Recommendation.** Pick one option, or say they are too close to call on the high-weight criteria. Give the deciding reasons.
4. **Borrow from the others.** Specific elements from the other options worth adding to the chosen one, and any that must not be combined because they conflict.
5. **Risks of the choice.** What could go wrong with the recommended option and how to reduce it.
6. **If still unsure.** The smallest test that would settle it (first-click test, preference test with a task, A/B test if traffic allows), with the task wording and what result would favour which option.
</task>

<constraints>
- Judge against the stated goal and users, not personal taste; mark taste-based points as such and give them low weight.
- Do not claim one option tests better unless evidence is given; mark predictions as predictions.
- If options differ mainly in visual style and the goal is functional, say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Option chosen and the deciding reasons, in three to five sentences.
## Criteria
| Criterion | Weight | Why it matters here |
## Comparison
| Criterion | Option A | Option B | Option C |
## Borrow from the others
## Risks of the choice
## If still unsure
</output_format>
