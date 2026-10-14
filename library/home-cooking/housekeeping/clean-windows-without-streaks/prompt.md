---
schema: 1
id: clean-windows-without-streaks
kind: prompt
title: Clean windows and glass without streaks
description: "Gives a streak-free method for windows, mirrors, glass doors and shower screens, plus frames, sills and tracks, matched to the glass type, the tools you have and the access you have safely."
category: housekeeping
version: 1.0.0
status: incubating
stage: [operate]
role: [individual]
requires: [none]
inputs: [text]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [window-cleaning, glass, streak-free, working-at-height]
pairs_with:
  prompts: [clean-by-surface-material, plan-cleaning-schedule]
args:
  - name: glass
    description: "What you want to clean (inside windows, outside windows, mirrors, glass shower screen, conservatory roof, glass table) and anything special like tinted film, leaded panes or hard water spots."
    type: text
    required: true
  - name: access
    description: "Floor level, whether windows tilt or open inwards, ladders or poles available, and the tools you own. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Kit, Order of work, Streak-free method, Special glass, High and outside glass]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional window cleaner. Streaks come from too much product, dirty water, wiping in circles and drying in direct sun, not from the wrong spray. The pro method is a little washing-up liquid in clean water, a strip applicator or microfibre to wet and loosen, a squeegee pulled in overlapping strokes with the blade wiped between strokes, and a dry microfibre for edges. Frames and sills go first so dirt does not drip onto clean glass. Hard water spots are mineral and need a mild acid or dedicated remover, which is unsafe on some frames, stone sills and coatings. Window film, low-E coatings and tinted glass can be scratched by blades and ammonia.

Glass: {{glass}}
{{#access}}Access: {{access}}{{/access}}
</context>

<task>
1. Give the kit, starting with what they have and cheap substitutes.
2. Give the order: dust and vacuum frames and tracks, clean frames and sills, then the glass, then edges and drips.
3. Give the streak-free glass method step by step, including mix, technique, when not to clean (strong sun), and fixing streaks.
4. Give extra steps for any special glass listed (shower screen limescale, mirrors without damaging silvering at edges, film or coatings).
5. Cover outside and high glass only within safe access, and say when to use a pole system or a professional.
</task>

<constraints>
- Chemical safety: one product at a time, rinse or wipe with water between products, never mix cleaners (bleach with ammonia, vinegar, acids or other cleaners releases toxic gases), ventilate, wear gloves for strong products, and store products in their original containers away from children and pets.
- No working at height on chairs or unstable ladders, no leaning out of windows; for upper-floor outside glass that does not tilt in, recommend a water-fed pole from the ground or a professional window cleaner.
- No ammonia sprays or razor blades on tinted film or coated glass unless the maker allows; no acids (including vinegar) on natural stone sills or near them.
- Do not spray liquid directly on mirrors or at the edges; spray the cloth to protect the silvering.
- Keep it short and practical.
</constraints>

<output_format>
## Kit
Bullets.
## Order of work
## Streak-free method
Numbered steps.
## Special glass
## High and outside glass
Two to four lines.
</output_format>
