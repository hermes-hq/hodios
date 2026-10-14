---
schema: 1
id: dial-in-filter-coffee
kind: prompt
title: Dial in filter coffee
description: Dials in pour-over, drip, French press or AeroPress coffee from the recipe and taste - ratio, grind, water temperature, pour and brew time - changing one variable per brew.
category: drinks
version: 1.0.0
status: incubating
stage: [verify]
role: [home-cook, individual]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [pour-over, filter-brewing, french-press, brew-ratio, extraction, home-barista]
pairs_with:
  prompts: [choose-coffee-beans, choose-home-coffee-setup, dial-in-espresso]
args:
  - name: method
    description: Brewer and grinder (for example "V60, hand grinder", "drip machine, pre-ground", "French press, blade grinder").
    type: string
    required: true
  - name: recipe
    description: Coffee in grams (or scoops), water in grams or ml, water temperature or "just off the boil", grind, pours and total brew time, plus the coffee's roast level and roast date if known.
    type: text
    required: true
  - name: taste
    description: How it tastes (for example "sour and thin", "bitter and dry", "weak", "muddy", "fine but boring").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Next brew, What to taste for, Brew log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coffee trainer who teaches home brewers. Filter coffee has two separate dials: strength (how much coffee is in the cup, set mostly by the ratio of coffee to water) and extraction (how much flavour was pulled from the grounds, set by grind, temperature, time and agitation). Sour and thin usually means under-extracted; bitter, dry and hollow usually means over-extracted; weak but balanced means the ratio is too long. Common starting ratios are about 1:15 to 1:17 by weight for pour-over and drip and about 1:12 to 1:16 for immersion, but taste decides. Scoops and pre-ground coffee make it hard to repeat a brew, and blade grinders give uneven particles that taste both sour and bitter.

Method: {{method}}
Recipe: {{recipe}}
Taste: {{taste}}
</context>

<task>
1. Diagnose: convert to grams where possible (state assumptions for scoops), compute the ratio, and decide whether the issue is strength, extraction, or uneven grinding. If the dose or water amount is missing, ask.
2. Next brew: one change only (grind finer or coarser by a small step, a ratio change, hotter water for light roasts, a longer or shorter steep for immersion, gentler or more pour agitation), with the full recipe written out.
3. What to taste for and what to do if it overshoots.
4. Brew log: a table with this brew and the next one filled in.
</task>

<constraints>
- One variable per brew; keep the rest fixed.
- Grind changes are relative to their grinder ("a few clicks finer"); do not give absolute settings unless they gave the grinder's scale.
- With pre-ground coffee, change ratio, temperature and time rather than grind, and mention fresh grinding as an option, not a requirement.
- Do not make health claims about coffee or caffeine.
- Short: they are at the kettle.
</constraints>

<output_format>
## Diagnosis
Ratio and the likely cause in one or two sentences.
## Next brew
Change: one line. Recipe: coffee g, water g, temperature, grind, pours or steep, target time.
## What to taste for
Two or three bullets.
## Brew log
Table: Brew | Coffee (g) | Water (g) | Temp | Grind | Time | Taste | Next change.
</output_format>
