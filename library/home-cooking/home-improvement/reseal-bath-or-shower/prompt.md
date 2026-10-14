---
schema: 1
id: reseal-bath-or-shower
kind: prompt
title: Reseal a bath, shower or sink
description: Talks through replacing mouldy or leaking silicone sealant around a bath, shower tray, basin or worktop, from removal and drying to a neat bead, curing time and when a leak needs more than sealant.
category: home-improvement
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
requires: [none]
inputs: [text, image]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [silicone, bathroom-sealant, shower-leak, mouldy-sealant, caulking, bathroom-repair]
pairs_with:
  prompts: [diagnose-home-problem, deep-clean-bathroom, reduce-damp-and-mould]
  personas: [home-repair-mentor]
args:
  - name: job
    description: What you are resealing (bath, shower tray, basin, kitchen worktop), how long the joint is, what is wrong (black mould, gaps, peeling, a leak below), and what it meets (tiles, acrylic, stone).
    type: text
    required: true
  - name: experience
    description: Whether you have used a sealant gun before, and how long the bath or shower can be out of use. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Is sealant the fix, What you need, Remove the old sealant, Prepare the joint, Apply the new bead, Curing and aftercare]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bathroom fitter who has redone thousands of silicone joints. A good bead is not about the gun: it is about removing every trace of old silicone, a completely dry and clean joint, the right sanitary-grade silicone with mould inhibitor, filling the bath with water before sealing (so the joint is sealed at its widest and does not tear when the bath is used), masking both edges, and leaving it to cure for the full time on the tube. Mould under new silicone means the old was not fully removed or the joint was damp. A leak through a ceiling below is often not the sealant at all but grout, the waste, or a shower tray that flexes.

Job: {{job}}
{{#experience}}Experience and time: {{experience}}{{/experience}}
</context>

<task>
1. Decide whether resealing is the fix. Ask yourself whether the symptoms point elsewhere: a stain on the ceiling below when the shower runs but not when the bath fills (tray, waste or grout), cracked grout, a loose or flexing tray, or water behind tiles. Say what to check and when to call a plumber or fitter.
2. List what is needed: sanitary silicone with mould inhibitor in the right colour, a sealant gun, a sealant remover or plastic scraper and blade, masking tape, isopropyl alcohol or a suitable cleaner, lint-free cloths, a smoothing tool or wet finger method, and how much sealant for the joint length.
3. Removal: cut and peel the old bead, scrape residues without scratching acrylic or enamel, use a remover for the film, and kill remaining mould with a suitable cleaner, rinsing and ventilating.
4. Prepare: dry the joint fully (often overnight, with heat and ventilation), fill the bath with water, mask both edges to set the bead width, and wipe with alcohol just before sealing.
5. Apply: cut the nozzle at an angle to suit the gap, run one continuous bead at steady speed, tool it once with a smoothing tool, remove tape immediately at a low angle, and fix any gaps while still wet. For gaps wider than about 6 mm, use a backing rod or foam first.
6. Curing and aftercare: leave the bath full until the bead skins, keep it dry for the full curing time on the tube (often 24 hours or more), ventilate the bathroom and wipe the joint dry after showers to slow mould.
</task>

<constraints>
- Do not recommend acrylic decorator's caulk or general-purpose sealant for wet areas; sanitary silicone or a product rated for wet areas only.
- Curing times vary by product and thickness; give the typical range and tell them to follow the tube.
- Safety: ventilate when using removers and mould cleaners, never mix bleach with acid or ammonia cleaners, wear gloves.
- No brand names.
</constraints>

<output_format>
## Is sealant the fix
Short diagnosis and any stop-and-call signs.
## What you need
Checklist.
## Remove the old sealant
Numbered steps.
## Prepare the joint
Numbered steps.
## Apply the new bead
Numbered steps.
## Curing and aftercare
Bullets.
</output_format>
