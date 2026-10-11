---
schema: 1
id: write-roadmap-for-investors
kind: prompt
title: Write the roadmap for investors
description: Writes the roadmap section of an investor pitch or data room that ties product milestones to use of funds, proof points and the next round, without overpromising.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, product-manager]
requires: [none]
inputs: [text, notes, document]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [investor-pitch, pitch-deck, use-of-funds, milestones, investor-relations]
pairs_with:
  prompts: [plan-runway-based-roadmap, write-pitch-deck-outline, brief-board-on-roadmap, prepare-investor-qa]
args:
  - name: company
    description: What the company does, its stage, current traction (users, revenue, growth) and the round being raised.
    type: text
    required: true
  - name: plan
    description: The product plan for the next 18 to 24 months, the planned hires, and how the money will be spent.
    type: text
    required: true
  - name: format
    description: Where it will be used.
    type: enum
    enum: [pitch-slide, data-room-memo, investor-update]
    default: pitch-slide
output_contract:
  format: markdown
  sections: [What investors look for, Milestones, Use of funds link, Roadmap slide or section, Speaker notes, Questions to expect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the roadmap part of a fundraising pitch. Investors do not want a feature list; they want to see that the money buys specific milestones that make the company worth more at the next round: proof of retention, a repeatable sales channel, a new segment, a key technical capability. A good investor roadmap shows three to five milestones over the funded runway, each with the evidence it will create, tied to the use of funds and hiring plan, with dates as ranges or quarters. Common mistakes: dozens of features with exact dates, a plan that spends the money in month 12 but claims milestones only at month 24, milestones that are outputs ("launch v2") rather than proof ("50 paying teams retained for 6 months"), and promises the founders will be held to in every board meeting afterwards.
</context>

<task>
Company:

<company>
{{company}}
</company>

Product plan and spending:

<plan>
{{plan}}
</plan>

Format: {{format}}

1. Summarise what investors at this stage will look for in the roadmap, based on the stage and round given.
2. Turn the plan into three to five milestones. For each: what is achieved, the proof point it creates, the timing as a quarter or range, and what it depends on (hires, partnerships).
3. Link each milestone to the use of funds and hiring plan, and check the timing is consistent with the money: flag milestones that fall after the runway ends or before the people needed are hired.
4. Write the roadmap content for the chosen format: a slide with short lines, a data-room memo of about a page, or an investor update section.
5. Write speaker notes or a short narrative that explains why this order and what the next round will be raised on.
6. List hard questions investors are likely to ask about the roadmap, with honest answer outlines.
</task>

<constraints>
- Use only the traction, numbers and plans the user gave. Never invent metrics, customers, partners or market sizes.
- Avoid exact dates and feature lists; use quarters or ranges and outcomes.
- Flag any milestone that the funds or hiring plan cannot support, rather than writing around it.
- This is not legal or securities advice; statements to investors should be accurate and the founders should check forward-looking claims with their advisers.
{{> output/uncertainty}}
</constraints>

<output_format>
## What investors look for
Bullets fitted to the stage.

## Milestones
Table: milestone | proof point | timing | depends on.

## Use of funds link
Table: milestone | spend or hires that enable it | consistency check.

## Roadmap slide or section
The ready-to-use content.

## Speaker notes
Short paragraph.

## Questions to expect
Bullets with answer outlines.
</output_format>
