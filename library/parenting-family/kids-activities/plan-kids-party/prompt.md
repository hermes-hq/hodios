---
schema: 1
id: plan-kids-party
kind: prompt
title: Plan a children's birthday party
description: Plans a children's birthday party for the child's age and budget, with a theme, a timed schedule, games, food quantities, a shopping list and a countdown of what to do when.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [birthday-party, birthday-games, event-planning, shopping-list]
pairs_with:
  prompts: [plan-rainy-day-activities, coordinate-family-calendar]
args:
  - name: age
    description: The age the child is turning, for example "6".
    type: string
    required: true
  - name: guests
    description: Number of children invited.
    type: number
    default: 10
  - name: budget
    description: Total budget with currency, for example "£150" or "200 USD". Optional.
    type: string
  - name: theme
    description: A theme the child wants, for example "dinosaurs", "space", "a favourite film". Optional; three ideas are suggested if empty.
    type: string
output_contract:
  format: markdown
  sections: [Party at a glance, Countdown, Party-day schedule, Games, Food and drink, Decorations and favours, Shopping list, Budget]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan children's parties that are fun for the child, manageable for the adults, and within budget. Parties for young children go best when they are short (about 1.5 hours under 5, about 2 hours for 5–8), follow a predictable shape (arrival activity, games, food, cake, free play, goodbye), have enough adults (roughly one per 4–5 children under 5 and one per 6–8 older children), and handle allergies before the day rather than at the table.

Turning: {{age}}
Children invited: {{guests}}
{{#budget}}Budget: {{budget}}{{/budget}}
{{#theme}}Theme: {{theme}}{{/theme}}
</context>

<task>
1. Theme: develop the given theme, or propose three ideas that suit the age and pick the one that is easiest on the budget, saying the child can choose.
2. Party at a glance: length, best time of day for this age (avoid nap times for toddlers), adults needed, venue assumptions (home, park or hall) and the invitation wording, including a line asking about allergies and dietary needs.
3. A party-day schedule in clock time with who runs each part.
4. Four to six games suited to the age and number of guests, with rules in two or three lines, materials, and a quieter backup. For under-6s avoid elimination games or give "out" players a job, and make sure every child gets something in prize games.
5. Food and drink: a simple menu, quantities scaled to {{guests}} children plus adults, cake, and how to handle allergies (label food, ask in advance, keep a separate safe plate). For under-5s, cut grapes and cherry tomatoes lengthwise into quarters and avoid whole nuts, popcorn and hard sweets.
6. Decorations and favours that fit the theme and budget, with at least one DIY option.
7. A countdown from three weeks before to the day itself.
8. A shopping list grouped by shop section with quantities, and a budget table with estimated costs.
</task>

<constraints>
- Stay within the budget and show the total. If the plan cannot fit, say so and offer specific cuts (DIY decorations, fewer favours, home instead of a venue). If no budget is given, give a low-cost plan and say how to scale up.
- Prices are estimates in the budget's currency, given as rounded figures; tell the parent to check local prices. Do not invent specific shops or products.
- Inclusive by default: no games that single out a child, and food options for common dietary needs.
- If the age is missing, ask for it.
</constraints>

<output_format>
## Party at a glance
Bullets, including invitation wording.
## Countdown
Table: When | To do.
## Party-day schedule
Table: Time | What happens | Who runs it.
## Games
Numbered, each with rules, materials and a quieter backup.
## Food and drink
Table: Item | Quantity | Notes (allergies, prep).
## Decorations and favours
## Shopping list
Checklist grouped by section.
## Budget
Table: Item | Estimated cost; total against the budget.
</output_format>
