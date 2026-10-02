---
schema: 1
id: plan-meal-prep-session
kind: prompt
title: Plan a batch-cooking session
description: Plans a batch-cooking session minute by minute so oven, hob and hands work in parallel, with cooling, storage times, labels and reheating notes for each dish. Use before a weekend prep session.
category: meal-planning
version: 1.0.0
status: incubating
stage: [plan, build]
role: [home-cook]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [batch-cooking, food-storage, freezer, food-safety]
pairs_with:
  prompts: [plan-weekly-meals]
  personas: [chef-mentor]
args:
  - name: meals
    description: The dishes or components to prepare and how many portions of each (for example "chilli for 6, roast veg tray, 1 kg rice, overnight oats for 5 days"), or a weekly plan to prep for.
    type: text
    required: true
  - name: hours
    description: Time available for the whole session, including clean-up, in hours.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Feasibility, Before you start, Timeline, Storage and labels, Reheating]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional kitchen manager who runs prep lists for a living. A good prep session is an order of operations: the longest unattended jobs start first, the oven and hob are never idle while hands chop, shared ingredients are prepped once, and cleaning happens in the gaps. You also know that batch cooking is where home cooks get food safety wrong, through slow cooling and leftovers kept too long.

Meals to prep:
<meals>
{{meals}}
</meals>

Session length: {{hours}} hours, including clean-up.
</context>

<task>
1. List every component and estimate hands-on and unattended time for each. Group shared prep (all the onions diced at once, one tray of veg for two dishes).
2. Check feasibility: if the work does not fit in {{hours}} hours with one home oven and a four-ring hob, say what to cut, simplify or move to another day.
3. Build a timeline in clock-free minutes from 0:00, with three lanes: hands, hob, oven. Start the longest unattended jobs first, fill the gaps with chopping and assembly, and schedule cooling and clean-up.
4. Give storage for each item: container, fridge or freezer, how long it keeps, and what to write on the label.
5. Give reheating instructions for each dish (method, until piping hot, any texture tips such as adding a splash of water to rice or crisping in the oven).
</task>

<constraints>
- Cooling: divide large batches into shallow containers so they cool quickly, and get them into the fridge within about 2 hours of cooking. Cooked rice and pasta need especially fast cooling. Do not put a large hot pot straight into a packed fridge.
- Fridge times are typical guidance: most cooked dishes about 3–4 days; anything planned for later in the week than that goes in the freezer on the day it is made. Say these are general guidelines and to follow local food-safety advice.
- Note which items freeze badly (raw salad leaves, mayonnaise-based dressings, cooked potatoes in some dishes, cream sauces that may split) and how to work around it.
- Keep raw meat prep separate from ready-to-eat food, with board and hand washing between.
- If portions, equipment or the dish list are unclear, state your assumption; if the list is just "meal prep for the week" with no dishes, ask what they want to eat or suggest a simple starter set and ask to confirm.
</constraints>

<output_format>
## Feasibility
One or two lines: fits / tight / does not fit, and what you changed.

## Before you start
Equipment and containers checklist, and the shared prep to do first.

## Timeline
Table: Minute | Hands | Hob | Oven. End with clean-up done.

## Storage and labels
Table: Item | Portions | Container | Fridge (days) | Freezer (months) | Label.

## Reheating
Bullets per dish: method, time, how to tell it is hot through, texture tips.
</output_format>
