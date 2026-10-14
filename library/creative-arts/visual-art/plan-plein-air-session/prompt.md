---
schema: 1
id: plan-plein-air-session
kind: prompt
title: "Plan a plein air session"
description: "Plans a plein air painting or urban sketching outing: a light kit list, how to pick a view fast, a timed plan before the light changes, weather and safety, and what to finish at home."
category: visual-art
version: 1.0.0
status: incubating
stage: [plan, build]
role: [artist, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [plein-air, urban-sketching, landscape-painting, art-practice, painting-outdoors]
pairs_with:
  prompts: [choose-art-supplies, plan-composition-thumbnails, plan-painting-step-by-step]
args:
  - name: outing
    description: "Where and when you plan to paint or sketch, for example \"a harbour, Saturday morning\" or \"city streets at lunch\", and how you will get there (car, on foot, public transport)."
    type: text
    required: true
  - name: medium
    description: "What you will use: pencil and pen, ink and wash, watercolour, gouache, acrylic, oil or digital."
    type: string
    required: true
  - name: time_available
    description: "How long you can stay, for example \"90 minutes\". Optional; assumes two hours."
    type: string
  - name: experience
    description: "Your plein air experience, for example \"first time outdoors\" or \"regular, want to work faster\". Optional."
    type: string
output_contract:
  format: markdown
  sections: [Kit list, Choosing a view, Timed plan, Weather, light and safety, Finishing at home]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a painter who has worked outdoors for years. You know the common beginner mistakes: bringing too much gear, spending 40 minutes choosing a view, painting a subject too big for the time, chasing the light as shadows move, sitting in full sun so the paper or palette glares and values come out too dark indoors, and starting with detail. Light shifts meaningfully within about two hours, so the big shapes and shadow pattern must be fixed early and kept. Each medium has outdoor quirks: watercolour dries fast in sun and wind, oil needs a way to carry wet panels home, acrylic skins on the palette.

Outing: {{outing}}
Medium: {{medium}}
{{#time_available}}Time available: {{time_available}}{{/time_available}}
{{#experience}}Experience: {{experience}}{{/experience}}
</context>

<task>
1. Give a kit list sized to how the user travels, split into essential and nice to have, including seating or standing, shade for the work, water, rags or tissue, a bag for rubbish and a way to carry wet work.
2. Explain how to choose a view in ten minutes: a viewfinder or phone crop, looking for a clear light and shadow pattern, one centre of interest, and avoiding views too complex for the time.
3. Write a timed plan for the session: thumbnail or value note, block-in of big shapes, fixing the shadow pattern, main development, accents and stop time. State the rule for when the light changes (keep the original shadow pattern).
4. Cover weather, light and safety: shade for the palette and surface, sun and cold, wind, public spaces and private land, traffic and tides where relevant, telling someone where you are if remote, and handling people who stop to watch.
5. Say what to do at home: whether to touch up, how to note what you learned, and how to photograph or store the piece.
</task>

<constraints>
- Keep the kit list light and appropriate to the medium and transport; do not recommend specific brands.
- Do not state access rules or permits as facts for a place; tell the user to check local rules for painting in parks, private land or busy streets.
- Scale the plan to the time given; prefer a small finished study to an unfinished large piece.
</constraints>

<output_format>
## Kit list
Two lists: essential, nice to have.
## Choosing a view
Short steps.
## Timed plan
A table: time | stage | what to do.
## Weather, light and safety
Bullets.
## Finishing at home
Bullets.
</output_format>
