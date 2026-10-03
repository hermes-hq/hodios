---
schema: 1
id: plan-picnic
kind: prompt
title: Plan a picnic
description: Plans a picnic with food that travels, quantities per person, a packing list, warm-weather food safety and simple games, sized to the group, the setting and the time available to prepare.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [picnic, outdoor-eating, packing-list, cool-box, food-safety, summer]
pairs_with:
  prompts: [organise-potluck, plan-barbecue-cook]
args:
  - name: people
    description: How many people are coming, including children (say their ages if any).
    type: number
    required: true
  - name: setting
    description: Where the picnic is, which decides what is practical to carry and eat.
    type: enum
    enum: [park, beach, hike, concert]
    default: park
  - name: prep_time
    description: How much time you have to prepare, for example "30 minutes", "1-hour", "an evening the day before" or "none - buying everything".
    type: string
    default: 1-hour
  - name: dietary_needs
    description: Allergies, diets and fussy eaters in the group, plus the occasion (date, birthday, family day out) and expected weather. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Menu, Quantities, Prep timeline, Packing list, Keeping food safe, Games and extras]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan outdoor meals that survive the journey. Picnic food fails in predictable ways: soggy sandwiches, melted desserts, dressing leaking into the bag, warm mayonnaise salads sitting in the sun, too little water and nothing to cut with. The setting changes everything: a hike needs light, compact food with no cool box; a beach needs sand-proof containers and shade; a concert may limit glass, knives and bag size.

People: {{people}}
Setting: {{setting}}
Prep time: {{prep_time}}
{{#dietary_needs}}Diet, occasion and weather: {{dietary_needs}}{{/dietary_needs}}
</context>

<task>
1. If the number of people is missing, or a child's age matters for an allergy or choking-risk food and is not given, ask and stop.
2. "Menu": six to ten items across something substantial, something fresh, a snack, a sweet and drinks, chosen to travel well for a {{setting}} picnic and to fit {{prep_time}} of preparation. Mark each item as make, assemble on site or buy. Favour food that tastes good at outdoor temperature (grain salads with oil-based dressings, wraps assembled on site, whole fruit, sturdy bakes) and adapt to the dietary needs, labelling which items suit whom.
3. "Quantities": a table with amounts for {{people}} people (adjusting for children), plus water per person for the setting and the forecast heat.
4. "Prep timeline": what to do the day before, the morning of, and on site, fitted to the prep time.
5. "Packing list": a checklist grouped as food and drink, serving (knife, board, plates, napkins, bottle opener), comfort (blanket, shade, sun cream, insect repellent), clean-up (bin bags, wipes, hand sanitiser), and setting extras (sand-proof bag for the beach, light pack for the hike, venue rules for a concert).
6. "Keeping food safe": cool box packing order, ice packs, keeping perishable food cold and out of the sun, the two-hour rule (one hour above about 32 C / 90 F), what to throw away rather than take home, and separate packing for any allergen-free food.
7. "Games and extras": three or four simple games or activities that suit the group and setting and need little kit, and, for a date or celebration, one small touch.
8. If the setting suggests a rule worth checking (glass or alcohol bans, barbecue or fire restrictions, carry-in carry-out), say so.
9. Before answering, check that quantities add up for the number of people, that the menu fits the prep time, and that nothing on the menu clashes with a stated allergy.
</task>

<constraints>
- No item that needs cooking on site unless the person mentions a grill; do not assume fires are allowed.
- If the forecast or setting makes perishable food unsafe without a cool box (a long hike in heat), choose shelf-stable food instead and say why.
- Leave no trace: pack out all rubbish.
- Keep it practical; this is a meal outdoors, not a catering job.
</constraints>

<output_format>
## Menu
Item - make / assemble / buy - suits.
## Quantities
Table: Item | Amount for the group.
## Prep timeline
## Packing list
Checklist grouped by purpose.
## Keeping food safe
## Games and extras
</output_format>
