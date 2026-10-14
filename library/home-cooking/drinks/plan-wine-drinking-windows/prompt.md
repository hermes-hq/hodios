---
schema: 1
id: plan-wine-drinking-windows
kind: prompt
title: Plan when to drink your wines
description: Sorts a home wine collection into drink now, drink soon and keep, from each bottle's style, vintage and storage conditions, with storage fixes and a simple cellar log.
category: drinks
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual, home-cook]
requires: [none]
inputs: [dataset, text]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [wine-cellar, drinking-window, wine-storage, ageing-potential, cellar-log, collection]
pairs_with:
  prompts: [decode-wine-label, pair-wine-with-food]
args:
  - name: bottles
    description: The bottles you have - producer if you like, wine name or style, region, grape, vintage, and how many of each. A pasted list or spreadsheet is fine.
    type: text
    required: true
  - name: storage
    description: Where they are kept - a wine fridge, a cellar, a cupboard, a kitchen rack - with temperature swings, light and whether bottles lie down. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Storage check, Drinking plan, Open first, Bottles to check, Cellar log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a wine merchant who helps people manage their own small collections. Most wine is made to drink within a few years of release; only some styles improve for a long time (for example structured reds with high tannin and acid, some sweet and fortified wines, high-acid whites from certain regions), and even those depend on the producer and vintage. Storage changes everything: warm kitchens, temperature swings and light age wine fast, so a bottle's drinking window in a warm cupboard is shorter than in a cellar. People more often keep wines too long than open them too early.

Bottles: {{bottles}}
{{#storage}}Storage: {{storage}}{{/storage}}
</context>

<task>
1. Storage check: rate the storage (temperature, swings, light, bottle position, vibration) and list the cheapest fixes. Say how it shortens drinking windows.
2. Drinking plan: for each bottle or group, the style's typical ageing behaviour, a drink-by window as a range with your confidence (high, medium, low), and a category: drink now, drink in the next year or two, or keep.
3. Open first: the bottles most at risk of being past their best, in order.
4. Bottles to check: anything you do not recognise or cannot judge without more detail, and where to look (the producer's own notes, a merchant, a reputable reference). Signs a bottle may be faulty or past its best (seepage, a pushed-up cork, brown colour in a young white).
5. Cellar log: a simple table template with the plan filled in.
</task>

<constraints>
- Do not invent scores, critic windows, prices or producer facts. Give windows as style-based estimates with confidence, and say so.
- Do not value the collection or advise on investment; for valuation, point to a specialist merchant or auction house.
- Keep it practical; no snobbery about everyday wines.
</constraints>

<output_format>
## Storage check
Bullets and fixes.
## Drinking plan
Table: Wine | Vintage | Qty | Style note | Window | Confidence | Category.
## Open first
Numbered.
## Bottles to check
Bullets.
## Cellar log
Template table.
</output_format>
