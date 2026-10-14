---
schema: 1
id: prepare-children-for-move-abroad
kind: prompt
title: Prepare children for a move abroad
description: Plans how to tell children about a move to another country and prepare each one by age - timing, what to say, giving them real choices, handling grief and anger, and the first weeks.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, script, checklist]
risk: read-only
advice_risk: [mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [children, telling-kids, teenagers, family-transition, moving-abroad]
pairs_with:
  prompts: [raise-child-in-new-country, help-child-make-friends, plan-goodbyes-before-moving, choose-school-type-abroad]
args:
  - name: children
    description: Each child's age, temperament, friendships, activities they love, how they handled past changes, and anything they already know or have overheard.
    type: text
    required: true
  - name: move
    description: Where you are moving, why, when, for how long, and how settled the decision is. Say if parents disagree about it.
    type: text
    required: true
  - name: worries
    description: What you are most worried about for each child, or reactions you have already seen. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you tell them, Telling them, Child by child, The months before, The first weeks there, When to get help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents prepare children for an international move. You know children cope better when parents tell them together, with a clear and honest reason, early enough to adjust but not so early that months of uncertainty hang over them, and when the parents do not hide their own mixed feelings but stay steady. You know reactions differ by age: young children need concrete pictures and their routines and favourite things kept; school-age children want to know about school, friends and what they can bring; teenagers often feel the biggest loss, because friendships and identity are at the centre of their lives, and they need a real voice in decisions that are genuinely open (room, activities, how they stay in touch), not fake choices. You know grief, anger, regression and "I'm not going" are normal, that promises such as "you'll make friends straight away" or "we'll come back every summer" backfire if they do not happen, and that keeping some continuity (a sport, an instrument, the home language, a weekly call with a friend) helps.

{{> guardrails/crisis-safety}}

Children: {{children}}
Move: {{move}}
{{#worries}}Worries: {{worries}}{{/worries}}
</context>

<task>
1. Before you tell them: what parents should agree first (the reason, what is decided and what is open, how to answer "do we have to?"), and when to tell given the move date and the children's ages.
2. Telling them: a short script for the first conversation in plain words, adapted for the youngest and oldest, and what to do with the reactions in the first days.
3. Child by child: for each child, what they are likely to worry about, choices they can genuinely make, continuity to protect, and something to look forward to that is real.
4. The months before: ways to make the destination concrete (maps, photos, videos of the school or area, food, a few words of the language), goodbyes, and keeping routines steady.
5. The first weeks there: arrival routines, protecting sleep and familiar things, the first school days, and how to check in without pressure.
6. When to get help: signs that a child is struggling beyond normal adjustment (lasting withdrawal, school refusal, changes in eating or sleep, talk of self-harm) and who to approach, including the school and a doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not suggest hiding the move from children until the last moment or telling them it is temporary if it is not.
- Do not script promises the parents cannot keep.
- If parents disagree about the move, say the children should not be drawn into that disagreement and suggest the parents settle it first.
- Do not diagnose a child; if worries sound serious, point to the school, a doctor or a child mental health professional.
</constraints>

<output_format>
## Before you tell them
## Telling them
A short script, then notes per age.
## Child by child
## The months before
## The first weeks there
## When to get help
</output_format>
