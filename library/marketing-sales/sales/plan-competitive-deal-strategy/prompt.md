---
schema: 1
id: plan-competitive-deal-strategy
kind: prompt
title: Plan a competitive deal strategy
description: Plans how to win one live deal where the buyer is also evaluating a named competitor - criteria to shape, proof to offer, traps to set and avoid, and the timing of each move.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, founder, consultant, manager]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [competitive-selling, deal-strategy, competitor-displacement, evaluation-criteria, b2b-sales]
pairs_with:
  prompts: [write-competitive-battlecard, handle-sales-objections, inspect-deal-qualification, run-win-loss-analysis]
args:
  - name: deal
    description: The buyer, their problem and goals in their words, who decides, the stage, what they have seen of your product, the timeline and anything they have said about the evaluation.
    type: text
    required: true
  - name: competitor
    description: Who you are up against (a named vendor, in-house build or "do nothing"), what the buyer likes about them, what you honestly know of their strengths and weaknesses, and your record against them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where you stand, Winning themes, Criteria to shape, Proof plan, Moves and timing, Traps to avoid, Walk-away signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan competitive strategy for a single deal. A battlecard describes a competitor in general; winning a specific deal depends on this buyer's criteria and process. Experienced sellers know that buyers rarely choose on features alone: they choose the option that seems least risky for the outcome they care about. If the competitor wrote or shaped the buyer's requirements, you lose on their terms, so the strongest move is to add or reweight criteria where you are genuinely stronger, through questions and proof rather than attacks. Criticising a competitor directly usually backfires; letting the buyer discover a weakness through a fair test ("ask each vendor to show X live with your data") does not. Being late in an evaluation means accepting you are probably column fodder unless you can change the process. And sometimes the honest call is that the competitor fits better; spotting that early saves weeks.
</context>

<task>
<deal>
{{deal}}
</deal>

<competitor>
{{competitor}}
</competitor>

1. **Where you stand:** whether you are ahead, level or behind and why, who likely favours whom, and whether the competitor got in first. Flag what is unknown.
2. **Winning themes:** two or three themes where your real strengths meet this buyer's stated priorities, each in one sentence a buyer could repeat internally.
3. **Criteria to shape:** criteria to add or reweight, the discovery questions that surface them naturally, and who at the buyer would care about each. Also name criteria where the competitor is stronger and how to neutralise rather than ignore them.
4. **Proof plan:** what proof would make each theme believable to this buyer (a live demo on their data, a pilot, a reference with a similar switch, a cost comparison over 3 years), in order of impact.
5. **Moves and timing:** a dated sequence of actions until the decision, including who on your side is involved (executive, engineer, a reference customer) and what each move is meant to change.
6. **Traps to avoid:** what the competitor will likely say about you and how to pre-empt it honestly, plus mistakes that lose competitive deals (discounting early, attacking the rival, over-promising the roadmap).
7. **Walk-away signs:** evidence that would show the deal is lost or a bad fit, and what to do then.
</task>

<constraints>
- Use only what the user tells you about the competitor. Do not state competitor features, prices or weaknesses as fact from general knowledge; mark anything you suggest checking as "to verify".
- No disparaging or misleading claims about the competitor, and no tactics that rely on false information.
- Never suggest promising features that do not exist or committing to roadmap dates without product sign-off.
- If the competitor is "do nothing" or an in-house build, adapt the plan to the cost and risk of the status quo rather than a vendor comparison.
</constraints>

<output_format>
## Where you stand
Short paragraph plus a list of unknowns.

## Winning themes
Numbered themes.

## Criteria to shape
Table: Criterion | Add or reweight | Question to raise it | Who cares.

## Proof plan
Numbered list in order of impact.

## Moves and timing
Table: When | Move | People | Intended effect.

## Traps to avoid
Bullets, including what they will say about you and your honest pre-emption.

## Walk-away signs
Bullets.
</output_format>
