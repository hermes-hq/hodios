---
schema: 1
id: remove-wallpaper
kind: prompt
title: Remove wallpaper and prepare the walls
description: Plans removing wallpaper by paper type and wall type - testing, scoring, soaking or steaming, protecting plaster or drywall, hazards in older homes - and preparing the bare wall for paint.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, image]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [wallpaper-removal, wall-preparation, drywall, plaster, steamer, stripping-paper]
pairs_with:
  prompts: [plan-room-painting, repair-wall-holes, plan-diy-project]
  personas: [home-repair-mentor]
args:
  - name: room
    description: Room and approximate wall area, what the paper is like (vinyl, textured, painted over, several layers), how it reacts when you pick at a corner, and what you plan to do after (paint, new paper).
    type: text
    required: true
  - name: walls
    description: Country, age of the house, wall type if known (plaster, plasterboard or drywall), tools you have, time available, and renting or owning. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Safety and hazards, Test patch, Preparation, Removal method, Prepare the wall for paint, Time plan and tools, Call a professional if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a decorator planning a wallpaper strip. The method depends on two things. The paper: strippable papers peel off dry; peelable vinyls lose their top layer and leave a backing paper that then needs soaking; traditional paper needs soaking or steam; painted-over or multiple layers need scoring first so water can get in. The wall: old plaster tolerates soaking and steam well; plasterboard (drywall) has a paper face that tears and bubbles if over-wetted or steamed too long, and many people damage it badly. A test patch in a hidden corner tells you both. A warm water solution with a little washing-up liquid or a wallpaper stripping product, applied and left to soak, does most of the work; a steamer speeds up stubborn paper but burns skin and softens drywall. Older homes add hazards: lead paint in older layers, and textured coatings that may contain asbestos in some countries; these must not be sanded or scraped until tested. Water and electrics: switch off power to sockets and switches on the wall, remove faceplates only when isolated, and keep water out of boxes. After stripping, the wall must be washed free of paste (it feels slippery when wet), dried, repaired and sealed, because paint over residue cracks and peels.

Room: {{room}}
{{#walls}}Walls: {{walls}}{{/walls}}
</context>

<task>
1. Hazard check: if the house is older and there is a painted layer or textured coating, say to test for lead or asbestos before scraping or sanding, and stop that part until tested. Renters should get the landlord's permission first.
2. Test patch: how to identify the paper type and wall type in a hidden corner, and what each result means.
3. Preparation: furniture out or covered, floor protection, power isolated to sockets and switches on those walls, faceplates handled safely, ventilation.
4. Method for their combination, step by step: dry peel, peel and soak backing, score and soak, or steam, with soak times, working in sections, scraper angle to avoid gouging, and specific cautions for drywall.
5. After removal: washing off paste residue and how to tell it is gone, drying time, filling gouges and taping tears, and sealing (a suitable primer or sealer, especially over torn drywall paper, to stop bubbling when painting) before paint or new paper. Mention lining paper as an option for poor walls.
6. Give a realistic time plan for their room and a tool list, and when to call a professional (large drywall damage, hazardous materials, very high walls or stairwells).
</task>

<constraints>
- Never suggest sanding or dry-scraping old paint or textured coatings before they are tested.
- Do not suggest soaking around live electrics.
- Do not invent product brands or prices; describe product types.
</constraints>

<output_format>
## Safety and hazards
## Test patch
## Preparation
## Removal method
Numbered.
## Prepare the wall for paint
## Time plan and tools
## Call a professional if
</output_format>
