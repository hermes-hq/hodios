---
schema: 1
id: steelman-opposing-view
kind: prompt
title: Steelman the opposing view
description: Builds the strongest version of the view opposed to the user's, finds the real cruxes, and lists the evidence that would change each side's mind. Use before a debate, decision or hard conversation.
category: decision-making
version: 1.0.0
status: incubating
stage: [discover, review]
inputs: [text, topic]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [steelman, cruxes, debate-prep, intellectual-honesty]
pairs_with:
  personas: [thinking-partner]
  prompts: [run-six-thinking-hats]
args:
  - name: my_view
    description: The position you hold, in a sentence or a paragraph, with your main reasons if you have them.
    type: text
    required: true
  - name: topic
    description: Optional context - the decision, debate or situation this view is about.
    type: text
output_contract:
  format: markdown
  sections: [Your view as I read it, The strongest opposing view, Its best arguments, Where you really disagree, What would change minds, Pressure points in your view]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user holds a view and wants to test it against the best case on the other side, not the weakest. A steelman is the version of the opposing position that its smartest, best-informed proponents would read and say "yes, that is exactly why we believe it". The aim is better thinking, not winning: after reading, the user should know where the disagreement really lies and what evidence would settle it.

<my_view>
{{my_view}}
</my_view>
{{#topic}}
<topic>
{{topic}}
</topic>
{{/topic}}
</context>

<task>
1. Restate the user's view in one or two neutral sentences. If it is too vague to oppose (for example "I'm right about this"), ask what the view is and stop.
2. Identify the strongest opposing position. Prefer the most defensible one over the most common one. If there are several serious camps, steelman the strongest and name the others in one line each.
3. Build that position from the inside: its core claim, the values and premises it starts from, its best three to five arguments, and what it explains well that the user's view struggles with.
4. Check it against the proponent test: would a thoughtful advocate sign it without edits? Remove anything that is a caricature, a motive attack or an argument they would not make.
5. Find the cruxes: the few specific points where, if one side changed its mind, the whole disagreement would shift. Label each as a question of fact, prediction, values or definitions.
6. For each side, list concrete, observable evidence or outcomes that should change its mind. Values cruxes cannot be settled by evidence; say what kind of argument or experience could move them instead.
7. Name the two or three weakest points in the user's own view that the steelman exposes.
</task>

<constraints>
- Argue the opposing case at full strength. Do not water it down with "but of course" asides, and do not slip in a rebuttal.
- Do not declare a winner unless the user asks. Where one side is clearly better supported by evidence, say so plainly instead of inventing balance.
- If the opposing view contradicts well-established facts (for example, that vaccines cause autism), say that the evidence is settled, then steelman the strongest nearby position that reasonable people do hold, or explain why people find the claim persuasive.
- Do not invent studies, statistics, quotes or names. Describe the kind of evidence ("randomised trials of four-day weeks", "historical rent-control cases") and mark specific figures as "check this" unless you are confident they are accurate.
- Be fair to people: describe what proponents believe and why, never what they are "really" after.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your view as I read it
One or two sentences.
## The strongest opposing view
The position in one bold sentence, then a short paragraph on the premises and values it rests on. Other camps, one line each, if any.
## Its best arguments
Numbered, strongest first. Each: the argument, then the best support for it.
## Where you really disagree
Table: Crux | Type (fact, prediction, values, definition) | Your side says | Their side says.
## What would change minds
Two lists: "Evidence that should move you" and "Evidence that should move them". Concrete and observable.
## Pressure points in your view
Two or three bullets.
</output_format>
