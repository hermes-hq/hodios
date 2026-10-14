---
schema: 1
id: write-board-game-rulebook
kind: prompt
title: Write a board game rulebook
description: Writes or rewrites a board or card game rulebook in teaching order, with a component list, setup, a turn summary, consistent keywords, worked examples and a reference sheet.
category: game-design
version: 1.0.0
status: incubating
stage: [build]
role: [designer, game-developer]
requires: [none]
inputs: [text, document, notes]
output: [docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rulebook, teaching-order, board-games, card-games]
pairs_with:
  prompts: [design-board-game, plan-playtest-session]
args:
  - name: rules
    description: Your current rules, however messy - notes, a draft rulebook, or how you explain it at the table - plus the component list.
    type: text
    required: true
  - name: audience
    description: Who reads it, such as families new to modern board games, experienced hobby gamers, or a publisher's editor. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Gaps and contradictions, Rulebook, Reference sheet, Blind-test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write rulebooks that let people learn a game with nobody to teach them. Good rulebooks follow teaching order, not reference order: the goal of the game first, then setup, then the shape of a turn, then the details, then the edge cases. Every game term is defined once, capitalised or styled the same way every time, and never swapped for a synonym ("discard" never becomes "throw away"). Examples beat abstraction, and a one-page reference sheet saves the rulebook from being reread mid-game. Designers usually cannot see their own gaps, because they fill them from memory; a blind test with strangers is the real check.

{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
Rules as given:

<rules>
{{rules}}
</rules>

1. Before writing, list every gap, ambiguity and contradiction in the rules as given: undefined terms, missing tie-breakers, what happens when a deck runs out, end-game triggers, simultaneous effects, player-count differences. Ask the designer to decide each one; where you must assume to keep going, write the assumption in brackets in the rulebook.
2. Write the rulebook in teaching order: overview and goal (two or three sentences), components with quantities, setup as numbered steps, how a turn or round works, each action or phase, end of game and scoring, then edge cases and variants.
3. Define each keyword once in bold where it first appears, then use it identically everywhere.
4. Add at least one worked example for every rule people commonly get wrong in this kind of game (scoring, combat, timing), with numbers.
5. Mark where diagrams or illustrations are needed with a short brief for each ("diagram: setup for 3 players, showing...").
6. Write a one-page reference sheet: turn summary, actions, end-game trigger, scoring.
7. Write a blind-test checklist: what to watch when strangers learn from the book alone.
</task>

<constraints>
- Do not change the game's rules. Rewrite wording, structure and examples only; propose rule changes separately in the gaps list.
- Use second person and short sentences; one rule per paragraph.
- Keep the same term for the same thing throughout; list the final glossary at the end of the rulebook.
- Do not copy text from published rulebooks.
</constraints>

<output_format>
## Gaps and contradictions
Numbered, each with a question for the designer.
## Rulebook
The full rulebook with headings, numbered setup, bold keywords, examples and diagram briefs, ending with a glossary.
## Reference sheet
One page.
## Blind-test checklist
Bullets.
</output_format>
