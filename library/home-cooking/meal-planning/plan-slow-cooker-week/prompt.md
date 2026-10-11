---
schema: 1
id: plan-slow-cooker-week
kind: prompt
title: Plan a week of slow cooker dinners
description: Plans weekday dinners around a slow cooker for people out all day, matching each dish to the cooker size and hours away, with night-before prep, safe starts and quick finishing steps.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [slow-cooker, set-and-forget, workday-dinners, night-before-prep, cheap-cuts, crockpot]
pairs_with:
  prompts: [plan-weekly-meals, convert-recipe-for-appliance, plan-freezer-meals]
args:
  - name: schedule
    description: Which days you need dinner ready on return, what time you leave and get home, and how much time you have in the morning and evening.
    type: text
    required: true
  - name: cooker
    description: Slow cooker size in litres or quarts, whether it has a keep-warm setting or timer, and other kit (oven, hob, freezer).
    type: text
    required: true
  - name: household
    description: Who eats, diets or allergies, dislikes, and the country.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How the week runs, The week, Night-before and morning prep, Shopping list, Slow cooker rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a home cook who has run a slow cooker through many working weeks. The common failures: lean chicken breast cooked ten hours into dry string, pasta and rice turning to mush, dairy splitting, a cooker filled to the brim or a quarter full so food cooks unevenly, watery sauces, and frozen meat put straight in so it sits too long at unsafe temperatures. Dishes that suit long unattended cooking are cheaper braising cuts (shoulder, thigh, shin, chuck), beans and lentils, and sturdy vegetables; quick-cooking and delicate ingredients are added at the end.

Schedule: {{schedule}}
Cooker: {{cooker}}
Household: {{household}}
</context>

<task>
1. Work out the hours each dish must cook (from leaving to eating) and whether the cooker's low setting, a timer or keep-warm covers it. If someone is out more than about 10 hours and there is no keep-warm, choose dishes that tolerate it and say so.
2. Plan the slow cooker dinners for the requested days, varied across proteins and cuisines, each sized so the cooker is roughly half to two-thirds full, with at least one batch that makes a second meal or freezer portions.
3. For each dinner give night-before prep (chop, brown if worth it, store the insert or ingredients in the fridge), the morning steps under the user's time limit, and a 10-minute finish on return (thicken, add greens, dairy, fresh herbs, quick-cook pasta or rice separately).
4. Write a shopping list for the week.
5. Give slow cooker rules for this plan: thaw meat fully in the fridge first, beans needing a pre-boil (dried red kidney beans must be boiled hard before slow cooking), reduce liquid compared with hob recipes, and do not lift the lid often.
</task>

<constraints>
- Match the stated cooker size and hours exactly; flag any dish that would overcook.
- Food safety: no frozen meat straight into the cooker, no cooked food left at room temperature to cool slowly, leftovers refrigerated within about 2 hours. Guidance varies by country.
- Respect diets and allergies. No brand names.
</constraints>

<output_format>
## How the week runs
Hours away per day and setting.
## The week
Table: Day | Dinner | Setting and hours | Serves | Second meal or freezer.
## Night-before and morning prep
Per dinner: night before, morning, finish.
## Shopping list
Grouped list.
## Slow cooker rules
Short bullets.
</output_format>
