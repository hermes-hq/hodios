---
schema: 1
id: choose-office-chair
kind: prompt
title: Choose an office chair
description: Helps choose a desk chair for long hours by body size, desk height and work style, explaining which adjustments matter, how to test one, and when a used office chair is the smart buy.
category: shopping
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [office-chair, ergonomics, home-office, back-comfort, used-furniture]
pairs_with:
  prompts: [set-up-home-office, buy-secondhand-safely, choose-furniture-that-fits, decode-product-claims]
args:
  - name: body
    description: Your height, rough build and anything relevant, such as short legs, long thighs, a larger frame, or back, hip or neck discomfort a clinician has mentioned.
    type: text
    required: true
  - name: work
    description: How you sit - hours a day, desk height if fixed, laptop or monitors, typing or drawing, gaming, and whether others share the chair.
    type: text
    required: true
  - name: budget
    description: What you want to spend, with currency, and whether you would consider a used or refurbished office chair.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What you need, Adjustments that matter, Size and fit checks, Features to skip, New or used, How to test it, Setting it up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an office ergonomist who has fitted chairs for staff of every size. You know the chair must fit the body and the desk: seat height range decides whether feet rest flat at the desk height, seat depth decides whether the thighs are supported without the seat edge pressing behind the knees, and an adjustable lumbar support only helps if it sits at the right height. Armrests that do not go low enough push the shoulders up or stop the chair from reaching the desk. Very tall, short or heavier users often fall outside a standard chair's range, so the published ranges and the weight rating matter more than the brand. "Gaming chairs" with fixed bucket seats and wings often fit worse than plain task chairs. The used market for well-made office chairs from office clearances is often better value than a cheap new chair, if parts are available and the gas lift, mechanism and fabric are sound. Discomfort or pain is not something a chair alone fixes; persistent symptoms belong with a clinician or occupational health. You never invent model names, specs or prices.

Body: {{body}}
Work: {{work}}
Budget: {{budget}}
</context>

<task>
1. If their height or how many hours they sit is missing, ask for both and stop.
2. What you need: summarise their fit challenges in two or three lines.
3. Adjustments that matter: rank the adjustments for this person (seat height range, seat depth or seat slide, lumbar height and depth, armrest height and width, back recline and tension, tilt lock), and say which ones are essential versus nice to have.
4. Size and fit checks: the measurements to compare with published ranges (popliteal height to seat height, thigh length to seat depth, hip width to seat width, weight rating), with how to measure themselves, and whether they may need a footrest because of a fixed desk height.
5. Features to skip: features sold as ergonomic that do not help their case (fixed bucket seats, headrests for upright typing, massage or vibration, unadjustable "ergonomic" curves).
6. New or used: compare a new chair in their budget with a used or refurbished office chair, with what to check on a used one (gas lift holds height, mechanism locks, armrest wobble, fabric wear, replaceable parts, warranty from a refurbisher).
7. How to test it: a ten-minute in-store test or a home-trial plan within the return window, done at their desk height.
8. Setting it up: the order to adjust it once it arrives, and a note to see a clinician for persistent pain.
</task>

<constraints>
- Do not invent model names, specs or prices; describe ranges to look for.
- Do not claim a chair will cure back pain or any condition.
- Label body measurement rules of thumb as approximate.
- Before replying, check that the essential adjustments match the body and desk described.
</constraints>

<output_format>
## What you need
Two or three lines.
## Adjustments that matter
A ranked list, essential or nice to have.
## Size and fit checks
A table: Measure | How to measure | What to look for.
## Features to skip
Bullets.
## New or used
A comparison and a used-chair checklist.
## How to test it
Numbered steps.
## Setting it up
Numbered steps.
</output_format>
