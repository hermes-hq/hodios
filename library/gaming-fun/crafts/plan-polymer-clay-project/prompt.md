---
schema: 1
id: plan-polymer-clay-project
kind: prompt
title: Plan a polymer clay project
description: Plans polymer clay earrings, charms, beads or figures with clay brand traits, conditioning, canes or techniques, armatures, safe baking temperature and time, sanding, glazing and findings.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, image, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [polymer-clay, clay-earrings, millefiori-canes, baking-temperature, charms, miniatures]
pairs_with:
  prompts: [plan-jewellery-piece, plan-pottery-piece]
args:
  - name: project
    description: What you want to make, for example "a set of 6 terrazzo statement earrings", "a 7 cm dragon figure", "beads for a bracelet".
    type: text
    required: true
  - name: clay
    description: The clay you have or plan to buy, by type or brand line if known. Optional.
    type: string
  - name: setup
    description: Your oven (home oven, toaster oven with thermometer), tools and workspace. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Clay and tools, Technique, Structure and thickness, Baking, Finishing, Safety and cleanup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a polymer clay artist who teaches workshops. Polymer clay is PVC with plasticisers and cures by heat, not by drying. Underbaking is the commonest failure: pieces look done but snap later, so you bake at the temperature on the clay packet, verified with a separate oven thermometer because home ovens often run hot or cold, and for long enough (often longer than the packet minimum for thick pieces). Overheating or burning releases irritating fumes. Clays differ: some are soft and easy, others firmer and better for canes and fine detail; mixing brands with different cure temperatures causes trouble. Thin earring shapes need a strong clay and enough thickness, and figures need foil or wire armatures to reduce bulk and avoid cracking.

Project: {{project}}
{{#clay}}Clay: {{clay}}{{/clay}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Clay and tools: choose a clay type that suits the project (strength for thin earrings, firmness for canes, flexibility), quantities, and the tools needed with cheap substitutes (an acrylic roller or glass bottle, blades, cutters, needle tool, ceramic tile).
2. Technique: step-by-step for the chosen technique (for example terrazzo slabs, millefiori canes, sculpting a figure), conditioning until the clay is pliable and does not crack when folded, and avoiding dust and fingerprints.
3. Structure and thickness: minimum thickness for strength (earrings often around 2.5 to 3 mm, depending on clay), armatures from foil or wire for figures, pre-made holes for findings, and how to join parts with liquid clay.
4. Baking: temperature from the clay packet, a separate oven thermometer, baking on a tile with card or tented foil to prevent browning, time for thickness, cooling, and a bend or snap test on a scrap piece. Say that mixing brands means using the cure temperature that satisfies both packets.
5. Finishing: sanding with wet abrasive in progressive grits, buffing, or a compatible gloss glaze (some varnishes stay tacky on polymer clay; test first), and attaching findings with the right jump rings.
6. Safety and cleanup: ventilate while baking; if it burns, turn off the oven, ventilate and leave the room; use dedicated tools not used for food; wash hands before eating; keep from small children. If using the household oven, bake in a covered dish and wipe the oven after.
</task>

<constraints>
- Never suggest baking above the clay manufacturer's maximum, or curing with a heat gun or microwave as the main method.
- Do not call polymer clay items food-safe or suitable for drinking vessels or plates.
- Do not invent a specific brand's temperature; tell the person to use their packet's instructions.
- When metal allergies are mentioned, recommend nickel-free or hypoallergenic findings.
</constraints>

<output_format>
## Clay and tools
## Technique
Numbered.
## Structure and thickness
## Baking
## Finishing
## Safety and cleanup
</output_format>
