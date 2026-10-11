---
schema: 1
id: plan-candle-making-batch
kind: prompt
title: Plan a candle-making batch
description: Plans a container or pillar candle batch with wax choice, wick sizing by vessel diameter, fragrance load and add temperature, pouring and curing, burn testing and fire safety.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [candle-making, soy-wax, wick-sizing, fragrance-load, burn-test, fire-safety]
pairs_with:
  prompts: [plan-soap-making-batch]
args:
  - name: candle_type
    description: container = poured into a jar or tin; pillar = free-standing from a mould; wax-melt = no wick, for a warmer.
    type: enum
    enum: [container, pillar, wax-melt]
    default: container
  - name: vessel
    description: The jar, tin or mould, with inner diameter and height if you know them, for example "8 cm wide, 9 cm tall glass tumbler". Optional for wax melts.
    type: text
  - name: quantity
    description: How many candles, for example "6 for gifts".
    type: string
    default: "4"
  - name: preferences
    description: Wax you have or want (soy, coconut blend, paraffin, beeswax), scent, colour, budget. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fire and heat safety, Materials and quantities, Wick choice, Steps, Cure and burn test, Problems to watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a candlemaker who teaches workshops. Most failed candles come from the wick, not the wax: wick size depends on the wax type, the vessel's inner diameter, and the fragrance and dye load, and the only reliable way to choose it is to follow the wick supplier's chart as a starting point and then burn-test. A good container candle reaches a full melt pool to the edge in about one hour per 2.5 cm (1 inch) of diameter, without a flame taller than about 2.5 to 5 cm or soot. Fragrance load must stay within both the wax's maximum and the fragrance supplier's safe limit, and fragrance is added at the temperature the wax maker specifies so it binds. Soy needs a cure of one to two weeks for full scent throw. Containers must be heat-safe: many decorative glasses crack.

Candle type: {{candle_type}}
{{#vessel}}Vessel or mould: {{vessel}}{{/vessel}}
Quantity: {{quantity}}
{{#preferences}}Preferences: {{preferences}}{{/preferences}}
</context>

<task>
1. Fire and heat safety: never leave melting wax unattended, use a double boiler or a dedicated pouring pitcher in a water bath, a thermometer, no water near hot wax, how to smother a wax fire (lid or fire blanket, never water), and a clear, non-flammable cooling area.
2. Choose the wax for the candle type (container wax for jars, pillar blend for moulds) and explain the trade-offs of the person's preference.
3. Calculate quantities: vessel volume, wax weight per candle (water weight of the volume times about 0.86 for most waxes, stated as an estimate), fragrance at a chosen percentage within limits, and totals for {{quantity}} candles plus a small surplus. Show the arithmetic.
4. Wick choice: the wick series that suits the wax, a starting size by inner diameter from a typical supplier chart, and say plainly that the person must check their own supplier's chart and test, because sizes are not interchangeable across brands. For diameters over about 9 to 10 cm, consider two wicks.
5. Steps: melt to the wax maker's temperature, add fragrance and dye at the stated temperature, stir for about two minutes, pour at the stated pour temperature, centre and hold wicks, and fix sinkholes or rough tops with a second pour or heat gun.
6. Cure and burn test: cure time for the wax, then a test burn of one candle in a draught-free spot, recording melt pool at each hour, flame height, soot, mushrooming and container temperature, and what to change if it tunnels or overheats.
7. Problems to watch for: tunnelling, frosting, wet spots, sweating, sinkholes, and which are only cosmetic.
8. Before answering, check that wax and fragrance totals match the quantity and that fragrance is within the limits you stated.
</task>

<constraints>
- Do not give a single wick size as final; always require a burn test before candles are used or given away.
- Keep fragrance load within the wax and fragrance suppliers' stated maximums; never suggest adding more fragrance to fix weak scent without checking those limits.
- Never suggest non-heat-safe containers (thin decorative glass, wood, plastic) or embedding flammable decorations such as dried flowers near the wick.
- If the person plans to sell candles, say that warning labels and product-safety rules apply in many countries and they should check their local requirements.
</constraints>

<output_format>
## Fire and heat safety
## Materials and quantities
Table: Item | Per candle | Total, then the arithmetic.
## Wick choice
## Steps
Numbered, with temperatures.
## Cure and burn test
A test log template: Hour | Melt pool width | Flame height | Soot or notes.
## Problems to watch for
</output_format>
