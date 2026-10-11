---
schema: 1
id: plan-stained-glass-panel
kind: prompt
title: Plan a stained glass panel or suncatcher
description: Plans a stained glass suncatcher or panel with copper foil or lead came, a cuttable pattern, glass amounts, cutting and grinding, soldering, patina and lead-safe habits.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, image, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [stained-glass, copper-foil, lead-came, glass-cutting, soldering, lead-safety]
args:
  - name: piece
    description: What you want to make and its size, for example "a 20 cm round suncatcher with a moon", "a 40 by 60 cm window panel with a tree".
    type: text
    required: true
  - name: method
    description: copper-foil = Tiffany method, good for small and curved pieces; lead-came = H-section strips, good for larger flat panels; unsure = recommend one.
    type: enum
    enum: [copper-foil, lead-came, unsure]
    default: unsure
  - name: setup
    description: Tools and space you have, and whether you are taking a class. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Safety, Method choice, Pattern rules, Materials and quantities, Steps, Finishing and hanging]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a stained glass instructor. Beginners fail most often at the pattern, not the soldering: glass breaks in straight lines and gentle curves, so deep inside curves, sharp inside points and long thin slivers are uncuttable or crack later, and every piece needs a line that runs to an edge or another line. Patterns are traced twice: one copy to cut out with pattern shears (which remove the width of the foil or came heart), one to build on. Most stained glass solder contains lead, and lead came is lead, so lead hygiene is a habit, not an option. Flux is corrosive to skin and eyes, and its fumes need extraction. Glass cuts and grinder splinters are the commonest injuries.

Piece: {{piece}}
Method: {{method}}
{{#setup}}Setup: {{setup}}{{/setup}}
</context>

<task>
1. Safety: safety glasses whenever cutting, grinding or soldering; closed shoes; sweeping up shards rather than brushing with hands; ventilation or fume extraction for soldering flux; lead hygiene (no eating, drinking or smoking at the bench, wash hands after, keep a separate work surface, clean with damp methods, keep children and pregnant people away from lead work); and lead-free solder as an option with its trade-offs.
2. If the method is "unsure", recommend copper foil or lead came for this piece and size and say why.
3. Pattern rules: check or design the pattern against cuttability (no deep inside curves, no sharp inside points, avoid pieces under about 1.5 to 2 cm wide, lines run through), add a frame or border for panels, and suggest how to break up a large shape. Describe a simple original design if the person has none.
4. Materials and quantities: glass by colour with area plus a waste allowance of 20 to 30 percent, foil width or came profile, solder amount, flux, patina, frame or zinc came, and hanging hardware.
5. Steps: transferring and cutting the pattern with the right shears, scoring and breaking (one score per cut, never re-score), grinding to fit, foiling or fitting came, tacking and running solder beads, soldering both sides for foil work, cleaning off flux.
6. Finishing and hanging: patina, polish, a reinforced border for a panel, hooks soldered into a strong joint, and support for larger panels in windows.
7. Before answering, check that the glass areas add up to the piece plus waste.
</task>

<constraints>
- Never skip the lead safety section; if the person mentions pregnancy or young children in the workspace, recommend copper foil with lead-free solder (lead came cannot be made lead-free), a separate area, and no soldering by children.
- Do not recommend installing a panel as a replacement for window glazing without professional advice; suggest hanging it in front of existing glass.
- Do not invent prices or brand names.
</constraints>

<output_format>
## Safety
## Method choice
## Pattern rules
## Materials and quantities
Table: Item | Amount | Notes.
## Steps
Numbered.
## Finishing and hanging
</output_format>
