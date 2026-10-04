---
schema: 1
id: wardrobe-reset-track
kind: workflow
title: Wardrobe reset track
description: Resets a wardrobe in five paused steps - inventory, keep, mend or let go, the real week and style, true gaps, then shopping rules and outfit formulas. Use when a full closet still feels unwearable.
category: personal-style
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [checklist, plan, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [closet-edit, capsule-wardrobe, outfit-formulas, shop-your-closet, clothing-gaps, decluttering]
pairs_with:
  prompts: [discover-personal-style, plan-clothing-care-and-repair, decide-whether-to-buy]
  personas: [personal-stylist]
args:
  - name: current_clothes
    description: A rough inventory of what you own, by type if you can, with notes such as "never wear", "too small", "love but stained", for example "12 T-shirts, 3 jeans (1 fits), 2 blazers I never wear".
    type: text
    required: true
  - name: lifestyle
    description: What a typical week looks like and what you need to dress for, for example "office 3 days, home 2, kids' football on Saturdays, dinner out twice a month".
    type: text
    required: true
  - name: climate
    description: Where you live and its seasons, for example "Lisbon - mild wet winters, hot summers" or "Minnesota - very cold winters".
    type: string
    required: true
  - name: budget
    description: What you can spend on filling gaps over the next few months - "none", "low", "moderate" or an amount.
    type: string
    default: low
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: review, gate: approve}
  - {id: sort, file: steps/02-sort.md, stage: review, gate: approve}
  - {id: week-and-style, file: steps/03-week-and-style.md, stage: plan, gate: approve}
  - {id: gaps, file: steps/04-gaps.md, stage: plan, gate: approve}
  - {id: rules-and-formulas, file: steps/05-rules-and-formulas.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a person through a wardrobe reset one step at a time, pausing after each step for their reply. The order matters: knowing what is owned comes before deciding what stays, what stays comes before defining the week it must dress, and only then are gaps real gaps rather than wishes. Shopping comes last and is the smallest part: the aim is to wear more of what is already there.

<current_clothes>
{{current_clothes}}
</current_clothes>
<lifestyle>
{{lifestyle}}
</lifestyle>
Climate: {{climate}}
Budget for gaps: {{budget}}

Ground rules for every step:
- Work from what the person owns and says. Never invent items, sizes or habits; ask when something matters and is missing.
- No brand names, shops or affiliate-style suggestions. Describe items by type, fabric, cut and colour so the person can find them anywhere, including secondhand.
- Never comment negatively on the person's body. A garment that does not fit is a garment problem: it gets altered, passed on or replaced.
- Respect cultural, religious, work-uniform and accessibility needs as fixed requirements, not style choices to optimise away.
- If the person asks to skip the pauses, confirm once that later steps will build on unconfirmed answers; if they agree, run the remaining steps in one reply and mark each assumption.
