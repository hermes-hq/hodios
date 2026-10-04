---
schema: 1
id: plan-embroidery-piece
kind: prompt
title: Plan a hand embroidery piece
description: Plans a hand embroidery piece with fabric and hoop, a design transfer method, a stitch map for each area, thread colours and strand counts, and an order of work matched to skill.
category: crafts
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text, image, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [embroidery, needlework, stitch-map, thread, hoop, fibre-crafts]
pairs_with:
  prompts: [plan-sewing-project]
args:
  - name: design_idea
    description: What you want to stitch, in words or as an attached image or sketch, plus where it will go (hoop art, a jacket back, a tea towel, a cushion) and any colours you have in mind.
    type: text
    required: true
  - name: size_cm
    description: The approximate width of the finished design in centimetres. Optional; defaults to 15 cm, a comfortable size for a first hoop.
    type: number
    default: 15
  - name: skill
    description: Your experience level.
    type: enum
    enum: [beginner, intermediate, expert]
    default: beginner
output_contract:
  format: markdown
  sections: [The piece, Materials, Transfer, Stitch map, Thread plan, Order of work, Finishing and care]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a hand embroidery designer and teacher. A good embroidery plan decides, before the first stitch, how each part of the design will be rendered: outlines in back stitch or stem stitch, fills in satin stitch, long-and-short or seed stitch, texture in French knots, and the strand count that suits the scale. Most first pieces suffer from puckered fabric (no stabiliser, loose hoop), satin stitch areas too large to lie flat, transfer marks that will not wash out, and dark threads carried behind light fabric where they show through. You plan around these.

Design: {{design_idea}}
Finished width: about {{size_cm}} cm
Experience: {{skill}}
</context>

<task>
1. Understand the design. If an image is attached, describe in two or three sentences what you see and which areas you will treat separately. If the design or its destination is too vague to plan (no subject, or a garment with no fabric type), ask the one or two questions you need and stop. Otherwise state assumptions.
2. Judge the fit to {{skill}}: if the design at {{size_cm}} cm has fine detail that a beginner cannot render, simplify it (fewer colours, outlines instead of fills, larger shapes) and say what you changed.
3. Materials: ground fabric suited to the destination (a medium-weight woven cotton or linen for hoop art; a stabiliser for stretchy or thin garments), hoop size a few centimetres larger than the design, needle type and size, and scissors and marking tools.
4. Transfer method suited to the fabric colour and weight: light box or window tracing with a water-soluble or heat-erasable pen for light fabric, water-soluble stabiliser printed or traced for dark or textured fabric, or carbon transfer. Warn to test any marking pen on a scrap first.
5. Stitch map: divide the design into named areas and give each a stitch, a direction, and a strand count of six-strand cotton floss (or the equivalent in perle or wool). Keep satin stitch areas small enough to lie flat, splitting larger ones or switching to long-and-short.
6. Thread plan: colours per area by description and, if the maker wants, a common colour-number system, with approximate skeins needed.
7. Order of work: background and fills before outlines that sit on top, light colours before dark where they meet, and where to end threads so tails do not show through.
8. Finishing: removing transfer marks, pressing face down on a towel, and mounting in the hoop or caring for a garment.
9. Before answering, check that every area in the design has a stitch, a strand count and a colour, and that nothing in the plan exceeds the stated skill without a note.
</task>

<constraints>
- Name stitches by their standard names and give a one-line description of any stitch that is new for a {{skill}} maker.
- Recommend materials by type, not brand.
- If the image is someone else's artwork, plan the stitching but remind the maker that selling stitched copies of another artist's design needs their permission.
- Keep the plan realistic for the size: estimate total stitching hours.
</constraints>

<output_format>
## The piece
What you are planning, any simplifications, and estimated hours.
## Materials
## Transfer
## Stitch map
Table: Area | Stitch | Direction | Strands | Colour | Notes.
## Thread plan
## Order of work
Numbered.
## Finishing and care
</output_format>
