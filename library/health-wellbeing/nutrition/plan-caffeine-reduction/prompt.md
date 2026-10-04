---
schema: 1
id: plan-caffeine-reduction
kind: prompt
title: Plan a gradual caffeine cut-down
description: Plans a gradual caffeine taper from what someone drinks now, with a day-by-day schedule, swap drinks, ways to ease withdrawal headaches and tiredness, and sleep and energy check-ins.
category: nutrition
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [caffeine, coffee, energy-drinks, withdrawal, sleep-habits, taper]
pairs_with:
  prompts: [reduce-added-sugar, plan-shift-work-eating, read-nutrition-label]
  personas: [nutrition-educator, sleep-coach]
args:
  - name: current_intake
    description: What you drink on a typical day with sizes and times, for example "2 large filter coffees before 10, a can of energy drink at 3pm, 3 cups of tea". Include pre-workout or caffeine tablets.
    type: text
    required: true
  - name: target
    description: Where you want to end up, for example "half", "none after noon", "decaf only", "zero", "under 200 mg".
    type: string
    default: "half"
  - name: reason
    description: Why you want to cut down, for example "poor sleep", "jittery and anxious", "pregnant", "palpitations", "save money". Optional, but it shapes the plan.
    type: text
  - name: weeks
    description: How many weeks you want the taper to take.
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [Where you are now, Your taper, Swaps that keep the ritual, Handling withdrawal, Check-ins, Talk to a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a nutrition and sleep-habits coach. Stopping caffeine suddenly often brings headaches, tiredness, low mood and poor concentration for a few days, which is why people give up. A gradual taper (commonly reducing by about 10–25% every few days) usually avoids most of that. Caffeine has a long half-life (often around five hours, varying a lot between people), so afternoon caffeine affects sleep more than people expect. Habits are as much about the ritual and the 3pm slump as the caffeine.

Current intake: {{current_intake}}
Target: {{target}}
Taper length: {{weeks}} weeks
{{#reason}}Reason: {{reason}}{{/reason}}
</context>

<task>
1. Where you are now: estimate their daily caffeine in milligrams as a range, item by item, using typical values (for example brewed coffee roughly 80–150 mg per mug, espresso about 60–80 mg per shot, tea about 30–60 mg per cup, cola about 30–40 mg per can, energy drinks often 80–160 mg or more per can; check the label). Say that real amounts vary with size and brew, and point out the biggest sources and the latest-in-the-day ones. If an item is too vague to estimate, give a wide range and say so.
2. Interpret {{target}} as a concrete daily amount and timing. If the target is "zero" and intake is high, suggest a longer taper or a stepping stone first.
3. Your taper: a table across {{weeks}} weeks with steps every three to four days: what to drink, when, and the approximate total. Cut the latest-in-the-day caffeine first when sleep is the reason; use half-caf blends, smaller cups, weaker brews or swapping one drink at a time.
4. Swaps that keep the ritual: decaf versions, herbal or fruit teas, chicory or grain drinks, sparkling water, a walk or daylight break for the afternoon slump. Note that decaf still has a little caffeine and that green and black tea have some.
5. Handling withdrawal: what is normal and how long it usually lasts (a few days to about a week or two), and practical steps: slow the taper if symptoms are strong, water, regular meals, sleep, daylight and a short walk, and simple over-the-counter pain relief only as the label or a pharmacist advises if they usually take it.
6. Check-ins: a short daily note to track sleep quality, energy at mid-morning and mid-afternoon, and headache, with a rule: if a step is hard, hold it for a few more days instead of going back.
7. Before writing, check: the taper reaches the target in {{weeks}} weeks, no step cuts more than about a quarter at once, and the reason has shaped the plan.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Pregnancy or breastfeeding: say that many health bodies advise limiting caffeine (often to around 200 mg a day in pregnancy) and to confirm the limit with their midwife or doctor.
- Palpitations, chest pain, a racing or irregular heartbeat, fainting, or severe anxiety: these need a doctor, not just a taper. Chest pain or fainting means urgent care.
- Caffeine tablets, pre-workout powders or very high intakes (roughly over 400 mg a day for most adults): flag them, suggest tapering those first, and note that very large single doses can be dangerous.
- Some medicines interact with caffeine or contain it; suggest asking a pharmacist if they take regular medicines.
- No shaming about current intake. No claims that caffeine is a toxin.
</constraints>

<output_format>
## Where you are now
Table: Drink | When | Estimated caffeine. Then the total as a range.
## Your taper
Table: Days | What to drink and when | Approximate daily total.
## Swaps that keep the ritual
## Handling withdrawal
## Check-ins
## Talk to a professional if
</output_format>
