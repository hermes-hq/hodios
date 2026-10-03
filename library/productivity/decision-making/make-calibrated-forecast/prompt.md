---
schema: 1
id: make-calibrated-forecast
kind: prompt
title: Make a calibrated forecast
description: Makes a calibrated probability forecast for an uncertain event from a base rate, adjustments for the specifics and a stated confidence, and lists the signposts that would change it.
category: decision-making
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, founder, executive, researcher]
requires: [none]
inputs: [topic, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [forecasting, uncertainty, base-rates, calibration, reference-class, superforecasting]
pairs_with:
  prompts: [build-decision-tree, run-pre-mortem, run-decision-journal, check-decision-for-biases]
args:
  - name: question
    description: The event you want a probability for, as specifically as you can, for example "Will our app reach 1,000 paying users by 30 June?" or "Will the planning permission for our extension be approved?".
    type: text
    required: true
  - name: deadline
    description: The date by which the event must happen to count, if it is not in the question. Optional.
    type: string
  - name: known_information
    description: Everything relevant you know, especially recent facts, numbers and trends. The model may not know recent events, so include what matters. Optional.
    type: text
output_contract:
  format: markdown
  sections: ["The question, made resolvable", Outside view, Inside view, Forecast, What would change it, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You forecast the way well-calibrated forecasters do: start from how often things like this usually happen (the outside view), then adjust for what is special about this case (the inside view), and say the number out loud with honest uncertainty. You know the common failures: skipping the base rate and anchoring on a vivid story, rounding everything to 50% or to certainty, adjusting too far on weak evidence, and making a forecast that can never be scored because the question is vague.

Question:
<question>
{{question}}
</question>
{{#deadline}}

Resolves by: {{deadline}}
{{/deadline}}
{{#known_information}}

What the user knows:
<known_information>
{{known_information}}
</known_information>
{{/known_information}}
</context>

<task>
1. Make the question resolvable: restate it so an outsider could decide on the deadline whether it happened, with the exact threshold, date and source of truth. If the question cannot be made resolvable without guessing what the user means, ask before forecasting.
2. Outside view: name one to three reference classes this event belongs to (for example "consumer apps reaching 1,000 paying users within a year of launch", "householder planning applications in this kind of area"). For each, give the base rate and where it comes from. If you are recalling a figure rather than computing it from the user's data, mark it "approximate, from general knowledge" and say how to check it. If no base rate is known, say so and reason from a decomposition (break the event into steps that must all happen and multiply rough probabilities).
3. Pick a starting probability from the outside view and explain the choice in a sentence.
4. Inside view: list the specific factors in this case that push up or down, each with direction and rough size (small, medium, large), and the evidence for it. Adjust in modest steps; strong adjustments need strong evidence.
5. Give the final forecast as a single probability with a plain-language reading ("about 1 in 4"), avoiding 0% and 100% unless the outcome is already settled, and a short note on how confident you are in the forecast itself.
6. Run a quick check from both sides: write the most likely story of how it happens and how it fails. If one story is much easier to write, reconsider the number.
7. List three to five signposts: observable things that would move the forecast, the direction, and roughly to what number.
8. Suggest when to revisit and how to record the forecast so it can be scored later.
</task>

<constraints>
- Never present invented statistics as facts. Label every figure as from the user, computed, or approximate general knowledge.
- Say when your knowledge may be out of date for this question and what recent information would matter most.
- Use numbers, not vague words like "likely". Do not hedge across several numbers; commit to one and show the uncertainty separately.
- For questions about someone's health, a legal case or an investment, give the probability reasoning only, note that a professional's view of the specifics should outweigh a base rate, and do not give advice on what to do.
</constraints>

<output_format>
## The question, made resolvable
One sentence with threshold, date and source of truth.

## Outside view
Table: Reference class | Base rate | Source or label. Then the starting probability.

## Inside view
Table: Factor | Direction | Size | Evidence.

## Forecast
**X%** (plain-language reading), confidence note, then the two stories in two to three sentences each.

## What would change it
Table: Signpost | Direction | New estimate.

## Review
When to revisit and how to record it.
</output_format>
