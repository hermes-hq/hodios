---
schema: 1
id: reduce-vr-motion-sickness
kind: prompt
title: Reduce VR motion sickness
description: Helps a player who gets queasy in virtual reality adjust headset fit, comfort settings, game choice and session length to build tolerance gradually, and says when to stop.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer, individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
advice_risk: [medical]
tags: [virtual-reality, vr-comfort, motion-sickness, headset-setup, comfort-settings]
pairs_with:
  prompts: [set-up-accessible-gaming, recommend-games]
args:
  - name: headset
    description: The headset and whether it is standalone or connected to a PC or console.
    type: string
    required: true
  - name: experience
    description: What happens and when, for example "nauseous after 10 minutes of smooth walking", "fine seated, bad in racing games", plus the games you tried.
    type: text
    required: true
  - name: health
    description: Anything relevant you want considered, for example motion sickness in cars, migraines, or a balance condition. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Why it happens, Fit and setup, Comfort settings, Tolerance plan, Stop and seek advice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people feel comfortable in virtual reality. VR sickness mostly comes from a mismatch between what the eyes see (movement) and what the inner ear feels (standing still). Smooth artificial movement, turning with the stick, acceleration, low or unstable frame rates and a blurry, badly fitted headset make it worse. Teleport movement, snap turning, vignettes (narrowing the view during movement), a seated or standing stance that matches the game, a fan blowing on the face, and short sessions that stop at the first sign of discomfort all help. Many people build tolerance over days or weeks, but some never fully do, and pushing through nausea tends to make it worse next time.

Headset: {{headset}}
Experience: {{experience}}
{{#health}}Health notes: {{health}}{{/health}}
</context>

<task>
1. Explain why it happens for this person's pattern in a few lines.
2. Fit and setup: lens distance or IPD adjustment, headset position for a sharp image, clean lenses, a stable frame rate (lower graphics settings for PC VR), and a clear play space.
3. Comfort settings to look for in games: teleport or blink movement, snap turning, vignette, reduced acceleration, seated mode, and a fixed reference such as a cockpit; describe them generally since menus differ.
4. Tolerance plan: start with stationary or comfortable games, sessions of a few minutes stopping at the first sign of discomfort, rest until fully recovered before trying again, and increase gradually over days, with smooth movement only later.
5. Stop and seek advice: symptoms that mean stop for the day, not driving or cycling until fully recovered after a bad session, and when to talk to a doctor (for example symptoms lasting hours, a balance or vestibular condition, migraines, seizures or epilepsy, or pregnancy).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend medicines or doses; if the person asks about them, suggest asking a pharmacist or doctor.
- Never encourage pushing through nausea.
- Follow the headset maker's age and health guidance; mention that children's use has manufacturer age limits to check.
</constraints>

<output_format>
## Why it happens
Short paragraph.
## Fit and setup
Checklist.
## Comfort settings
Bullets.
## Tolerance plan
Table: Days | Game type | Session length | Settings.
## Stop and seek advice
Bullets.
</output_format>
