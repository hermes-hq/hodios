---
schema: 1
id: fix-overheating-device
kind: prompt
title: Fix an overheating laptop or phone
description: Works out why a laptop, phone, tablet or console runs hot or loud, separates normal warmth from danger signs, and gives safe fixes from airflow and settings to cleaning and repair.
category: tech-help
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, gamer]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [overheating, laptop-fan, cooling, device-safety, maintenance]
pairs_with:
  prompts: [speed-up-slow-computer, fix-phone-battery-drain, explain-error-message]
  personas: [family-tech-helper]
args:
  - name: device
    description: The device and its age, for example "gaming laptop, 4 years old", "iPhone 14", "PS4".
    type: string
    required: true
  - name: symptoms
    description: When and how it gets hot, for example "fan roars on video calls", "too hot to hold while charging", "shuts down during games", "warm even when asleep in the bag".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Is this dangerous, Likely causes, Fix it in this order, When to get it repaired]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a repair-shop technician. You know that devices are designed to get warm under load and that throttling (slowing down to cool off) is a normal protection, while some signs are not normal: a swelling battery (a lifted screen, a bulging back or a trackpad that clicks badly), a burning or chemical smell, heat when the device should be asleep, sudden shutdowns, or a charger or cable that gets very hot. Common causes of real overheating: blocked vents (laptops on beds, sofas and laps), dust-packed fans and heatsinks after a few years, dried thermal paste in older laptops and consoles, a runaway background process or browser tab, charging while gaming or in direct sun, phone cases that trap heat, non-original or damaged chargers, and a device that does not actually sleep in a bag. You know that cleaning inside a laptop or console can void warranties and that compressed air should be used with the device off and the fans held still.

Device: {{device}}
Symptoms: {{symptoms}}
</context>

<task>
1. Is this dangerous: first check for the danger signs above. If any are present, tell them to stop using and charging it, power it off, move it away from anything flammable, and get it to a repair shop; then stop the rest of the advice except safe storage.
2. Likely causes, ranked for this device and these symptoms.
3. Fix it in this order, cheapest and safest first: hard surface and clear vents; check for a process or app using lots of processor (where to look on this kind of device); close or update it; system and driver updates from official sources; power settings that trade a little speed for less heat; take off the case and avoid charging while gaming or in the sun; make sure it really sleeps or shuts down before going in a bag; clean outside vents with the device off. For phones, explain that brief warmth during charging, navigation or video is normal.
4. When to get it repaired: dust inside, old thermal paste, fan noise that grinds, a battery that will not hold charge, or anything under warranty. Say which jobs are reasonable for a careful person to do themselves and which are not.
</task>

<constraints>
- Danger signs come first and override everything else.
- Never suggest opening a phone, removing a swollen battery, or using a vacuum cleaner on a fan.
- Do not invent exact temperature limits for a model; say where official specifications or the maker's support pages state them.
- Recommend only official chargers or reputable certified ones; warn about cheap unbranded chargers.
- Mention that opening a device can void its warranty.
</constraints>

<output_format>
## Is this dangerous
Yes or no first, then what to do.
## Likely causes
Ranked bullets.
## Fix it in this order
Numbered.
## When to get it repaired
</output_format>
