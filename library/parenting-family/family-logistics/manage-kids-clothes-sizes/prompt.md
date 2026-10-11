---
schema: 1
id: manage-kids-clothes-sizes
kind: prompt
title: Manage kids' clothes as they grow
description: Sets up a system for children's clothes across sizes and seasons, with a size log, hand-me-down boxes between siblings, a seasonal check and a needs-only shopping list.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [kids-clothes, hand-me-downs, sizing, seasonal-switch, second-hand, family-budget]
pairs_with:
  prompts: [store-seasonal-items, organise-kids-toys, plan-back-to-school-admin]
args:
  - name: children
    description: Each child's age, current sizes if known, and gender only if it affects hand-me-downs in your family.
    type: text
    required: true
  - name: situation
    description: The current state and what goes wrong, for example "bags of outgrown clothes in the loft, never know what fits, panic-buying school shoes".
    type: text
    required: true
  - name: climate
    description: Your climate or seasons, for example "cold winters, hot summers" or "mild all year". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Size log, Wardrobe basics per child, Hand-me-down system, The seasonal check, Needs-only shopping list, Passing on what you do not need]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents stop children's clothes from turning into an unmanaged pile. Children outgrow clothes every 6 to 12 months when young, at uneven speeds, and sizes vary by brand. Families with more than one child often own the right clothes already, buried in an unlabelled bag, and buy duplicates in a panic. A light system fixes it: a size log updated at each seasonal check, a small capsule of basics per child per season (enough to get through the laundry cycle, not a wardrobe of everything), labelled boxes by size and season for hand-me-downs, and a needs-only list taken shopping. Shoes need extra care because poorly fitting shoes matter for growing feet; fit is best checked in person.

<children>
{{children}}
</children>
<situation>
{{situation}}
</situation>
{{#climate}}Climate: {{climate}}{{/climate}}
</context>

<task>
1. Size log: a simple table template per child: tops, bottoms, shoes, coat, date checked, and the next likely size. Note that sizes differ by brand.
2. Wardrobe basics per child: for the coming season, a short capsule list sized to the family's laundry frequency (for example how many tops, bottoms, school uniform sets, pyjamas, socks, a coat, two pairs of shoes), adjusted to the climate and the child's activities.
3. Hand-me-down system: how to store outgrown clothes for a younger sibling: sort into keep, pass on and recycle; boxes labelled by size and season; where they live; and when to open the next box.
4. The seasonal check: a 30-minute routine twice a year or at each season change: try-on session (make it quick and fun), update the log, rotate boxes, make the shopping list.
5. Needs-only shopping list: a template that starts from the gaps in the capsule, with sizes, and a rule to check boxes and second-hand options first.
6. Passing on what you do not need: options such as giving to friends, school or community swaps, selling, donating and textile recycling, and what each typically accepts.
</task>

<constraints>
- Do not invent brand sizes or prices.
- Keep the system light: no more than 30 minutes per check.
- For shoes, suggest checking fit in person and do not give foot-health advice beyond that; refer concerns to a doctor or podiatrist.
- Do not assume clothing is gendered; follow the family's own choices.
</constraints>

<output_format>
## Size log
Template table in a code block.
## Wardrobe basics per child
Checklist per child.
## Hand-me-down system
## The seasonal check
Numbered routine.
## Needs-only shopping list
Template.
## Passing on what you do not need
</output_format>
