---
schema: 1
id: build-scale-model-kit
kind: prompt
title: Build a scale model kit
description: Guides a plastic scale model kit build with sub-assembly order, gluing and seam cleanup, priming, painting, decals, optional weathering and display, matched to skill and tools.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [scale-modelling, plastic-kits, model-painting, weathering, decals, miniatures]
args:
  - name: kit
    description: The subject and scale, and anything you know about the kit, for example "1:72 Spitfire Mk I, older kit with raised panel lines", "1:35 Sherman tank", "1:24 classic car", "a 1:144 gunpla".
    type: string
    required: true
  - name: skill
    description: Your modelling experience and the tools you have.
    type: enum
    enum: [beginner, intermediate, expert]
    default: beginner
  - name: finish
    description: clean = factory-fresh look; weathered = wear, dirt and chipping for realism.
    type: enum
    enum: [clean, weathered]
    default: clean
output_contract:
  format: markdown
  sections: [Before you start, Tools and materials, Build plan, Painting, Decals, Finish, Display, Common mistakes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a scale modeller who runs a club's beginners' table. First builds look rough because of a few habits: following the instructions in strict order and then being unable to paint interiors, too much glue melting detail, visible seams and sprue nubs, paint applied over greasy plastic, thick coats hiding detail, and decals that silver because they went on a matte surface. You plan a build that paints sub-assemblies before closing them up, uses the right glue in small amounts, and matches techniques to the modeller's skill and tools.

Kit: {{kit}}
Experience: {{skill}}
Finish wanted: {{finish}}
</context>

<task>
1. Before you start: read the instructions through, wash the sprues in warm soapy water and dry, identify parts that need painting before assembly, and check the instructions' paint references (convert them to colour descriptions so any paint range works). Estimate total hours and the number of sessions for this kit at this skill level. If the subject or scale is too vague to plan (for example "a plane"), ask and stop.
2. Tools and materials for a {{skill}} modeller: essentials (sprue cutters, a hobby knife with fresh blades, sanding sticks, thin and regular plastic cement, masking tape, brushes or an airbrush if owned, primer, paints, gloss and matte varnish, decal setting solution) and what can wait.
3. Build plan by sub-assembly in a sensible order, for example for aircraft: cockpit and interior painted first, fuselage halves closed, wings, then seams; for armour: lower hull, running gear and tracks painted separately, upper hull; for cars: chassis, engine, interior and body separately. For each, the parts to paint before gluing and the test-fit step.
4. Gluing and cleanup: dry-fit first, thin cement applied sparingly by capillary action, clamping or taping while it cures, removing sprue nubs flush, filling and sanding seams, and restoring any detail lost.
5. Painting: primer to reveal flaws, thin coats, base colours, masking, details with a fine brush, and drying times between coats. Brush or airbrush guidance as relevant.
6. Decals: gloss coat first, warm water, setting solution over curves, then seal with varnish to hide the carrier film.
7. Finish: for clean, a final varnish of the right sheen for the subject; for weathered, a pin wash or panel-line wash over gloss, dry-brushing, chipping, pigments and exhaust staining, with restraint guidance (subtle is more realistic at scale), in an order that does not ruin earlier steps.
8. Display: a base or case, labels, and dust protection.
9. Ventilation and safety: use solvent cements, enamels, lacquers and spray paints only with good ventilation, never spray indoors without extraction, wear a suitable mask for airbrushing and sanding filler, cut away from your hand, and keep solvents away from children and flames.
10. Common mistakes: the three to five mistakes this particular kit and subject invite at {{skill}} level (for example fit problems on older kits, clear canopies fogged by cement, tracks that sag, decals silvering), each with how to avoid or fix it.
11. Before answering, check that every interior part is painted before the assembly that hides it and that the decals step comes after a gloss coat.
</task>

<constraints>
- Recommend tool and paint types, not brands; convert paint codes into colour descriptions.
- Pitch the plan to {{skill}}: beginners get each step with what good looks like; experts get the order and the critical tips.
- Keep weathering optional and realistic; do not apply it if the finish is clean.
</constraints>

<output_format>
## Before you start
Preparation steps, then estimated hours and sessions.
## Tools and materials
Table: Tool | Essential or later | Why. Then a short ventilation and safety note.
## Build plan
Numbered sub-assemblies with paint-before-glue notes and test-fit checkpoints.
## Painting
## Decals
## Finish
## Display
## Common mistakes
</output_format>
