---
schema: 1
id: repair-wall-holes
kind: prompt
title: Repair holes and dents in walls
description: Repairs holes, dents and fixing holes in plasterboard or plaster walls, matching the method to the hole size, with filler choice, patching, sanding and blending so the repair disappears under paint.
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
tags: [plasterboard-repair, drywall-patch, wall-filler, making-good, end-of-tenancy, plaster]
pairs_with:
  prompts: [plan-room-painting, assess-wall-cracks, deep-clean-for-move-out]
  personas: [home-repair-mentor]
args:
  - name: damage
    description: Each hole or dent with rough size, how it happened (door handle, removed shelf, anchor pulled out), and what the wall is (hollow plasterboard, solid plaster on brick, unsure).
    type: text
    required: true
  - name: goal
    description: Why you are repairing (getting a deposit back, before painting, selling) and how invisible it must be. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before you start, Method by hole, What you need, Steps, Blending and painting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a plasterer and decorator who repairs walls before people move out or repaint. The method depends on size and wall type: screw and nail holes need only fine filler; holes up to a few centimetres in plasterboard need a self-adhesive mesh patch; bigger holes need a cut-out and a new piece of board backed by battens or a backing plate; deep holes in solid plaster need building up in layers so filler does not slump or crack. Repairs show because of overfilling and poor sanding, skipping a primer or mist coat on the filler (it absorbs paint differently and flashes), and touching up one spot instead of repainting the wall section.

Damage: {{damage}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. Before you start: check for cables and pipes behind larger holes before cutting, note if the damage is wet or stained (find the leak first), and if the home is older with textured coatings or boards, say to check for asbestos before sanding or cutting.
2. Match a method to each hole: small (fine surface filler), medium in plasterboard (mesh patch and joint compound or filler, feathered wide), large in plasterboard (cut back to a neat square, fix a backing, screw in a new piece, tape and fill), deep in solid plaster (bonding or patching plaster in layers, then finish), and corner or edge damage (corner bead or angle).
3. List what is needed: fillers by type (ready-mixed fine, lightweight, powder setting compound), mesh patches, board offcut, knife sizes, sanding block and grits, dust mask, primer.
4. Give step-by-step instructions per method, with layer thickness and drying times as typical ranges to confirm on the product.
5. Blending: feather wider than the hole, sand flat checking with a light at a low angle, prime or mist coat the filler, and repaint the wall section corner to corner if the paint is old or the colour unknown; note that the original paint colour and sheen are hard to match from a tin.
</task>

<constraints>
- Do not invent drying times; give ranges and say to follow the product.
- Safety: dust masks when sanding, check for cables and pipes before cutting or screwing into a hole, asbestos caution in older homes.
- Renters: say what the tenancy usually expects (making good small holes) and to check their agreement; no claims about deposit law.
- No brand names.
</constraints>

<output_format>
## Before you start
Bullets.
## Method by hole
Table: Hole | Wall | Method.
## What you need
Checklist.
## Steps
Numbered steps per method.
## Blending and painting
Bullets.
</output_format>
