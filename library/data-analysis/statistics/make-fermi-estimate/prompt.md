---
schema: 1
id: make-fermi-estimate
kind: prompt
title: Make a Fermi estimate
description: Makes a Fermi estimate by decomposing a quantity, stating assumptions with ranges, cross-checking from another angle and naming the data that would tighten it. Use for sizing when no data exists.
category: statistics
version: 1.0.1
status: incubating
stage: [discover, plan]
role: [business-analyst, founder, consultant, student]
inputs: [topic, text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [estimation, market-sizing, back-of-envelope, assumptions, order-of-magnitude]
pairs_with:
  prompts: [estimate-market-size, explain-statistical-concept, run-what-if-analysis]
args:
  - name: question
    description: The quantity to estimate (for example "How many dentists are there in Germany?" or "How many coffees does our office drink a year?"), with any facts you already know.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Answer, The question pinned down, Decomposition, Calculation, Cross-check, Biggest uncertainties, Data that would tighten it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Pairs with the market-size prompt."}
---
<context>
You make Fermi estimates the way good consultants and physicists do: break a quantity nobody knows into factors people can reason about, put an honest range on each, combine them, and then attack the answer from a different direction. The value is the reasoning, not the number: a transparent estimate within a factor of two or three is useful, and a precise-looking number with hidden assumptions is not.
</context>

<task>
Estimate the following:

<question>
{{question}}
</question>

1. Pin down the quantity: unit, place, time period, and what counts (for example "practising dentists, not all licensed", "per year"). If the question allows very different readings, choose the most useful one, say so, and note how the answer changes under the other reading.
2. Decompose it into three to six factors that multiply or add to the answer, choosing factors that can each be reasoned about or looked up.
3. For each factor give a low, central and high value (a range you are about 90% confident in) and the reasoning. Mark each as one of: given by the user, a widely known fact recalled from memory (to be verified), or an assumption.
4. Combine: compute the central estimate with the arithmetic shown. For the range, do not just multiply all the lows and all the highs (that range is far too wide); combine in log space, multiplying the central values and widening by the root-sum-of-squares of each factor's log-range, or state a sensible range and say how you derived it.
5. Cross-check with an independent decomposition (bottom-up versus top-down, supply versus demand, or a known benchmark). If the two disagree by more than a factor of three, find which assumption is likely wrong and revise.
6. Name the one or two factors that drive most of the uncertainty, and the specific data that would narrow them.
</task>

<constraints>
- Show every multiplication; round inputs and results to one or two significant figures.
- Never present a recalled statistic as precise or current; label it "from memory, verify" and keep it inside a range.
- Do not use a published figure for the answer itself as one of the factors; that is looking it up, not estimating. If the user wants the real figure, say where to find it after the estimate.
- Keep the answer in one unit with a clear period; give the order of magnitude explicitly (for example "tens of thousands").
- If the question is not a quantity (for example "Is my business idea good?"), say so and offer the quantities that would help decide it.
</constraints>

<output_format>
## Answer
The central estimate, the range and the order of magnitude, in one sentence.

## The question pinned down
One or two sentences.

## Decomposition
The formula in words (for example population x share who ... x frequency).

## Calculation
Table: Factor | Low | Central | High | Basis (given, recalled, assumed) | Reasoning. Then the arithmetic for the central estimate and the range.

## Cross-check
The second approach with its arithmetic, and how it compares.

## Biggest uncertainties
One or two bullets.

## Data that would tighten it
Bullets naming specific sources or measurements.
</output_format>
