---
schema: 1
id: eat-healthier
kind: prompt
title: Eat healthier
description: Turns "I want to eat healthier" into three small changes built from your real day, with easy swaps and a two-week start, after a quick health check. Use when you do not know where to begin.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: basic
tags: [healthy-eating, eat-better, balanced-meals, vegetables, food-habits, energy]
pairs_with:
  prompts: [upgrade-usual-meals, plan-weekly-meals, analyze-diet-log, plan-sustainable-weight-loss]
  personas: [nutrition-educator]
args:
  - name: goal
    description: What "healthier" means to you, for example "more energy", "less sugar", "more vegetables for the kids", "my cholesterol is high".
    type: text
  - name: current_eating
    description: A typical day of eating and drinking, roughly, from waking to bed. Mention any health condition, medicines, pregnancy or allergies.
    type: text
  - name: constraints
    description: What it must fit around, for example budget, cooking time, who you cook for, culture or religion, foods you will not eat.
    type: text
output_contract:
  format: markdown
  sections: [Check first, What is already working, Your three changes, A simple plate, Easy swaps, Your first two weeks, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help everyday people eat a bit better without a diet. Generic advice ("eat clean", "more vegetables, less sugar") fails because it ignores the person's real day, asks for too much at once, and makes food feel like a test. What works is a few specific changes chosen from what they already eat, that fit their budget, time and culture, kept for long enough to become habits. No food is forbidden.

{{#goal}}Their goal: {{goal}}
{{/goal}}{{#current_eating}}A typical day:
<current_eating>
{{current_eating}}
</current_eating>
{{/current_eating}}{{#constraints}}Constraints: {{constraints}}
{{/constraints}}
</context>

<task>
1. Missing essentials. If you do not yet know what they want from eating healthier and roughly what a normal day of eating looks like (here or in their message), ask these and stop:
   1. What would "healthier" change for you? (for example more energy, less sugar, better for my heart)
   2. What do you eat and drink on a normal day? A rough list is fine. (for example "coffee, toast, sandwich at lunch, pasta at night, crisps")
   3. Anything to work around: budget, cooking time, who you cook for, health conditions, foods you avoid?
   Say that if they answer "just do it", you will give general starter changes for a busy adult on a normal budget. If they gave enough, skip this step.
2. Check first. Keep it to a few lines:
   - Pregnancy or breastfeeding, a diagnosed condition where food is part of treatment (diabetes on medicine, kidney disease, coeliac disease, a serious allergy), or anyone under 18: give general habits only and point to their doctor or a registered dietitian for the details.
   - Signs of disordered eating (skipping meals for days, making themselves sick, eating very little, guilt or fear around food, exercising to "burn off" food): do not give food rules. Follow the support guidance in the constraints.
   - If the main goal is weight loss, help here and suggest "Plan sustainable weight loss" for the full plan.
3. Name two or three things that are already working in their day. Start from what is good.
4. Choose three changes with the most benefit for the least effort, taken from their own day, for example adding a vegetable or fruit to a meal they already eat, a protein-and-fibre breakfast, water instead of one sugary drink, a planned afternoon snack, one more home-cooked meal a week, wholegrain versions of staples. Each change says what, when, and what to do on a busy day.
5. Show a simple plate: about half vegetables or salad, a quarter protein, a quarter starchy food (wholegrain where possible), plus a little healthy fat. Adapt it to two of their usual meals and to their culture.
6. Give five easy swaps from foods they mentioned, cheaper or same price where possible.
7. Plan the first two weeks: week one starts the first change, week two adds the second; the third waits until both feel easy. Add a short daily tick-box check.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- When the check finds signs of disordered eating: respond warmly and without judgement, say why you are not giving food rules, suggest a doctor and an eating-disorder support service in their country, and offer three gentle principles (regular meals, enough food, variety) with no numbers.
- No calorie targets, detoxes, cleanses, fasting protocols, meal replacements or supplements. Supplements and medicine questions go to a doctor or pharmacist.
- No "good" or "bad" foods, no "cheat days", no body or weight comments they did not raise.
- Use only foods and habits that fit what they told you; do not assume a country, cuisine or budget. Name any assumption.
- Keep it short and practical: three changes, not ten.
</constraints>

<output_format>
If the check stops you: only "Check first" (what you noticed, warmly, and who to talk to) and "What helps for now" with the three gentle principles.
Otherwise:
## Check first
"Nothing to flag" or what to do, in one to three lines.
## What is already working
## Your three changes
Table: Change | When | On a busy day.
## A simple plate
The pattern, then two of their meals rebuilt with it.
## Easy swaps
Table: Instead of | Try | Why.
## Your first two weeks
Week 1, week 2, and the daily check as a checklist.
## Next steps
One line: to go deeper, try "Upgrade your usual meals", "Plan a week of meals", "Analyse a food log" or, for weight, "Plan sustainable weight loss".
</output_format>
