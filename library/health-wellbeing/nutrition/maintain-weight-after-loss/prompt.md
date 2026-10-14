---
schema: 1
id: maintain-weight-after-loss
kind: prompt
title: Maintain weight after losing it
description: Plans the move from weight loss to maintenance, with a gradual rise in intake, a weight range to hold, simple monitoring, and plans for the triggers that usually cause regain.
category: nutrition
version: 1.0.0
status: incubating
stage: [maintain]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [weight-maintenance, weight-regain, relapse-prevention, habit-change, self-monitoring]
pairs_with:
  prompts: [plan-sustainable-weight-loss, plan-nutrition-targets, start-food-tracking, plan-eating-on-weight-loss-medication]
  personas: [nutrition-educator]
args:
  - name: journey
    description: "How much you lost, over how long, and how (calorie counting, a programme, medicine, surgery), what you eat now, your activity, current weight and height if comfortable, and any regain so far."
    type: text
    required: true
  - name: life
    description: "What is coming up and what usually knocks you off track, for example holidays, stress at work, a new baby, injuries, shift changes. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Where you are, Your maintenance intake, Your weight range and actions, Habits to keep, Relapse triggers and plans, Get help if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people keep weight off, which is harder than losing it and gets far less planning. After weight loss the body needs less energy than before, because it is smaller and because of some metabolic and appetite adaptation, so returning to pre-diet eating brings the weight back. The usual move into maintenance is to raise intake gradually (for example about 100 to 200 kcal a day each week, or by adding a portion of a food back) while watching a weekly average weight, stopping the increases when the average holds steady for two to three weeks. A few pounds of water and food weight return when carbohydrate intake rises; this is not fat regain. People who keep weight off in long-term registries commonly report regular self-monitoring, a lot of physical activity, consistent eating patterns and early action on small regains; these are observational patterns, not guarantees. Strength training and enough protein help keep muscle. Defining a range rather than a single number, with agreed actions at the top of the range, prevents both panic and drift. People who stop weight-loss medicines often regain weight, which is a conversation for the prescriber.

Weight loss so far: {{journey}}
{{#life}}Upcoming life and usual triggers: {{life}}{{/life}}
</context>

<task>
1. Screen: if the current weight is in the underweight range, the loss was very fast or unintended, or they describe restriction, purging or fear of eating more, do not plan maintenance of a lower weight; suggest a doctor and, where relevant, an eating-disorder support service.
2. Summarise where they are and what got them here, naming which habits from the loss phase are worth keeping and which (very strict rules) are not.
3. Plan the maintenance intake: a gradual step-up method from current eating, in foods or estimated calories depending on how they tracked, with when to stop increasing. Mark every number as an estimate.
4. Set a maintenance weight range (for example about 2 kg either side of the current weekly average) and a three-zone action plan: in range (carry on), top of range (tighten two named habits for two weeks), above range (review with fuller tracking or get support).
5. List the habits to keep: monitoring rhythm, protein and fibre at meals, activity and strength training, sleep, planned treats, eating out and holidays.
6. Name their likely relapse triggers from what they described and write an if-then plan for each.
7. Close with when to get help.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not encourage further loss unless they ask and it is clearly from a healthy starting point; this prompt is about holding steady.
- If they used weight-loss medicine or surgery, keep eating advice general and refer dose, stopping and post-surgery nutrition questions to their prescriber or bariatric team.
- No calorie figures below about 1,200 kcal for women or 1,500 for men. No compensating with fasting or punishing exercise after a high day.
- Weekly averages, not daily weights, drive decisions. If they find weighing distressing, offer waist measurement or how clothes fit instead.
- Neutral language: no "cheat days", "good" or "bad" foods.
</constraints>

<output_format>
If the screen stops you: only "Where you are" (what you noticed, warmly) and "Get help if".
Otherwise:
## Where you are
## Your maintenance intake
Table: Week | Change | What to watch.
## Your weight range and actions
Table: Zone | Weekly average | What you do.
## Habits to keep
## Relapse triggers and plans
Table: Trigger | If this happens | Then I will.
## Get help if
</output_format>
