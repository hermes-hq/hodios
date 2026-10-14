---
schema: 1
id: plan-comic-fight-sequence
kind: prompt
title: Plan a comic fight sequence
description: Plans a fight or action sequence for a comic, with the geography, a beat list of cause and effect, a page and panel budget, the key impact panels and clarity checks for the artist.
category: comics
version: 1.0.0
status: incubating
stage: [design, plan]
role: [writer, artist]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [action-scenes, fight-choreography, pacing, staging, panel-layout]
pairs_with:
  prompts: [write-comic-script, thumbnail-comic-page, review-comic-script]
  personas: [comics-editor]
args:
  - name: fight
    description: Who fights whom, where, why, what each wants, their abilities or weapons, and how it should end.
    type: text
    required: true
  - name: page_budget
    description: How many pages (or for a vertical-scroll comic, roughly how many panels) the sequence may use, and the format.
    type: string
    default: "4 pages, print, left to right"
output_contract:
  format: markdown
  sections: [Stakes and turn, Geography, Beat list, Page plan, Key panels, Clarity checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan action for comics. A comic fight is not a list of moves: the reader has to know where everyone is, what each fighter wants, and who is winning at each moment, and the fight needs a turn where the advantage changes. Because comics show frozen moments, the strongest panels show the instant before impact or the result just after, not the middle of a swing; a cause in one panel and its effect in the next lets the reader's mind do the motion in the gutter. An establishing panel early sets the geography, and keeping fighters on consistent sides of the frame (the 180-degree rule) stops readers from losing track. Props and terrain introduced early pay off later. Most fights in comics are short on the page: three to six panels per page, with one large impact panel per page at most, and a quiet reaction beat after the climax.

Fight: {{fight}}
Page budget: {{page_budget}}
</context>

<task>
1. Stakes and turn: state in two or three lines what each side wants, what the reader fears, and the moment the advantage flips. If the fight has no turn, propose one that fits the given facts and mark it as a suggestion.
2. Geography: describe the space with a simple text map in a code block, marking where each fighter starts, the exits, and any prop or hazard that will matter. Each thing used later must be shown before it is used.
3. Beat list: number each beat as cause and effect (A does X, so B does Y), with who has the advantage after it.
4. Page plan: assign beats to pages and panels within {{page_budget}}, with the panel count per page, the one impact panel per page, and where the page turn (or long scroll gap) lands.
5. Key panels: describe the three to five panels that carry the fight: the moment chosen (before or after impact), shot size, angle and which side of frame each fighter is on.
6. Clarity checks: confirm each fighter's screen direction stays consistent unless a deliberate cross is shown, every hit has a visible result, and there is a reaction beat after the climax.
</task>

<constraints>
- Keep to the characters, abilities and outcome given; flag contradictions instead of changing them.
- One moment per panel; never ask the artist to draw two actions in one panel.
- Do not exceed {{page_budget}}; if it cannot hold the fight, say what to cut.
- Violence should be shown at the level the book's audience implies; ask if the age rating is unclear.
</constraints>

<output_format>
## Stakes and turn
## Geography
## Beat list
A numbered list: Beat | Cause | Effect | Advantage.
## Page plan
A table: Page | Panels | Beats | Impact panel | Exit.
## Key panels
## Clarity checks
A checklist.
</output_format>
