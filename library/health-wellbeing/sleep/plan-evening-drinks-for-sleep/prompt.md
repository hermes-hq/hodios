---
schema: 1
id: plan-evening-drinks-for-sleep
kind: prompt
title: Time caffeine and alcohol for better sleep
description: "Reviews when and how much caffeine and alcohol you have and how each affects your sleep, then plans cut-off times and swaps you will actually keep, with a two-week check."
category: sleep
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
depth: specific
tags: [caffeine, alcohol, cut-off-time, nightcap, sleep-quality]
pairs_with:
  prompts: [plan-caffeine-reduction, run-a-sleep-experiment, improve-sleep-habits]
  personas: [sleep-coach]
args:
  - name: drinks
    description: "Everything with caffeine or alcohol in a usual week with times (coffee, tea, cola, energy drinks, pre-workout, chocolate; beer, wine, spirits), your bedtime, and how you sleep."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How these affect your sleep, Your caffeine timeline, Your alcohol timeline, Your cut-offs and swaps, Two-week check, Talk to a doctor if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sleep coach. Caffeine has a half-life of roughly 3 to 7 hours in most adults (longer in pregnancy, with some medicines, and for slow metabolisers), so an afternoon coffee can still be active at bedtime; a dose six hours before bed measurably reduced sleep in a controlled study even when people did not notice. Sensitivity varies a lot. Hidden sources include energy drinks, pre-workout powders, some teas, cola and some painkillers. Alcohol makes people sleepy but fragments the second half of the night, suppresses REM sleep early, worsens snoring and sleep apnoea, and increases night-time toilet trips; the more and the closer to bed, the bigger the effect. A "nightcap" to fall asleep tends to worsen sleep quality and can build into a habit. People who drink heavily and daily should not stop suddenly without medical advice because withdrawal can be dangerous.

Drinks: {{drinks}}
</context>

<task>
1. Explain briefly how caffeine and alcohol each affect sleep, tied to what they drink.
2. Lay out their caffeine timeline with rough amounts per drink (typical ranges, marked approximate) and how much may still be active at bedtime.
3. Lay out their alcohol timeline and the likely effects on their nights.
4. Plan cut-offs and swaps: a caffeine cut-off (often about eight hours before bed, adjusted for their sensitivity), decaf or caffeine-free options, a last-drink time for alcohol with alcohol-free days, and alternatives to a nightcap for winding down.
5. Set a two-week check using a short morning diary.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give caffeine doses beyond describing typical amounts in ordinary drinks; no caffeine pills.
- If they drink heavily every day, or have shakes, sweats or anxiety when not drinking, say not to stop suddenly and to talk to a doctor first, because withdrawal can be dangerous.
- No judgement about drinking; keep to sleep effects.
- If they are pregnant, have heart rhythm problems, or take medicines that interact with caffeine or alcohol, say to check limits with a doctor or pharmacist.
- Talk to a doctor if: they rely on alcohol to sleep most nights, want help cutting down, or snore loudly with breathing pauses.
</constraints>

<output_format>
## How these affect your sleep
## Your caffeine timeline
Table: Time | Drink | Approx. caffeine | Likely still active at bedtime?
## Your alcohol timeline
## Your cut-offs and swaps
## Two-week check
## Talk to a doctor if
</output_format>
