---
schema: 1
id: explain-sports-stat
kind: prompt
title: Explain an advanced sports statistic
description: Explains an advanced sports statistic such as expected goals, WAR or net rating, with the intuition, a worked example, what it misses and how to read it in commentary and debates.
category: sports
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [topic]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sports-analytics, advanced-stats, expected-goals, sabermetrics, fan-analytics]
pairs_with:
  prompts: [explain-sport-to-newcomer, plan-fantasy-sports-draft]
args:
  - name: stat
    description: The statistic, for example "expected goals (xG)", "WAR", "net rating", "EPA per play", "strike rate", "Corsi".
    type: string
    required: true
  - name: sport
    description: The sport it is used in, for example football (soccer), baseball, basketball, American football, cricket, ice hockey.
    type: string
    required: true
  - name: level
    description: casual = intuition and how to read it, no formulas; keen = intuition plus a simple worked example and limits; analyst = how it is built, modelling choices, variants and sample-size issues.
    type: enum
    enum: [casual, keen, analyst]
    default: keen
output_contract:
  format: markdown
  sections: [In one sentence, The intuition, How it is calculated, Worked example, What it misses, Reading it in the wild, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain sports analytics to fans who hear the numbers on broadcasts and podcasts but are not sure what they mean or how much to trust them. Most confusion comes from treating a model estimate as a fact, comparing numbers from different providers that calculate them differently, and drawing conclusions from tiny samples. A good explanation builds intuition first, then shows the calculation at the right depth, then is honest about the limits.

Statistic: {{stat}}
Sport: {{sport}}
Level: {{level}}
</context>

<task>
1. If the statistic is not one you know, or the name is used for different things in this sport, say so and ask which one is meant; do not invent a definition. If it belongs to a different sport than the one named, point that out.
2. In one sentence: what the number tells you, in plain words.
3. The intuition: the question the stat was invented to answer and why simpler stats were not enough, with an everyday analogy if it helps.
4. How it is calculated: for casual, describe the inputs in words only; for keen, give the simplified structure; for analyst, describe how it is modelled, the main inputs, the replacement level or baseline where relevant, and how providers differ. Say clearly when exact formulas are proprietary or vary by provider.
5. Worked example: a small, clearly invented example with round numbers showing how the stat would come out, labelled as illustrative.
6. What it misses: what the stat does not capture, typical biases, how many games or plays are needed before it means much, and when it misleads.
7. Reading it in the wild: how to interpret typical values in commentary ("an xG of 2.1 against 0.4 means…"), common misuses in debates, and the companion stats worth checking alongside it.
8. Check yourself: two short questions with answers so the reader can test their understanding.
9. Before answering, check that the worked example's arithmetic is right and that you have not presented any current player or team values as facts.
</task>

<constraints>
- No current-season player or team figures unless the user supplied them; numbers change and vary by provider.
- No betting or gambling advice.
- Define every abbreviation the first time.
- Keep casual explanations short and formula-free.
</constraints>

<output_format>
## In one sentence
## The intuition
## How it is calculated
## Worked example
## What it misses
## Reading it in the wild
## Check yourself
</output_format>
