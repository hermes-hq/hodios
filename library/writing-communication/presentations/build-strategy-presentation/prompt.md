---
schema: 1
id: build-strategy-presentation
kind: prompt
title: Build a strategy presentation
description: Builds a deck that presents a team or company strategy to staff or a board, with where we are, the choices made, what we will stop or not do, how we will know it works and the asks.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [executive, manager, founder, consultant]
requires: [none]
inputs: [document, notes]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [strategy-communication, trade-offs, storyline, executive-audience, priorities]
pairs_with:
  prompts: [outline-presentation, drill-presentation-qa, write-speaker-notes, write-product-strategy]
  personas: [presentation-designer]
args:
  - name: strategy
    description: The strategy itself as you have it, a strategy document, planning notes or bullet points, including goals, priorities and anything decided.
    type: text
    required: true
  - name: audience
    description: Who will hear it, for example "all 120 staff", "the board" or "my team of 9", and what they already know or worry about.
    type: text
    required: true
  - name: time_slot
    description: How long you have, including questions.
    type: string
    default: 30 minutes including questions
  - name: goal
    description: What the audience should do or decide afterwards, for example "approve the plan" or "know what changes for their work next quarter".
    type: text
output_contract:
  format: markdown
  sections: [The strategy in three sentences, Slide plan, What changes for this audience, Hard questions to prepare for, Gaps and contradictions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help leaders present a strategy, not write one. Strategy presentations fail in familiar ways: they list goals and values but never show a choice, so nobody can tell what will be done differently; they hide the trade-offs, so the first hard question in the room exposes them; they skip the diagnosis, so the plan looks arbitrary; and they end without telling each listener what changes for them on Monday. A good strategy deck follows a simple chain: what is happening around us and to us (the diagnosis), the few choices we made because of it, what we will stop or not do, how we will know it is working, and what we need from this audience. Boards want the logic, the risks and the money; staff want to know what changes in their work and whether their job is safe. The same strategy needs a different emphasis for each.

<strategy>
{{strategy}}
</strategy>

Audience: {{audience}}
Time slot: {{time_slot}}
{{#goal}}Goal for the session: {{goal}}{{/goal}}
</context>

<task>
1. Reduce the strategy to three sentences: the diagnosis, the main choice, and what success looks like. If the material contains only aspirations ("be the best", "grow revenue") with no choices, say so plainly, list the choices it implies, and ask the user to confirm them before the deck is built on them.
2. Pull out the trade-offs: what the strategy says no to, what will be stopped, slowed or deprioritised. If none are stated, list the ones the plan implies and mark them "to confirm".
3. Decide the emphasis for this audience. For a board: logic, risks, resources and decisions. For staff: why, what changes for teams, what stays the same, and how they will hear progress.
4. Plan the slides in this order: the strategy on one slide early, where we are and why change is needed, the choices, what we will not do, how we will measure progress (only measures in the source or marked as proposed), what it means for this audience, and the asks or next steps. Fit the main slides into about two thirds of {{time_slot}} and leave the rest for questions.
5. For each slide give an assertion title, the content, the visual if one helps, and the minutes.
6. List the hardest questions this audience will ask, especially about jobs, budget, what happens to work that is stopped, and why this rather than the obvious alternative, with where the deck answers each or what the presenter should say.
7. List gaps and contradictions in the source: goals without owners or measures, priorities that compete for the same people, numbers that do not add up.
</task>

<constraints>
- Present only the strategy given. Do not add goals, targets, numbers, dates or initiatives that are not in the source; mark suggestions clearly as suggestions.
- Every main slide title is a full-sentence claim, not a topic word like "Vision" or "Pillars".
- Keep at most three to five priorities on screen; if the source has more, say which are really priorities and which are activities.
- Do not promise outcomes to staff (no job guarantees, no pay statements) unless the source states them.
- Plain words: replace jargon such as "leverage synergies" with what will actually happen.
</constraints>

<output_format>
## The strategy in three sentences
Diagnosis, choice, success.

## Slide plan
Table: # | Slide title (assertion) | Content | Visual | Minutes. Then the time left for questions.

## What changes for this audience
Bullets: what changes, what stays the same, what they will see next.

## Hard questions to prepare for
Bullets: question, where it is answered or the suggested answer, marked "needs a decision" where the source has no answer.

## Gaps and contradictions
Bullets of what to fix in the strategy or the facts before presenting.
</output_format>
