---
schema: 1
id: plan-artist-alley-table
kind: prompt
title: Plan an artist alley table
description: Plans a comic creator's artist alley or small press table, with stock quantities, a price ladder, table layout, signage, payments, a cash float and a show-day checklist.
category: comics
version: 1.0.0
status: incubating
stage: [plan]
role: [artist, writer]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [comic-conventions, small-press, merchandise, table-display, event-sales]
pairs_with:
  prompts: [make-one-sheet-minicomic, pitch-comic-to-local-shops, plan-comic-anthology]
args:
  - name: show
    description: The convention or fair, how many days, expected attendance if known, table size, and whether it is your first.
    type: text
    required: true
  - name: products
    description: What you have or could make (comics, zines, prints, stickers, sketches), with your unit cost for each and how many you have.
    type: text
    required: true
  - name: budget_and_goals
    description: Table fee, travel costs, what you can spend on stock and display, your currency, and whether you aim to profit, break even or build readers. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals and break-even, Stock plan, Price ladder, Table layout, Payments and float, Show-day checklist, After the show]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help comic creators sell at conventions and small press fairs. People walk past a table in about three seconds, so it needs one large, readable sign saying what the comic is, the books displayed upright at eye level, and something cheap (a sticker, a minicomic, a print) that lets a passer-by say yes. A price ladder from small impulse buys to a bundle raises the average sale; round prices speed up cash handling. First-timers usually overprint and over-stock prints that do not sell, and under-plan the boring parts: a cash float in small notes, a backup for card payments when the venue wifi fails, a tablecloth, a way to carry stock, water and a break plan. Table fees and travel often make a first show a reader-building exercise, not a profit, and that is worth saying plainly.

Show: {{show}}
Products: {{products}}
{{#budget_and_goals}}Budget and goals: {{budget_and_goals}}{{/budget_and_goals}}
</context>

<task>
1. Goals and break-even: total the known costs and work out how many sales at your planned prices cover them. Say whether the goal is realistic for this show.
2. Stock plan: how many of each product to bring, using conservative sell-through assumptions you state (for example a small share of passers-by stopping, a share of those buying). Say which items to print more of later rather than now.
3. Price ladder: a price for each item and one or two bundles, checked against unit cost so each has a margin. Use whole numbers in the stated currency.
4. Table layout: a simple text sketch of the table from the front, with the sign, the hero book, the impulse items within reach and the cash box out of reach.
5. Payments and float: card reader setup and an offline fallback, a cash float in small denominations, and a simple tally sheet for what sold.
6. Show-day checklist: packing list, set-up order, how to greet people without hard selling, breaks and food.
7. After the show: what to record (sales by item, questions people asked) to plan the next one.
</task>

<constraints>
- Use only the costs and products given; if a unit cost is missing, flag it and leave the margin blank.
- Do not quote real attendance figures, fees or tax rules for a named show; say to check the show's rules on sales, fan art and tax registration where you live.
- Fan art of others' characters may be restricted by the show or rights holders; mention it if prints of existing characters are listed.
- Keep the plan sized to one person running the table unless they say otherwise.
</constraints>

<output_format>
## Goals and break-even
## Stock plan
A table: Item | Unit cost | Bring | Reason.
## Price ladder
A table: Item or bundle | Price | Margin.
## Table layout
A text sketch in a code block.
## Payments and float
## Show-day checklist
A checklist.
## After the show
</output_format>
