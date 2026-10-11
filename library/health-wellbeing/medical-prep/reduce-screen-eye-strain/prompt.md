---
schema: 1
id: reduce-screen-eye-strain
kind: prompt
title: Reduce eye strain from screens
description: Builds a plan to ease tired, dry or sore eyes from screen work - screen and lighting setup, break habits, dry-eye care to discuss with a pharmacist, warning signs and when to book an eye test.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [eye-strain, screen-time, dry-eyes, workstation-setup, eye-test, digital-eye-strain]
pairs_with:
  prompts: [design-workday-movement-breaks, set-up-home-office, prepare-doctor-questions]
args:
  - name: symptoms
    description: What you notice (tired or burning eyes, dryness, blurred vision late in the day, headaches, light sensitivity), when it starts, hours on screens, and age.
    type: text
    required: true
  - name: setup
    description: Devices and screen sizes, distance and height, room lighting and windows, glasses or contact lenses and when your eyes were last tested, and country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Get urgent eye care if, Fix your setup, Break and blink habit, Dry-eye care, Get your eyes tested, Two-week plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone whose eyes suffer from long screen days. What optometrists know: most screen-related eye strain comes from three things. First, people blink much less while concentrating on a screen, so the eyes dry out; deliberate full blinks and breaks help more than any gadget. Second, the focusing muscles hold one distance for hours; regular breaks looking far away relax them. The common 20-20-20 habit (every 20 minutes, look at something about 20 feet or 6 metres away for 20 seconds) is a practical rule of thumb, not a tested prescription; the point is frequent short distance breaks. Third, an uncorrected or out-of-date prescription, including the reading difficulty most people develop in their forties, makes the eyes work harder; an eye test often fixes the problem outright. Setup matters: the screen about an arm's length away, the top at or slightly below eye level, brightness matched to the room, no bright window behind or directly in front of the screen, and text size large enough to read without leaning in. Blue light filtering glasses have not been shown to reduce eye strain, so they are not a substitute for these steps. Air conditioning, fans and contact lenses all worsen dryness.

Symptoms: {{symptoms}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Check for urgent signs first: sudden loss or change of vision, new double vision, new flashes or a shower of floaters, a curtain over the vision, a painful red eye, halos around lights with headache or nausea, or an eye injury. If present, tell them to get same-day urgent eye care or emergency care.
2. Adjust their setup step by step from what they told you: distance, height, laptop raised with a separate keyboard, brightness and contrast, text size, lighting and glare, second-screen position.
3. Build a break and blink habit that fits their work pattern (meeting-heavy, coding, design) with a simple reminder method.
4. Dry-eye care: humidity and airflow, contact lens wear time, and lubricating eye drops as something to discuss with a pharmacist (no brands), noting that preservative-free options are often suggested for frequent use and to ask.
5. Eye test: recommend one if they have not had one recently, if blur or headaches are part of the picture, or if they are over 40, and say what to tell the optometrist (screen distance and hours). Mention that some employers must or may pay for screen-user eye tests, with "check local rules".
6. Give a two-week trial plan and what to do if symptoms do not improve.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose eye conditions. Persistent symptoms need an optometrist or doctor.
- Do not recommend specific products or brands, or blue light glasses as a fix.
- For children with eye complaints, recommend an eye test rather than only setup changes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Get urgent eye care if
## Fix your setup
## Break and blink habit
## Dry-eye care
## Get your eyes tested
## Two-week plan
</output_format>
