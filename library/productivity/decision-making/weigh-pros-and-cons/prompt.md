---
schema: 1
id: weigh-pros-and-cons
kind: prompt
title: Weigh the pros and cons of a choice
description: Weighs the pros and cons of one yes-or-no choice, gives each item a weight, cancels items of equal weight against each other, then runs a gut check on the result.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, student, founder]
requires: [none]
inputs: [text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [pros-and-cons, weighting, yes-or-no, gut-check, trade-offs]
pairs_with:
  prompts: [compare-options-matrix, check-when-to-trust-gut, widen-a-narrow-choice]
args:
  - name: choice
    description: The yes-or-no choice, stated as a question (for example "Should I accept the team lead role?").
    type: text
    required: true
  - name: pros_and_cons
    description: Your pros and cons so far, as rough as you like, plus anything that is nagging you.
    type: text
  - name: context
    description: Optional - what matters to you right now, deadlines, and who else is affected.
    type: text
output_contract:
  format: markdown
  sections: [The choice, Weighted list, Cancelling out, What is left, Gut check, Verdict]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone settle a single yes-or-no choice with a pros and cons list done properly. A plain list misleads in three predictable ways: every item looks equally important, so the longer column wins even when one item outweighs five; the same point appears twice in different words, or once as a pro of yes and again as a con of no; and the person writes the list after deciding, so it justifies rather than tests. The useful version, in the spirit of the "moral algebra" Benjamin Franklin described, gives every item a weight, strikes out items of equal weight on opposite sides, and looks at what remains. It also checks the reaction to the result: relief or disappointment at the verdict is information about a missing item or a wrong weight.

Choice:
<choice>
{{choice}}
</choice>
{{#pros_and_cons}}Pros and cons so far:
<pros_and_cons>
{{pros_and_cons}}
</pros_and_cons>
{{/pros_and_cons}}
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. Restate the choice as yes versus no, and name what "no" really means (stay as is, a different option, or postpone). If it is really a choice between several options, say so and suggest a matrix instead, then still do the best yes/no reading.
2. Build the list. Use the user's items; merge duplicates and mirror images (a pro of yes that is just the con of no). Add up to four important items they missed, marked "added".
3. Weight each item 1 to 5 by how much it matters to this person, using their stated priorities. Mark items that are uncertain (might not happen) and reduce their weight by how likely they seem, saying so.
4. Cancel out: pair items of roughly equal weight on opposite sides and strike them, showing each pairing. One heavy item can cancel two lighter ones that add up to it.
5. Show what is left on each side and the weighted totals.
6. Gut check: ask the user to imagine the verdict was just announced and notice relief or disappointment. Say what each reaction would suggest (a missing item, an underweighted fear, a value not on the list).
7. Give the verdict: yes, no, or too close to call. If too close, name the one item whose weight decides it and the cheapest way to learn more about it.
</task>

<constraints>
- Use the person's priorities for weights, not general opinions. If none are given, state the weights as starting points to change.
- Do not invent facts about their situation; added items are framed as questions to confirm.
- Count each consideration once.
- If the choice carries serious medical, legal or financial consequences, say the list organises the thinking but those parts need a qualified professional.
</constraints>

<output_format>
## The choice
One line: yes means..., no means...

## Weighted list
Table: Side | Item | Weight (1-5) | Note (uncertain, added, merged).

## Cancelling out
Bullets: which items cancel which.

## What is left
Remaining items per side and the weighted totals.

## Gut check
The relief-or-disappointment test and what each reaction would mean.

## Verdict
Yes, no or too close to call, in two or three sentences, with the deciding item if close.
</output_format>
