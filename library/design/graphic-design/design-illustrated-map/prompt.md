---
schema: 1
id: design-illustrated-map
kind: prompt
title: Design an illustrated visitor map
description: Plans an illustrated map for a venue, campus, festival site or town centre, with what to show and leave out, orientation, style, labels, accessible routes, base-data rights and formats.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, operations-manager, marketer, artist]
requires: [none]
inputs: [text, image, document]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [visitor-map, wayfinding, map-design, event-design, cartography]
pairs_with:
  prompts: [plan-signage, design-infographic, design-accessible-print-materials]
  personas: [art-director]
args:
  - name: place
    description: The place to map - its extent, main areas, entrances, key destinations, facilities, and any plan or base map you have.
    type: text
    required: true
  - name: use
    description: How and where the map is used, for example "printed in the festival programme and on site boards", "phone screen for campus visitors", "tourist leaflet". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, What to show, What to leave out, Orientation and simplification, Style, Labels and legend, Accessibility, Base data and rights, Formats, Testing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An illustrated map trades accuracy for clarity and character: it simplifies streets, exaggerates landmarks and drops what visitors do not need. Done badly it is a pretty picture nobody can navigate: too many labels, icons without words, inconsistent north, no "you are here" logic, and distances so distorted that a 15-minute walk looks like two minutes. Maps on site boards should be oriented to the direction the viewer is facing, which means the same map may need rotated versions; maps in a programme are usually north-up. Base geography often comes from a source with licence terms: tracing a commercial map is copying, while open data such as OpenStreetMap is usable with attribution under its licence.
</context>

<task>
Plan an illustrated map of: {{place}}
{{#use}}Use: {{use}}{{/use}}

If the place description lacks entrances or key destinations, ask for them or a plan and stop.

1. **Purpose.** The three or four tasks visitors use the map for (find the stage, toilets, first aid, the exit, the step-free route) and the first thing they must see.
2. **What to show.** Areas, paths, entrances, key destinations, facilities and landmarks that help people orient (a tall building, a lake, a big tent), ranked by importance.
3. **What to leave out.** What to remove or merge, and how to signal areas visitors cannot enter.
4. **Orientation and simplification.** North-up or viewer-facing (for each use), the angle (flat plan, axonometric, gentle bird's-eye), how much to straighten and simplify, and keeping relative distances honest; add walking times for key routes.
5. **Style.** Illustration approach, palette with zone colours that keep text legible, landmark drawings, and how it fits the event or place identity.
6. **Labels and legend.** Typeface and sizes for each label level, every icon paired with a word or a legend entry, recognised symbols for toilets, first aid, accessible routes and exits, and one name per place matching signs and programmes.
7. **Accessibility.** Step-free routes, accessible toilets, quiet areas, seating, gradients or steps to avoid, colour never the only cue, contrast, and a text description or list version for screen-reader users.
8. **Base data and rights.** Where the geography comes from (own survey, site plan from the venue, open data with attribution), what not to trace, and the attribution line if needed.
9. **Formats.** Sizes and versions (print programme, large site board with "you are here", phone view that can be zoomed), file formats, and how to update for changes.
10. **Testing.** Ask three first-time visitors to find given places using only the map, and fix what confuses them.
</task>

<constraints>
- Do not invent facilities, routes or distances; mark anything uncertain for the organiser to confirm.
- Emergency exits and assembly points must come from the venue's safety plan, not from the illustration.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the contract's sections in order. What to show as a table (Feature, Priority, How shown). Labels and legend as a table (Level, Examples, Size, Style).
</output_format>
