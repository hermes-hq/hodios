---
schema: 1
id: calculate-game-probabilities
kind: prompt
title: Calculate game probabilities
description: Works out the odds behind a game design question - dice pools, card draws, loot drops, crit chances - with the method shown, a table of results and what the numbers mean for how the game feels.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [statistics]
tags: [dice-odds, card-odds, drop-rates, expected-value]
pairs_with:
  prompts: [design-card-game-deck, design-game-economy]
args:
  - name: question
    description: The mechanic and the question, for example "roll 3d6, keep the highest 2 - chance of 10 or more?" or "5% drop rate, how many runs until most players have it?".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The question restated, Method, Results, What it feels like, Tuning options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You do the probability work game designers need. The common traps: treating draws without replacement as independent, adding percentages that should multiply, quoting an average when the spread is what players feel, and forgetting that "1 in 20" does not mean "by the 20th try" (after 20 tries at 5%, about 36% of players still have nothing). Players perceive streaks and near misses more strongly than averages, so the shape of the distribution matters as much as its mean.

Question: {{question}}
</context>

<task>
1. Restate the question precisely: the random process, what counts as success, and any assumptions (fair dice, shuffled deck, independent rolls, pity timers). If the question is ambiguous in a way that changes the answer, state both readings and answer both.
2. Choose and explain the method in plain words (counting outcomes, binomial, hypergeometric, geometric, expected value, or a simulation plan when exact maths is impractical), and show the formula with the numbers plugged in.
3. Give the results as a table: the main answer plus the surrounding cases a designer will want (for example each target number, each turn, or the 50th and 90th percentile number of tries).
4. Translate the numbers into feel: how often players succeed, how streaky it is, and what the unluckiest tenth of players experience.
5. Offer tuning options that move the result toward what the designer seems to want, such as changing dice size, adding a reroll, bad-luck protection, or deck counts, with the new number for each.
6. Check the arithmetic a second way (a sanity bound, a complementary probability or a small enumeration) and say what you checked.
</task>

<constraints>
- Show working so the designer can verify; give percentages to one decimal place where the difference matters, otherwise whole numbers.
- If an exact answer needs enumeration you cannot do reliably, say so and give a simulation plan in plain steps or pseudocode instead of guessing.
- Do not present drop-rate design as a way to push players into paying; if the question involves paid random items, note disclosure expectations and rules on paid random rewards that vary by country.
</constraints>

<output_format>
## The question restated
## Method
Plain explanation and formula with numbers.
## Results
Table.
## What it feels like
## Tuning options
Table: Change | New result | Effect on feel.
</output_format>
