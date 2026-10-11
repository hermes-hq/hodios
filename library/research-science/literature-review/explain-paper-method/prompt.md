---
schema: 1
id: explain-paper-method
kind: prompt
title: Explain a method used in a paper
description: Explains an unfamiliar method used in a specific paper, why the authors likely chose it, its assumptions and whether it looks appropriately applied, at the reader's level.
category: literature-review
version: 1.0.0
status: incubating
stage: [learn, review]
role: [researcher, student]
requires: [none]
inputs: [document]
output: [explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [method-explanation, papers, assumptions, critical-appraisal]
pairs_with:
  prompts: [read-paper-with-me, interpret-paper-statistics, identify-study-design]
  personas: [research-methodologist]
args:
  - name: method_text
    description: The part of the paper describing the method, and the results it produced if you have them. More text gives a better judgement on how it was applied.
    type: text
    required: true
  - name: method
    description: The method's name if you know it, for example "propensity score matching", "multilevel model", "CRISPR knockout screen", "interpretative phenomenological analysis".
    type: string
  - name: background
    description: Your background and level, for example "first-year PhD in sociology, comfortable with linear regression".
    type: text
output_contract:
  format: markdown
  sections: [What the method does, Why the authors used it, Assumptions and what breaks them, How well it was applied, Questions to ask]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Readers often stall on one method in an otherwise readable paper: a statistical model, a lab technique, a qualitative approach or a computational pipeline. A textbook definition rarely helps, because the question is narrower: what did this method do with these data, why did the authors pick it over the obvious alternative, and should I trust how they used it. Every method rests on assumptions (independence, no unmeasured confounding, a correctly specified model, antibody specificity, data saturation) and papers vary in whether they test or even mention them. Explaining a method well means tying it to the paper's own variables, naming the assumptions that matter here, and separating what the text shows was checked from what is simply not reported.
</context>

<task>
Explain this method as used in the paper{{#method}}: {{method}}{{/method}}.
{{#background}}The reader's background: {{background}}{{/background}}
<method_text>
{{method_text}}
</method_text>

1. Name the method (if not given, identify it from the text and say how sure you are).
2. Explain what it does in plain words, using this paper's own variables, samples or data as the example. Add one analogy only if it truly helps.
3. Explain why the authors probably chose it: the problem in their data or question it solves, and the simpler alternative they could have used and its weakness here. Mark this as your reading unless the paper states the reason.
4. List the assumptions that matter for this use, and for each: what would break it in this study, and whether the text shows it was checked (quote), not checked, or not reported.
5. Judge how well it was applied on the text given: choices that look standard, choices that look unusual, and anything missing that a careful reviewer would expect (for example a balance check after matching, a validation step, a reflexivity statement).
6. Give three questions the reader could ask the authors or check in supplementary material.
</task>

<constraints>
- Pitch the explanation to the stated background; without one, assume a graduate student from a neighbouring field. Define jargon on first use.
- Ground every claim about the paper in the text provided, quoting where it matters. Say "not reported" rather than guessing what the authors did.
- Do not overclaim: "looks appropriate on the information given" is the strongest verdict possible from an excerpt.
- If the excerpt is too short to identify the method, say so and ask for the methods paragraph.
- Keep general methods teaching to what is needed to understand this paper; point to a methods text by type rather than inventing specific references.
</constraints>

<output_format>
## What the method does
Plain explanation tied to this paper.
## Why the authors used it
Two to four sentences, with the alternative.
## Assumptions and what breaks them
Table: assumption | what would break it here | checked in the paper (quote, not checked, not reported).
## How well it was applied
Bullets: looks standard, looks unusual, missing.
## Questions to ask
Three numbered questions.
</output_format>
