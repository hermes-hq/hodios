---
schema: 1
id: plan-video-generation-budget
kind: prompt
title: Plan a video generation budget
description: Estimates how many takes each shot of a generated video will need by difficulty, turns that into credits or cost from your own pricing, and shows where to save before you start.
category: video-generation
version: 1.0.0
status: incubating
stage: [plan]
role: [content-creator, marketer, project-manager]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [credit-budget, shooting-ratio, take-estimates, cost-planning]
pairs_with:
  prompts: [turn-storyboard-into-video-shots, review-generated-video-takes]
  workflows: [ai-short-film-track]
args:
  - name: shot_list
    description: "Your shots, one per line, with length in seconds and what happens, e.g. '3: close-up, she turns and smiles, 4s'."
    type: text
    required: true
  - name: pricing
    description: "What generation costs in your tool, as you see it on your plan, e.g. '10 credits per second at standard quality, 1,000 credits a month'. Leave empty to plan in generated seconds."
    type: text
  - name: budget
    description: The most you can spend, in credits or money.
    type: text
  - name: deadline
    description: When the video must be finished, if generation limits or queue times matter.
    type: text
output_contract:
  format: markdown
  sections: [Shot difficulty, Take estimate, Budget, Where to save, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People budget generated video by counting finished seconds, then run out of credits halfway through. Generated video has a shooting ratio like live action: you generate far more than you use. Easy shots (a static wide landscape, slow drifting clouds, an abstract loop) often work in one to three takes. Hard shots (a face speaking, hands handling objects, two people interacting, readable text, fast action, a precise product) can take ten or more, and many takes yield only two or three usable seconds. A realistic budget scores each shot's difficulty, estimates takes and usable length, adds a contingency for re-dos after review, and spends the most on the shots the audience will look at hardest.
</context>

<task>
Estimate the generation budget for this video.

<shot_list>
{{shot_list}}
</shot_list>
{{#pricing}}
Pricing as the user reports it: {{pricing}}
{{/pricing}}
{{#budget}}
Budget: {{budget}}
{{/budget}}
{{#deadline}}
Deadline: {{deadline}}
{{/deadline}}

1. **Shot difficulty.** Rate each shot easy, medium or hard using these drivers: faces in close-up or speaking, hands doing things, more than one person interacting, readable text or logos, fast motion or contact, an exact product or real place, length over five seconds, need to match other shots. Name the drivers for each shot.
2. **Take estimate.** For each shot give a low and high take count by difficulty (as a starting assumption: easy 1 to 3, medium 3 to 6, hard 6 to 12) and the generation length per take, which is usually longer than the seconds used. State these as assumptions the user should replace with their own hit rate after the first few shots.
3. **Budget.** Total generated seconds (low and high). If pricing was given, convert using only those numbers and show the arithmetic. If not, report in generated seconds and generations and say what to look up. Add a contingency of 20 to 30 percent for re-dos after review. Compare with the budget if given, and with the deadline if generation limits or queues were mentioned.
4. **Where to save.** Concrete moves for this list: test hard shots at lower quality or shorter length before final settings, cut or simplify the hardest shots (cutaways instead of speaking faces, inserts instead of full hand action), reuse one good take across two moments, replace a shot with a still plus slow push, or film the hardest shot for real.
5. **Assumptions.** List every assumption so the user can correct it.
6. Before answering, recheck the arithmetic and confirm no price appears that the user did not give.
</task>

<constraints>
- Never invent prices, credit costs, plan limits or tool names. Use only the pricing the user gives.
- Present take counts as estimates to calibrate, not facts.
- Keep money and credits in the units the user used.
</constraints>

<output_format>
## Shot difficulty
Table: Shot | Seconds used | Difficulty | Drivers.
## Take estimate
Table: Shot | Takes (low to high) | Seconds per take | Generated seconds (low to high).
## Budget
Totals with arithmetic, contingency, comparison with the budget.
## Where to save
Bullets tied to shot numbers, with the saving each one gives.
## Assumptions
Bullets.
</output_format>
