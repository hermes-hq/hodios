---
schema: 1
id: simulate-stakeholder-deck-review
kind: prompt
title: Simulate a stakeholder review of a deck
description: Reads a deck slide by slide as the stakeholders who will see it, such as a CFO, a head of sales or a sceptical client, and notes each one's reaction, objection and what would win them over.
category: presentations
version: 1.0.0
status: incubating
stage: [review, verify]
role: [manager, product-manager, consultant, founder]
requires: [none]
inputs: [text, document]
output: [report, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [stakeholder-review, red-team, objections, audience-perspective, pre-read]
pairs_with:
  prompts: [drill-presentation-qa, plan-backup-slides, critique-slide-deck, pre-wire-stakeholders-before-presentation]
  personas: [presentation-designer]
args:
  - name: deck
    description: The deck's slide titles, content and any notes, numbered.
    type: text
    required: true
  - name: stakeholders
    description: The people or roles who will see it, with what you know of their priorities, worries and history with the topic.
    type: text
    required: true
  - name: goal
    description: What you need from them after the presentation.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Stakeholder lenses, Slide-by-slide reactions, Biggest risks, Changes to make]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a stakeholder read-through of a deck before the real meeting. Authors read their own deck through their own logic and miss how each audience member reads it: a CFO looks for the cost, payback and what happens if the assumption is wrong; a head of sales asks what it does to their targets and customers; a security or legal lead looks for the risk nobody mentioned; a sceptical client looks for vendor claims without proof. Each reaction attaches to a specific slide: the moment a number appears without source, a term goes undefined, or an option they favour is missing. A useful simulation stays grounded in what each person is known to care about, labels guesses as guesses, and turns reactions into concrete deck changes or backup slides. It is a preparation aid, not a prediction of what real people will say.

<deck>
{{deck}}
</deck>
Stakeholders: {{stakeholders}}
Goal: {{goal}}
</context>

<task>
1. For each stakeholder, write their lens: what they care about, what they will look for first, and what would make them say yes, based on the input. Mark assumptions.
2. Go through the deck slide by slide. For each slide, note the reactions of the stakeholders who would react: the thought or question, whether it helps or hurts the goal, and how strong it is.
3. Note where a stakeholder would jump ahead or stop listening, and slides nobody needs.
4. Summarise the three to five biggest risks to the goal, by stakeholder.
5. Recommend changes: edits to specific slides, new backup slides, wording for sensitive points, and people to pre-wire.
</task>

<constraints>
- Ground each reaction in the stakeholder information given or in the role's typical concerns, and say which; do not invent personal histories.
- Do not write the reactions as quotes attributed to real named people; use "would likely ask" phrasing.
- Do not change the deck's facts; recommend how to support or present them.
</constraints>

<output_format>
## Stakeholder lenses
One short paragraph per stakeholder.

## Slide-by-slide reactions
For each slide: stakeholder, reaction, helps or hurts, strength.

## Biggest risks
Ranked list.

## Changes to make
Numbered, each tied to a slide or a stakeholder.
</output_format>
