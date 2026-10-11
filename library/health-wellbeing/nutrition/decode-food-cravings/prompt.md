---
schema: 1
id: decode-food-cravings
kind: prompt
title: Decode your food cravings
description: Works out what is driving strong sweet or salty cravings, such as restriction, short sleep, routine cues or stress, and plans responses that work, with myths and medical signs covered.
category: nutrition
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [explanation, plan, table]
risk: read-only
advice_risk: [medical, mental-health]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [cravings, sugar-cravings, appetite, sleep-and-appetite, habit-change]
pairs_with:
  prompts: [manage-emotional-eating, reduce-added-sugar, plan-filling-snacks, practice-hunger-and-fullness-cues]
  personas: [nutrition-educator]
args:
  - name: cravings
    description: "What you crave, when (time of day, place, situation), how strong, what you eat during the day, sleep, stress, whether you restrict certain foods, your menstrual cycle if relevant, pregnancy, and any symptoms."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your cravings, What is likely driving them, What to try, Planned treats, Track for two weeks, See a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand cravings without treating them as a character flaw. Most strong cravings are learned and cue-driven: the same time, place or activity (sofa and TV, the afternoon slump, the walk past a shop) triggers the same food. They are amplified by under-eating earlier in the day, by restricting or banning a food (which makes it more wanted), by short sleep (which shifts appetite hormones toward more hunger and a preference for energy-dense food), by stress, by alcohol, and for many people by the days before a period. The popular idea that cravings reveal a nutrient deficiency (chocolate means magnesium) is mostly unsupported. Exceptions worth knowing: craving ice, earth, starch or other non-food items (pica) is linked with iron deficiency and pregnancy and should be checked; intense salt craving with dizziness, weakness or weight loss can be a sign of a medical problem; and cravings with constant thirst, frequent urination and weight loss need a doctor. Effective responses address the driver: regular satisfying meals, enough sleep, changing the cue, a short delay, and planned portions of the craved food instead of bans.

Cravings: {{cravings}}
</context>

<task>
1. Summarise their cravings: what, when, where, how strong, and what usually happens next.
2. Rank the likely drivers for them from what they described (under-eating, restriction, sleep, stress or emotion, routine cues, cycle, alcohol, habit), explaining each in one or two lines. Correct any deficiency myth they mention.
3. Plan what to try for the top two or three drivers: specific changes to meals, sleep, routine or environment, plus a 10 to 15 minute delay technique for the moment itself.
4. Plan treats: how to include the craved food on purpose, in a portion and setting they enjoy, so it loses its forbidden pull.
5. Give a two-week tracking table (time, craving, strength, likely driver, what I did, how it went) and how to review it.
6. If the main driver is emotional, point to a dedicated plan for emotional eating; list when to see a doctor.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Do not diagnose deficiencies or conditions, and do not recommend supplements to stop cravings.
- Do not ban foods or label them good or bad. No "detox" or sugar-addiction framing as established fact; describe the evidence on food addiction as debated.
- If they describe loss of control over large amounts, purging or compensating, say so gently and suggest a doctor or an eating-disorder support service.
- If pregnant, say cravings are common but any non-food craving should be mentioned to the midwife or doctor.
- Keep suggestions realistic for their routine; one or two changes at a time.
</constraints>

<output_format>
## Your cravings
## What is likely driving them
Table: Driver | Evidence from what you said | How likely.
## What to try
## Planned treats
## Track for two weeks
Table template with the columns above.
## See a doctor if
Cravings for ice, soil, clay or other non-food items; strong salt cravings with dizziness, weakness or weight loss; cravings with constant thirst, frequent urination or unexplained weight loss; or cravings that come with loss of control or distress.
</output_format>
