---
schema: 1
id: design-vehicle-graphics
kind: prompt
title: Design vehicle graphics for a business
description: Designs livery for a van, car or truck that is read at speed, choosing lettering, a partial or full wrap, and laying out each side around doors, handles and windows, plus an installer brief.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, founder, marketer, operations-manager]
requires: [none]
inputs: [text, image, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [vehicle-wrap, van-livery, large-format-print, small-business-marketing, signwriting]
pairs_with:
  prompts: [build-diy-brand-kit, design-business-card, plan-local-seo]
  personas: [art-director, brand-strategist]
args:
  - name: business
    description: The business, what it does, the area it serves, logo and colours, and how customers contact it.
    type: text
    required: true
  - name: vehicle
    description: Make, model, year, body type (for example "long-wheelbase high-roof panel van"), colour, owned or leased, and how many vehicles.
    type: text
    required: true
  - name: budget
    description: Rough budget or preference such as "cut vinyl lettering only" or "full wrap". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Message, Coverage choice, Side-by-side layout, Rear, Typography and colour, Vehicle constraints, Legal and safety checks, Installer brief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A business vehicle is a moving sign read for a few seconds by people at a junction, in a car park, or behind it in traffic. It needs to say who you are, what you do and how to reach you, nothing more. Typical failures: a list of ten services, a phone number in a thin font, a slogan that says nothing about the trade, text that runs across door gaps, handles, rivets and windows, a design laid out on a flat rectangle that distorts over the wheel arches, and a left side that mirrors the right so the logo reads towards the back. The rear doors are read by drivers stuck behind the vehicle, which makes the rear the best place for a phone number or web address. Cut vinyl lettering on a coloured van is often cheaper and cleaner than a full printed wrap.
</context>

<task>
Design vehicle graphics for this business: {{business}}

<vehicle>
{{vehicle}}
</vehicle>
{{#budget}}Budget or preference: {{budget}}{{/budget}}

If the make, model and year are missing, ask for them and stop: the installer's template for that exact vehicle decides the layout.

1. **Message.** The name, a three-to-five-word description of the trade, one contact route (the easiest to remember) and optionally the area served. List what to leave off and why.
2. **Coverage choice.** Compare cut vinyl lettering, partial wrap (for example rear half or graphic band) and full wrap for this vehicle and budget, on cost level (relative, not prices), impact, durability, removal for leased vehicles, and repair. Recommend one.
3. **Side-by-side layout.** For the driver side, passenger side and bonnet or front: positions of each element, avoiding door gaps, the sliding door track, handles, fuel cap, windows, rivets and deep curves; the logo and text reading forwards on both sides; elements high enough to be seen over parked cars.
4. **Rear.** Large phone number or web address, name and trade, readable from a following car; nothing across the door split that becomes unreadable when one door opens; clearance around lights, number plate, sensors and cameras.
5. **Typography and colour.** Bold, open typefaces, minimum letter heights for reading at about 10 to 20 m, high contrast against the vehicle's paint colour, and a test of the design at thumbnail size to judge it at distance.
6. **Vehicle constraints.** What to measure or request from the installer (vehicle template, panel lines), how graphics should behave over curves, and the fleet consistency rules if there are several vehicles of different models.
7. **Legal and safety checks.** Points to confirm locally: window film and perforated vinyl on side and rear windows, reflective materials, restrictions on markings that resemble emergency or police vehicles, lease or finance company permission, and insurance notification. Mark them as checks, not rules.
8. **Installer brief.** A short brief for the wrap or signwriting company with vehicle details, design files expected, materials (cast versus calendered film for curves), lamination, and a proof on the vehicle template before printing.
</task>

<constraints>
- Do not invent phone numbers, web addresses, accreditation badges or reviews; use placeholders.
- Never imitate emergency-service, police or official vehicle liveries.
- Give relative cost levels, not prices; prices vary by country and installer.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. Coverage choice as a comparison table. Side-by-side layout as a table (Side, Element, Position, Size, Avoid). Legal and safety checks and the installer brief as checklists.
</output_format>
